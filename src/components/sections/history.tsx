import { motion } from "motion/react"

import { SectionHeading } from "@/components/section-heading"
import { history } from "@/data/content"
import { fadeUp, inView, stagger } from "@/lib/motion"

export function History() {
  return (
    <section id="domaine" className="py-24 md:py-36" aria-labelledby="domaine-title">
      <div className="container">
        <SectionHeading id="domaine-title" eyebrow="Le Domaine" title="Une famille, un coteau" />

        <motion.ol className="mt-16 border-t border-border md:mt-20" variants={stagger(0.1)} {...inView}>
          {history.map((step) => (
            <motion.li
              key={step.year}
              variants={fadeUp}
              className="group grid grid-cols-1 gap-4 border-b border-border px-1 py-10 transition-colors duration-200 hover:bg-surface-raised md:grid-cols-12 md:items-baseline md:gap-8 md:px-8 md:py-12"
            >
              <p className="font-serif text-[clamp(44px,5vw,72px)] font-semibold italic leading-none text-accent md:col-span-4">
                {step.year}
              </p>
              <h3 className="font-serif text-3xl font-semibold italic leading-tight text-foreground transition-colors duration-200 group-hover:text-accent md:col-span-3">
                {step.title}
              </h3>
              <p className="max-w-md text-[15px] font-light leading-relaxed text-muted-foreground transition-colors duration-200 group-hover:text-foreground/85 md:col-span-5">
                {step.text}
              </p>
            </motion.li>
          ))}
        </motion.ol>
      </div>
    </section>
  )
}
