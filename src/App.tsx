import { useEffect } from "react"
import { MotionConfig } from "motion/react"

import { Awards } from "@/components/sections/awards"
import { BookCta } from "@/components/sections/book-cta"
import { Cellar } from "@/components/sections/cellar"
import { Contact } from "@/components/sections/contact"
import { Discover } from "@/components/sections/discover"
import { Footer } from "@/components/sections/footer"
import { Gallery } from "@/components/sections/gallery"
import { Hero } from "@/components/sections/hero"
import { History } from "@/components/sections/history"
import { Navbar } from "@/components/sections/navbar"
import { Visit } from "@/components/sections/visit"
import { WhereToBuy } from "@/components/sections/where-to-buy"
import { Wines } from "@/components/sections/wines"
import { pages, useRoute, type Page } from "@/lib/router"

const sections: Record<Page, () => React.ReactNode> = {
  accueil: () => (
    <>
      <Hero />
      <Discover />
      <BookCta />
      <Contact />
    </>
  ),
  domaine: () => (
    <>
      <History />
      <Cellar />
      <Gallery />
      <BookCta />
      <Contact />
    </>
  ),
  vins: () => (
    <>
      <Wines />
      <Awards />
      <BookCta />
      <Contact />
    </>
  ),
  "ou-trouver": () => (
    <>
      <WhereToBuy />
      <BookCta />
      <Contact />
    </>
  ),
  visite: () => <Visit />,
}

export default function App() {
  const { page, anchor } = useRoute()

  useEffect(() => {
    document.title = pages[page].title
  }, [page])

  // Every page opens at its top (even when coming back to it), unless the link points to an element on
  // it, such as the contact form. A cuvée's name only picks the bottle, so its page opens at the top too.
  useEffect(() => {
    if ("scrollRestoration" in history) history.scrollRestoration = "manual"
  }, [])
  useEffect(() => {
    const jump = () => {
      // Jump straight there, without the page's smooth scrolling.
      const root = document.documentElement
      const smooth = root.style.scrollBehavior
      root.style.scrollBehavior = "auto"
      // Reading the style makes the browser apply "auto" before scrolling (older browsers ignore "instant").
      void getComputedStyle(root).scrollBehavior
      const target = anchor ? document.getElementById(anchor) : null
      if (target) target.scrollIntoView({ behavior: "instant", block: "start" })
      else window.scrollTo({ top: 0, left: 0, behavior: "instant" })
      root.style.scrollBehavior = smooth
    }
    const frame = requestAnimationFrame(jump)
    // Again once the phone menu has closed: unlocking the page's scroll can put back the old position.
    const later = window.setTimeout(jump, 400)
    return () => {
      cancelAnimationFrame(frame)
      window.clearTimeout(later)
    }
  }, [page, anchor])

  return (
    <MotionConfig reducedMotion="user">
      <Navbar />
      <main key={page}>{sections[page]()}</main>
      <Footer />
    </MotionConfig>
  )
}
