import { estate } from "@/data/content"

export function Footer() {
  return (
    <footer className="bg-background py-16">
      <div className="container flex flex-col items-center gap-8 text-center">
        <a href="#top" className="font-serif text-4xl font-semibold italic text-accent">
          {estate.name}
        </a>
        <p className="label leading-loose text-foreground/80">
          {estate.address.join(" · ")}
          <br />
          <a href={estate.phoneHref} className="transition-colors hover:text-accent">
            {estate.phone}
          </a>
        </p>
        <span aria-hidden className="h-px w-16 bg-border" />
        <p className="max-w-3xl text-xs font-light leading-relaxed text-muted-foreground">
          © 2026 {estate.name} · Sancerre, Crézancy-en-Sancerre
        </p>
        <p className="text-xs font-light text-muted-foreground">
          L'abus d'alcool est dangereux pour la santé. À consommer avec modération.
        </p>
      </div>
    </footer>
  )
}
