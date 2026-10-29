import { motion } from "motion/react"

import { SectionHeading } from "@/components/section-heading"
import { SmartImage } from "@/components/smart-image"
import { Badge } from "@/components/ui/badge"
import { cellarChips } from "@/data/content"
import { images } from "@/data/images"
import { ease, fadeUp, inView, stagger } from "@/lib/motion"
import { cn } from "@/lib/utils"

export function Cellar() {
  return (
    <section className="py-24 md:py-36" aria-labelledby="chai-title">
      <div className={cn("container grid items-start gap-16 lg:gap-24", images.cellar ? "lg:grid-cols-2" : "max-w-4xl")}>
        <div>
          <SectionHeading id="chai-title" eyebrow="Du cep au chai" title="Le bio, depuis toujours" />

          <motion.div className="mt-12" variants={stagger(0.14)} {...inView}>
            <motion.p
              variants={fadeUp}
              className="border-l border-accent/60 pl-6 font-serif text-[clamp(26px,2.6vw,36px)] font-normal italic leading-snug text-foreground"
            >
              Ni engrais chimiques, ni désherbants, ni insecticides, ni pesticides, ni fongicides de synthèse.
            </motion.p>

            <motion.p variants={fadeUp} className="mt-10 max-w-2xl text-[15px] font-light leading-relaxed text-muted-foreground">
              Converti en 1964, le vignoble vise la fertilité des sols sur le long terme. Fumier composté,
              lombricompost, déchets végétaux et algues calcaires nourrissent l'humus et la vie microbienne du sol.
              Labours et binages, tout au long de l'année, remplacent les désherbants et ameublissent la terre pour
              un meilleur enracinement.
            </motion.p>
            <motion.p variants={fadeUp} className="mt-5 max-w-2xl text-[15px] font-light leading-relaxed text-muted-foreground">
              Purins d'ortie et de prêle et jus d'algues renforcent les défenses de la vigne. Le cuivre (bouillie
              bordelaise) et le soufre n'interviennent qu'en cas de forte pression de mildiou ou d'oïdium. Au chai,
              le domaine suit toujours un cahier des charges élaboré au début des années 1970 : pressurage
              pneumatique, fermentation en cuves inox thermorégulées, collage à la bentonite seulement.
            </motion.p>

            <motion.ul variants={fadeUp} className="mt-10 flex flex-wrap gap-2">
              {cellarChips.map((chip) => (
                <li key={chip}>
                  <Badge>{chip}</Badge>
                </li>
              ))}
            </motion.ul>

            {images.labels.length > 0 && (
              <motion.ul variants={fadeUp} className="mt-10 flex items-center gap-5">
                {images.labels.map((logo) => (
                  <li key={logo.src}>
                    <img src={logo.src} alt={logo.alt} loading="lazy" decoding="async" className="h-20 w-auto md:h-24" />
                  </li>
                ))}
              </motion.ul>
            )}
          </motion.div>
        </div>

        {images.cellar && (
        <motion.div
          className="relative aspect-[16/9] overflow-hidden lg:sticky lg:top-28 lg:aspect-[4/3]"
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 1, ease }}
        >
          <SmartImage
            src={images.cellar}
            alt={images.cellarAlt}
            loading="lazy"
            decoding="async"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div aria-hidden className="absolute inset-0 ring-1 ring-inset ring-foreground/10" />
        </motion.div>
        )}
      </div>
    </section>
  )
}
