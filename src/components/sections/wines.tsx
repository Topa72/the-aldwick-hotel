import { motion } from "motion/react"

import { SectionHeading } from "@/components/section-heading"
import { servingNote, wines } from "@/data/content"
import { fadeUp, inView, stagger } from "@/lib/motion"

export function Wines() {
  return (
    <section id="vins" className="border-t border-border bg-surface py-24 md:py-36" aria-labelledby="vins-title">
      <div className="container">
        <SectionHeading id="vins-title" eyebrow="Nos Vins" title="Les cuvées" />

        <motion.ul className="mt-16 border-t border-border md:mt-20" variants={stagger(0.08)} {...inView}>
          {wines.map((wine) => (
            <motion.li key={wine.name} variants={fadeUp}>
              <a
                href="#ou-trouver"
                className="group grid grid-cols-1 gap-4 border-b border-border px-1 py-10 transition-[background-color,transform,box-shadow] duration-200 hover:-translate-y-1 hover:bg-surface-raised hover:shadow-[0_18px_40px_-24px_rgba(0,0,0,0.7)] md:grid-cols-12 md:items-center md:gap-8 md:px-8"
              >
                <div className="md:col-span-5">
                  <p className="label mb-3 text-muted-foreground transition-colors duration-200 group-hover:text-accent/80">
                    {wine.appellation}
                  </p>
                  <h3 className="font-serif text-[clamp(40px,4.6vw,64px)] font-semibold italic leading-none text-foreground transition-colors duration-200 group-hover:text-accent">
                    {wine.name}
                  </h3>
                </div>
                <p className="max-w-md text-[15px] font-light leading-relaxed text-muted-foreground transition-colors duration-200 group-hover:text-foreground/85 md:col-span-5">
                  {wine.description}
                </p>
                <div className="flex items-center justify-between gap-4 md:col-span-2 md:justify-end">
                  <span className="label text-muted-foreground transition-colors duration-200 group-hover:text-accent md:hidden">
                    Où l'acheter
                  </span>
                  <span
                    aria-hidden
                    className="font-serif text-4xl text-accent transition-transform duration-200 group-hover:translate-x-1.5"
                  >
                    →
                  </span>
                </div>
              </a>
            </motion.li>
          ))}
        </motion.ul>

        <p className="label mt-10 text-muted-foreground">{servingNote}</p>
      </div>
    </section>
  )
}
