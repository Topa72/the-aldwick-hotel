import { motion } from "motion/react"
import { Bike, Sparkles, UtensilsCrossed } from "lucide-react"

import { SectionHeading } from "@/components/section-heading"
import { experiences } from "@/data/content"
import { fadeUp, inView, stagger } from "@/lib/motion"

const icons = [Bike, UtensilsCrossed, Sparkles]

export function Experiences() {
  return (
    <section id="experiences" className="border-y border-border bg-surface py-24 md:py-32" aria-labelledby="exp-title">
      <div className="container">
        <SectionHeading id="exp-title" eyebrow="Experiences" title="What to Do" />

        <motion.ul className="mt-14 grid gap-3 md:grid-cols-3" variants={stagger(0.1)} {...inView}>
          {experiences.map((exp, i) => {
            const Icon = icons[i]
            return (
              <motion.li
                key={exp.title}
                variants={fadeUp}
                className="group flex items-center gap-5 border border-border bg-background/50 px-6 py-6 transition-colors duration-200 hover:border-accent/60 hover:bg-surface-raised"
              >
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-accent/50 text-accent transition-colors duration-200 group-hover:bg-accent group-hover:text-accent-foreground">
                  <Icon className="h-5 w-5" strokeWidth={1.25} />
                </span>
                <span>
                  <span className="block font-serif text-[28px] font-semibold italic leading-tight text-foreground transition-colors duration-200 group-hover:text-accent">
                    {exp.title}
                  </span>
                  <span className="label mt-1.5 block text-muted-foreground">{exp.detail}</span>
                </span>
              </motion.li>
            )
          })}
        </motion.ul>
      </div>
    </section>
  )
}
