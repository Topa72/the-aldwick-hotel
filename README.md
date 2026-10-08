# Vignoble Dauny

Site du Vignoble Dauny (Sancerre, Crézancy-en-Sancerre) : design sombre et éditorial, construit avec React, Vite, TypeScript, Tailwind CSS, Motion (`motion/react`), shadcn/ui et lucide-react.

## Démarrer

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # vérification des types + build de production dans dist/
npm run preview    # sert le build de production
```

## Structure

```
src/
  App.tsx                     composition de la page
  index.css                   tokens de design (variables HSL) + styles typographiques
  data/content.ts             tous les textes : histoire, cuvées, revendeurs, horaires…
  data/images.ts              toutes les photos au même endroit
  components/ui/              composants shadcn (button, badge, sheet)
  components/sections/        navbar, hero, domaine, cuvées, chai, galerie,
                              où trouver nos vins, visites, appel à l'action, pied de page
```

## À vérifier avant la mise en ligne

Le contenu a été rassemblé à partir de sources publiques (office de tourisme, revendeurs, salons), car vignobledauny.fr n'était pas accessible pendant la construction.

- **Revendeurs** (`stockists` dans `src/data/content.ts`) : liste partielle, à compléter avec la liste officielle « Où trouver nos vins ».
- **Horaires** : les sources divergent (ouverture à 8h ou 9h). À confirmer.
- **Surface** : 16 ou 17 hectares selon les sources.
- **Cuvées Pynoz et Romble** : descriptions minimales, faute de fiches techniques.
- **Photos** : images Unsplash provisoires, à remplacer par celles du domaine dans `src/data/images.ts`.
