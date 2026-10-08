import { motion } from "motion/react"
import { Car, TrainFront } from "lucide-react"

import { GoldRule } from "@/components/gold-rule"
import { SectionHeading } from "@/components/section-heading"
import { directions } from "@/data/content"
import { fadeUp, inView, stagger } from "@/lib/motion"

const icons = [Car, TrainFront]

export function Location() {
  return (
    <section id="location" className="border-t border-border bg-surface py-24 md:py-36" aria-labelledby="loc-title">
      <div className="container grid gap-16 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <SectionHeading id="loc-title" eyebrow="Location" title="Getting Here" />
          <motion.p
            variants={fadeUp}
            {...inView}
            className="mt-10 max-w-md text-[17px] font-light leading-relaxed text-muted-foreground"
          >
            Two hours from London, five minutes from Bourton-on-the-Water — the heart of the Cotswolds, without the
            tourist crowds
          </motion.p>
          <motion.address
            variants={fadeUp}
            {...inView}
            className="label mt-10 not-italic leading-loose text-foreground/80"
          >
            The Aldwick
            <br />
            Bourton-on-the-Water
            <br />
            Cotswolds GL54
          </motion.address>
        </div>

        <motion.div className="grid gap-12 sm:grid-cols-2 lg:col-span-7" variants={stagger(0.15)} {...inView}>
          {directions.map((d, i) => {
            const Icon = icons[i]
            return (
              <motion.div key={d.title} variants={fadeUp}>
                <Icon className="h-6 w-6 text-accent" strokeWidth={1.25} aria-hidden />
                <h3 className="display mt-6 text-4xl text-foreground">{d.title}</h3>
                <GoldRule className="mt-4 w-12" delay={0.2 + i * 0.1} />
                <p className="mt-6 text-[15px] font-light leading-relaxed text-muted-foreground">{d.body}</p>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
