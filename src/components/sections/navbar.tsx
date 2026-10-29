import { useEffect, useRef, useState } from "react"
import { ArrowRight, ChevronDown, Menu } from "lucide-react"

import { EstateLogo } from "@/components/estate-logo"
import { Button } from "@/components/ui/button"
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { navLinks, wineGroups, wines, wineSlug } from "@/data/content"
import { href, useRoute } from "@/lib/router"
import { cn } from "@/lib/utils"
import { winePigment } from "@/lib/wine-colors"

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
        <div className="grid w-[760px] grid-cols-3 gap-10 border border-border border-t-accent/70 bg-background px-9 pb-8 pt-7 shadow-2xl">
          {winesByGroup.map((g) => (
            <div key={g.style}>
              <a
                href={href("vins", wineSlug(g.wines[0]))}
                onClick={() => setOpen(false)}
                className="group flex items-start gap-3 border-b border-border pb-4"
              >
                <span
                  aria-hidden
                  className="mt-[9px] h-3 w-3 shrink-0 rounded-full ring-1 ring-foreground/15"
                  style={{ background: winePigment[g.style] }}
                />
                <span className="flex flex-col">
                  <span className="display text-3xl leading-none text-foreground transition-colors group-hover:text-accent">
                    {g.label}
                  </span>
                  <span className="label mt-2 text-[10px] text-muted-foreground">
                    {g.wines.length} {g.wines.length > 1 ? "cuvées" : "cuvée"}
                  </span>
                </span>
              </a>
              <ul className="mt-3 flex flex-col">
                {g.wines.map((w) => (
                  <li key={w.name}>
                    <a
                      href={href("vins", wineSlug(w))}
                      onClick={() => setOpen(false)}
                      className="group flex items-center gap-3 py-2.5"
                    >
                      {w.look?.label && (
                        <img
                          src={w.look.label.src}
                          alt=""
                          aria-hidden
                          loading="lazy"
                          className="h-9 w-11 shrink-0 object-contain opacity-80 transition-opacity group-hover:opacity-100"
                        />
                      )}
                      <span className="min-w-0 flex-1">
                        <span className="block font-serif text-lg font-semibold italic leading-tight text-foreground/85 transition-colors group-hover:text-accent">
                          {w.name}
                        </span>
                        <span className="label block text-[10px] text-muted-foreground">{w.appellation}</span>
                      </span>
                      <ArrowRight className="h-3.5 w-3.5 -translate-x-1 text-accent opacity-0 transition-all duration-200 group-hover:translate-x-0 group-hover:opacity-100" />
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
        <a href={href("accueil")} className="text-accent transition-opacity hover:opacity-80">
          <EstateLogo className="h-10 text-[28px]" />
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
            <SheetTitle className="text-accent">
              <EstateLogo className="h-12 text-3xl" />
            </SheetTitle>
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
                          <p className="label flex items-center gap-2 text-foreground/70">
                            <span
                              aria-hidden
                              className="h-2.5 w-2.5 rounded-full ring-1 ring-foreground/15"
                              style={{ background: winePigment[g.style] }}
                            />
                            {g.label}
                          </p>
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
