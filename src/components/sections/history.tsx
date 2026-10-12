import { motion } from "motion/react"

import { SectionHeading } from "@/components/section-heading"
import { domaineIntro, history } from "@/data/content"
import { images } from "@/data/images"
import { ease, fadeUp, inView, stagger } from "@/lib/motion"

export function History() {
  return (
    <section id="domaine" className="py-24 md:py-36" aria-labelledby="domaine-title">
      <div className="container">
        <div className="grid items-start gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <SectionHeading id="domaine-title" eyebrow="Le Domaine" title="Une famille, un coteau" />
            <motion.p
              variants={fadeUp}
              {...inView}
              className="mt-10 max-w-md text-[17px] font-light leading-relaxed text-muted-foreground"
            >
              {domaineIntro}
            </motion.p>
          </div>

          {images.facade && (
            <motion.figure
              className="lg:col-span-7"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 1, ease }}
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <img
                  src={images.facade}
                  alt={images.facadeAlt}
                  loading="lazy"
                  decoding="async"
                  className="absolute inset-0 h-full w-full object-cover"
                />
                <div aria-hidden className="absolute inset-0 ring-1 ring-inset ring-foreground/10" />
              </div>
              <figcaption className="label mt-4 text-muted-foreground">{images.facadeCaption}</figcaption>
            </motion.figure>
          )}
        </div>

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
