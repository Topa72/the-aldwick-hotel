import { credits, estate, legal } from "@/data/content"

const { bottleModel } = credits

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
        <details className="group max-w-2xl text-left text-xs font-light leading-relaxed text-muted-foreground">
          <summary className="label cursor-pointer list-none text-center text-foreground/70 transition-colors hover:text-accent">
            Mentions légales
          </summary>
          <dl className="mt-5 grid gap-x-6 gap-y-2 sm:grid-cols-[auto_1fr]">
            <dt className="label text-foreground/60">Éditeur</dt>
            <dd>{legal.publisher}</dd>
            <dt className="label text-foreground/60">Publication</dt>
            <dd>{legal.director}</dd>
            <dt className="label text-foreground/60">Hébergement</dt>
            <dd>{legal.host}</dd>
            <dt className="label text-foreground/60">Données</dt>
            <dd>{legal.privacy}</dd>
            <dt className="label text-foreground/60">Crédits</dt>
            <dd>
              Bouteilles 3D d'après le modèle «{" "}
              <a
                href={bottleModel.source}
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-accent"
              >
                {bottleModel.title}
              </a>{" "}
              » de {bottleModel.author} (Sketchfab), sous licence{" "}
              <a
                href={bottleModel.licenseUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-accent"
              >
                {bottleModel.license}
              </a>{" "}
              ({bottleModel.changes}).
            </dd>
          </dl>
        </details>
      </div>
    </footer>
  )
}
