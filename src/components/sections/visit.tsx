import { motion } from "motion/react"
import { Clock, MapPin } from "lucide-react"

import { GoldRule } from "@/components/gold-rule"
import { SectionHeading } from "@/components/section-heading"
import { estate, openingHours, visitInfo } from "@/data/content"
import { fadeUp, inView, stagger } from "@/lib/motion"

export function Visit() {
  return (
    <section id="visites" className="py-24 md:py-36" aria-labelledby="visite-title">
      <div className="container grid gap-16 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <SectionHeading id="visite-title" eyebrow="Visites" title="Venir au domaine" />
          <motion.p
            variants={fadeUp}
            {...inView}
            className="mt-10 max-w-md text-[17px] font-light leading-relaxed text-muted-foreground"
          >
            Le domaine vous accueille à Champtin pour une dégustation ou une visite de cave, au cœur du vignoble de
            Sancerre.
          </motion.p>

          <motion.div variants={fadeUp} {...inView} className="mt-10 flex gap-4">
            <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-accent" strokeWidth={1.25} aria-hidden />
            <address className="label not-italic leading-loose text-foreground/85">
              {estate.address.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
              <a href={estate.phoneHref} className="mt-2 block text-accent hover:underline">
                {estate.phone}
              </a>
            </address>
          </motion.div>
        </div>

        <div className="flex flex-col gap-14 lg:col-span-7">
          <motion.div variants={fadeUp} {...inView}>
            <div className="flex items-center gap-3">
              <Clock className="h-5 w-5 text-accent" strokeWidth={1.25} aria-hidden />
              <h3 className="display text-4xl text-foreground">Horaires</h3>
            </div>
            <GoldRule className="mt-4 w-12" delay={0.2} />
            <dl className="mt-8 border-t border-border">
              {openingHours.map((row) => (
                <div
                  key={row.period}
                  className="grid gap-1 border-b border-border py-5 sm:grid-cols-[1.2fr_1fr_1.2fr] sm:items-baseline sm:gap-6"
                >
                  <dt className="label text-accent">{row.period}</dt>
                  <dd className="text-[15px] font-light text-muted-foreground">{row.days}</dd>
                  <dd className="text-[15px] font-normal tabular-nums text-foreground sm:text-right">{row.hours}</dd>
                </div>
              ))}
            </dl>
            <p className="mt-4 text-sm font-light text-muted-foreground">Fermé le dimanche et les jours fériés.</p>
          </motion.div>

          <motion.ul className="grid gap-10 sm:grid-cols-3" variants={stagger(0.12)} {...inView}>
            {visitInfo.map((item) => (
              <motion.li key={item.title} variants={fadeUp}>
                <h3 className="display text-3xl text-foreground">{item.title}</h3>
                <p className="mt-3 text-[15px] font-light leading-relaxed text-muted-foreground">{item.text}</p>
              </motion.li>
            ))}
          </motion.ul>
        </div>
      </div>
    </section>
  )
}
