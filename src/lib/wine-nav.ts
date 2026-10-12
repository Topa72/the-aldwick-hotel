import type { WineStyle } from "@/data/content"

/** A cuvée to show in the wines section: its colour and its position within that colour. */
export type WinePick = { style: WineStyle; index: number }

const EVENT = "vins:select"

/** Asks the wines section to switch to a cuvée (the link's own #vins anchor does the scrolling). */
export function showWine(pick: WinePick) {
  window.dispatchEvent(new CustomEvent<WinePick>(EVENT, { detail: pick }))
}

export function onShowWine(handler: (pick: WinePick) => void) {
  const listener = (e: Event) => handler((e as CustomEvent<WinePick>).detail)
  window.addEventListener(EVENT, listener)
  return () => window.removeEventListener(EVENT, listener)
}
