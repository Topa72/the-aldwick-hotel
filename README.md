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

Le contenu reprend le site officiel vignobledauny.fr (histoire, vigne et bio, fiches techniques, médailles, revendeurs), lu par recherche web car le site n'était pas accessible directement. Les pages officielles datent d'environ 2020 ; les horaires de visite et les revendeurs étrangers viennent d'autres sources publiques (office de tourisme, cavistes).

- **Revendeurs** (`stockists` dans `src/data/content.ts`) : les enseignes bio viennent de la page officielle ; les revendeurs étrangers, de leurs propres sites.
- **Horaires** : les sources divergent (ouverture à 8h ou 9h). À confirmer.
- **Médailles** : palmarès du site officiel, arrêté en 2020. À compléter avec les médailles plus récentes.
- **Répartition des ventes** : la page française indique 30 / 45 / 25 %, la page anglaise 35 / 30 / 35 %. La version française est utilisée.
- **Cuvées** : gamme et fiches techniques du site officiel (2 rouges, 4 blancs, 1 rosé). Fiches complètes pour les blancs et les rouges ; celle du rosé vient de la recherche web.
- **Bouteilles 3D** : les blancs et les rouges portent leurs vraies étiquettes, teintes de verre et capsules, extraites des photos du site (`public/labels`, `public/bottles`). Rosé : étiquette dessinée en attendant sa photo.
- **Photos** : images Unsplash provisoires, à remplacer par celles du domaine dans `src/data/images.ts`.
