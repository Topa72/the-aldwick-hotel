import { lazy, Suspense, useState } from "react"
import { AnimatePresence, motion } from "motion/react"
import { ArrowLeft, ArrowRight } from "lucide-react"

import { SectionHeading } from "@/components/section-heading"
import { estate, servingNote, wines } from "@/data/content"
import { ease, fadeUp, inView } from "@/lib/motion"
import { cn } from "@/lib/utils"

const Bottles3D = lazy(() => import("@/components/bottles-3d"))

export function Wines() {
  const [selected, setSelected] = useState(0)
  const wine = wines[selected]
  const go = (delta: number) => setSelected((i) => (i + delta + wines.length) % wines.length)

  return (
    <section id="vins" className="border-t border-border bg-surface py-24 md:py-36" aria-labelledby="vins-title">
      <div className="container">
        <SectionHeading id="vins-title" eyebrow="Nos Vins" title="Les cuvées" />

        <motion.div
          className="mt-14 grid items-center gap-10 md:mt-20 lg:grid-cols-12 lg:gap-16"
          variants={fadeUp}
          {...inView}
        >
          <div className="lg:col-span-7">
            <div
              role="img"
              aria-label={`Bouteille de ${wine.name}, ${wine.appellation}`}
              className="relative h-[440px] w-full overflow-hidden bg-[radial-gradient(closest-side_at_50%_55%,hsl(38_46%_56%/0.1),transparent)] [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)] sm:h-[520px] lg:h-[600px]"
            >
              <Suspense fallback={null}>
                <Bottles3D bottles={wines} estateName={estate.name} selected={selected} onSelect={setSelected} />
              </Suspense>
            </div>

            <div className="mt-4 flex items-center justify-between gap-4">
              <button
                type="button"
                onClick={() => go(-1)}
                className="flex h-11 w-11 items-center justify-center border border-border text-foreground transition-colors hover:border-accent hover:text-accent"
                aria-label="Cuvée précédente"
              >
                <ArrowLeft className="h-4 w-4" strokeWidth={1.5} />
              </button>
              <p className="label text-center text-muted-foreground">Glissez pour faire tourner les bouteilles</p>
              <button
                type="button"
                onClick={() => go(1)}
                className="flex h-11 w-11 items-center justify-center border border-border text-foreground transition-colors hover:border-accent hover:text-accent"
                aria-label="Cuvée suivante"
              >
                <ArrowRight className="h-4 w-4" strokeWidth={1.5} />
              </button>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="min-h-[300px] sm:min-h-[260px]" aria-live="polite">
              <AnimatePresence mode="wait">
                <motion.div
                  key={wine.name}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.35, ease }}
                >
                  <p className="label text-accent">{wine.appellation}</p>
                  <h3 className="mt-4 font-serif text-[clamp(48px,5vw,72px)] font-semibold italic leading-none text-foreground">
                    {wine.name}
                  </h3>
                  <p className="mt-6 max-w-md text-[15px] font-light leading-relaxed text-muted-foreground">
                    {wine.description}
                  </p>
                  <a
                    href="#ou-trouver"
                    className="label mt-8 inline-flex items-center gap-2 text-accent transition-colors hover:text-foreground"
                  >
                    Où trouver ce vin <ArrowRight className="h-3.5 w-3.5" />
                  </a>
                </motion.div>
              </AnimatePresence>
            </div>

            <ul className="mt-10 border-t border-border" aria-label="Choisir une cuvée">
              {wines.map((w, i) => (
                <li key={w.name} className="border-b border-border">
                  <button
                    type="button"
                    onClick={() => setSelected(i)}
                    aria-pressed={i === selected}
                    className={cn(
                      "group flex w-full items-baseline justify-between gap-4 py-4 text-left transition-colors duration-200",
                      i === selected ? "text-accent" : "text-foreground/80 hover:text-accent",
                    )}
                  >
                    <span className="font-serif text-2xl font-semibold italic">{w.name}</span>
                    <span
                      className={cn(
                        "label transition-colors",
                        i === selected ? "text-accent" : "text-muted-foreground group-hover:text-accent/80",
                      )}
                    >
                      {w.appellation.replace("Sancerre ", "")}
                    </span>
                  </button>
                </li>
              ))}
            </ul>

            <p className="label mt-8 text-muted-foreground">{servingNote}</p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
