import { motion } from "motion/react"

import { Medal } from "@/components/medal"
import { SectionHeading } from "@/components/section-heading"
import { awardsContest, wines } from "@/data/content"
import { fadeUp, inView, stagger } from "@/lib/motion"
import { cn } from "@/lib/utils"

const styleLabel = { blanc: "Blanc", rouge: "Rouge", rose: "Rosé" } as const

// Every medal across the range, most recent competition first.
const medals = wines
  .flatMap((w) => w.awards.map((a) => ({ ...a, wine: w.name, style: w.style })))
  .sort((a, b) => b.contest - a.contest || (a.medal === "Or" ? -1 : 1))

export function Awards() {
  return (
    <section className="py-24 md:py-36" aria-labelledby="awards-title">
      <div className="container">
        <SectionHeading id="awards-title" eyebrow="Palmarès" title="Nos médailles" />
        <motion.p
          variants={fadeUp}
          {...inView}
          className="mt-10 max-w-xl text-[17px] font-light leading-relaxed text-muted-foreground"
        >
          Médailles obtenues au {awardsContest}.
        </motion.p>

        <motion.ol className="mt-14 border-t border-border" variants={stagger(0.05)} {...inView}>
          {medals.map((m) => (
            <motion.li
              key={`${m.wine}-${m.style}-${m.vintage}`}
              variants={fadeUp}
              className="grid grid-cols-[4.5rem_1fr_auto] items-baseline gap-4 border-b border-border py-5 sm:grid-cols-[6rem_1fr_auto] sm:gap-8"
            >
              <span className="font-serif text-2xl italic text-muted-foreground tabular-nums">{m.contest}</span>
              <span className="min-w-0">
                <span className="font-serif text-2xl font-semibold italic text-foreground">{m.wine}</span>
                <span className="label ml-3 text-muted-foreground">
                  {styleLabel[m.style]} · millésime {m.vintage}
                </span>
              </span>
              <span
                className={cn(
                  "label inline-flex items-center gap-3",
                  m.medal === "Or" ? "text-accent" : "text-foreground/80",
                )}
              >
                <Medal award={m} className="h-11 w-11" />
                {m.medal}
              </span>
            </motion.li>
          ))}
        </motion.ol>
      </div>
    </section>
  )
}
