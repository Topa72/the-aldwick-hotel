import { useId } from "react"

import type { Medal as MedalAward } from "@/data/content"
import { medalFigure } from "@/data/medal-figure"
import { cn } from "@/lib/utils"

// Gold and silver as printed on the sticker: a metallic gradient for the brush stroke and the word.
const metal = {
  Or: ["#8a6420", "#e9c76a", "#b48a33", "#f3dc94", "#9a7428"],
  Argent: ["#6f7378", "#d9dce0", "#9a9fa5", "#eef0f2", "#7d8288"],
} as const

/**
 * The Concours des Vignerons Indépendants medal as it is stuck on the bottle: a white disc with the
 * contest's name round the top, its vigneron and his grapes, a gold or silver brush stroke with the
 * medal's name, and the contest's year round the bottom.
 */
export function Medal({ award, className }: { award: MedalAward; className?: string }) {
  const id = useId().replace(/:/g, "")
  const colours = metal[award.medal]
  const s = 104 / medalFigure.width
  return (
    <svg
      viewBox="0 0 200 200"
      role="img"
      aria-label={`Médaille ${award.medal === "Or" ? "d'or" : "d'argent"}, Concours des Vignerons Indépendants ${award.contest}, millésime ${award.vintage}`}
      className={cn("drop-shadow-[0_2px_6px_rgba(0,0,0,0.45)]", className)}
    >
      <defs>
        <linearGradient id={`${id}-m`} x1="0" y1="0" x2="1" y2="0.3">
          {colours.map((c, i) => (
            <stop key={i} offset={i / (colours.length - 1)} stopColor={c} />
          ))}
        </linearGradient>
        <radialGradient id={`${id}-p`} cx="40%" cy="35%" r="75%">
          <stop offset="0" stopColor="#ffffff" />
          <stop offset="1" stopColor="#ece9e2" />
        </radialGradient>
        <path id={`${id}-top`} d="M 30 112 A 72 72 0 1 1 170 112" />
        <path id={`${id}-bottom`} d="M 17 100 A 83 83 0 0 0 183 100" />
      </defs>
      <circle cx="100" cy="100" r="98" fill={`url(#${id}-m)`} />
      <circle cx="100" cy="100" r="95" fill={`url(#${id}-p)`} />
      <text fill="#1b1b1b" fontSize="15" letterSpacing="0.4" fontFamily="Inter, Helvetica, Arial, sans-serif">
        <textPath href={`#${id}-top`} startOffset="50%" textAnchor="middle">
          VIGNERONS INDEPENDANTS
        </textPath>
      </text>
      <image
        href={medalFigure.src}
        x={100 - (medalFigure.width * s) / 2}
        y={30}
        width={medalFigure.width * s}
        height={medalFigure.height * s}
      />
      {/* The brush stroke, thicker in the middle and frayed at its ends. */}
      <path
        d="M 46 120 C 72 114, 128 112, 156 113 C 148 117, 120 122, 92 124 C 74 125, 58 125, 46 120 Z"
        fill={`url(#${id}-m)`}
      />
      <text
        x="100"
        y="145"
        textAnchor="middle"
        fill={award.medal === "Or" ? `url(#${id}-m)` : "#7d8288"}
        fontSize={award.medal === "Or" ? 28 : 22}
        fontWeight="600"
        letterSpacing="1.5"
        fontFamily='"Cormorant Garamond", Georgia, serif'
      >
        {award.medal.toUpperCase()}
      </text>
      <text fill="#1b1b1b" fontSize="18" letterSpacing="1" fontFamily="Inter, Helvetica, Arial, sans-serif">
        <textPath href={`#${id}-bottom`} startOffset="50%" textAnchor="middle">
          {`CONCOURS ${award.contest}`}
        </textPath>
      </text>
    </svg>
  )
}
