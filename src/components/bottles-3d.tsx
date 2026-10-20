import { useEffect, useRef } from "react"
import * as THREE from "three"
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js"
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader.js"
import { mergeVertices } from "three/examples/jsm/utils/BufferGeometryUtils.js"

import bottleObj from "@/assets/models/bouteille-vin.obj?raw"

import type { BottleLook, WineStyle } from "@/data/content"

export type BottleSpec = {
  name: string
  appellation: string
  style: WineStyle
  /** The real bottle's label and colours, when we have them. */
  look?: BottleLook
}

type Props = {
  bottles: BottleSpec[]
  estateName: string
  selected: number
  onSelect: (index: number) => void
}

// Section background (hsl(215 14% 13%)) — used for fog so back bottles fade out.
const FOG_COLOR = 0x1c2026
const RING_RADIUS = 2.4
const TAU = Math.PI * 2

const palette: Record<WineStyle, { glass: number; glassOpacity: number; wine: number; capsule: number; label: string }> = {
  blanc: { glass: 0x86a066, glassOpacity: 0.5, wine: 0xa88d36, capsule: 0xc9a55a, label: "Blanc" },
  rose: { glass: 0xf0ece4, glassOpacity: 0.26, wine: 0xd4766e, capsule: 0xd9c9a8, label: "Rosé" },
  rouge: { glass: 0x2c4228, glassOpacity: 0.72, wine: 0x4a0d18, capsule: 0x5a1a26, label: "Rouge" },
}

// The bottle model (bouteille-vin.obj) is Y up, in its own units: base at y = -188.66, top at 193.50,
// 48.22 body radius; its capsule covers the neck from y = 136.3 up.
const MODEL_BASE_Y = -188.66
const MODEL_HEIGHT = 193.5 - MODEL_BASE_Y
const MODEL_CAPSULE_Y = 136.3
const BOTTLE_HEIGHT = 3
const MODEL_SCALE = BOTTLE_HEIGHT / MODEL_HEIGHT
const BODY_RADIUS = 48.22 * MODEL_SCALE
const CAPSULE_Y = (MODEL_CAPSULE_Y - MODEL_BASE_Y) * MODEL_SCALE
// Label sizes were measured on the studio photos, on a bottle 3 units tall with a 0.4 radius.
const PHOTO_RADIUS = 0.4
// The wine fills the bottle up to the neck.
const FILL_HEIGHT = 0.78 * BOTTLE_HEIGHT

let bottleGeometry: THREE.BufferGeometry | null = null

/**
 * The bottle from the model, standing on y = 0 and scaled to BOTTLE_HEIGHT, keeping the model's own
 * normals. Its triangles are split in two groups: glass (material 0), then the capsule (material 1).
 */
function modelGeometry() {
  if (bottleGeometry) return bottleGeometry
  const obj = new OBJLoader().parse(bottleObj)
  const shell = obj.children.find((c) => c.name === "Bouteille") as THREE.Mesh
  const g = mergeVertices(shell.geometry, 1e-4)
  g.translate(0, -MODEL_BASE_Y, 0)
  g.scale(MODEL_SCALE, MODEL_SCALE, MODEL_SCALE)

  const pos = g.getAttribute("position")
  const index = g.getIndex()!.array
  const glass: number[] = []
  const capsule: number[] = []
  for (let t = 0; t < index.length; t += 3) {
    const tri = [index[t], index[t + 1], index[t + 2]]
    const y = (pos.getY(tri[0]) + pos.getY(tri[1]) + pos.getY(tri[2])) / 3
    ;(y > CAPSULE_Y ? capsule : glass).push(...tri)
  }
  g.setIndex([...glass, ...capsule])
  g.addGroup(0, glass.length, 0)
  g.addGroup(glass.length, capsule.length, 1)
  bottleGeometry = g
  return g
}

/** Per-vertex colour: wine below the fill line, tinted glass above it. */
function tintedBottle(wine: number, glass: number, glassOpacity: number) {
  const g = modelGeometry().clone()
  const pos = g.getAttribute("position")
  const colors = new Float32Array(pos.count * 4)
  const w = new THREE.Color(wine)
  const gl = new THREE.Color(glass)
  for (let i = 0; i < pos.count; i++) {
    const full = pos.getY(i) < FILL_HEIGHT
    const c = full ? w : gl
    colors.set([c.r, c.g, c.b, full ? 0.96 : glassOpacity], i * 4)
  }
  g.setAttribute("color", new THREE.BufferAttribute(colors, 4))
  return g
}

function fitText(ctx: CanvasRenderingContext2D, text: string, font: (size: number) => string, start: number, maxWidth: number) {
  let size = start
  ctx.font = font(size)
  while (ctx.measureText(text).width > maxWidth && size > 10) {
    size -= 2
    ctx.font = font(size)
  }
  return size
}

function drawSpaced(ctx: CanvasRenderingContext2D, text: string, x: number, y: number, spacing: number) {
  const chars = [...text]
  const total = chars.reduce((w, c) => w + ctx.measureText(c).width, 0) + spacing * (chars.length - 1)
  let cx = x - total / 2
  for (const c of chars) {
    ctx.fillText(c, cx, y)
    cx += ctx.measureText(c).width + spacing
  }
}

function labelTexture(spec: BottleSpec, estateName: string) {
  const w = 1024
  const h = 920
  const canvas = document.createElement("canvas")
  canvas.width = w
  canvas.height = h
  const ctx = canvas.getContext("2d")!
  const serif = '"Cormorant Garamond", Georgia, serif'
  const sans = 'Inter, "Helvetica Neue", Arial, sans-serif'
  const gold = "#a8853f"
  const ink = "#1d222a"

  ctx.fillStyle = "#f1eadb"
  ctx.fillRect(0, 0, w, h)
  // Paper grain
  for (let i = 0; i < 2600; i++) {
    ctx.fillStyle = `rgba(120, 100, 60, ${Math.random() * 0.05})`
    ctx.fillRect(Math.random() * w, Math.random() * h, 2, 2)
  }
  ctx.strokeStyle = gold
  ctx.lineWidth = 3
  ctx.strokeRect(70, 60, w - 140, h - 120)
  ctx.lineWidth = 1.5
  ctx.strokeRect(84, 74, w - 168, h - 148)

  ctx.textAlign = "left"
  ctx.textBaseline = "middle"
  ctx.fillStyle = ink
  ctx.font = `500 30px ${sans}`
  drawSpaced(ctx, estateName.toUpperCase(), w / 2, 175, 9)

  ctx.textAlign = "center"
  ctx.fillStyle = gold
  ctx.fillRect(w / 2 - 50, 230, 100, 3)

  ctx.fillStyle = ink
  fitText(ctx, spec.name, (s) => `italic 700 ${s}px ${serif}`, 150, w - 260)
  ctx.fillText(spec.name, w / 2, 400)

  ctx.textAlign = "left"
  ctx.font = `500 34px ${sans}`
  ctx.fillStyle = gold
  drawSpaced(ctx, "SANCERRE", w / 2, 540, 14)

  ctx.font = `italic 400 44px ${serif}`
  ctx.fillStyle = ink
  ctx.textAlign = "center"
  ctx.fillText("Appellation Sancerre Contrôlée", w / 2, 610)

  ctx.fillStyle = gold
  ctx.fillRect(w / 2 - 50, 680, 100, 3)

  ctx.textAlign = "left"
  ctx.font = `500 24px ${sans}`
  ctx.fillStyle = ink
  drawSpaced(ctx, `${palette[spec.style].label.toUpperCase()} · AGRICULTURE BIOLOGIQUE`, w / 2, 750, 6)

  const tex = new THREE.CanvasTexture(canvas)
  tex.colorSpace = THREE.SRGBColorSpace
  tex.anisotropy = 8
  return tex
}

function shadowTexture() {
  const c = document.createElement("canvas")
  c.width = c.height = 128
  const ctx = c.getContext("2d")!
  const g = ctx.createRadialGradient(64, 64, 0, 64, 64, 64)
  g.addColorStop(0, "rgba(0,0,0,0.55)")
  g.addColorStop(1, "rgba(0,0,0,0)")
  ctx.fillStyle = g
  ctx.fillRect(0, 0, 128, 128)
  return new THREE.CanvasTexture(c)
}

function buildBottle(spec: BottleSpec, estateName: string, index: number, shadowTex: THREE.Texture) {
  const look = spec.look
  const p = { ...palette[spec.style], ...look?.colors }
  const bottle = new THREE.Group()

  // Real bottles here carry a matte dark capsule; drawn ones a metallic foil.
  const capsuleMat = new THREE.MeshStandardMaterial({
    color: p.capsule,
    metalness: look?.colors?.capsule !== undefined ? 0.3 : 0.85,
    roughness: look?.colors?.capsule !== undefined ? 0.5 : 0.32,
  })
  const glass = new THREE.Mesh(tintedBottle(p.wine, p.glass, p.glassOpacity), [
    new THREE.MeshPhysicalMaterial({
      vertexColors: true,
      roughness: 0.08,
      metalness: 0,
      clearcoat: 1,
      clearcoatRoughness: 0.05,
      transparent: true,
      envMapIntensity: 1.2,
    }),
    capsuleMat,
  ])
  glass.renderOrder = 1

  const real = look?.label
  const arc = real?.arc ?? 2.2
  // Same angular width as on the photos; height scaled with the radius so the label keeps its proportions.
  const labelHeight = (real?.height ?? 0.8) * (BODY_RADIUS / PHOTO_RADIUS)
  const label = new THREE.Mesh(
    new THREE.CylinderGeometry(BODY_RADIUS + 0.004, BODY_RADIUS + 0.004, labelHeight, 64, 1, true, -arc / 2, arc),
    new THREE.MeshStandardMaterial({
      map: real ? null : labelTexture(spec, estateName),
      roughness: 0.85,
      metalness: 0,
      transparent: real?.shape === "diamond",
      alphaTest: real?.shape === "diamond" ? 0.5 : 0,
    }),
  )
  label.position.y = real?.y ?? 0.7
  label.renderOrder = 3
  if (real) {
    // Show the photographed label once it has loaded; fall back to a drawn one.
    label.userData.realLabel = true
    label.visible = false
    new THREE.TextureLoader().load(
      real.src,
      (tex) => {
        tex.colorSpace = THREE.SRGBColorSpace
        tex.anisotropy = 8
        label.material.map = tex
        label.material.needsUpdate = true
        label.visible = true
      },
      undefined,
      () => {
        label.material.map = labelTexture(spec, estateName)
        label.material.transparent = false
        label.material.alphaTest = 0
        label.material.needsUpdate = true
        label.visible = true
      },
    )
  }

  const shadow = new THREE.Mesh(
    new THREE.PlaneGeometry(1.1, 1.1),
    new THREE.MeshBasicMaterial({ map: shadowTex, transparent: true, depthWrite: false }),
  )
  shadow.rotation.x = -Math.PI / 2
  shadow.position.y = 0.001

  bottle.add(shadow, glass, label)
  bottle.userData.label = label
  bottle.traverse((o) => (o.userData.index = index))
  if (look?.widthScale) bottle.scale.set(look.widthScale, 1, look.widthScale)
  return bottle
}

/**
 * Turntable of wine bottles. The ring rotates to bring the selected cuvée to
 * the front; drag to spin it, release to snap to the nearest bottle.
 */
export default function Bottles3D({ bottles, estateName, selected, onSelect }: Props) {
  const containerRef = useRef<HTMLDivElement>(null)
  const selectedRef = useRef(selected)
  const onSelectRef = useRef(onSelect)
  const apiRef = useRef<{ goTo: (i: number) => void } | null>(null)
  onSelectRef.current = onSelect

  useEffect(() => {
    const container = containerRef.current!
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    const n = bottles.length
    // Space at least 4 slots around the ring so a small set never hides a bottle behind another.
    const step = TAU / Math.max(n, 4)

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.toneMapping = THREE.ACESFilmicToneMapping
    renderer.toneMappingExposure = 1.05
    renderer.outputColorSpace = THREE.SRGBColorSpace
    renderer.domElement.style.touchAction = "pan-y"
    renderer.domElement.style.cursor = "grab"
    renderer.domElement.setAttribute("aria-hidden", "true")
    container.appendChild(renderer.domElement)

    const scene = new THREE.Scene()
    scene.fog = new THREE.Fog(FOG_COLOR, 8.5, 14)
    const pmrem = new THREE.PMREMGenerator(renderer)
    const envTex = pmrem.fromScene(new RoomEnvironment(), 0.04).texture
    scene.environment = envTex

    const key = new THREE.DirectionalLight(0xfff1dc, 1.6)
    key.position.set(3, 6, 6)
    const rim = new THREE.DirectionalLight(0xc9a55a, 1.2)
    rim.position.set(-4, 3, -3)
    scene.add(key, rim, new THREE.AmbientLight(0xffffff, 0.25))

    const camera = new THREE.PerspectiveCamera(30, 1, 0.1, 50)
    const lookAt = new THREE.Vector3(0, 1.52, 1.1)

    const ring = new THREE.Group()
    scene.add(ring)
    const shadowTex = shadowTexture()
    const items = bottles.map((spec, i) => {
      const b = buildBottle(spec, estateName, i, shadowTex)
      const a = i * step
      b.position.set(Math.sin(a) * RING_RADIUS, 0, Math.cos(a) * RING_RADIUS)
      b.rotation.y = a
      ring.add(b)
      return b
    })

    // Ring angle: bottle i faces the camera when angle === -i * step.
    // A new set of bottles spins in by half a turn.
    let target = -selectedRef.current * step
    let current = reduceMotion ? target : target + Math.PI
    ring.rotation.y = current

    const goTo = (i: number) => {
      let delta = (-i * step - target) % TAU
      if (delta > Math.PI) delta -= TAU
      if (delta < -Math.PI) delta += TAU
      target += delta
      if (reduceMotion) current = target
    }
    apiRef.current = { goTo }

    // Label textures depend on web fonts — redraw once they are ready.
    const fontsReady = Promise.all([
      document.fonts.load('italic 700 64px "Cormorant Garamond"'),
      document.fonts.load('italic 400 32px "Cormorant Garamond"'),
      document.fonts.load("500 24px Inter"),
    ]).catch(() => undefined)
    let disposed = false
    fontsReady.then(() => {
      if (disposed) return
      items.forEach((b, i) => {
        const label = b.userData.label as THREE.Mesh<THREE.BufferGeometry, THREE.MeshStandardMaterial>
        if (label.userData.realLabel) return
        label.material.map?.dispose()
        label.material.map = labelTexture(bottles[i], estateName)
        label.material.needsUpdate = true
      })
    })

    const resize = () => {
      const { clientWidth: w, clientHeight: h } = container
      if (!w || !h) return
      renderer.setSize(w, h)
      camera.aspect = w / h
      // Pull back on narrow screens so the front bottle always fits.
      const dist = camera.aspect < 0.8 ? 7.4 : 6.4
      camera.position.set(0, 1.75, RING_RADIUS + dist)
      camera.lookAt(lookAt)
      camera.updateProjectionMatrix()
    }
    const ro = new ResizeObserver(resize)
    ro.observe(container)
    resize()

    // Drag to spin, click to pick.
    const raycaster = new THREE.Raycaster()
    const pointer = new THREE.Vector2()
    let dragging = false
    let startX = 0
    let startTarget = 0
    let moved = 0
    const el = renderer.domElement

    const onDown = (e: PointerEvent) => {
      dragging = true
      startX = e.clientX
      startTarget = target
      moved = 0
      el.setPointerCapture(e.pointerId)
      el.style.cursor = "grabbing"
    }
    const onMove = (e: PointerEvent) => {
      if (!dragging) return
      const dx = e.clientX - startX
      moved = Math.max(moved, Math.abs(dx))
      target = startTarget + dx * 0.006
      if (reduceMotion) current = target
    }
    const onUp = (e: PointerEvent) => {
      if (!dragging) return
      dragging = false
      el.style.cursor = "grab"
      if (moved > 6) {
        // Snap to the bottle closest to the front.
        let i = 0
        let best = Infinity
        for (let k = 0; k < n; k++) {
          let d = (-k * step - target) % TAU
          if (d > Math.PI) d -= TAU
          if (d < -Math.PI) d += TAU
          if (Math.abs(d) < best) {
            best = Math.abs(d)
            i = k
          }
        }
        goTo(i)
        onSelectRef.current(i)
        return
      }
      const rect = el.getBoundingClientRect()
      pointer.set(((e.clientX - rect.left) / rect.width) * 2 - 1, -((e.clientY - rect.top) / rect.height) * 2 + 1)
      raycaster.setFromCamera(pointer, camera)
      const hit = raycaster.intersectObjects(items, true)[0]
      if (hit && typeof hit.object.userData.index === "number") {
        onSelectRef.current(hit.object.userData.index)
      }
    }
    el.addEventListener("pointerdown", onDown)
    el.addEventListener("pointermove", onMove)
    el.addEventListener("pointerup", onUp)
    el.addEventListener("pointercancel", onUp)

    // Only animate while on screen.
    let visible = true
    const io = new IntersectionObserver(([entry]) => (visible = entry.isIntersecting))
    io.observe(container)

    const clock = new THREE.Clock()
    let raf = 0
    const tick = () => {
      raf = requestAnimationFrame(tick)
      if (!visible) return
      const dt = Math.min(clock.getDelta(), 0.05)
      const t = clock.elapsedTime
      current += (target - current) * Math.min(1, dt * (dragging ? 14 : 4.5))
      ring.rotation.y = current

      const front = selectedRef.current
      items.forEach((b, i) => {
        const isFront = i === front
        const lift = isFront ? 0.1 : 0
        b.position.y += (lift - b.position.y) * Math.min(1, dt * 5)
        const sway = isFront && !reduceMotion && !dragging ? Math.sin(t * 0.7) * 0.28 : 0
        const baseRot = i * step
        b.rotation.y += (baseRot + sway - b.rotation.y) * Math.min(1, dt * 3)
      })
      renderer.render(scene, camera)
    }
    tick()

    return () => {
      disposed = true
      cancelAnimationFrame(raf)
      ro.disconnect()
      io.disconnect()
      el.removeEventListener("pointerdown", onDown)
      el.removeEventListener("pointermove", onMove)
      el.removeEventListener("pointerup", onUp)
      el.removeEventListener("pointercancel", onUp)
      scene.traverse((o) => {
        if (o instanceof THREE.Mesh) {
          o.geometry.dispose()
          // The bottle mesh carries two materials (glass, capsule); the others one.
          for (const m of ([] as THREE.MeshStandardMaterial[]).concat(o.material)) {
            m.map?.dispose()
            m.dispose()
          }
        }
      })
      shadowTex.dispose()
      envTex.dispose()
      pmrem.dispose()
      renderer.dispose()
      renderer.forceContextLoss()
      container.removeChild(el)
      apiRef.current = null
    }
  }, [bottles, estateName])

  useEffect(() => {
    selectedRef.current = selected
    apiRef.current?.goTo(selected)
  }, [selected])

  return <div ref={containerRef} className="absolute inset-0" />
}
