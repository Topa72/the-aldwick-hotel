import { motion } from "motion/react"

import { SectionHeading } from "@/components/section-heading"
import { SmartImage } from "@/components/smart-image"
import { gallery, type GalleryItem } from "@/data/content"
import { ease } from "@/lib/motion"
import { cn } from "@/lib/utils"

// Masonry: split into two columns (even / odd). On mobile the columns use
// `display: contents`, and `order` restores the original sequence.
const columns = [0, 1].map((col) =>
  gallery.map((item, index) => ({ item, index })).filter(({ index }) => index % 2 === col),
)

function Tile({ item, index, fill }: { item: GalleryItem; index: number; fill: boolean }) {
  return (
    <motion.figure
      className={cn(
        "group relative overflow-hidden bg-surface md:order-none",
        item.ratio === "portrait" ? "aspect-[3/4]" : "aspect-[4/3]",
        fill && "md:flex-1",
      )}
      style={{ order: index }}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.8, delay: (index % 3) * 0.12, ease }}
    >
      <SmartImage
        src={item.src}
        alt={item.alt}
        loading="lazy"
        decoding="async"
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
      />
      <div
        aria-hidden
        className="absolute inset-0 bg-background opacity-0 transition-opacity duration-500 group-hover:opacity-70"
      />
      <figcaption className="absolute inset-0 flex flex-col items-center justify-center gap-4 p-6 text-center opacity-0 transition-all duration-500 group-hover:opacity-100">
        <span className="h-px w-10 bg-accent" />
        <span className="display translate-y-3 text-[clamp(30px,3vw,46px)] leading-none text-foreground transition-transform duration-500 group-hover:translate-y-0">
          {item.label}
        </span>
      </figcaption>
    </motion.figure>
  )
}

export function Gallery() {
  return (
    <section className="bg-surface py-24 md:py-36" aria-labelledby="gallery-title">
      <div className="container">
        <SectionHeading id="gallery-title" eyebrow="Gallery" title="The Aldwick in Detail" />
      </div>

      <div className="mx-auto mt-16 flex max-w-[1600px] flex-col gap-[3px] md:mt-20 md:grid md:grid-cols-2 md:px-[3px]">
        {columns.map((column, c) => (
          <div key={c} className="contents md:flex md:flex-col md:gap-[3px]">
            {column.map(({ item, index }, i) => (
              <Tile key={item.label} item={item} index={index} fill={i === column.length - 1} />
            ))}
          </div>
        ))}
      </div>
    </section>
  )
}
