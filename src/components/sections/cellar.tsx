import { motion } from "motion/react"

import { SectionHeading } from "@/components/section-heading"
import { SmartImage } from "@/components/smart-image"
import { Badge } from "@/components/ui/badge"
import { cellarChips } from "@/data/content"
import { images } from "@/data/images"
import { ease, fadeUp, inView, stagger } from "@/lib/motion"

export function Cellar() {
  return (
    <section className="py-24 md:py-36" aria-labelledby="chai-title">
      <div className="container grid items-center gap-16 lg:grid-cols-2 lg:gap-24">
        <div>
          <SectionHeading id="chai-title" eyebrow="Du cep au chai" title="Le bio, depuis toujours" />

          <motion.div className="mt-12" variants={stagger(0.14)} {...inView}>
            <motion.p
              variants={fadeUp}
              className="border-l border-accent/60 pl-6 font-serif text-[clamp(26px,2.6vw,36px)] font-normal italic leading-snug text-foreground"
            >
              Ni engrais chimiques, ni désherbants, ni insecticides, ni pesticides, ni fongicides de synthèse.
            </motion.p>

            <motion.p variants={fadeUp} className="mt-10 text-[15px] font-light leading-relaxed text-muted-foreground">
              Le vignoble est conduit en agriculture biologique depuis 1964 et reste certifié AB. Sur les coteaux
              calcaires et argilo-calcaires de Champtin, le sauvignon blanc et le pinot noir poussent sans produits
              de synthèse.
            </motion.p>
            <motion.p variants={fadeUp} className="mt-5 text-[15px] font-light leading-relaxed text-muted-foreground">
              Au chai, la famille intervient le moins possible : fermentation par les levures indigènes, en cuves
              inox à température contrôlée, pour laisser parler chaque parcelle.
            </motion.p>

            <motion.ul variants={fadeUp} className="mt-10 flex flex-wrap gap-2">
              {cellarChips.map((chip) => (
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
            src={images.cellar}
            alt="Le chai du domaine"
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
