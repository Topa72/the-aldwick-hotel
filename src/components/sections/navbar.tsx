import { useEffect, useRef, useState } from "react"
import { ArrowRight, ChevronDown, Menu } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { estate, navLinks, wineGroups, wines, wineSlug } from "@/data/content"
import { href, useRoute } from "@/lib/router"
import { cn } from "@/lib/utils"

/** The cuvées of each colour, in the order of the wines section's tabs. */
const winesByGroup = wineGroups.map((g) => ({ ...g, wines: wines.filter((w) => w.style === g.style) }))

/** Desktop "Nos Vins" entry: opens a panel listing every cuvée by colour. */
function WinesMenu({ label, current }: { label: string; current: boolean }) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLLIElement>(null)
  // Set when hovering opened the panel, so the click that usually follows keeps it open instead of closing it.
  const openedByHover = useRef(false)

  useEffect(() => {
    if (!open) return
    const onPointerDown = (e: PointerEvent) => {
      if (!ref.current?.contains(e.target as Node)) setOpen(false)
    }
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false)
    }
    document.addEventListener("pointerdown", onPointerDown)
    document.addEventListener("keydown", onKeyDown)
    return () => {
      document.removeEventListener("pointerdown", onPointerDown)
      document.removeEventListener("keydown", onKeyDown)
    }
  }, [open])

  return (
    <li
      ref={ref}
      className="relative"
      onMouseEnter={() => {
        openedByHover.current = !open
        setOpen(true)
      }}
      onMouseLeave={() => {
        openedByHover.current = false
        setOpen(false)
      }}
    >
      <button
        type="button"
        aria-expanded={open}
        aria-controls="menu-vins"
        aria-current={current ? "page" : undefined}
        onClick={() => {
          if (openedByHover.current) openedByHover.current = false
          else setOpen((o) => !o)
        }}
        className={cn(
          "label inline-flex items-center gap-1.5 transition-colors duration-200 hover:text-accent",
          open || current ? "text-accent" : "text-foreground/80",
        )}
      >
        {label}
        <ChevronDown className={cn("h-3.5 w-3.5 transition-transform duration-200", open && "rotate-180")} />
      </button>
      {/* The top padding bridges the gap to the panel so it stays open while the pointer moves down. */}
      <div id="menu-vins" hidden={!open} className="absolute left-1/2 top-full -translate-x-1/2 pt-5">
        <div className="grid w-[600px] grid-cols-3 gap-8 border border-border bg-background p-7 shadow-2xl">
          {winesByGroup.map((g) => (
            <div key={g.style}>
              <a
                href={href("vins", wineSlug(g.wines[0]))}
                onClick={() => setOpen(false)}
                className="label flex items-baseline justify-between border-b border-border pb-3 text-accent transition-colors hover:text-foreground"
              >
                {g.label}
                <span className="tabular-nums text-muted-foreground">{g.wines.length}</span>
              </a>
              <ul className="mt-4 flex flex-col gap-3">
                {g.wines.map((w) => (
                  <li key={w.name}>
                    <a
                      href={href("vins", wineSlug(w))}
                      onClick={() => setOpen(false)}
                      className="font-serif text-xl font-semibold italic leading-tight text-foreground/85 transition-colors hover:text-accent"
                    >
                      {w.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </li>
  )
}

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const { page } = useRoute()

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
        <a href={href("accueil")} className="font-serif text-[28px] font-semibold italic leading-none text-accent">
          {estate.name}
        </a>

        <div className="hidden items-center gap-10 lg:flex">
          <ul className="flex items-center gap-8">
            {navLinks.map((link) =>
              link.page === "vins" ? (
                <WinesMenu key={link.page} label={link.label} current={page === link.page} />
              ) : (
                <li key={link.page}>
                  <a
                    href={href(link.page)}
                    aria-current={page === link.page ? "page" : undefined}
                    className={cn(
                      "label transition-colors duration-200 hover:text-accent",
                      page === link.page ? "text-accent" : "text-foreground/80",
                    )}
                  >
                    {link.label}
                  </a>
                </li>
              ),
            )}
          </ul>
          <Button asChild variant="gold-outline" size="sm">
            <a href={href("visite", "contact")}>
              Contactez-nous <ArrowRight />
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
          <SheetContent className="overflow-y-auto">
            <SheetTitle className="font-serif text-3xl font-semibold italic text-accent">{estate.name}</SheetTitle>
            <SheetDescription className="label mt-2 text-muted-foreground">Sancerre · Bio depuis 1964</SheetDescription>
            <ul className="mt-14 flex flex-col">
              {navLinks.map((link) => (
                <li key={link.page} className="border-b border-border">
                  <SheetClose asChild>
                    <a
                      href={href(link.page)}
                      aria-current={page === link.page ? "page" : undefined}
                      className={cn(
                        "display block py-5 text-4xl transition-colors hover:text-accent",
                        page === link.page ? "text-accent" : "text-foreground",
                      )}
                    >
                      {link.label}
                    </a>
                  </SheetClose>
                  {link.page === "vins" && (
                    <div className="-mt-1 grid grid-cols-3 gap-4 pb-6">
                      {winesByGroup.map((g) => (
                        <div key={g.style}>
                          <p className="label text-accent">{g.label}</p>
                          <ul className="mt-2 flex flex-col gap-1.5">
                            {g.wines.map((w) => (
                              <li key={w.name}>
                                <SheetClose asChild>
                                  <a
                                    href={href("vins", wineSlug(w))}
                                    className="font-serif text-lg font-semibold italic leading-tight text-foreground/80 transition-colors hover:text-accent"
                                  >
                                    {w.name}
                                  </a>
                                </SheetClose>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  )}
                </li>
              ))}
            </ul>
            <SheetClose asChild>
              <Button asChild variant="gold" className="mt-auto w-full">
                <a href={href("visite", "contact")}>
                  Contactez-nous <ArrowRight />
                </a>
              </Button>
            </SheetClose>
          </SheetContent>
        </Sheet>
      </nav>
    </header>
  )
}
