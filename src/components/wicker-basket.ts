import * as THREE from "three"

/**
 * A long wicker basket for the home page's bottles: oval (straight sides, round ends), woven of
 * willow, with a braided rim, a looped handle at each end and a bed of straw the bottles stand in.
 * Everything is drawn from code: the weave is a generated texture (colour and relief), so the basket
 * takes the scene's sunlight.
 */

/** A point on the oval outline, `d` along its length (0 at the front left), with its outward normal. */
function outline(halfLength: number, halfWidth: number) {
  const a = halfLength - halfWidth
  const arc = Math.PI * halfWidth
  const length = 4 * a + 2 * arc
  const at = (distance: number) => {
    let d = ((distance % length) + length) % length
    // Front side, left to right (it faces the camera, +z).
    if (d < 2 * a) return { x: -a + d, z: halfWidth, nx: 0, nz: 1 }
    d -= 2 * a
    // Right end.
    if (d < arc) {
      const t = Math.PI / 2 - d / halfWidth
      return { x: a + Math.cos(t) * halfWidth, z: Math.sin(t) * halfWidth, nx: Math.cos(t), nz: Math.sin(t) }
    }
    d -= arc
    // Back side, right to left.
    if (d < 2 * a) return { x: a - d, z: -halfWidth, nx: 0, nz: -1 }
    d -= 2 * a
    // Left end.
    const t = -Math.PI / 2 - d / halfWidth
    return { x: -a + Math.cos(t) * halfWidth, z: Math.sin(t) * halfWidth, nx: Math.cos(t), nz: Math.sin(t) }
  }
  return { at, length }
}

// The weave texture: 16 stakes across and 8 rows of weavers down, about 1.2 cm and 6 mm each on a
// bottle 30 cm tall (3 units).
const TILE_WIDTH = 1.92
const TILE_HEIGHT = 0.48

/** Pseudo-random value in [0, 1) for an integer pair. */
function hash(a: number, b: number) {
  const s = Math.sin(a * 127.1 + b * 311.7) * 43758.5453
  return s - Math.floor(s)
}

/**
 * Colour and normal maps of a plain weave: round weavers passing over one stake and under the next,
 * row after row offset by one, each strand a slightly different shade of willow.
 */
function weaveTextures() {
  const w = 512
  const h = 256
  const stakes = 16
  const rows = 8
  const height = new Float32Array(w * h)
  const colour = new Uint8Array(w * h * 4)
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const u = x / w
      // Weavers are not ruled lines: each row wanders a little up and down along its length.
      const wobble = 0.12 * Math.sin(Math.PI * 2 * (u * 2 + hash(Math.floor((y / h) * rows), 9)))
      const rowF = (y / h) * rows + wobble
      const row = ((Math.floor(rowF) % rows) + rows) % rows
      const across = rowF - Math.floor(rowF)
      // A weaver is round: highest along its middle, dark in the gap between two rows.
      const round = Math.sin(Math.PI * across)
      const s = u * stakes
      // Over one stake, under the next: the weaver swells between stakes, alternating row by row, and
      // dips where it passes behind a stake, which shows there as a dark notch.
      const phase = s + (row % 2)
      const swell = 0.5 + 0.5 * Math.cos(Math.PI * phase)
      const notch = Math.exp(-(((phase % 2) - 1) ** 2) / 0.02)
      const relief = round * (0.7 + 0.3 * swell) * (1 - 0.35 * notch)
      height[y * w + x] = relief
      // Willow: warm tan, each weaver's shade drifting smoothly along it (seamless across the wrap),
      // plus fine fibres running lengthwise.
      const drift =
        0.5 + 0.5 * Math.sin(Math.PI * 2 * (u * 3 + hash(row, 3))) * Math.sin(Math.PI * 2 * (u + hash(row, 4)))
      const fibre = hash(Math.floor(y * 1.7), Math.floor(x / 6)) - 0.5
      const shade = 0.78 + 0.22 * hash(row, 1) + 0.16 * drift + 0.08 * fibre
      const light = (0.3 + 0.7 * Math.pow(relief, 0.6)) * shade
      const i = (y * w + x) * 4
      colour[i] = Math.min(255, 186 * light)
      colour[i + 1] = Math.min(255, 140 * light)
      colour[i + 2] = Math.min(255, 86 * light)
      colour[i + 3] = 255
    }
  }
  return { map: colourTexture(colour, w, h), normalMap: normalTexture(height, w, h, 3.2) }
}

/** A braided rim: strands twisting along it, seen as diagonal ridges. */
function braidTextures() {
  const w = 256
  const h = 64
  const height = new Float32Array(w * h)
  const colour = new Uint8Array(w * h * 4)
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const t = (x / w) * 8 + (y / h) * 2
      const strand = Math.floor(t)
      const relief = Math.sin(Math.PI * (t - strand))
      height[y * w + x] = relief
      const shade = (0.4 + 0.6 * relief) * (0.88 + 0.2 * hash(strand, 7))
      const i = (y * w + x) * 4
      colour[i] = Math.min(255, 176 * shade)
      colour[i + 1] = Math.min(255, 130 * shade)
      colour[i + 2] = Math.min(255, 78 * shade)
      colour[i + 3] = 255
    }
  }
  return { map: colourTexture(colour, w, h), normalMap: normalTexture(height, w, h, 2.5) }
}

/** Loose straw: thin golden stalks lying every which way over darker ones. */
function strawTexture() {
  const size = 256
  const data = new Uint8Array(size * size * 4)
  for (let i = 0; i < size * size; i++) data.set([92, 70, 38, 255], i * 4)
  for (let s = 0; s < 900; s++) {
    const x0 = hash(s, 1) * size
    const y0 = hash(s, 2) * size
    const angle = hash(s, 3) * Math.PI
    const length = 20 + hash(s, 4) * 60
    const light = 0.55 + 0.45 * (s / 900) * hash(s, 5)
    for (let t = 0; t < length; t++) {
      const x = Math.floor(x0 + Math.cos(angle) * t + size) % size
      const y = Math.floor(y0 + Math.sin(angle) * t + size) % size
      data.set([230 * light, 190 * light, 110 * light, 255], (y * size + x) * 4)
    }
  }
  return colourTexture(data, size, size)
}

function colourTexture(data: Uint8Array<ArrayBuffer>, w: number, h: number) {
  const tex = new THREE.DataTexture(data, w, h)
  tex.colorSpace = THREE.SRGBColorSpace
  return repeating(tex)
}

/** A tangent-space normal map from a height field (`strength` steepens the slopes). */
function normalTexture(height: Float32Array, w: number, h: number, strength: number) {
  const data = new Uint8Array(w * h * 4)
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const hx = height[y * w + ((x + 1) % w)] - height[y * w + ((x - 1 + w) % w)]
      const hy = height[((y + 1) % h) * w + x] - height[((y - 1 + h) % h) * w + x]
      const n = new THREE.Vector3(-hx * strength, -hy * strength, 1).normalize()
      const i = (y * w + x) * 4
      data[i] = (n.x * 0.5 + 0.5) * 255
      data[i + 1] = (n.y * 0.5 + 0.5) * 255
      data[i + 2] = (n.z * 0.5 + 0.5) * 255
      data[i + 3] = 255
    }
  }
  return repeating(new THREE.DataTexture(data, w, h))
}

function repeating(tex: THREE.DataTexture) {
  tex.wrapS = tex.wrapT = THREE.RepeatWrapping
  tex.magFilter = THREE.LinearFilter
  tex.minFilter = THREE.LinearMipmapLinearFilter
  tex.generateMipmaps = true
  tex.anisotropy = 8
  tex.needsUpdate = true
  return tex
}

/**
 * A band of wall along the outline, from `bottom` to `top`, `offset` outward of the outline (negative:
 * inward), flaring out by `flare` at the top. Faces outward, or inward with `inside`.
 */
function wall(
  shape: ReturnType<typeof outline>,
  { bottom, top, offset, flare, inside }: { bottom: number; top: number; offset: number; flare: number; inside: boolean },
) {
  const segments = 320
  const positions: number[] = []
  const normals: number[] = []
  const uvs: number[] = []
  const colors: number[] = []
  const index: number[] = []
  // Light reaching the wall: little at the foot where it meets the ground, a little less under the rim.
  const occlusion = (y: number) =>
    inside ? 0.55 + 0.45 * ((y - bottom) / (top - bottom)) : Math.min(0.5 + 0.5 * Math.min(1, y / 0.22), 1 - 0.12 * Math.max(0, (y - (top - 0.1)) / 0.1))
  // Rows of vertices up the wall, so the shading above can vary with height.
  const levels = 12
  for (let i = 0; i <= segments; i++) {
    const d = (i / segments) * shape.length
    const p = shape.at(d)
    for (let k = 0; k <= levels; k++) {
      const f = k / levels
      const y = bottom + (top - bottom) * f
      const out = offset + flare * f
      const o = occlusion(y)
      colors.push(o, o, o)
      positions.push(p.x + p.nx * out, y, p.z + p.nz * out)
      // Tilted with the flare, pointing in for the inner wall.
      const n = new THREE.Vector3(p.nx, -flare / (top - bottom), p.nz).normalize().multiplyScalar(inside ? -1 : 1)
      normals.push(n.x, n.y, n.z)
      uvs.push(d / TILE_WIDTH, y / TILE_HEIGHT)
    }
  }
  const stride = levels + 1
  for (let i = 0; i < segments; i++) {
    for (let k = 0; k < levels; k++) {
      const a = i * stride + k
      const b = a + stride
      if (inside) index.push(a, a + 1, b, a + 1, b + 1, b)
      else index.push(a, b, a + 1, a + 1, b, b + 1)
    }
  }
  const g = new THREE.BufferGeometry()
  g.setAttribute("color", new THREE.Float32BufferAttribute(colors, 3))
  g.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3))
  g.setAttribute("normal", new THREE.Float32BufferAttribute(normals, 3))
  g.setAttribute("uv", new THREE.Float32BufferAttribute(uvs, 2))
  g.setIndex(index)
  return g
}

export type Basket = {
  group: THREE.Group
  /** Height of the tray's floor, where the bottles stand. */
  floor: number
  /** The parts that cast a shadow on the ground (walls, rim, handles). */
  casters: THREE.BufferGeometry[]
}

/**
 * The basket, standing on y = 0, centred on the origin, `halfLength` along x and `halfWidth` along z,
 * its rim `height` above the ground and its bed of straw at `floor`, where the bottles stand.
 */
export function buildBasket({
  halfLength,
  halfWidth,
  height,
  floor,
}: {
  halfLength: number
  halfWidth: number
  height: number
  floor: number
}): Basket {
  const group = new THREE.Group()
  const shape = outline(halfLength, halfWidth)
  const weave = weaveTextures()
  const braid = braidTextures()
  const willow = new THREE.MeshStandardMaterial({
    map: weave.map,
    normalMap: weave.normalMap,
    normalScale: new THREE.Vector2(1.2, 1.2),
    roughness: 0.82,
    metalness: 0,
    envMapIntensity: 0.35,
    side: THREE.DoubleSide,
    vertexColors: true,
  })
  // Inside the basket the weave is in its own shade.
  const willowInside = willow.clone()
  willowInside.color = new THREE.Color(0.62, 0.58, 0.54)
  const braided = new THREE.MeshStandardMaterial({
    map: braid.map,
    normalMap: braid.normalMap,
    roughness: 0.78,
    metalness: 0,
    envMapIntensity: 0.35,
    side: THREE.DoubleSide,
  })

  const thickness = 0.035
  const outer = wall(shape, { bottom: 0, top: height, offset: 0, flare: 0.05, inside: false })
  const inner = wall(shape, { bottom: floor, top: height, offset: -thickness, flare: 0.05, inside: true })
  group.add(new THREE.Mesh(outer, willow), new THREE.Mesh(inner, willowInside))

  // The bed of straw, seen between the bottles.
  const base = new THREE.Shape()
  for (let i = 0; i <= 160; i++) {
    const p = shape.at((i / 160) * shape.length)
    const x = p.x - p.nx * thickness
    const z = p.z - p.nz * thickness
    if (i === 0) base.moveTo(x, -z)
    else base.lineTo(x, -z)
  }
  const floorGeometry = new THREE.ShapeGeometry(base, 1)
  floorGeometry.rotateX(-Math.PI / 2)
  floorGeometry.translate(0, floor, 0)
  const floorUv = floorGeometry.getAttribute("uv")
  for (let i = 0; i < floorUv.count; i++) floorUv.setXY(i, floorUv.getX(i) / 0.8, floorUv.getY(i) / 0.8)
  group.add(
    new THREE.Mesh(floorGeometry, new THREE.MeshStandardMaterial({ map: strawTexture(), roughness: 1, envMapIntensity: 0.3 })),
  )

  // The braided rim, a rope laid along the top of the wall.
  const rimPoints: THREE.Vector3[] = []
  for (let i = 0; i < 200; i++) {
    const p = shape.at((i / 200) * shape.length)
    const out = 0.05 - thickness / 2
    rimPoints.push(new THREE.Vector3(p.x + p.nx * out, height, p.z + p.nz * out))
  }
  const rim = new THREE.TubeGeometry(new THREE.CatmullRomCurve3(rimPoints, true), 400, 0.065, 12, true)
  const rimUv = rim.getAttribute("uv")
  for (let i = 0; i < rimUv.count; i++) rimUv.setX(i, rimUv.getX(i) * (shape.length / 0.6))
  group.add(new THREE.Mesh(rim, braided))

  // A looped handle standing out from each end, just under the rim.
  const handles: THREE.BufferGeometry[] = []
  for (const side of [-1, 1]) {
    const handle = new THREE.TorusGeometry(0.2, 0.045, 10, 40, Math.PI)
    // The half loop points away from the basket: to the right at the right end, to the left at the left.
    handle.rotateZ(side > 0 ? -Math.PI / 2 : Math.PI / 2)
    handle.translate(side * (halfLength + 0.02), height - 0.17, 0)
    const uv = handle.getAttribute("uv")
    for (let i = 0; i < uv.count; i++) uv.setX(i, uv.getX(i) * 4)
    handles.push(handle)
    group.add(new THREE.Mesh(handle, braided))
  }

  group.traverse((o) => {
    if (o instanceof THREE.Mesh) o.renderOrder = 0
  })
  return { group, floor, casters: [outer, rim, ...handles] }
}
