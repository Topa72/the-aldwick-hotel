/**
 * Whether this device looks modest (few processor cores or little memory, as many office or older
 * laptops): the 3D scenes then draw fewer pixels, without antialiasing, and stop idle animations.
 */
export const lowPower = (() => {
  if (typeof navigator === "undefined") return false
  const cores = navigator.hardwareConcurrency || 4
  const memory = (navigator as Navigator & { deviceMemory?: number }).deviceMemory ?? 8
  return cores <= 4 || memory <= 4
})()

/** Pixels drawn per CSS pixel: never beyond 1.5 (sharp enough, and far cheaper than 2), 1 on modest devices. */
export const pixelRatio = () => Math.min(window.devicePixelRatio || 1, lowPower ? 1 : 1.5)

/** How often a still scene is redrawn anyway, to pick up textures that finish loading, in milliseconds. */
export const IDLE_REDRAW_MS = 400
