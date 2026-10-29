import { motion } from "motion/react"
import { Clock, Mail, MapPin, Navigation } from "lucide-react"

import { ContactForm } from "@/components/contact-form"
import { GoldRule } from "@/components/gold-rule"
import { SectionHeading } from "@/components/section-heading"
import { Button } from "@/components/ui/button"
import { estate, openingHours, visitInfo } from "@/data/content"
import { fadeUp, inView, stagger } from "@/lib/motion"

const mapQuery = estate.mapQuery && encodeURIComponent(estate.mapQuery)
// With the place id, Google opens the estate's own card (photos, reviews, hours) rather than a search.
const placeId = estate.mapPlaceId ? `&destination_place_id=${estate.mapPlaceId}` : ""
// The map is Google's own embed of the estate's listing, which writes spaces as "+".
const embedQuery = mapQuery && mapQuery.replace(/%20/g, "+")
const queryPlaceId = estate.mapPlaceId ? `&query_place_id=${estate.mapPlaceId}` : ""

export function Visit() {
  return (
    <section id="visites" className="py-24 md:py-36" aria-labelledby="visite-title">
      <div className="container grid gap-16 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <SectionHeading id="visite-title" eyebrow="Visites" title="Venir au domaine" />
          <motion.p
            variants={fadeUp}
            {...inView}
            className="mt-10 max-w-md text-[17px] font-light leading-relaxed text-muted-foreground"
          >
            Le domaine vous accueille à Champtin pour une dégustation ou une visite de cave, au cœur du vignoble de
            Sancerre.
          </motion.p>

          <motion.div variants={fadeUp} {...inView} className="mt-10 flex gap-4">
            <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-accent" strokeWidth={1.25} aria-hidden />
            <address className="label not-italic leading-loose text-foreground/85">
              {estate.address.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
              <a href={estate.phoneHref} className="mt-2 block text-accent hover:underline">
                {estate.phone}
              </a>
            </address>
          </motion.div>
        </div>

        <div className="flex flex-col gap-14 lg:col-span-7">
          <motion.div variants={fadeUp} {...inView}>
            <div className="flex items-center gap-3">
              <Clock className="h-5 w-5 text-accent" strokeWidth={1.25} aria-hidden />
              <h3 className="display text-4xl text-foreground">Horaires</h3>
            </div>
            <GoldRule className="mt-4 w-12" delay={0.2} />
            <dl className="mt-8 border-t border-border">
              {openingHours.map((row) => (
                <div
                  key={row.period}
                  className="grid gap-1 border-b border-border py-5 sm:grid-cols-[1.2fr_1fr_1.2fr] sm:items-baseline sm:gap-6"
                >
                  <dt className="label text-accent">{row.period}</dt>
                  <dd className="text-[15px] font-light text-muted-foreground">{row.days}</dd>
                  <dd className="text-[15px] font-normal tabular-nums text-foreground sm:text-right">{row.hours}</dd>
                </div>
              ))}
            </dl>
            <p className="mt-4 text-sm font-light text-muted-foreground">Fermé le dimanche et les jours fériés.</p>
          </motion.div>

          <motion.ul className="grid gap-10 sm:grid-cols-3" variants={stagger(0.12)} {...inView}>
            {visitInfo.map((item) => (
              <motion.li key={item.title} variants={fadeUp}>
                <h3 className="display text-3xl text-foreground">{item.title}</h3>
                <p className="mt-3 text-[15px] font-light leading-relaxed text-muted-foreground">{item.text}</p>
              </motion.li>
            ))}
          </motion.ul>
        </div>
      </div>

      <div className="container mt-20 grid gap-16 md:mt-28 lg:grid-cols-12">
        {mapQuery && (
          <motion.div variants={fadeUp} {...inView} className="flex flex-col lg:col-span-5">
            <div className="relative aspect-[4/3] overflow-hidden border border-border bg-surface lg:aspect-auto lg:min-h-[360px] lg:flex-1">
              <iframe
                title={`Plan d'accès : ${estate.name}`}
                src={`https://www.google.com/maps/embed?origin=mfe&pb=!1m4!2m1!1s${embedQuery}!5e0!6i10`}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="absolute inset-0 h-full w-full border-0"
              />
            </div>
            <div className="mt-4 flex flex-wrap gap-3">
              <Button asChild variant="gold" size="sm">
                <a
                  href={`https://www.google.com/maps/dir/?api=1&destination=${mapQuery}${placeId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Navigation /> Itinéraire
                </a>
              </Button>
              <Button asChild variant="gold-outline" size="sm">
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${mapQuery}${queryPlaceId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <MapPin /> Ouvrir dans Google Maps
                </a>
              </Button>
            </div>
          </motion.div>
        )}

        {/* The anchor sits outside the fade-in, so "Contactez-nous" links land below the header. */}
        <div id="contact" className={mapQuery ? "lg:col-span-7" : "lg:col-span-8 lg:col-start-3"}>
          <motion.div variants={fadeUp} {...inView}>
            <div className="flex items-center gap-3">
              <Mail className="h-5 w-5 text-accent" strokeWidth={1.25} aria-hidden />
              <h3 className="display text-4xl text-foreground">Contactez-nous</h3>
            </div>
            <GoldRule className="mt-4 w-12" delay={0.2} />
            <div className="mt-8">
              <ContactForm />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
