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

## Mise en ligne

`npm run build` produit un site statique dans `dist/` : il suffit de déposer **le contenu** de ce dossier à la racine de l'hébergement (ou dans n'importe quel sous-dossier, les chemins sont relatifs). Aucun serveur, base de données ni PHP n'est nécessaire. Le site ne charge rien depuis un autre domaine (polices et images hébergées avec le site) ; `robots.txt` et `sitemap.xml` pointent vers https://www.vignobledauny.fr/.

Les mentions légales (éditeur, hébergeur) sont dans `legal`, dans `src/data/content.ts` : à mettre à jour si l'hébergeur change.

## À vérifier avant la mise en ligne

Le contenu reprend le site officiel vignobledauny.fr (histoire, vigne et bio, fiches techniques, médailles, revendeurs), lu par recherche web car le site n'était pas accessible directement. Les pages officielles datent d'environ 2020 ; les horaires de visite et les revendeurs étrangers viennent d'autres sources publiques (office de tourisme, cavistes).

- **Revendeurs** (`stockists` dans `src/data/content.ts`) : les enseignes bio viennent de la page officielle ; les revendeurs étrangers, de leurs propres sites.
- **Horaires** : les sources divergent (ouverture à 8h ou 9h). À confirmer.
- **Médailles** : palmarès du site officiel, arrêté en 2020. À compléter avec les médailles plus récentes.
- **Répartition des ventes** : la page française indique 30 / 45 / 25 %, la page anglaise 35 / 30 / 35 %. La version française est utilisée.
- **Cuvées** : gamme et fiches techniques du site officiel (2 rouges, 4 blancs, 1 rosé). Fiches complètes reprises des fiches officielles pour les 7 cuvées.
- **Bouteilles 3D** : les 7 cuvées portent leurs vraies étiquettes, teintes de verre et capsules, extraites des photos du site (`public/labels`, `public/bottles`).
- **Photos** : l'accueil montre la gamme des 7 bouteilles, détourée des photos du domaine (`public/bottles/gamme.webp`). La galerie reste masquée et la section bio n'a pas de photo tant qu'on n'a pas de photos du domaine : les ajouter dans `src/data/images.ts` et `gallery` (`src/data/content.ts`).
