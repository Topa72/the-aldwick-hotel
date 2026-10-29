import { lazy, Suspense, useEffect, useMemo, useState } from "react"
import { AnimatePresence, motion } from "motion/react"
import { ArrowLeft, ArrowRight } from "lucide-react"

import { PhotoLightbox } from "@/components/photo-lightbox"
import { SectionHeading } from "@/components/section-heading"
import { awardsContest, estate, packagingNote, wineGroups, wines, wineSlug, type WineStyle } from "@/data/content"
import { ease, fadeUp, inView } from "@/lib/motion"
import { cn } from "@/lib/utils"
import { winePigment } from "@/lib/wine-colors"
import { href, useRoute } from "@/lib/router"

/** The cuvée an anchor names, as its colour and its position within that colour. */
function findWine(anchor?: string) {
  const wine = wines.find((w) => wineSlug(w) === anchor)
  if (!wine) return null
  return { style: wine.style, index: wines.filter((w) => w.style === wine.style).indexOf(wine) }
}

const Bottles3D = lazy(() => import("@/components/bottles-3d"))

export function Wines() {
  const { anchor } = useRoute()
  const [style, setStyle] = useState<WineStyle>(() => findWine(anchor)?.style ?? wineGroups[0].style)
  const [selected, setSelected] = useState(() => findWine(anchor)?.index ?? 0)

  // One stable array per colour, so the 3D scene only rebuilds when the colour changes.
  const byStyle = useMemo(
    () => Object.fromEntries(wineGroups.map((g) => [g.style, wines.filter((w) => w.style === g.style)])),
    [],
  ) as Record<WineStyle, typeof wines>
  const group = wineGroups.find((g) => g.style === style)!
  const list = byStyle[style]
  const wine = list[selected] ?? list[0]

  // Links can open a given cuvée directly (nos-vins.html#clos-du-roy).
  useEffect(() => {
    const pick = findWine(anchor)
    if (!pick) return
    setStyle(pick.style)
    setSelected(pick.index)
  }, [anchor])

  const pickStyle = (next: WineStyle) => {
    if (next === style) return
    setStyle(next)
    setSelected(0)
  }
  const go = (delta: number) => setSelected((i) => (i + delta + list.length) % list.length)

  return (
    <section id="vins" className="bg-surface py-24 md:py-36" aria-labelledby="vins-title">
      <div className="container">
        <SectionHeading id="vins-title" eyebrow="Nos Vins" title="Les cuvées" />

        <div
          role="tablist"
          aria-label="Couleur"
          className="mt-12 grid grid-cols-3 border-b border-border md:mt-16 md:flex md:gap-14"
        >
          {wineGroups.map((g) => {
            const active = g.style === style
            const count = byStyle[g.style].length
            return (
              <button
                key={g.style}
                type="button"
                role="tab"
                aria-selected={active}
                aria-controls="vins-panel"
                onClick={() => pickStyle(g.style)}
                className="group relative flex items-start gap-3 pb-5 text-left outline-none md:gap-4"
              >
                {/* A drop of the wine's own colour. */}
                <span
                  aria-hidden
                  className={cn(
                    "mt-[7px] h-3.5 w-3.5 shrink-0 rounded-full ring-1 ring-foreground/15 transition-transform duration-300 md:mt-[13px] md:h-4 md:w-4",
                    active ? "scale-110" : "opacity-70 group-hover:opacity-100",
                  )}
                  style={{ background: winePigment[g.style] }}
                />
                <span className="flex flex-col">
                  <span
                    className={cn(
                      "display text-[26px] leading-none transition-colors duration-200 md:text-[40px]",
                      active ? "text-accent" : "text-foreground/60 group-hover:text-foreground",
                    )}
                  >
                    {g.label}
                  </span>
                  <span className="label mt-2 text-[10px] text-muted-foreground md:text-[11px]">
                    {count} {count > 1 ? "cuvées" : "cuvée"}
                  </span>
                </span>
                {active && (
                  <motion.span
                    layoutId="wine-tab"
                    aria-hidden
                    className="absolute inset-x-0 -bottom-px h-0.5 bg-accent"
                    transition={{ duration: 0.45, ease }}
                  />
                )}
                <span
                  aria-hidden
                  className="absolute inset-0 -m-1 rounded-sm ring-accent group-focus-visible:ring-2"
                />
              </button>
            )
          })}
        </div>

        <motion.div
          id="vins-panel"
          role="tabpanel"
          className="mt-10 grid items-start gap-10 lg:grid-cols-12 lg:gap-16"
          variants={fadeUp}
          {...inView}
        >
          <div className="lg:sticky lg:top-24 lg:col-span-7">
            <div
              role="img"
              aria-label={`Bouteille de ${wine.name}, ${wine.appellation}`}
              className="relative h-[440px] w-full overflow-hidden bg-[radial-gradient(closest-side_at_50%_55%,hsl(38_46%_56%/0.1),transparent)] [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)] sm:h-[520px] lg:h-[600px]"
            >
              <Suspense fallback={null}>
                <Bottles3D bottles={list} estateName={estate.name} selected={selected} onSelect={setSelected} />
              </Suspense>
            </div>

            {list.length > 1 ? (
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
            ) : (
              <p className="label mt-4 flex h-11 items-center justify-center text-muted-foreground">
                Glissez pour faire tourner la bouteille
              </p>
            )}
          </div>

          <div className="lg:col-span-5">
            <div className="min-h-[760px] sm:min-h-[640px]" aria-live="polite">
              <AnimatePresence mode="wait">
                <motion.div
                  key={`${wine.style}-${wine.name}`}
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

                  {wine.awards.length > 0 && (
                    <ul className="mt-6 flex flex-wrap gap-2" aria-label={`Médailles, ${awardsContest}`}>
                      {wine.awards.map((a) => (
                        <li
                          key={`${a.medal}-${a.vintage}`}
                          className={cn(
                            "label inline-flex items-center gap-2 border px-2.5 py-1.5",
                            a.medal === "Or"
                              ? "border-accent/60 text-accent"
                              : "border-foreground/30 text-foreground/80",
                          )}
                        >
                          <span
                            aria-hidden
                            className={cn("h-2 w-2 rounded-full", a.medal === "Or" ? "bg-accent" : "bg-foreground/60")}
                          />
                          {a.medal} · {a.vintage}
                        </li>
                      ))}
                    </ul>
                  )}

                  <div className="mt-8 flex flex-col gap-6 border-t border-border pt-6 sm:flex-row">
                    {wine.photo && (
                      <PhotoLightbox
                        src={wine.photo}
                        alt={`Bouteille de ${wine.appellation} ${wine.name}`}
                        className="w-24"
                      />
                    )}
                    <dl className="grid min-w-0 flex-1 grid-cols-[auto_1fr] gap-x-6 gap-y-2.5 text-sm">
                      {wine.sheet.map((row) => (
                        <div key={row.label} className="contents">
                          <dt className="label pt-0.5 text-muted-foreground">{row.label}</dt>
                          <dd className="min-w-0 font-light text-foreground/90">{row.value}</dd>
                        </div>
                      ))}
                    </dl>
                  </div>

                  <a
                    href={href("ou-trouver")}
                    className="label mt-8 inline-flex items-center gap-2 text-accent transition-colors hover:text-foreground"
                  >
                    Où trouver ce vin <ArrowRight className="h-3.5 w-3.5" />
                  </a>
                </motion.div>
              </AnimatePresence>
            </div>

            <ul className="mt-10 border-t border-border" aria-label={`Cuvées ${group.label.toLowerCase()}`}>
              {list.map((w, i) => (
                <li key={`${w.style}-${w.name}`} className="border-b border-border">
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
                      {w.appellation}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
            <p className="mt-6 text-xs font-light leading-relaxed text-muted-foreground">{packagingNote}</p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
