import { useEffect, useState } from "react"
import { ArrowRight, Menu } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { estate, navLinks } from "@/data/content"
import { cn } from "@/lib/utils"

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-40 border-b pt-[env(safe-area-inset-top,0px)] transition-colors duration-300 [backdrop-filter:blur(14px)] [-webkit-backdrop-filter:blur(14px)]",
        scrolled ? "border-border/70 bg-background/85" : "border-transparent bg-background/40",
      )}
    >
      <nav className="container flex h-[72px] items-center justify-between" aria-label="Navigation principale">
        <a href="#top" className="font-serif text-[28px] font-semibold italic leading-none text-accent">
          {estate.name}
        </a>

        <div className="hidden items-center gap-10 lg:flex">
          <ul className="flex items-center gap-8">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="label text-foreground/80 transition-colors duration-200 hover:text-accent"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <Button asChild variant="gold-outline" size="sm">
            <a href="#visites">
              Nous rendre visite <ArrowRight />
            </a>
          </Button>
        </div>

        <Sheet>
          <SheetTrigger asChild>
            <button
              className="flex h-10 w-10 items-center justify-center text-foreground transition-colors hover:text-accent lg:hidden"
              aria-label="Ouvrir le menu"
            >
              <Menu className="h-6 w-6" strokeWidth={1.25} />
            </button>
          </SheetTrigger>
          <SheetContent>
            <SheetTitle className="font-serif text-3xl font-semibold italic text-accent">{estate.name}</SheetTitle>
            <SheetDescription className="label mt-2 text-muted-foreground">Sancerre · Bio depuis 1964</SheetDescription>
            <ul className="mt-14 flex flex-col">
              {navLinks.map((link) => (
                <li key={link.href} className="border-b border-border">
                  <SheetClose asChild>
                    <a
                      href={link.href}
                      className="display block py-5 text-4xl text-foreground transition-colors hover:text-accent"
                    >
                      {link.label}
                    </a>
                  </SheetClose>
                </li>
              ))}
            </ul>
            <SheetClose asChild>
              <Button asChild variant="gold" className="mt-auto w-full">
                <a href="#visites">
                  Nous rendre visite <ArrowRight />
                </a>
              </Button>
            </SheetClose>
          </SheetContent>
        </Sheet>
      </nav>
    </header>
  )
}
