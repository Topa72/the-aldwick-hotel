import { MotionConfig } from "motion/react"

import { BookCta } from "@/components/sections/book-cta"
import { Cellar } from "@/components/sections/cellar"
import { Footer } from "@/components/sections/footer"
import { Gallery } from "@/components/sections/gallery"
import { Hero } from "@/components/sections/hero"
import { History } from "@/components/sections/history"
import { Navbar } from "@/components/sections/navbar"
import { Visit } from "@/components/sections/visit"
import { WhereToBuy } from "@/components/sections/where-to-buy"
import { Wines } from "@/components/sections/wines"

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <Navbar />
      <main>
        <Hero />
        <History />
        <Wines />
        <Cellar />
        <Gallery />
        <WhereToBuy />
        <Visit />
        <BookCta />
      </main>
      <Footer />
    </MotionConfig>
  )
}
