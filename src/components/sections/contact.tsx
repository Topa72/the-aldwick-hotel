import { motion } from "motion/react"
import { ArrowRight, Phone } from "lucide-react"

import { Button } from "@/components/ui/button"
import { estate } from "@/data/content"
import { fadeUp, inView, stagger } from "@/lib/motion"
import { href } from "@/lib/router"

/** At the foot of each page: a way to the contact form (on the visit page) and the phone number. */
export function Contact() {
  return (
    <section className="border-t border-border py-20 md:py-24" aria-labelledby="contact-title">
      <motion.div
        className="container flex flex-col items-center gap-8 text-center md:flex-row md:justify-between md:text-left"
        variants={stagger(0.1)}
        {...inView}
      >
        <motion.div variants={fadeUp}>
          <h2 id="contact-title" className="section-title">
            Contactez-nous
          </h2>
          <p className="mt-4 max-w-md text-[17px] font-light leading-relaxed text-muted-foreground">
            {"Une question sur nos vins, une commande ou une visite ? Écrivez-nous ou appelez-nous."}
          </p>
        </motion.div>
        <motion.div variants={fadeUp} className="flex flex-col items-center gap-4 sm:flex-row">
          <Button asChild variant="gold" size="lg">
            <a href={href("visite", "contact")}>
              Contactez-nous <ArrowRight />
            </a>
          </Button>
          <Button asChild variant="gold-outline" size="lg">
            <a href={estate.phoneHref}>
              <Phone /> {estate.phone}
            </a>
          </Button>
        </motion.div>
      </motion.div>
    </section>
  )
}
