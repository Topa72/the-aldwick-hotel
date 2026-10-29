import { useEffect, useRef } from "react"
import * as THREE from "three"
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js"

import { buildBottle, type BottleSpec } from "@/components/bottles-3d"

type Props = {
  bottles: BottleSpec[]
  estateName: string
  /** The bottle under the pointer (or focused), lifted and named by the caller; null for none. */
  hovered: number | null
  onHover: (index: number | null) => void
  onPick: (index: number) => void
  /** Standing in the page's sunlit vineyard photo rather than on a plain background. */
  outdoor?: boolean
}

// Bottles stand 3 units tall, side by side on a shallow arc that curves away from the viewer.
const SPACING = 0.88
const CURVE = 0.12

/** The home page's line-up: every cuvée in 3D, side by side; point to lift one, click to open it. */
export default function BottleLineup({ bottles, estateName, hovered, onHover, onPick, outdoor = false }: Props) {
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
    const key = new THREE.DirectionalLight(0xfff1dc, 1.6)
    key.position.set(3, 6, 6)
    const rim = new THREE.DirectionalLight(0xc9a55a, 1.2)
    rim.position.set(-4, 3, -3)
    scene.add(key, rim, new THREE.AmbientLight(0xffffff, 0.25))

    const items = bottles.map((spec, i) => {
      const b = buildBottle(spec, estateName, i, { outdoor })
      const t = i - (n - 1) / 2
      b.position.set(t * SPACING, 0, -CURVE * t * t)
      b.userData.baseZ = b.position.z
      // Each bottle turns slightly towards the middle, as if set out for a photograph.
      b.userData.baseRotation = -t * 0.08
      b.rotation.y = b.userData.baseRotation
      scene.add(b)
      return b
    })

    const camera = new THREE.PerspectiveCamera(24, 1, 0.1, 80)
    const lookAt = new THREE.Vector3(0, 1.45, -CURVE * ((n - 1) / 2) ** 2 * 0.4)
    const resize = () => {
      const { clientWidth: w, clientHeight: h } = container
      if (!w || !h) return
      renderer.setSize(w, h)
      camera.aspect = w / h
      // Pull back until the whole row (and the bottles' height) fits.
      // Outdoors, room on the right for the last bottle's shadow, which would otherwise end on the edge.
      const halfWidth = ((n - 1) * SPACING) / 2 + (outdoor ? 0.95 : 0.48)
      const tanV = Math.tan(THREE.MathUtils.degToRad(camera.fov / 2))
      const dist = Math.max(halfWidth / (tanV * camera.aspect), 1.75 / tanV)
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
        // The bottle under the pointer steps forward, staying on the ground (it would float off the soil).
        const step = i === hoveredRef.current ? 0.45 : 0
        const z = b.userData.baseZ + step
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
  }, [bottles, estateName, outdoor])

  return <div ref={containerRef} className="absolute inset-0" />
}
