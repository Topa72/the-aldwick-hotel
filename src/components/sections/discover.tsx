import { motion } from "motion/react"
import { ArrowRight } from "lucide-react"

import { discover } from "@/data/content"
import { images } from "@/data/images"
import { fadeUp, inView, stagger } from "@/lib/motion"
import { href } from "@/lib/router"
import { cn } from "@/lib/utils"

const backdrop = images.soil

/**
 * Home page: one card per page of the site. Under the hero's vineyard photo, its soil shows again,
 * faintly, behind the frosted cards: it rises from the dark the hero fades into, then sinks back.
 */
export function Discover() {
  return (
    <section
      className={cn("relative overflow-hidden py-24 md:py-32", !backdrop && "border-t border-border")}
      aria-label="Découvrir le domaine"
    >
      {backdrop && (
        <>
          <img
            src={backdrop}
            alt=""
            aria-hidden
            loading="lazy"
            decoding="async"
            className="absolute inset-0 h-full w-full object-cover opacity-35 [mask-image:linear-gradient(to_bottom,transparent,black_35%,black_65%,transparent)]"
          />
        </>
      )}
      <div className="container relative">
        <motion.ul
          className={cn(
            "grid sm:grid-cols-2 lg:grid-cols-4",
            // Frosted cards let the soil show through; their borders are drawn cell by cell.
            backdrop ? "border-l border-t border-border/70" : "gap-px border border-border bg-border",
          )}
          variants={stagger(0.1)}
          {...inView}
        >
          {discover.map((item, i) => (
            <motion.li
              key={item.page}
              variants={fadeUp}
              className={
                backdrop
                  ? "border-b border-r border-border/70 bg-background/70 backdrop-blur-md"
                  : "bg-background"
              }
            >
              <a
                href={href(item.page)}
                className="group flex h-full flex-col p-8 transition-colors duration-200 hover:bg-surface-raised md:p-10"
              >
                <span className="label tabular-nums text-accent">0{i + 1}</span>
                <h2 className="display mt-6 text-4xl text-foreground transition-colors group-hover:text-accent">
                  {item.title}
                </h2>
                <p className="mt-4 flex-1 text-[15px] font-light leading-relaxed text-muted-foreground">{item.text}</p>
                <span className="label mt-8 inline-flex items-center gap-2 text-accent">
                  Découvrir
                  <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-1" />
                </span>
              </a>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  )
}
