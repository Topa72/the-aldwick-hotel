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

Le site compte cinq pages, chacune avec son fichier HTML (titre et description propres) :

| Page | Fichier | Sections |
| --- | --- | --- |
| Accueil | `index.html` | les 7 bouteilles en 3D (chacune mène à sa cuvée), accès aux autres pages |
| Le domaine | `le-domaine.html` | histoire, façade, agriculture biologique |
| Nos vins | `nos-vins.html` | bouteilles 3D, fiches techniques, médailles |
| Où trouver nos vins | `ou-trouver-nos-vins.html` | revendeurs, export |
| Nous rendre visite | `nous-rendre-visite.html` | horaires, carte, formulaire de contact |

Une cuvée s'ouvre directement avec son nom après `#` : `nos-vins.html#clos-du-roy`, `nos-vins.html#pynoz-rose`. Les pages et leurs fichiers sont définis dans `src/lib/router.ts`. `public/ou-trouver-nos-vins/` redirige l'adresse de l'ancien site vers la nouvelle page.

```
src/
  App.tsx                     sections de chaque page
  lib/router.ts               pages, liens entre pages
  index.css                   tokens de design (variables HSL) + styles typographiques
  data/content.ts             tous les textes : histoire, cuvées, revendeurs, horaires…
  data/images.ts              toutes les photos au même endroit
  components/ui/              composants shadcn (button, badge, sheet)
  components/sections/        navbar, hero, domaine, cuvées, chai, galerie,
                              où trouver nos vins, visites, appel à l'action, pied de page
```

## Mise en ligne

`npm run build` produit un site statique dans `dist/` : il suffit de déposer **le contenu** de ce dossier à la racine de l'hébergement (ou dans n'importe quel sous-dossier, les chemins sont relatifs). Aucun serveur, base de données ni PHP n'est nécessaire. Polices et images sont hébergées avec le site ; seule la carte de la section Visites est chargée depuis Google Maps (adresse dans `estate.mapQuery`, `src/data/content.ts`) ; `robots.txt` et `sitemap.xml` pointent vers https://www.vignobledauny.fr/.

`VITE_SINGLE_FILE=1 npm run build` produit à la place un seul `index.html` contenant toutes les pages (on passe de l'une à l'autre par `#/vins`, `#/visite/contact`…) : c'est la version d'aperçu à ouvrir sans hébergement, pas celle à mettre en ligne.

Le formulaire de contact (section Visites) n'a pas besoin de serveur : il passe par [FormSubmit](https://formsubmit.co), qui transfère chaque message par e-mail à l'adresse `contact.email` de `src/data/content.ts`. Au tout premier message, FormSubmit envoie à cette adresse un e-mail de confirmation : il faut cliquer sur le lien qu'il contient, ensuite les messages arrivent directement. Tant que `contact.email` est vide, le formulaire affiche une erreur et propose d'appeler le domaine.

Les mentions légales (éditeur, hébergeur) sont dans `legal`, dans `src/data/content.ts` : à mettre à jour si l'hébergeur change.

## À vérifier avant la mise en ligne

Le contenu reprend le site officiel vignobledauny.fr (histoire, vigne et bio, fiches techniques, médailles, revendeurs), lu par recherche web car le site n'était pas accessible directement. Les pages officielles datent d'environ 2020 ; les horaires de visite et les revendeurs étrangers viennent d'autres sources publiques (office de tourisme, cavistes).

- **Revendeurs** (`stockists` dans `src/data/content.ts`) : les enseignes bio viennent de la page officielle ; les revendeurs étrangers, de leurs propres sites.
- **Horaires** : les sources divergent (ouverture à 8h ou 9h). À confirmer.
- **Médailles** : palmarès du site officiel, arrêté en 2020. À compléter avec les médailles plus récentes.
- **Répartition des ventes** : la page française indique 30 / 45 / 25 %, la page anglaise 35 / 30 / 35 %. La version française est utilisée.
- **Cuvées** : gamme et fiches techniques du site officiel (2 rouges, 4 blancs, 1 rosé). Fiches complètes reprises des fiches officielles pour les 7 cuvées.
- **Bouteilles 3D** : chaque cuvée a sa propre bouteille, tournée à partir de la silhouette de sa photo studio (`src/data/bottle-shapes.json`, `outline` de chaque cuvée), et habillée de cette même photo « déroulée » (`public/skins`, `skin`) : le verre, le vin et la capsule gardent la teinte, les reflets et les ombres de la photo sous tous les angles. Les vraies étiquettes, posées par-dessus à la hauteur mesurée sur la photo, sont dans `public/labels`. Sans habillage, la bouteille prend les couleurs `colors`.
- **Logo et icône** : le nom manuscrit « Vignoble Dauny » est tracé en vectoriel dans `src/data/logo.ts` ; l'icône du site (onglet, Google, écran d'accueil du téléphone) est le monogramme « VD » sur disque doré (`public/favicon.svg`, `favicon.ico`, `icon-192.png`, `apple-touch-icon.png`).
- **Photos** : l'accueil montre les 7 bouteilles en 3D (`src/components/bottle-lineup.tsx`) ; la section « Le domaine » montre la façade (`public/photos/facade.jpg`, aussi utilisée comme image de partage) et la section bio le chai à barriques (`public/photos/chai.webp`). La galerie reste masquée tant qu'on n'a pas d'autres photos du domaine : les ajouter dans `src/data/images.ts` et `gallery` (`src/data/content.ts`).
- **Labels** : les logos Agriculture biologique et Vigneron indépendant (`public/logos`, `labels` dans `src/data/images.ts`) accompagnent la section bio et le pied de toutes les pages.
- **Carte** : la page « Nous rendre visite » affiche la fiche Google Maps du domaine (`estate.mapPlaceId`, `src/data/content.ts`) ; « Itinéraire » et « Ouvrir dans Google Maps » ouvrent cette même fiche.
