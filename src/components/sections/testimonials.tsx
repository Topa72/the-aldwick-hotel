import { motion } from "motion/react"
import { Star } from "lucide-react"

import { SectionHeading } from "@/components/section-heading"
import { testimonials } from "@/data/content"
import { fadeUp, inView, stagger } from "@/lib/motion"

export function Testimonials() {
  return (
    <section className="py-24 md:py-36" aria-labelledby="reviews-title">
      <div className="container">
        <SectionHeading id="reviews-title" eyebrow="Guest Book" title="In Their Words" />

        <motion.ul className="mt-16 grid gap-6 lg:grid-cols-3" variants={stagger(0.15)} {...inView}>
          {testimonials.map((t) => (
            <motion.li
              key={t.name}
              variants={fadeUp}
              className="flex flex-col border border-border bg-surface p-8 md:p-10"
            >
              <div className="flex gap-1 text-accent" aria-label="Rated 5 out of 5">
                {Array.from({ length: 5 }, (_, i) => (
                  <Star key={i} className="h-3.5 w-3.5 fill-current" strokeWidth={0} aria-hidden />
                ))}
              </div>
              <blockquote className="mt-8 flex-1 font-serif text-[26px] italic leading-snug text-foreground">
                “{t.quote}”
              </blockquote>
              <footer className="mt-10 border-t border-border pt-6">
                <p className="label text-foreground/90">{t.name}</p>
                <p className="mt-1.5 font-sans text-[10px] font-normal uppercase tracking-label text-muted-foreground">
                  Stayed in {t.room}
                </p>
              </footer>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  )
}
