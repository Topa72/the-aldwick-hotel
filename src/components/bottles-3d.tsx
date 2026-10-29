import { useEffect, useRef } from "react"
import * as THREE from "three"
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js"

import { BOTTLE_CAPSULE_Y, BOTTLE_PROFILE } from "@/components/bottle-profile"
import bottleShapes from "@/data/bottle-shapes.json"
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

const palette: Record<
  WineStyle,
  { glass: number; glassOpacity: number; wine: number; capsule: number; label: string }
> = {
  blanc: { glass: 0x86a066, glassOpacity: 0.5, wine: 0xa88d36, capsule: 0xc9a55a, label: "Blanc" },
  rose: { glass: 0xf0ece4, glassOpacity: 0.26, wine: 0xd4766e, capsule: 0xd9c9a8, label: "Rosé" },
  rouge: { glass: 0x2c4228, glassOpacity: 0.72, wine: 0x4a0d18, capsule: 0x5a1a26, label: "Rouge" },
}

// The bottle stands 3 units tall (see BOTTLE_PROFILE).
const BODY_RADIUS = Math.max(...BOTTLE_PROFILE.map(([r]) => r))
const CAPSULE_Y = BOTTLE_CAPSULE_Y
// Label sizes were measured on the studio photos, on a bottle 3 units tall with a 0.4 radius.
const PHOTO_RADIUS = 0.4
// As on the photos, the wine comes right up under the capsule.
const FILL_HEIGHT = CAPSULE_Y - 0.01

const shapes: Record<string, { bodyRadius: number; profile: number[][] }> = bottleShapes

/**
 * The widest the bottle gets between two heights (its own outline when it has one), so a label laid
 * there never sinks into glass that flares slightly towards the base.
 */
function radiusOver(outline: string | undefined, from: number, to: number) {
  const profile = outline && shapes[outline] ? shapes[outline].profile : BOTTLE_PROFILE
  const radii = profile.filter(([, y]) => y >= from && y <= to).map(([r]) => r)
  return radii.length ? Math.max(...radii) : BODY_RADIUS
}

const bottleGeometries = new Map<string, THREE.BufferGeometry>()

/**
 * The bottle turned from a photo's outline (the cuvée's own, else the default one), standing on
 * y = 0. Its triangles are split in two groups: glass (material 0), then the capsule (material 1).
 */
function modelGeometry(outline?: string) {
  const key = outline && shapes[outline] ? outline : ""
  const cached = bottleGeometries.get(key)
  if (cached) return cached
  const profile = key ? shapes[key].profile : BOTTLE_PROFILE
  const g = new THREE.LatheGeometry(
    profile.map(([r, y]) => new THREE.Vector2(r, y)),
    96,
  )

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
  bottleGeometries.set(key, g)
  return g
}

/**
 * Darkens the glass towards `edge` where it turns away from the viewer, as thick glass does on the
 * photos: bright wine in the middle of the bottle, deeper tint along its sides.
 */
function withEdgeTint(material: THREE.MeshPhysicalMaterial, edge: number) {
  const tint = new THREE.Color(edge)
  material.onBeforeCompile = (shader) => {
    shader.uniforms.edgeTint = { value: tint }
    shader.fragmentShader = shader.fragmentShader
      .replace("#include <common>", "#include <common>\nuniform vec3 edgeTint;")
      .replace(
        "#include <color_fragment>",
        `#include <color_fragment>
        float facing = abs(dot(normalize(vNormal), normalize(vViewPosition)));
        diffuseColor.rgb *= mix(edgeTint, vec3(1.0), smoothstep(0.0, 0.45, facing));`,
      )
  }
}

/**
 * Fades a copy of the bottle seen upside down under it, like a reflection on a polished table: strongest
 * at the foot, gone a third of the way up. `y` is the height on the bottle, 3 units tall.
 */
const REFLECTION_FADE = "0.2 * (1.0 - smoothstep(0.0, 1.1, vFadeY))"

/**
 * Paints the bottle with its studio photo, unrolled (public/skins). Each point takes the colour the
 * photo shows at the same place seen from the front, so the glass keeps its real tint, highlights and
 * shading from every side while the bottle turns. The photo's own light is kept: no scene lighting.
 * With `reflection`, it paints the faded copy under the bottle (see REFLECTION_FADE) instead.
 */
function skinMaterial(src: string, onLoad: (tex: THREE.Texture) => void, onError: () => void) {
  const material = shadedSkin(false)
  new THREE.TextureLoader().load(
    src,
    (tex) => {
      tex.colorSpace = THREE.SRGBColorSpace
      tex.anisotropy = 8
      material.map = tex
      material.needsUpdate = true
      onLoad(tex)
    },
    undefined,
    onError,
  )
  return material
}

function shadedSkin(reflection: boolean) {
  const material = new THREE.MeshBasicMaterial({ toneMapped: false, transparent: reflection, depthWrite: !reflection })
  material.onBeforeCompile = (shader) => {
    shader.vertexShader = shader.vertexShader
      .replace("#include <common>", "#include <common>\nvarying vec2 vSkinUv;\nvarying float vFadeY;")
      .replace(
        "#include <begin_vertex>",
        `#include <begin_vertex>
      // Where this point sits across the bottle as seen from the camera: -1 left edge, 1 right edge.
      vec3 radial = normalize(vec3(position.x, 0.0, position.z) + vec3(1e-5, 0.0, 0.0));
      float across = normalize((modelViewMatrix * vec4(radial, 0.0)).xyz).x;
      // The bottle is 3 units tall (BOTTLE_PROFILE).
      vSkinUv = vec2(0.5 + 0.5 * across, position.y / 3.0);
      vFadeY = position.y;`,
      )
    shader.fragmentShader = shader.fragmentShader
      .replace("#include <common>", "#include <common>\nvarying vec2 vSkinUv;\nvarying float vFadeY;")
      .replace(
        "#include <map_fragment>",
        `diffuseColor *= texture2D(map, vSkinUv);
        // Glass seen edge-on, and the heel it stands on, read darker; this also hides any trace of the
        // photo's white backdrop along the outline.
        float rim = smoothstep(1.0, 0.86, abs(vSkinUv.x * 2.0 - 1.0));
        float heel = smoothstep(0.0, 0.025, vSkinUv.y);
        diffuseColor.rgb *= mix(0.4, 1.0, rim) * mix(0.15, 1.0, heel);
        ${reflection ? `diffuseColor.a *= ${REFLECTION_FADE};` : ""}`,
      )
  }
  // Both variants share the same onBeforeCompile source: tell three.js they are different programs.
  material.customProgramCacheKey = () => `skin-${reflection}`
  return material
}

/**
 * The label, lit as paper wrapped round glass rather than printed flat: it darkens where it turns away,
 * takes a soft studio light from the upper left, has a faint paper grain, and its gold (hot-foil
 * stamping, picked out by colour) catches a glint as the bottle turns. Unlit otherwise, like the skin,
 * so a label photographed with its bottle keeps the photo's brightness.
 */
function labelMaterial(options: { cutout: boolean; reflection?: boolean; labelY: number }) {
  const material = new THREE.MeshBasicMaterial({
    toneMapped: false,
    transparent: options.cutout || !!options.reflection,
    alphaTest: options.cutout ? 0.5 : 0,
    depthWrite: !options.reflection,
  })
  material.onBeforeCompile = (shader) => {
    shader.uniforms.labelY = { value: options.labelY }
    shader.vertexShader = shader.vertexShader
      .replace(
        "#include <common>",
        "#include <common>\nuniform float labelY;\nvarying vec3 vViewN;\nvarying vec3 vViewDir;\nvarying float vFadeY;",
      )
      .replace(
        "#include <begin_vertex>",
        `#include <begin_vertex>
        vViewN = normalize(normalMatrix * normal);
        vViewDir = normalize(-(modelViewMatrix * vec4(position, 1.0)).xyz);
        vFadeY = position.y + labelY;`,
      )
    shader.fragmentShader = shader.fragmentShader
      .replace("#include <common>", "#include <common>\nvarying vec3 vViewN;\nvarying vec3 vViewDir;\nvarying float vFadeY;")
      .replace(
        "#include <map_fragment>",
        `#include <map_fragment>
        vec3 n = normalize(vViewN);
        vec3 v = normalize(vViewDir);
        // Paper curving away from the eye falls into shade, as on the glass beside it.
        float facing = clamp(dot(n, v), 0.0, 1.0);
        float shade = mix(0.45, 1.0, smoothstep(0.0, 0.75, facing));
        // A broad softbox up and to the left of the camera.
        vec3 l = normalize(vec3(-0.55, 0.3, 0.8));
        shade *= 0.82 + 0.22 * max(dot(n, l), 0.0);
        // Paper grain, too fine to see but enough to break the flat print.
        #ifdef USE_MAP
          vec2 cell = floor(vMapUv * vec2(1400.0, 1100.0));
          float grain = fract(sin(dot(cell, vec2(12.9898, 78.233))) * 43758.5453);
          shade *= 0.985 + 0.03 * grain;
        #endif
        vec3 base = diffuseColor.rgb;
        diffuseColor.rgb *= shade;
        // Gold foil: warm, saturated, brighter in red than in blue and green above blue.
        float gold = smoothstep(0.12, 0.28, base.r - base.b) * smoothstep(0.05, 0.14, base.g - base.b)
          * smoothstep(0.22, 0.45, base.r);
        // The softbox seen in the label: a vertical band (the label is a cylinder), sharp on foil.
        vec3 h = normalize(l + v);
        vec2 nh = normalize(vec2(n.x, n.z));
        float band = max(dot(nh, normalize(vec2(h.x, h.z))), 0.0);
        diffuseColor.rgb += gold * (pow(band, 90.0) * 0.9 + pow(band, 12.0) * 0.15) * vec3(1.0, 0.86, 0.55);
        diffuseColor.rgb += pow(band, 30.0) * 0.05;
        ${options.reflection ? `diffuseColor.a *= ${REFLECTION_FADE};` : ""}`,
      )
  }
  material.customProgramCacheKey = () => `label-${!!options.reflection}`
  return material
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

function fitText(
  ctx: CanvasRenderingContext2D,
  text: string,
  font: (size: number) => string,
  start: number,
  maxWidth: number,
) {
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

export function shadowTexture() {
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

/**
 * One bottle, standing on y = 0. With `reflection`, a faded copy of it hangs upside down underneath
 * (`userData.mirror`), as on a polished table.
 */
export function buildBottle(
  spec: BottleSpec,
  estateName: string,
  index: number,
  shadowTex: THREE.Texture,
  { reflection = false }: { reflection?: boolean } = {},
) {
  const look = spec.look
  const p = { ...palette[spec.style], ...look?.colors }
  const bottle = new THREE.Group()

  // Real bottles here carry a matte dark capsule; drawn ones a metallic foil.
  const capsuleMat = new THREE.MeshStandardMaterial({
    color: p.capsule,
    metalness: look?.colors?.capsule !== undefined ? 0.3 : 0.85,
    roughness: look?.colors?.capsule !== undefined ? 0.5 : 0.32,
  })
  const glassMat = new THREE.MeshPhysicalMaterial({
    vertexColors: true,
    roughness: 0.08,
    metalness: 0,
    clearcoat: 0.4,
    specularIntensity: 0.5,
    clearcoatRoughness: 0.05,
    transparent: true,
    envMapIntensity: 0.55,
  })
  if (look?.colors?.edge !== undefined) withEdgeTint(glassMat, look.colors.edge)
  const tinted = (): [THREE.BufferGeometry, THREE.Material[]] => [
    tintedBottle(p.wine, p.glass, p.glassOpacity),
    [glassMat, capsuleMat],
  ]
  let glass: THREE.Mesh
  const mirror = new THREE.Group()
  mirror.scale.y = -1
  mirror.visible = false
  if (look?.skin) {
    // The photographed bottle once its skin has loaded; the tinted one if it fails.
    const mirrorSkin = shadedSkin(true)
    const skin = skinMaterial(
      look.skin,
      (tex) => {
        glass.visible = true
        mirrorSkin.map = tex
        mirrorSkin.needsUpdate = true
        mirror.visible = reflection
      },
      () => {
        ;[glass.geometry, glass.material] = tinted()
        glass.visible = true
      },
    )
    glass = new THREE.Mesh(modelGeometry(look.outline), skin)
    glass.visible = false
    mirror.add(new THREE.Mesh(modelGeometry(look.outline), mirrorSkin))
  } else {
    glass = new THREE.Mesh(...tinted())
  }
  glass.renderOrder = 1

  const real = look?.label
  const arc = real?.arc ?? 2.2
  // A photographed label keeps its measured height and angular width; a drawn one scales with the bottle.
  const labelHeight = real?.height ?? 0.8 * (BODY_RADIUS / PHOTO_RADIUS)
  const labelY = real?.y ?? 0.7
  const labelRadius = radiusOver(look?.outline, labelY - labelHeight / 2, labelY + labelHeight / 2) + 0.006
  const labelGeometry = new THREE.CylinderGeometry(labelRadius, labelRadius, labelHeight, 64, 1, true, -arc / 2, arc)
  const cutout = real?.shape === "diamond"
  const label = new THREE.Mesh(labelGeometry, labelMaterial({ cutout, labelY }))
  label.position.y = labelY
  label.renderOrder = 3
  const mirrorLabel = new THREE.Mesh(labelGeometry, labelMaterial({ cutout, labelY, reflection: true }))
  mirrorLabel.position.y = labelY
  mirror.add(mirrorLabel)
  const setLabel = (tex: THREE.Texture, cut: boolean) => {
    for (const m of [label.material, mirrorLabel.material]) {
      m.map = tex
      m.alphaTest = cut ? 0.5 : 0
      m.needsUpdate = true
    }
    label.visible = true
  }
  if (real) {
    // Show the photographed label once it has loaded; fall back to a drawn one.
    label.userData.realLabel = true
    label.visible = false
    new THREE.TextureLoader().load(
      real.src,
      (tex) => {
        tex.colorSpace = THREE.SRGBColorSpace
        tex.anisotropy = 8
        setLabel(tex, cutout)
      },
      undefined,
      () => setLabel(labelTexture(spec, estateName), false),
    )
  } else {
    setLabel(labelTexture(spec, estateName), false)
  }

  const shadow = new THREE.Mesh(
    new THREE.PlaneGeometry(1.1, 1.1),
    new THREE.MeshBasicMaterial({ map: shadowTex, transparent: true, depthWrite: false }),
  )
  shadow.rotation.x = -Math.PI / 2
  shadow.position.y = 0.001
  // A tighter, darker shadow right under the foot, where the bottle meets the table.
  const contact = new THREE.Mesh(
    new THREE.PlaneGeometry(0.62, 0.62),
    new THREE.MeshBasicMaterial({ map: shadowTex, transparent: true, depthWrite: false, opacity: 0.9 }),
  )
  contact.rotation.x = -Math.PI / 2
  contact.position.y = 0.002

  bottle.add(mirror, shadow, contact, glass, label)
  bottle.userData.label = label
  bottle.userData.setLabel = setLabel
  bottle.userData.mirror = mirror
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
    // Aimed low enough to leave room for the reflection under the front bottle.
    const lookAt = new THREE.Vector3(0, 1.34, 1.1)

    const ring = new THREE.Group()
    scene.add(ring)
    const shadowTex = shadowTexture()
    const items = bottles.map((spec, i) => {
      const b = buildBottle(spec, estateName, i, shadowTex, { reflection: true })
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
        const label = b.userData.label as THREE.Mesh<THREE.BufferGeometry, THREE.MeshBasicMaterial>
        if (label.userData.realLabel) return
        label.material.map?.dispose()
        b.userData.setLabel(labelTexture(bottles[i], estateName), false)
      })
    })

    const resize = () => {
      const { clientWidth: w, clientHeight: h } = container
      if (!w || !h) return
      renderer.setSize(w, h)
      camera.aspect = w / h
      // Pull back on narrow screens so the front bottle always fits.
      const dist = camera.aspect < 0.8 ? 7.9 : 6.9
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
        // The reflection stays on the table while the bottle lifts.
        b.userData.mirror.position.y = -2 * b.position.y
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
