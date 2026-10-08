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

export const heroChips = ["Sancerre AOC", "Bio depuis 1964", "Sauvignon blanc", "Pinot noir", "Champtin"] as const

export const history = [
  {
    year: "1683",
    title: "Les coteaux de Champtin",
    text: "La famille Dauny cultive la vigne sur les coteaux de Champtin, à Crézancy-en-Sancerre.",
  },
  {
    year: "1964",
    title: "Le choix du bio",
    text: "Lucien Dauny convertit l'ensemble du vignoble à l'agriculture biologique.",
  },
  {
    year: "Aujourd'hui",
    title: "Douzième et treizième générations",
    text: "Christian et Nicole Dauny, avec leurs fils Benoît et Thibaut, conduisent le domaine : environ 17 hectares de sauvignon blanc et de pinot noir.",
  },
] as const

export type WineStyle = "blanc" | "rouge" | "rose"

export const wines: { name: string; style: WineStyle; appellation: string; description: string }[] = [
  {
    name: "Les Caillottes",
    style: "blanc",
    appellation: "Sancerre Blanc",
    description:
      "Le cœur de la gamme. Son nom vient des sols calcaires du Sancerrois. 100 % sauvignon blanc, vignes de 20 ans en moyenne, vinifié en cuve inox.",
  },
  {
    name: "Clos du Roy",
    style: "blanc",
    appellation: "Sancerre Blanc",
    description:
      "Un vin de parcelle, né de sols calcaires en plein sud. Il gagne à vieillir quelques années en cave.",
  },
  {
    name: "Terres Blanches",
    style: "blanc",
    appellation: "Sancerre Blanc",
    description: "Un sauvignon blanc issu des sols argilo-calcaires que l'on appelle ici « terres blanches ».",
  },
  {
    name: "Pynoz",
    style: "rose",
    appellation: "Sancerre Rouge & Rosé",
    description: "Le pinot noir du domaine, décliné en rouge et en rosé.",
  },
  {
    name: "Romble",
    style: "rouge",
    appellation: "Sancerre Rouge & Blanc",
    description: "Une cuvée proposée en rouge et en blanc.",
  },
]

export const servingNote = "Nos blancs se servent entre 10 et 12 °C."

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

export const cellarChips = ["Levures indigènes", "Cuves inox thermorégulées", "Certifié Agriculture Biologique"] as const

export type Stockist = { name: string; detail?: string; href?: string }
export type StockistGroup = { region: string; stockists: Stockist[] }

export const stockists: StockistGroup[] = [
  {
    region: "France",
    stockists: [
      { name: "Au domaine", detail: "Vente directe à Champtin, du lundi au samedi" },
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
  "Belgique",
  "Canada",
  "Costa Rica",
  "Danemark",
  "États-Unis",
  "France",
  "Irlande",
  "Italie",
  "Luxembourg",
  "Pays-Bas",
  "Roumanie",
  "Royaume-Uni",
  "Suisse",
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
