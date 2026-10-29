import { motion } from "motion/react"
import { ArrowRight, Leaf, Sprout, Sun } from "lucide-react"

import { images } from "@/data/images"
import { fadeUp, inView, stagger } from "@/lib/motion"
import { href } from "@/lib/router"

const pillars = [
  {
    icon: Sprout,
    title: "Des sols vivants",
    text: "Fumier composté, labours et binages tout au long de l'année : la terre nourrit la vigne.",
  },
  {
    icon: Leaf,
    title: "Aucun produit de synthèse",
    text: "Ni engrais chimiques, ni désherbants, ni insecticides, ni pesticides de synthèse.",
  },
  {
    icon: Sun,
    title: "Depuis 1964",
    text: "Le vignoble est conduit en agriculture biologique depuis plus de soixante ans.",
  },
]

/** Home page: the estate's organic farming, put forward with the AB logo. */
export function Organic() {
  return (
    <section
      className="relative overflow-hidden border-y border-[#009901]/25 bg-[#0f1a12] py-20 md:py-28"
      aria-labelledby="bio-title"
    >
      {images.coteauxForOrganic && (
        <img
          src={images.coteauxForOrganic}
          alt=""
          aria-hidden
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover opacity-20"
        />
      )}
      <div
        aria-hidden
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_30%,rgba(0,153,1,0.18),transparent_60%)]"
      />
      <motion.div
        className="container relative grid items-center gap-12 lg:grid-cols-12"
        variants={stagger(0.12)}
        {...inView}
      >
        <motion.div variants={fadeUp} className="flex flex-col items-center text-center lg:col-span-4">
          {images.organicLogo && (
            <img
              src={images.organicLogo}
              alt="Logo Agriculture biologique (AB)"
              className="h-40 w-auto shadow-[0_20px_50px_-15px_rgba(0,153,1,0.55)] md:h-48"
            />
          )}
          <p className="label mt-6 text-[#7fd17f]">Vignoble certifié</p>
        </motion.div>
        <div className="lg:col-span-8">
          <motion.p variants={fadeUp} className="label text-[#7fd17f]">
            Agriculture biologique
          </motion.p>
          <motion.h2
            variants={fadeUp}
            id="bio-title"
            className="display mt-4 text-[clamp(40px,5vw,68px)] leading-none text-foreground"
          >
            Le bio, depuis toujours
          </motion.h2>
          <motion.ul variants={stagger(0.1)} className="mt-10 grid gap-8 sm:grid-cols-3">
            {pillars.map(({ icon: Icon, title, text }) => (
              <motion.li key={title} variants={fadeUp}>
                <span className="flex h-11 w-11 items-center justify-center rounded-full border border-[#009901]/60 text-[#7fd17f]">
                  <Icon className="h-5 w-5" strokeWidth={1.5} />
                </span>
                <h3 className="mt-4 font-serif text-2xl font-semibold italic text-foreground">{title}</h3>
                <p className="mt-2 text-[15px] font-light leading-relaxed text-muted-foreground">{text}</p>
              </motion.li>
            ))}
          </motion.ul>
          <motion.a
            variants={fadeUp}
            href={href("domaine", "chai-title")}
            className="label mt-10 inline-flex items-center gap-2 text-[#7fd17f] transition-colors hover:text-foreground"
          >
            Notre façon de travailler <ArrowRight className="h-3.5 w-3.5" />
          </motion.a>
        </div>
      </motion.div>
    </section>
  )
}
