import type { WineStyle } from "@/data/content"

/** The colour of each style of wine in the glass, as a small drop (tabs, menus). */
export const winePigment: Record<WineStyle, string> = {
  rouge: "radial-gradient(circle at 35% 30%, #a3344a, #4a0d18 70%)",
  blanc: "radial-gradient(circle at 35% 30%, #f3e39a, #b99a2e 70%)",
  rose: "radial-gradient(circle at 35% 30%, #f6b7a2, #d4685a 70%)",
}
