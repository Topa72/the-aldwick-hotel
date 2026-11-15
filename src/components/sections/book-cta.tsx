import { motion } from "motion/react"
import { Phone } from "lucide-react"

import { EstateLogo } from "@/components/estate-logo"
import { estate } from "@/data/content"
import { images } from "@/data/images"
import { fadeUp, inView, stagger } from "@/lib/motion"

// Laid paper: a faint grain and a warm vignette, as on the estate's own labels.
const PAPER =
  "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='220' height='220'><filter id='p'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0.45 0 0 0 0 0.36 0 0 0 0 0.2 0 0 0 0.09 0'/></filter><rect width='100%' height='100%' filter='url(%23p)'/></svg>\"), radial-gradient(ellipse at 50% 40%, #f6f0e2, #e9dfc8 75%, #dccfb2)"

/** The invitation to taste at the estate, set like one of its wine labels. */
export function BookCta() {
  return (
    <section className="bg-surface py-20 md:py-28" aria-labelledby="cta-title">
      <motion.div className="container" variants={stagger(0.12)} {...inView}>
        <motion.div
          variants={fadeUp}
          className="relative mx-auto max-w-3xl px-6 py-12 text-center text-[#2a241c] shadow-[0_30px_60px_-20px_rgba(0,0,0,0.7)] sm:px-14 sm:py-16"
          style={{ background: PAPER }}
        >
          {/* A double burgundy frame, the colour of the estate's façade. */}
          <span aria-hidden className="pointer-events-none absolute inset-3 border border-[#551c25]/80 sm:inset-4" />
          <span aria-hidden className="pointer-events-none absolute inset-[18px] border border-[#551c25]/40 sm:inset-[23px]" />

          {images.pressoir && (
            <img src={images.pressoir} alt="" aria-hidden className="mx-auto h-16 w-auto sm:h-20" />
          )}
          <div className="mt-3 flex justify-center text-[#2a241c]">
            <EstateLogo className="h-12 text-4xl sm:h-14" />
          </div>

          <p className="mt-6 text-[11px] font-medium tracking-[0.42em] text-[#551c25] sm:text-xs">VENEZ DÉGUSTER</p>
          <h2 id="cta-title" className="mt-3 font-serif text-[clamp(40px,6vw,72px)] font-semibold italic leading-none">
            à Champtin
          </h2>
          <div aria-hidden className="mx-auto mt-6 h-px w-16 bg-[#551c25]" />
          <p className="mx-auto mt-6 max-w-md text-[15px] leading-relaxed text-[#2a241c]/80">
            Dégustation gratuite du lundi au samedi. Pour une visite guidée ou un groupe, appelez-nous pour réserver.
          </p>

          <a
            href={estate.phoneHref}
            className="mt-8 inline-flex items-center gap-3 border border-[#551c25] bg-[#551c25] px-7 py-3.5 text-xs font-medium tracking-[0.3em] text-[#f1eadb] transition-colors hover:bg-transparent hover:text-[#551c25]"
          >
            <Phone className="h-4 w-4" strokeWidth={1.5} />
            {estate.phone}
          </a>

          <p className="mt-10 text-[10px] tracking-[0.32em] text-[#551c25] sm:text-[11px]">
            SANCERRE AOC · BIO DEPUIS 1964 · VENTE DIRECTE AU DOMAINE
          </p>
        </motion.div>
      </motion.div>
    </section>
  )
}
