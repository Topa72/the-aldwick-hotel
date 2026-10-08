import { motion } from "motion/react"
import { ArrowUpRight } from "lucide-react"

import { SectionHeading } from "@/components/section-heading"
import { estate, exportCountries, stockists } from "@/data/content"
import { fadeUp, inView, stagger } from "@/lib/motion"
import { cn } from "@/lib/utils"

export function WhereToBuy() {
  return (
    <section id="ou-trouver" className="border-y border-border bg-surface py-24 md:py-36" aria-labelledby="ou-title">
      <div className="container">
        <SectionHeading id="ou-title" eyebrow="Revendeurs" title="Où trouver nos vins" />
        <motion.p
          variants={fadeUp}
          {...inView}
          className="mt-10 max-w-xl text-[17px] font-light leading-relaxed text-muted-foreground"
        >
          Au domaine, chez nos cavistes et en ligne, en France comme à l'étranger. Pour connaître le revendeur le plus
          proche de chez vous, appelez-nous au{" "}
          <a href={estate.phoneHref} className="whitespace-nowrap text-accent hover:underline">
            {estate.phone}
          </a>
          .
        </motion.p>

        <motion.div
          className="mt-16 grid gap-px border border-border bg-border sm:grid-cols-2 lg:grid-cols-3"
          variants={stagger(0.08)}
          {...inView}
        >
          {stockists.map((group, i) => {
            const last = i === stockists.length - 1
            return (
            <motion.div
              key={group.region}
              variants={fadeUp}
              className={cn(
                "bg-background p-8",
                // Let the last group fill any empty cells in its row.
                last && stockists.length % 2 === 1 && "sm:col-span-2",
                last && stockists.length % 3 === 1 && "lg:col-span-3",
                last && stockists.length % 3 === 2 && "lg:col-span-2",
                last && stockists.length % 3 === 0 && "lg:col-span-1",
              )}
            >
              <h3 className="label text-accent">{group.region}</h3>
              <ul className="mt-6 flex flex-col gap-5">
                {group.stockists.map((s) => (
                  <li key={s.name}>
                    {s.href ? (
                      <a
                        href={s.href}
                        target="_blank"
                        rel="noreferrer noopener"
                        className="group inline-flex items-baseline gap-1.5 font-serif text-[26px] font-semibold italic leading-tight text-foreground transition-colors duration-200 hover:text-accent"
                      >
                        {s.name}
                        <ArrowUpRight
                          className="h-4 w-4 self-center text-accent opacity-60 transition-opacity group-hover:opacity-100"
                          strokeWidth={1.5}
                          aria-hidden
                        />
                      </a>
                    ) : (
                      <span className="font-serif text-[26px] font-semibold italic leading-tight text-foreground">
                        {s.name}
                      </span>
                    )}
                    {s.detail && (
                      <p className="mt-1 text-sm font-light text-muted-foreground">{s.detail}</p>
                    )}
                  </li>
                ))}
              </ul>
            </motion.div>
            )
          })}
        </motion.div>

        <motion.div variants={fadeUp} {...inView} className="mt-16">
          <h3 className="label text-muted-foreground">Nos vins voyagent aussi en</h3>
          <ul className="mt-5 flex flex-wrap gap-x-3 gap-y-2 font-serif text-2xl italic text-foreground/90">
            {exportCountries.map((country, i) => (
              <li key={country} className="flex items-center gap-3">
                {country}
                {i < exportCountries.length - 1 && (
                  <span aria-hidden className="text-accent">
                    ·
                  </span>
                )}
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </section>
  )
}
