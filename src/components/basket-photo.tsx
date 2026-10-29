import { lazy, Suspense } from "react"

import type { BottleSpec } from "@/components/bottles-3d"

const BottleLineup = lazy(() => import("@/components/bottle-lineup"))

// The picture (`images.basketPhoto`): 1631 × 788 pixels, the basket's front with its straw and leaves,
// and nothing above it where the bottles stood. The 3D bottles take their places: 0.88 units apart
// there is 189 pixels, and a bottle stands on the straw 605 pixels down, its label clear of the rim.
const PX_PER_UNIT = 189 / 0.88
const PHOTO_W = 1631 / PX_PER_UNIT
const PHOTO_H = 788 / PX_PER_UNIT
const PHOTO_TOP = 605 / PX_PER_UNIT
// Room above the picture for a bottle lifted out of the basket.
const HEADROOM = 0.55
const FRAME = { width: PHOTO_W, top: PHOTO_TOP + HEADROOM, height: PHOTO_H + HEADROOM }

/**
 * The home page's bottles in a wicker basket: the 3D bottles stand in it, the basket's front (a
 * photograph) laid over them, so they rise out of the straw when pointed at.
 */
export function BasketPhoto({
  src,
  bottles,
  estateName,
  hovered,
  onHover,
  onPick,
}: {
  src: string
  bottles: BottleSpec[]
  estateName: string
  hovered: number | null
  onHover: (index: number | null) => void
  onPick: (index: number) => void
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
        <div className="absolute inset-x-0 bottom-0" style={{ top: `${(-HEADROOM / PHOTO_H) * 100}%` }}>
          <Suspense fallback={null}>
            <BottleLineup
              bottles={bottles}
              estateName={estateName}
              hovered={hovered}
              onHover={onHover}
              onPick={onPick}
              frame={FRAME}
            />
          </Suspense>
        </div>
        <img
          src={src}
          alt=""
          aria-hidden
          decoding="async"
          fetchPriority="high"
          draggable={false}
          // The photo was lit from the front: warmed and toned down a little to sit in the backlit vines.
          className="pointer-events-none absolute inset-0 h-full w-full select-none [filter:saturate(0.92)_brightness(0.93)_sepia(0.08)]"
        />
      </div>
    </div>
  )
}
