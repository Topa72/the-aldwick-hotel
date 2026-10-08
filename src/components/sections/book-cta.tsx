import { motion } from "motion/react"
import { Phone } from "lucide-react"

import { Button } from "@/components/ui/button"
import { estate } from "@/data/content"
import { fadeUp, inView, stagger } from "@/lib/motion"

export function BookCta() {
  return (
    <section className="bg-[#c9a55a] py-24 text-background md:py-32" aria-labelledby="cta-title">
      <motion.div className="container flex flex-col items-center text-center" variants={stagger(0.12)} {...inView}>
        <motion.h2
          variants={fadeUp}
          id="cta-title"
          className="display text-[clamp(48px,7vw,104px)] leading-[0.92] text-background"
        >
          Venez déguster à Champtin
        </motion.h2>
        <motion.p
          variants={fadeUp}
          className="mt-8 max-w-xl text-base font-light leading-relaxed text-background/85 md:text-[17px]"
        >
          Dégustation gratuite du lundi au samedi. Pour une visite guidée ou un groupe, appelez-nous pour réserver.
        </motion.p>
        <motion.div variants={fadeUp} className="mt-10">
          <Button asChild variant="dark" size="lg">
            <a href={estate.phoneHref}>
              <Phone /> {estate.phone}
            </a>
          </Button>
        </motion.div>
        <motion.p variants={fadeUp} className="label mt-8 text-background/70">
          Bio depuis 1964 · Sancerre AOC · Vente directe au domaine
        </motion.p>
      </motion.div>
    </section>
  )
}
