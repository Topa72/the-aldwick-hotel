import { motion } from "motion/react"
import { Phone } from "lucide-react"

import { ContactForm } from "@/components/contact-form"
import { SectionHeading } from "@/components/section-heading"
import { estate } from "@/data/content"
import { fadeUp, inView } from "@/lib/motion"

/** The contact form at the foot of each page (the visit page has its own, next to the map). */
export function Contact() {
  return (
    <section className="border-t border-border py-24 md:py-32" aria-labelledby="contact-title">
      {/* The anchor sits outside the fade-in, so "Contactez-nous" links land below the header. */}
      <div id="contact" className="container grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <SectionHeading id="contact-title" eyebrow="Contact" title="Contactez-nous" />
          <motion.p
            variants={fadeUp}
            {...inView}
            className="mt-10 max-w-md text-[17px] font-light leading-relaxed text-muted-foreground"
          >
            {
              "Une question sur nos vins, une commande ou une visite ? Écrivez-nous, nous vous répondrons dès que possible."
            }
          </motion.p>
          <motion.a
            variants={fadeUp}
            {...inView}
            href={estate.phoneHref}
            className="label mt-8 inline-flex items-center gap-3 text-accent hover:underline"
          >
            <Phone className="h-4 w-4" strokeWidth={1.5} aria-hidden /> {estate.phone}
          </motion.a>
        </div>
        <motion.div variants={fadeUp} {...inView} className="lg:col-span-7">
          <ContactForm />
        </motion.div>
      </div>
    </section>
  )
}
