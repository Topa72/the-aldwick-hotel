import { motion } from "motion/react"

import type { Banner } from "@/data/images"
import { ease } from "@/lib/motion"
import { cn } from "@/lib/utils"

/** A wide photo opening a page, under the header; it fades into the page at the bottom. */
export function PageBanner({ banner }: { banner: Banner | null }) {
  if (!banner) return null
  return (
    <div className="relative h-[46svh] min-h-[280px] w-full overflow-hidden lg:h-[64svh] lg:max-h-[720px]">
      <motion.img
        src={banner.src}
        alt={banner.alt}
        fetchPriority="high"
        decoding="async"
        className="absolute inset-0 h-full w-full object-cover"
        style={{ objectPosition: banner.position }}
        initial={{ opacity: 0, scale: 1.04 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.4, ease }}
      />
      {/* Darker under the header, then melting into the page's background. */}
      <div
        aria-hidden
        className={cn(
          "absolute inset-0",
          banner.tone === "surface"
            ? "bg-[linear-gradient(to_bottom,hsl(var(--background)/0.55),transparent_28%,transparent_62%,hsl(var(--surface)))]"
            : "bg-[linear-gradient(to_bottom,hsl(var(--background)/0.55),transparent_28%,transparent_62%,hsl(var(--background)))]",
        )}
      />
    </div>
  )
}
