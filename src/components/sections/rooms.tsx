import { motion } from "motion/react"

import { SectionHeading } from "@/components/section-heading"
import { rooms } from "@/data/content"
import { fadeUp, inView, stagger } from "@/lib/motion"

export function Rooms() {
  return (
    <section id="rooms" className="py-24 md:py-36" aria-labelledby="rooms-title">
      <div className="container">
        <SectionHeading id="rooms-title" eyebrow="Stay" title="The Rooms" />

        <motion.ul className="mt-16 border-t border-border md:mt-20" variants={stagger(0.1)} {...inView}>
          {rooms.map((room) => (
            <motion.li key={room.name} variants={fadeUp}>
              <a
                href="#book"
                className="group grid grid-cols-1 gap-5 border-b border-border px-1 py-10 transition-[background-color,transform,box-shadow] duration-200 hover:-translate-y-1 hover:bg-surface-raised hover:shadow-[0_18px_40px_-24px_rgba(0,0,0,0.7)] md:grid-cols-12 md:items-center md:gap-8 md:px-8 md:py-12"
              >
                <div className="md:col-span-5">
                  <p className="label mb-3 text-muted-foreground transition-colors duration-200 group-hover:text-accent/80">
                    {room.count}
                  </p>
                  <h3 className="font-serif text-[clamp(40px,4.6vw,64px)] font-semibold italic leading-none text-foreground transition-colors duration-200 group-hover:text-accent">
                    {room.name}
                  </h3>
                </div>

                <p className="max-w-md text-[15px] font-light leading-relaxed text-muted-foreground transition-colors duration-200 group-hover:text-foreground/85 md:col-span-4">
                  {room.description}
                </p>

                <div className="flex items-baseline justify-between gap-6 md:col-span-3 md:justify-end">
                  <p className="text-muted-foreground transition-colors duration-200 group-hover:text-foreground">
                    <span className="label mr-2">From</span>
                    <span className="font-serif text-3xl italic text-foreground transition-colors duration-200 group-hover:text-accent">
                      £{room.price}
                    </span>
                    <span className="text-sm font-light"> / night</span>
                  </p>
                  <span
                    aria-hidden
                    className="font-serif text-4xl text-accent transition-transform duration-200 group-hover:translate-x-1.5"
                  >
                    →
                  </span>
                </div>
              </a>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  )
}
