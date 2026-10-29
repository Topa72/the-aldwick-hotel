import { motion } from "motion/react"
import { ArrowUpRight, Globe2, MapPin, Phone, Plane, ShoppingBag, Store } from "lucide-react"

import { SectionHeading } from "@/components/section-heading"
import { estate, exportCountries, salesSplit, stockists } from "@/data/content"
import { images } from "@/data/images"
import { ease, fadeUp, inView, stagger } from "@/lib/motion"
import { cn } from "@/lib/utils"

// The three shares of the sales bar, from deep to light gold, with their icons.
const shareTones = ["#c9a55a", "#8f733c", "#e3cc95"]
const shareIcons = [Store, Plane, ShoppingBag]

export function WhereToBuy() {
  const [home, ...abroad] = stockists
  return (
    <section id="ou-trouver" className="border-b border-border bg-surface py-24 md:py-36" aria-labelledby="ou-title">
      <div className="container">
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-6">
            <SectionHeading id="ou-title" eyebrow="Revendeurs" title="Où trouver nos vins" />
            <motion.p
              variants={fadeUp}
              {...inView}
              className="mt-10 max-w-xl text-[17px] font-light leading-relaxed text-muted-foreground"
            >
              Au domaine, chez nos cavistes et en ligne, en France comme à l'étranger. Pour connaître le revendeur le
              plus proche de chez vous, appelez-nous.
            </motion.p>
            <motion.div variants={fadeUp} {...inView} className="mt-8 flex flex-wrap gap-3">
              <a
                href={estate.phoneHref}
                className="label inline-flex items-center gap-2.5 border border-accent bg-accent px-5 py-3 text-accent-foreground transition-colors hover:bg-transparent hover:text-accent"
              >
                <Phone className="h-4 w-4" strokeWidth={1.5} /> {estate.phone}
              </a>
              <span className="label inline-flex items-center gap-2.5 border border-border px-5 py-3 text-foreground/80">
                <MapPin className="h-4 w-4 text-accent" strokeWidth={1.5} /> Vente directe à Champtin
              </span>
            </motion.div>
          </div>
          {images.stockistsPhoto && (
            <motion.figure
              className="relative lg:col-span-6"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 1, ease }}
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <img
                  src={images.stockistsPhoto}
                  alt="La mise en bouteille au domaine"
                  loading="lazy"
                  decoding="async"
                  className="absolute inset-0 h-full w-full object-cover"
                />
                <div aria-hidden className="absolute inset-0 ring-1 ring-inset ring-foreground/10" />
              </div>
              {/* A gold corner, offset behind the photo. */}
              <span aria-hidden className="absolute -bottom-3 -right-3 -z-0 h-24 w-24 border-b border-r border-accent/70" />
              <span aria-hidden className="absolute -left-3 -top-3 h-24 w-24 border-l border-t border-accent/70" />
            </motion.figure>
          )}
        </div>

        {/* France first, in full; then each country abroad. */}
        <motion.div className="mt-20 grid gap-6 lg:grid-cols-12" variants={stagger(0.08)} {...inView}>
          <motion.div
            variants={fadeUp}
            className="relative overflow-hidden border border-border bg-background p-8 lg:col-span-5 lg:p-10"
          >
            <span aria-hidden className="absolute inset-x-0 top-0 h-0.5 bg-accent" />
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-full border border-accent/50 text-accent">
                <Store className="h-[18px] w-[18px]" strokeWidth={1.5} />
              </span>
              <h3 className="display text-4xl text-foreground">{home.region}</h3>
            </div>
            <StockistList group={home} />
          </motion.div>

          <div className="grid content-start gap-6 sm:grid-cols-2 lg:col-span-7">
            {abroad.map((group) => (
              <motion.div
                key={group.region}
                variants={fadeUp}
                className="group/card relative border border-border bg-background p-7 transition-colors duration-300 hover:border-accent/50"
              >
                <div className="flex items-center justify-between">
                  <h3 className="display text-3xl text-foreground">{group.region}</h3>
                  <Globe2
                    className="h-5 w-5 text-accent/60 transition-colors group-hover/card:text-accent"
                    strokeWidth={1.25}
                    aria-hidden
                  />
                </div>
                <StockistList group={group} compact />
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* How the sales divide, as one bar. */}
        <motion.div variants={fadeUp} {...inView} className="mt-20">
          <h3 className="label text-muted-foreground">Répartition de nos ventes</h3>
          <div className="mt-6 flex h-3 w-full overflow-hidden" aria-hidden>
            {salesSplit.map((row, i) => (
              <motion.span
                key={row.label}
                initial={{ width: 0 }}
                whileInView={{ width: `${row.share}%` }}
                viewport={{ once: true }}
                transition={{ duration: 1.2, delay: 0.15 * i, ease }}
                style={{ background: shareTones[i] }}
              />
            ))}
          </div>
          <dl className="mt-8 grid gap-8 sm:grid-cols-3">
            {salesSplit.map((row, i) => {
              const Icon = shareIcons[i]
              return (
                <div key={row.label} className="flex items-start gap-4">
                  <span
                    className="mt-1 flex h-11 w-11 shrink-0 items-center justify-center rounded-full"
                    style={{ background: `${shareTones[i]}22`, color: shareTones[i] }}
                  >
                    <Icon className="h-5 w-5" strokeWidth={1.5} />
                  </span>
                  <div className="flex flex-col">
                    <dd className="font-serif text-5xl font-semibold italic leading-none tabular-nums text-foreground">
                      {row.share}&nbsp;%
                    </dd>
                    <dt className="label order-first mb-2 text-[10px] text-muted-foreground">{row.label}</dt>
                  </div>
                </div>
              )
            })}
          </dl>
        </motion.div>
      </div>

      {/* Export, over the hillsides. */}
      <motion.div
        variants={fadeUp}
        {...inView}
        className="relative mt-24 overflow-hidden py-20 md:py-24"
        aria-labelledby="export-title"
      >
        {images.exportPhoto && (
          <img
            src={images.exportPhoto}
            alt=""
            aria-hidden
            loading="lazy"
            className="absolute inset-0 h-full w-full object-cover"
          />
        )}
        <div
          aria-hidden
          className="absolute inset-0 bg-[linear-gradient(to_bottom,hsl(var(--surface)),hsl(var(--surface)/0.78)_25%,hsl(var(--surface)/0.78)_75%,hsl(var(--surface)))]"
        />
        <div className="container relative text-center">
          <Plane className="mx-auto h-6 w-6 text-accent" strokeWidth={1.25} aria-hidden />
          <h3 id="export-title" className="display mt-4 text-[clamp(36px,4.5vw,60px)] text-foreground">
            Nos vins voyagent
          </h3>
          <p className="label mt-3 text-muted-foreground">{exportCountries.length} pays · 45 % de nos ventes</p>
          <ul className="mx-auto mt-10 flex max-w-4xl flex-wrap justify-center gap-3">
            {exportCountries.map((country) => (
              <li
                key={country}
                className="border border-foreground/20 bg-background/60 px-5 py-2.5 font-serif text-xl italic text-foreground/90 backdrop-blur-sm transition-colors hover:border-accent hover:text-accent"
              >
                {country}
              </li>
            ))}
          </ul>
        </div>
      </motion.div>
    </section>
  )
}

function StockistList({ group, compact = false }: { group: (typeof stockists)[number]; compact?: boolean }) {
  return (
    <ul className={cn("flex flex-col", compact ? "mt-5 gap-4" : "mt-8 gap-5")}>
      {group.stockists.map((s) => (
        <li key={s.name} className={cn(!compact && "border-b border-border/60 pb-5 last:border-0 last:pb-0")}>
          {s.href ? (
            <a
              href={s.href}
              target="_blank"
              rel="noreferrer noopener"
              className={cn(
                "group inline-flex items-baseline gap-1.5 font-serif font-semibold italic leading-tight text-foreground transition-colors duration-200 hover:text-accent",
                compact ? "text-[22px]" : "text-[26px]",
              )}
            >
              {s.name}
              <ArrowUpRight
                className="h-4 w-4 self-center text-accent opacity-60 transition-opacity group-hover:opacity-100"
                strokeWidth={1.5}
                aria-hidden
              />
            </a>
          ) : (
            <span
              className={cn(
                "font-serif font-semibold italic leading-tight text-foreground",
                compact ? "text-[22px]" : "text-[26px]",
              )}
            >
              {s.name}
            </span>
          )}
          {s.detail && <p className="mt-1 text-sm font-light text-muted-foreground">{s.detail}</p>}
        </li>
      ))}
    </ul>
  )
}
