import { socials } from "@/data/content"

export function Footer() {
  return (
    <footer className="bg-background py-16">
      <div className="container flex flex-col items-center gap-8 text-center">
        <a href="#top" className="font-serif text-4xl font-semibold italic text-accent">
          The Aldwick
        </a>
        <ul className="flex items-center gap-3">
          {socials.map((s, i) => (
            <li key={s.label} className="flex items-center gap-3">
              {i > 0 && (
                <span aria-hidden className="text-muted-foreground">
                  ·
                </span>
              )}
              <a
                href={s.href}
                target="_blank"
                rel="noreferrer noopener"
                className="label text-foreground/80 transition-colors duration-200 hover:text-accent"
              >
                {s.label}
              </a>
            </li>
          ))}
        </ul>
        <span aria-hidden className="h-px w-16 bg-border" />
        <p className="max-w-3xl text-xs font-light leading-relaxed text-muted-foreground">
          © 2026 The Aldwick · Boutique Hotel &amp; Restaurant · Bourton-on-the-Water, Cotswolds GL54 ·{" "}
          <a href="tel:+441451123456" className="transition-colors hover:text-accent">
            +44 1451 123 456
          </a>
        </p>
      </div>
    </footer>
  )
}
