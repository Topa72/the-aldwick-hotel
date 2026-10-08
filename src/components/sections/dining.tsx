import { motion } from "motion/react"

import { SectionHeading } from "@/components/section-heading"
import { SmartImage } from "@/components/smart-image"
import { Badge } from "@/components/ui/badge"
import { diningChips } from "@/data/content"
import { images } from "@/data/images"
import { ease, fadeUp, inView, stagger } from "@/lib/motion"

export function Dining() {
  return (
    <section id="dining" className="py-24 md:py-36" aria-labelledby="dining-title">
      <div className="container grid items-center gap-16 lg:grid-cols-2 lg:gap-24">
        <div>
          <SectionHeading id="dining-title" eyebrow="Dining" title="The Restaurant" />

          <motion.div className="mt-12" variants={stagger(0.14)} {...inView}>
            <motion.blockquote
              variants={fadeUp}
              className="border-l border-accent/60 pl-6 font-serif text-[clamp(26px,2.6vw,36px)] font-normal italic leading-snug text-foreground"
            >
              “Everything on the menu was either grown here, reared locally, or foraged from the surrounding
              countryside.”
            </motion.blockquote>

            <motion.p variants={fadeUp} className="mt-10 text-[15px] font-light leading-relaxed text-muted-foreground">
              Head Chef James Cole cooks to the rhythm of the seasons, with a tasting menu that changes weekly
              depending on what the kitchen garden, neighbouring farms and hedgerows have to offer that week.
            </motion.p>
            <motion.p variants={fadeUp} className="mt-5 text-[15px] font-light leading-relaxed text-muted-foreground">
              Breakfast is served to all guests each morning in front of the fire. The restaurant is also open to
              non-residents from Thursday to Sunday — we recommend booking ahead, particularly at weekends.
            </motion.p>

            <motion.ul variants={fadeUp} className="mt-10 flex flex-wrap gap-2">
              {diningChips.map((chip) => (
                <li key={chip}>
                  <Badge>{chip}</Badge>
                </li>
              ))}
            </motion.ul>
          </motion.div>
        </div>

        <motion.div
          className="relative aspect-[4/5] overflow-hidden"
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 1, ease }}
        >
          <SmartImage
            src={images.dining}
            alt="A beautifully plated seasonal dish on a candlelit table"
            loading="lazy"
            decoding="async"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div aria-hidden className="absolute inset-0 ring-1 ring-inset ring-foreground/10" />
        </motion.div>
      </div>
    </section>
  )
}
