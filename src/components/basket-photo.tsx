import { cn } from "@/lib/utils"

/**
 * Where each bottle stands in the basket photo (public/photos/panier-bouteilles.webp), as fractions of
 * the picture: its centre across, its half-width, and its top and the bottom of its label.
 */
const BOTTLES = [247, 435, 622, 812, 1000, 1190, 1382].map((x) => ({ x: x / 1631, half: 92 / 1631 }))
const TOP = 0
const BOTTOM = 560 / 788

/**
 * The home page's bottles as a photograph: the estate's seven cuvées in a wicker basket, set on the
 * vineyard soil of the section's backdrop. Each bottle is a link; the one pointed at lights up.
 */
export function BasketPhoto({
  src,
  names,
  hovered,
  onHover,
  hrefs,
}: {
  src: string
  names: string[]
  hovered: number | null
  onHover: (index: number | null) => void
  hrefs: string[]
}) {
  return (
    <div className="absolute inset-x-0 bottom-[4%] mx-auto w-[96%] max-w-[900px] lg:-ml-[2%] lg:w-[106%] lg:max-w-[980px]">
      <div className="relative aspect-[1631/788]">
        {/* Where the basket rests on the soil: a soft shadow, darker right under it. */}
        <div
          aria-hidden
          className="absolute -bottom-[5%] left-[6%] right-[4%] h-[22%] rounded-[50%] bg-black/55 blur-xl"
        />
        <div
          aria-hidden
          className="absolute bottom-[1%] left-[10%] right-[8%] h-[8%] rounded-[50%] bg-black/60 blur-md"
        />
        <img
          src={src}
          alt=""
          aria-hidden
          decoding="async"
          fetchPriority="high"
          // The photo was lit from the front: warmed and toned down a little to sit in the backlit vines.
          className="absolute inset-0 h-full w-full select-none [filter:saturate(0.92)_brightness(0.93)_sepia(0.08)]"
          draggable={false}
        />
        {BOTTLES.map((b, i) => (
          <a
            key={i}
            href={hrefs[i]}
            aria-label={names[i]}
            onMouseEnter={() => onHover(i)}
            onMouseLeave={() => onHover(null)}
            onFocus={() => onHover(i)}
            onBlur={() => onHover(null)}
            className="absolute outline-none"
            style={{
              left: `${(b.x - b.half) * 100}%`,
              width: `${b.half * 200}%`,
              top: `${TOP * 100}%`,
              height: `${(BOTTOM - TOP) * 100}%`,
            }}
          >
            {/* The same bottle, a little brighter, over the photo while it is pointed at. */}
            <span
              aria-hidden
              className={cn(
                "absolute inset-0 transition-opacity duration-300 [filter:brightness(1.18)_saturate(1.05)]",
                hovered === i ? "opacity-100" : "opacity-0",
              )}
              style={{
                backgroundImage: `url("${src}")`,
                backgroundSize: `${100 / (b.half * 2)}% ${100 / (BOTTOM - TOP)}%`,
                backgroundPosition: `${((b.x - b.half) / (1 - b.half * 2)) * 100}% ${(TOP / (1 - (BOTTOM - TOP))) * 100}%`,
              }}
            />
          </a>
        ))}
      </div>
    </div>
  )
}
