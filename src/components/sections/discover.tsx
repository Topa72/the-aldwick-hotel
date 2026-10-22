import { motion } from "motion/react"
import { ArrowRight } from "lucide-react"

import { discover } from "@/data/content"
import { fadeUp, inView, stagger } from "@/lib/motion"
import { href } from "@/lib/router"

/** Home page: one card per page of the site. */
export function Discover() {
  return (
    <section className="border-t border-border py-24 md:py-32" aria-label="Découvrir le domaine">
      <div className="container">
        <motion.ul
          className="grid gap-px border border-border bg-border sm:grid-cols-2 lg:grid-cols-4"
          variants={stagger(0.1)}
          {...inView}
        >
          {discover.map((item, i) => (
            <motion.li key={item.page} variants={fadeUp} className="bg-background">
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
