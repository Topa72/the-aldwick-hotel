import { useEffect, useRef } from "react"
import * as THREE from "three"
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js"

import { buildBottle, shadowMaterial, sunShadow, type BottleSpec } from "@/components/bottles-3d"
import { buildBasket } from "@/components/wicker-basket"

type Props = {
  bottles: BottleSpec[]
  estateName: string
  /** The bottle under the pointer (or focused), lifted and named by the caller; null for none. */
  hovered: number | null
  onHover: (index: number | null) => void
  onPick: (index: number) => void
  /** Standing in the page's sunlit vineyard photo rather than on a plain background. */
  outdoor?: boolean
  /** Side by side in a long wicker basket (in its sunlight when `outdoor`). */
  basket?: boolean
  /**
   * Set the bottles into a picture: a straight row seen straight on (no perspective), the canvas
   * showing exactly `width` units across, from height `top` down `height` units. Pointing lifts a bottle.
   */
  frame?: { width: number; top: number; height: number }
}

// Bottles stand 3 units tall, side by side on a shallow arc that curves away from the viewer.
const SPACING = 0.88
const CURVE = 0.12

/** The home page's line-up: every cuvée in 3D, side by side; point to lift one, click to open it. */
export default function BottleLineup({
  bottles,
  estateName,
  hovered,
  onHover,
  onPick,
  outdoor = false,
  basket = false,
  frame,
}: Props) {
  const containerRef = useRef<HTMLDivElement>(null)
  const hoveredRef = useRef(hovered)
  const onHoverRef = useRef(onHover)
  const onPickRef = useRef(onPick)
  hoveredRef.current = hovered
  onHoverRef.current = onHover
  onPickRef.current = onPick

  useEffect(() => {
    const container = containerRef.current!
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    const n = bottles.length

    // The stencil lets each sun shadow darken the ground once where its triangles overlap.
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, stencil: true })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.toneMapping = THREE.ACESFilmicToneMapping
    renderer.toneMappingExposure = 1.05
    renderer.outputColorSpace = THREE.SRGBColorSpace
    renderer.domElement.style.touchAction = "pan-y"
    renderer.domElement.setAttribute("aria-hidden", "true")
    container.appendChild(renderer.domElement)

    const scene = new THREE.Scene()
    const pmrem = new THREE.PMREMGenerator(renderer)
    const envTex = pmrem.fromScene(new RoomEnvironment(), 0.04).texture
    scene.environment = envTex
    if (outdoor) {
      // The photo's light, for what is lit in the scene (the basket): the sun high behind, to the
      // left, the sky and foliage above, the warm soil below, and a little light bounced from the front.
      // The side facing us is in the shade.
      const sun = new THREE.DirectionalLight(0xfff0d6, 2.8)
      sun.position.set(-3, 10, -6.2)
      const bounce = new THREE.DirectionalLight(0xffe2c0, 0.3)
      bounce.position.set(2, 1, 8)
      scene.add(sun, bounce, new THREE.HemisphereLight(0xdfe8cc, 0x5a4230, 0.75))
    } else {
      const key = new THREE.DirectionalLight(0xfff1dc, 1.6)
      key.position.set(3, 6, 6)
      const rim = new THREE.DirectionalLight(0xc9a55a, 1.2)
      rim.position.set(-4, 3, -3)
      scene.add(key, rim, new THREE.AmbientLight(0xffffff, 0.25))
    }

    // In a basket the bottles stand in a straight row on its floor.
    const curve = basket || frame ? 0 : CURVE
    let floor = 0
    if (basket) {
      // Deep enough to read as a basket; the bottles stand on straw high enough inside for the rim to
      // hide no more than the plain foot of their labels.
      const tray = buildBasket({
        halfLength: ((n - 1) * SPACING) / 2 + 0.47,
        halfWidth: 0.52,
        height: 0.95,
        floor: 0.68,
        bottleXs: bottles.map((_, i) => (i - (n - 1) / 2) * SPACING),
        bottleRadius: 0.42,
      })
      floor = tray.floor
      scene.add(tray.group)
      if (outdoor) for (const part of tray.casters) scene.add(sunShadow(part, 1.2))
      // Where the basket rests on the ground: darkest under it, spilling a little in front.
      const rest = new THREE.Mesh(new THREE.PlaneGeometry((n - 1) * SPACING + 1.25, 1.7), shadowMaterial("pad", 0.8))
      rest.rotation.x = -Math.PI / 2
      rest.position.set(0, 0.002, 0.12)
      scene.add(rest)
    }

    const items = bottles.map((spec, i) => {
      const b = buildBottle(spec, estateName, i, { outdoor })
      const t = i - (n - 1) / 2
      b.position.set(t * SPACING, floor, -curve * t * t)
      b.userData.baseZ = b.position.z
      // Each bottle turns slightly towards the middle, as if set out for a photograph.
      b.userData.baseRotation = frame ? 0 : -t * 0.08
      b.rotation.y = b.userData.baseRotation
      scene.add(b)
      return b
    })

    const perspective = new THREE.PerspectiveCamera(24, 1, 0.1, 80)
    const flat = frame
      ? new THREE.OrthographicCamera(-frame.width / 2, frame.width / 2, frame.top, frame.top - frame.height, 0.1, 80)
      : null
    const camera: THREE.Camera = flat ?? perspective
    const lookAt = new THREE.Vector3(0, basket ? 1.85 : 1.45, -curve * ((n - 1) / 2) ** 2 * 0.4)
    const resize = () => {
      const { clientWidth: w, clientHeight: h } = container
      if (!w || !h) return
      renderer.setSize(w, h)
      if (flat) {
        flat.position.set(0, 0, 20)
        flat.updateProjectionMatrix()
        return
      }
      const camera = perspective
      camera.aspect = w / h
      // Pull back until the whole row (and the bottles' height) fits.
      // Outdoors, room on the right for the last bottle's shadow, which would otherwise end on the edge;
      // the basket's handles stand out at both ends.
      const halfWidth = ((n - 1) * SPACING) / 2 + (outdoor ? 0.95 : 0.48) + (basket ? 0.3 : 0)
      const tanV = Math.tan(THREE.MathUtils.degToRad(camera.fov / 2))
      const dist = Math.max(halfWidth / (tanV * camera.aspect), (basket ? 2.15 : 1.75) / tanV)
      // In the vineyard photo the camera looks down on the soil (about 15°): look down on the bottles
      // the same way, so they and their shadows sit on that ground. Otherwise almost level.
      camera.position.set(0, outdoor ? lookAt.y + dist * Math.tan(THREE.MathUtils.degToRad(15)) : 1.9, dist)
      camera.lookAt(lookAt)
      camera.updateProjectionMatrix()
    }
    const ro = new ResizeObserver(resize)
    ro.observe(container)
    resize()

    // Point to lift a bottle, click (or tap) to open its cuvée.
    const raycaster = new THREE.Raycaster()
    const pointer = new THREE.Vector2()
    const el = renderer.domElement
    const pick = (e: PointerEvent) => {
      const rect = el.getBoundingClientRect()
      pointer.set(((e.clientX - rect.left) / rect.width) * 2 - 1, -((e.clientY - rect.top) / rect.height) * 2 + 1)
      raycaster.setFromCamera(pointer, camera)
      const hit = raycaster.intersectObjects(items, true).find((h) => h.object.visible)
      return hit && typeof hit.object.userData.index === "number" ? (hit.object.userData.index as number) : null
    }
    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return
      const i = pick(e)
      el.style.cursor = i === null ? "default" : "pointer"
      if (i !== hoveredRef.current) onHoverRef.current(i)
    }
    const onLeave = () => onHoverRef.current(null)
    const onUp = (e: PointerEvent) => {
      const i = pick(e)
      if (i !== null) onPickRef.current(i)
    }
    el.addEventListener("pointermove", onMove)
    el.addEventListener("pointerleave", onLeave)
    el.addEventListener("pointerup", onUp)

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
      items.forEach((b, i) => {
        // The bottle under the pointer comes forward: lifted out of the basket, or stepping forward on
        // the ground (lifted, it would float off the soil).
        const picked = i === hoveredRef.current
        const lifts = basket || !!frame
        const y = floor + (lifts && picked ? 0.4 : 0)
        const z = b.userData.baseZ + (!lifts && picked ? 0.45 : 0)
        b.position.y += (y - b.position.y) * Math.min(1, dt * 6)
        b.position.z += (z - b.position.z) * Math.min(1, dt * 6)
        // A slow, gentle turn so the labels catch the light.
        const sway = reduceMotion ? 0 : Math.sin(t * 0.45 + i * 0.9) * 0.22
        b.rotation.y = b.userData.baseRotation + sway
        b.userData.alignShadow?.()
      })
      renderer.render(scene, camera)
    }
    tick()

    return () => {
      cancelAnimationFrame(raf)
      ro.disconnect()
      io.disconnect()
      el.removeEventListener("pointermove", onMove)
      el.removeEventListener("pointerleave", onLeave)
      el.removeEventListener("pointerup", onUp)
      scene.traverse((o) => {
        if (o instanceof THREE.Mesh) {
          o.geometry.dispose()
          for (const m of ([] as THREE.MeshStandardMaterial[]).concat(o.material)) {
            m.map?.dispose()
            m.dispose()
          }
        }
      })
      envTex.dispose()
      pmrem.dispose()
      renderer.dispose()
      renderer.forceContextLoss()
      container.removeChild(el)
    }
  }, [bottles, estateName, outdoor, basket, frame])

  return <div ref={containerRef} className="absolute inset-0" />
}
