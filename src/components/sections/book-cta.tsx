import { motion } from "motion/react"
import { ArrowRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import { fadeUp, inView, stagger } from "@/lib/motion"

export function BookCta() {
  return (
    <section id="book" className="bg-[#c9a55a] py-24 text-background md:py-32" aria-labelledby="book-title">
      <motion.div className="container flex flex-col items-center text-center" variants={stagger(0.12)} {...inView}>
        <motion.h2
          variants={fadeUp}
          id="book-title"
          className="display text-[clamp(48px,7vw,104px)] leading-[0.92] text-background"
        >
          Is Your Date Available?
        </motion.h2>
        <motion.p variants={fadeUp} className="mt-8 max-w-xl text-base font-light leading-relaxed text-background/85 md:text-[17px]">
          We take a limited number of bookings each month — check availability and reserve your room directly for our
          best rate
        </motion.p>
        <motion.div variants={fadeUp} className="mt-10">
          <Button asChild variant="dark" size="lg">
            <a href="mailto:stay@thealdwick.co.uk?subject=Availability%20enquiry">
              Check availability <ArrowRight />
            </a>
          </Button>
        </motion.div>
        <motion.p variants={fadeUp} className="label mt-8 text-background/70">
          Best rate direct · Dog friendly · Free parking
        </motion.p>
      </motion.div>
    </section>
  )
}
