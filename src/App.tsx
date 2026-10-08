import { MotionConfig } from "motion/react"

import { BookCta } from "@/components/sections/book-cta"
import { Dining } from "@/components/sections/dining"
import { Experiences } from "@/components/sections/experiences"
import { Footer } from "@/components/sections/footer"
import { Gallery } from "@/components/sections/gallery"
import { Hero } from "@/components/sections/hero"
import { Location } from "@/components/sections/location"
import { Navbar } from "@/components/sections/navbar"
import { Rooms } from "@/components/sections/rooms"
import { Testimonials } from "@/components/sections/testimonials"

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <Navbar />
      <main>
        <Hero />
        <Rooms />
        <Gallery />
        <Dining />
        <Experiences />
        <Testimonials />
        <Location />
        <BookCta />
      </main>
      <Footer />
    </MotionConfig>
  )
}
