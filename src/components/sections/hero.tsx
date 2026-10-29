import { lazy, Suspense, useState } from "react"
import { motion } from "motion/react"
import { ArrowRight } from "lucide-react"

import { BasketPhoto } from "@/components/basket-photo"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { estate, heroChips, wines, wineSlug } from "@/data/content"
import { images } from "@/data/images"
import { ease } from "@/lib/motion"
import { cn } from "@/lib/utils"
import { href } from "@/lib/router"

const BottleLineup = lazy(() => import("@/components/bottle-lineup"))

const backdrop = images.heroBackdrop

/**
 * Film grain laid over both the photo and the 3D bottles, so they share the same texture, as if they
 * came out of the same camera.
 */
const GRAIN =
  "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='180' height='180'><filter id='g'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/><feColorMatrix type='saturate' values='0'/></filter><rect width='100%' height='100%' filter='url(%23g)'/></svg>\")"

const rise = (delay: number) => ({
  initial: { opacity: 0, y: 32 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.9, delay, ease },
})

export function Hero() {
  const [hovered, setHovered] = useState<number | null>(null)
  const open = (i: number) => window.location.assign(href("vins", wineSlug(wines[i])))
  const named = hovered === null ? null : wines[hovered]

  return (
    <section
      id="top"
      className="relative flex w-full items-center overflow-hidden pb-16 pt-24 lg:min-h-[100svh] lg:items-stretch lg:pb-10"
      aria-label="Accueil"
    >
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 55% 60% at 68% 52%, rgba(201,165,90,0.18), transparent 70%), linear-gradient(to bottom, #13181f, #171c24 60%, #13181f)",
        }}
      />
      {/* On large screens the bottles stand on the stone ledge of a picture filling the section. */}
      {backdrop && (
        <>
          <img
            src={backdrop}
            alt=""
            aria-hidden
            fetchPriority="high"
            decoding="async"
            className="absolute inset-0 hidden h-full w-full object-cover object-left-bottom lg:block"
          />
          {/* Dark behind the text, clear over the ledge the bottles stand on. */}
          <div
            aria-hidden
            className="absolute inset-0 hidden lg:block"
            style={{
              background:
                "linear-gradient(to right, rgba(19,24,31,0.86), rgba(19,24,31,0.62) 34%, rgba(19,24,31,0.08) 58%, rgba(19,24,31,0)), linear-gradient(to bottom, rgba(19,24,31,0.55), transparent 16%, transparent 94%, #13181f)",
            }}
          />
        </>
      )}

      <div className="container relative z-10 grid items-center gap-6 lg:grid-cols-12 lg:gap-10">
        <div className="order-2 flex flex-col items-center text-center lg:order-1 lg:col-span-5 lg:items-start lg:self-center lg:text-left">
          <motion.p {...rise(0)} className="label text-accent">
            Sancerre · Crézancy-en-Sancerre
          </motion.p>

          <motion.h1
            {...rise(0.15)}
            className="display mt-6 text-[clamp(52px,6.2vw,104px)] leading-[0.88] text-foreground"
          >
            Vignerons
            <br />
            <span className="text-accent">depuis 1683.</span>
          </motion.h1>

          <motion.p
            {...rise(0.3)}
            className="mt-8 max-w-[480px] text-base font-light leading-relaxed text-foreground/75 md:text-[17px]"
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

          <ul className="mt-10 flex flex-wrap justify-center gap-2 lg:justify-start" aria-label="En bref">
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

        <motion.div
          className="order-1 lg:order-2 lg:col-span-7 lg:self-end"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease }}
        >
          <div
            className={cn(
              "relative min-h-[220px] lg:h-[62vh] lg:min-h-[420px]",
              // In the photo, the bottles take its softness and colour: a touch of blur (the photo is
              // enlarged, so never razor sharp), a little less saturation, a little more contrast.
              backdrop ? "h-[36vh] min-h-[260px] [&_canvas]:[filter:blur(0.35px)_saturate(0.92)]" : "h-[30vh]",
            )}
          >
            {/* On phones the photo sits behind the bottles only, its edges melting into the page. */}
            {backdrop && (
              <img
                src={backdrop}
                alt=""
                aria-hidden
                decoding="async"
                className="absolute inset-0 h-full w-full object-cover object-[72%_100%] [mask-image:linear-gradient(to_bottom,transparent,black_22%,black_80%,transparent),linear-gradient(to_right,transparent,black_12%,black_88%,transparent)] [mask-composite:intersect] [-webkit-mask-composite:source-in] lg:hidden"
              />
            )}
            {images.basketPhoto ? (
              <BasketPhoto
                src={images.basketPhoto}
                back={images.basketBack}
                shadow={images.basketShadow}
                bottles={wines}
                estateName={estate.name}
                hovered={hovered}
                onHover={setHovered}
                onPick={open}
              />
            ) : (
              <Suspense fallback={null}>
                <BottleLineup
                  bottles={wines}
                  estateName={estate.name}
                  hovered={hovered}
                  onHover={setHovered}
                  onPick={open}
                  outdoor={!!backdrop}
                  basket
                />
              </Suspense>
            )}
          </div>
          <p className="label mt-2 min-h-5 text-center [text-shadow:0_1px_10px_rgba(0,0,0,0.9)]" aria-live="polite">
            {named ? (
              <span className={cn("text-accent", backdrop && "bg-background/75 px-3 py-1.5")}>
                {named.name} · {named.appellation}
              </span>
            ) : (
              <span className={backdrop ? "bg-background/75 px-3 py-1.5 text-foreground/85" : "text-muted-foreground"}>
                Choisissez une bouteille
              </span>
            )}
          </p>
          {/* The same choice for keyboards and screen readers. */}
          <ul className="sr-only" aria-label="Nos cuvées">
            {wines.map((w, i) => (
              <li key={wineSlug(w)}>
                <a href={href("vins", wineSlug(w))} onFocus={() => setHovered(i)} onBlur={() => setHovered(null)}>
                  {w.name}, {w.appellation}
                </a>
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
      {backdrop && (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 z-20 opacity-[0.13] mix-blend-overlay"
          style={{ backgroundImage: GRAIN }}
        />
      )}
    </section>
  )
}
