import { images } from "./images"

export const estate = {
  name: "Vignoble Dauny",
  address: ["Champtin, 8 rue Corbossier", "18300 Crézancy-en-Sancerre", "France"],
  phone: "02 48 79 05 75",
  phoneHref: "tel:+33248790575",
  website: "https://www.vignobledauny.fr/",
} as const

export const navLinks = [
  { label: "Le Domaine", href: "#domaine" },
  { label: "Nos Vins", href: "#vins" },
  { label: "Où trouver nos vins", href: "#ou-trouver" },
  { label: "Visites", href: "#visites" },
] as const

export const heroChips = ["Sancerre AOC", "Bio depuis 1964", "17 hectares", "7 cuvées", "Champtin"] as const

export const history = [
  {
    year: "1683",
    title: "Les coteaux de Champtin",
    text: "La famille Dauny cultive déjà la vigne sur les coteaux de Bué et de Crézancy, et sur ceux, réputés, de Champtin.",
  },
  {
    year: "1964",
    title: "Le choix du bio",
    text: "Lucien Dauny mène une ferme de polyculture : vignes, céréales, chèvres et vaches. À la suite de problèmes de santé, il se tourne vers les méthodes naturelles et convertit toute l'exploitation à l'agriculture biologique. L'équilibre ne revient que vers 1970.",
  },
  {
    year: "1975",
    title: "Christian et Nicole",
    text: "Lucien transmet l'exploitation à son fils Christian et à son épouse Nicole, jeunes mariés. Les parcelles de céréales et les prairies classées en AOC sont peu à peu plantées en vigne.",
  },
  {
    year: "1985",
    title: "Le Vignoble Dauny",
    text: "L'exploitation se consacre entièrement à la viticulture et prend le nom de Vignoble Dauny.",
  },
  {
    year: "1999 · 2007",
    title: "Benoît et Thibaut",
    text: "Leurs fils Benoît, né en 1977, et Thibaut, né en 1981, rejoignent l'entreprise familiale.",
  },
  {
    year: "Aujourd'hui",
    title: "Treize générations",
    text: "Nicole, Christian, Benoît et Thibaut, associés, et trois salariés permanents conduisent 17 hectares : 13 de sauvignon pour les blancs, 4 de pinot noir pour les rouges et le rosé.",
  },
] as const

export type WineStyle = "blanc" | "rouge" | "rose"

export type Medal = { medal: "Or" | "Argent"; vintage: number; contest: number }

export type Wine = {
  name: string
  style: WineStyle
  appellation: string
  description: string
  /** Technical sheet rows, in display order. */
  sheet: { label: string; value: string }[]
  awards: Medal[]
}

const whiteMaking = "Vendange mécanique, pressurage pneumatique, fermentation en cuves inox de 18 à 25 °C"

export const wines: Wine[] = [
  {
    name: "Pynoz",
    style: "rouge",
    appellation: "Sancerre Rouge",
    description:
      "Un rouge léger et sec au bouquet agréable, avec un potentiel de garde moyen. Il accompagne très bien les viandes blanches, les gibiers à plume et les fromages.",
    sheet: [
      { label: "Cépage", value: "Pinot noir 100 %" },
      { label: "Sol", value: "Calcaire" },
      { label: "Vignes", value: "20 ans en moyenne" },
      { label: "Vinification", value: "Cuves inox, de 18 à 25 °C, sans collage" },
      { label: "Garde", value: "4 à 7 ans" },
      { label: "Service", value: "12 à 15 °C" },
      { label: "Accords", value: "Viandes blanches, gibiers à plume, fromages" },
    ],
    awards: [
      { medal: "Or", vintage: 2015, contest: 2017 },
      { medal: "Argent", vintage: 2013, contest: 2015 },
      { medal: "Or", vintage: 2012, contest: 2014 },
      { medal: "Or", vintage: 2011, contest: 2013 },
    ],
  },
  {
    name: "Cuvée Romble",
    style: "rouge",
    appellation: "Sancerre Rouge",
    description:
      "Le pinot noir des vieilles vignes, élevé en barriques de chêne. Un vin de garde aux tanins fins et souples.",
    sheet: [
      { label: "Cépage", value: "Pinot noir 100 %" },
      { label: "Sol", value: "Calcaire" },
      { label: "Vignes", value: "45 ans en moyenne" },
      { label: "Vinification", value: "Barriques de chêne, de 18 à 28 °C" },
      { label: "Garde", value: "10 ans" },
      { label: "Service", value: "14 à 17 °C" },
      { label: "Accords", value: "Viandes blanches et rouges, gibiers, fromages" },
    ],
    awards: [{ medal: "Or", vintage: 2015, contest: 2017 }],
  },
  {
    name: "Les Caillottes",
    style: "blanc",
    appellation: "Sancerre Blanc",
    description:
      "Né des sols calcaires du Sancerrois, un vin léger à boire jeune. Parfait avec les poissons froids, les huîtres, les fruits de mer et le crottin de Chavignol.",
    sheet: [
      { label: "Cépage", value: "Sauvignon 100 %" },
      { label: "Sol", value: "Calcaire" },
      { label: "Vignes", value: "20 ans en moyenne" },
      { label: "Vinification", value: whiteMaking },
      { label: "Garde", value: "3 à 5 ans" },
      { label: "Service", value: "10 à 12 °C" },
      { label: "Accords", value: "Poissons froids, huîtres, fruits de mer, crottin de Chavignol" },
    ],
    awards: [
      { medal: "Argent", vintage: 2019, contest: 2020 },
      { medal: "Argent", vintage: 2018, contest: 2019 },
      { medal: "Or", vintage: 2015, contest: 2016 },
      { medal: "Argent", vintage: 2012, contest: 2014 },
    ],
  },
  {
    name: "Terres Blanches",
    style: "blanc",
    appellation: "Sancerre Blanc",
    description:
      "Un sauvignon aromatique, issu des sols argilo-calcaires. Il se marie avec les crustacés, les poissons chauds, les viandes grillées et les fromages.",
    sheet: [
      { label: "Cépage", value: "Sauvignon 100 %" },
      { label: "Sol", value: "Argilo-calcaire" },
      { label: "Vignes", value: "28 ans en moyenne" },
      { label: "Vinification", value: whiteMaking },
      { label: "Garde", value: "4 à 7 ans" },
      { label: "Service", value: "10 à 12 °C" },
      { label: "Accords", value: "Crustacés, poissons chauds, viandes grillées, fromages" },
    ],
    awards: [{ medal: "Or", vintage: 2019, contest: 2020 }],
  },
  {
    name: "Clos du Roy",
    style: "blanc",
    appellation: "Sancerre Blanc",
    description:
      "Les vieilles vignes d'un clos calcaire, élevées en cuves inox. Un vin qui gagne à vieillir, avec les produits de la mer, le foie gras et les fromages.",
    sheet: [
      { label: "Cépage", value: "Sauvignon 100 %" },
      { label: "Sol", value: "Calcaire" },
      { label: "Vignes", value: "45 ans en moyenne" },
      { label: "Vinification", value: `${whiteMaking}, élevage en cuves inox` },
      { label: "Garde", value: "5 à 8 ans" },
      { label: "Service", value: "10 à 12 °C" },
      { label: "Accords", value: "Produits de la mer, foie gras, fromages" },
    ],
    awards: [{ medal: "Argent", vintage: 2018, contest: 2019 }],
  },
  {
    name: "Cuvée Romble",
    style: "blanc",
    appellation: "Sancerre Blanc",
    description:
      "L'assemblage des terroirs calcaires et argilo-calcaires, élevé dix mois en barriques de chêne sur lies fines. De l'apéritif aux viandes blanches.",
    sheet: [
      { label: "Cépage", value: "Sauvignon 100 %" },
      { label: "Sol", value: "Calcaire et argilo-calcaire" },
      { label: "Vignes", value: "40 ans en moyenne" },
      { label: "Vinification", value: "Élevage de 10 mois en barriques de chêne sur lies fines" },
      { label: "Garde", value: "Jusqu'à 10 ans" },
      { label: "Service", value: "10 à 12 °C" },
      { label: "Accords", value: "Apéritif, poissons chauds, viandes blanches, fromages" },
    ],
    awards: [
      { medal: "Or", vintage: 2014, contest: 2016 },
      { medal: "Or", vintage: 2013, contest: 2015 },
    ],
  },
  {
    name: "Pynoz",
    style: "rose",
    appellation: "Sancerre Rosé",
    description:
      "Séduisant par son originalité et son bouquet fin et élégant, un rosé désaltérant, plutôt vin d'été. Pour les entrées, la charcuterie, les grillades et la cuisine exotique.",
    sheet: [
      { label: "Cépage", value: "Pinot noir 100 %" },
      { label: "Sol", value: "Calcaire" },
      { label: "Vignes", value: "16 ans en moyenne" },
      { label: "Vinification", value: "Cuves inox, de 18 à 25 °C" },
      { label: "Garde", value: "3 à 5 ans" },
      { label: "Service", value: "8 à 10 °C" },
      { label: "Accords", value: "Entrées, charcuterie, grillades, cuisine exotique" },
    ],
    awards: [],
  },
]

export const awardsContest = "Concours des Vignerons Indépendants"

/** Order in which the colours are shown: reds, then whites, then rosé. */
export const wineGroups: { style: WineStyle; label: string }[] = [
  { style: "rouge", label: "Rouges" },
  { style: "blanc", label: "Blancs" },
  { style: "rose", label: "Rosé" },
]

export type GalleryItem = {
  src: string
  label: string
  alt: string
  ratio: "portrait" | "landscape"
}

export const gallery: GalleryItem[] = [
  { src: images.gallery.vines, label: "Les coteaux", alt: "Rangs de vigne sur un coteau", ratio: "portrait" },
  { src: images.gallery.grapes, label: "Les vendanges", alt: "Grappes de raisin mûr sur la vigne", ratio: "landscape" },
  { src: images.gallery.tasting, label: "La dégustation", alt: "Verres de vin blanc", ratio: "landscape" },
  { src: images.gallery.barrels, label: "La cave", alt: "Barriques alignées dans la cave", ratio: "portrait" },
  { src: images.gallery.landscape, label: "Le Sancerrois", alt: "Paysage de vignes et de collines", ratio: "portrait" },
  { src: images.gallery.bottles, label: "Nos cuvées", alt: "Bouteilles de vin", ratio: "landscape" },
]

export const cellarChips = ["Bio depuis 1964", "Pressurage pneumatique", "Cuves inox thermorégulées", "Collage à la bentonite"] as const

export type Stockist = { name: string; detail?: string; href?: string }
export type StockistGroup = { region: string; stockists: Stockist[] }

export const stockists: StockistGroup[] = [
  {
    region: "France",
    stockists: [
      { name: "Au domaine", detail: "Vente directe à Champtin, du lundi au samedi" },
      { name: "Biocoop", detail: "Magasins bio" },
      { name: "Naturalia", detail: "Magasins bio" },
      { name: "Natureo", detail: "Magasins bio" },
      { name: "Nouveaux Robinson", detail: "Magasins bio" },
      { name: "Vignapart", detail: "En ligne, expédié depuis le domaine", href: "https://www.vignapart.com/en/364-vignoble-dauny" },
      { name: "Vins des As", detail: "Caviste en ligne", href: "https://vins-des-as.com/" },
    ],
  },
  {
    region: "Royaume-Uni",
    stockists: [{ name: "Vintage Roots", detail: "Spécialiste des vins bio", href: "https://vintageroots.co.uk/" }],
  },
  {
    region: "Irlande",
    stockists: [{ name: "O'Briens Wine", detail: "Boutiques et vente en ligne", href: "https://www.obrienswine.ie/" }],
  },
  {
    region: "Canada",
    stockists: [{ name: "Tanium Wine", href: "https://www.taniumwine.ca/" }],
  },
  {
    region: "États-Unis",
    stockists: [
      { name: "Flatiron Wines", detail: "San Francisco", href: "https://sf.flatiron-wines.com/" },
      { name: "Fine Wine & Good Spirits", detail: "Pennsylvanie", href: "https://www.finewineandgoodspirits.com/" },
      { name: "ABC Fine Wine & Spirits", href: "https://abcfws.com/" },
    ],
  },
]

export const exportCountries = [
  "Allemagne",
  "Canada",
  "Danemark",
  "États-Unis",
  "Italie",
  "Luxembourg",
  "Pays-Bas",
  "Royaume-Uni",
  "Suède",
  "Suisse",
] as const

export const salesSplit = [
  { share: 30, label: "Vente directe aux particuliers" },
  { share: 45, label: "Export" },
  { share: 25, label: "Cavistes et magasins bio" },
] as const

export const openingHours = [
  { period: "16 mars – 15 octobre", days: "Lundi – samedi", hours: "9h – 12h · 14h – 19h" },
  { period: "16 octobre – 15 mars", days: "Lundi – samedi", hours: "9h – 12h · 14h – 18h" },
] as const

export const visitInfo = [
  { title: "Dégustation", text: "Gratuite, aux heures d'ouverture, sans rendez-vous." },
  { title: "Visite de cave", text: "Visite guidée du chai sur demande." },
  { title: "Groupes", text: "Sur réservation uniquement, jusqu'à 25 personnes." },
] as const
