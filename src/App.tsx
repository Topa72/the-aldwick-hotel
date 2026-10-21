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

  // Go to the anchor once the page has rendered (a cuvée's anchor shows the wines), else to the top.
  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      const target =
        anchor && (document.getElementById(anchor) ?? (page === "vins" ? document.getElementById("vins") : null))
      if (target) target.scrollIntoView()
      else window.scrollTo({ top: 0, behavior: "instant" })
    })
    return () => cancelAnimationFrame(frame)
  }, [page, anchor])

  return (
    <MotionConfig reducedMotion="user">
      <Navbar />
      <main key={page}>{sections[page]()}</main>
      <Footer />
    </MotionConfig>
  )
}
