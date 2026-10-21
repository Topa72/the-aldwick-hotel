import { motion } from "motion/react"
import { ArrowRight } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { heroChips, wines, wineSlug } from "@/data/content"
import { images } from "@/data/images"
import { ease } from "@/lib/motion"
import { href } from "@/lib/router"

const rise = (delay: number) => ({
  initial: { opacity: 0, y: 32 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.9, delay, ease },
})

export function Hero() {
  return (
    <section
      id="top"
      className="relative flex min-h-[100svh] w-full flex-col items-center overflow-hidden px-5 pb-[8vh] pt-28 text-center"
      aria-label="Accueil"
    >
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 70% 55% at 50% 38%, rgba(201,165,90,0.16), transparent 70%), linear-gradient(to bottom, #13181f, #171c24 60%, #13181f)",
        }}
      />

      {images.range && (
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease }}
          className="relative z-10 mt-auto"
        >
          <img
            src={images.range}
            alt={images.rangeAlt}
            fetchPriority="high"
            className="block max-h-[40vh] w-auto max-w-full drop-shadow-[0_30px_40px_rgba(0,0,0,0.55)]"
          />
          {/* The photo shows the cuvées side by side, in the same order as `wines`: each opens its own. */}
          <ul className="absolute inset-0 grid" style={{ gridTemplateColumns: `repeat(${wines.length}, 1fr)` }}>
            {wines.map((wine) => (
              <li key={wineSlug(wine)}>
                <a
                  href={href("vins", wineSlug(wine))}
                  aria-label={`${wine.name}, ${wine.appellation}`}
                  className="group relative flex h-full justify-center outline-none"
                >
                  <span
                    aria-hidden
                    className="pointer-events-none absolute inset-0 bg-[radial-gradient(closest-side,rgba(201,165,90,0.22),transparent)] opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100"
                  />
                  <span className="label pointer-events-none absolute -bottom-9 whitespace-nowrap text-accent opacity-0 transition-opacity duration-200 group-hover:opacity-100 group-focus-visible:opacity-100">
                    {wine.name}
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </motion.div>
      )}

      <div className="relative z-10 mt-16 flex w-full flex-col items-center">
        <motion.p {...rise(0)} className="label text-accent">
          Sancerre · Crézancy-en-Sancerre
        </motion.p>

        <motion.h1
          {...rise(0.15)}
          className="display mt-6 text-[clamp(52px,7.5vw,112px)] leading-[0.88] text-foreground"
        >
          Vignerons
          <br />
          <span className="text-accent">depuis 1683.</span>
        </motion.h1>

        <motion.p
          {...rise(0.3)}
          className="mt-8 max-w-[520px] text-base font-light leading-relaxed text-foreground/75 md:text-[17px]"
        >
          Treize générations de la famille Dauny sur les coteaux de Champtin, et un vignoble conduit en agriculture
          biologique depuis 1964
        </motion.p>

        <motion.div {...rise(0.45)} className="mt-10 flex flex-col gap-3 sm:flex-row sm:gap-4">
          <Button asChild variant="gold" size="lg">
            <a href={href("vins")}>
              Découvrir nos vins <ArrowRight />
            </a>
          </Button>
          <Button asChild variant="ghost" size="lg">
            <a href={href("ou-trouver")}>Où trouver nos vins</a>
          </Button>
        </motion.div>

        <ul className="mt-12 flex flex-wrap justify-center gap-2" aria-label="En bref">
          {heroChips.map((chip, i) => (
            <motion.li
              key={chip}
              initial={{ opacity: 0, x: -24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.6 + i * 0.08, ease }}
            >
              <Badge>{chip}</Badge>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  )
}
