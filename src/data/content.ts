export const estate = {
  name: "Vignoble Dauny",
  address: ["Champtin, 8 rue Corbossier", "18300 Crézancy-en-Sancerre", "France"],
  phone: "02 48 79 05 75",
  phoneHref: "tel:+33248790575",
  website: "https://www.vignobledauny.fr/",
  /** What Google Maps searches for, for the map and the directions link; null hides the map. */
  mapQuery: "Vignoble Dauny, 8 Rue Corbossier, Champtin, 18300 Crézancy-en-Sancerre" as string | null,
} as const

/** Where the contact form's messages go (forwarded by formsubmit.co, see src/components/contact-form.tsx). */
export const contact = {
  email: "",
  subject: "Message depuis le site du Vignoble Dauny",
} as const

/** Mentions légales (LCEN) — update the host if the site moves. */
export const legal = {
  publisher: "Vignoble Dauny (EARL), Champtin, 8 rue Corbossier, 18300 Crézancy-en-Sancerre · 02 48 79 05 75",
  director: "Vignoble Dauny",
  host: "itiConseil, Nevers",
  privacy:
    "Ce site ne dépose lui-même aucun cookie. Les informations saisies dans le formulaire de contact (nom, prénom, téléphone, e-mail, message) servent uniquement à répondre à votre demande : elles sont transmises par e-mail au domaine via le service FormSubmit, ne sont pas conservées sur le site et ne sont jamais cédées. Vous pouvez demander leur suppression en nous écrivant. La carte de la section Visites est fournie par Google Maps, qui applique sa propre politique de confidentialité.",
} as const

export const navLinks = [
  { label: "Le Domaine", href: "#domaine" },
  { label: "Nos Vins", href: "#vins" },
  { label: "Où trouver nos vins", href: "#ou-trouver" },
  { label: "Visites", href: "#visites" },
] as const

export const heroChips = ["Sancerre AOC", "Bio depuis 1964", "17 hectares", "7 cuvées", "Champtin"] as const

export const domaineIntro =
  "Depuis 1683, la famille Dauny cultive la vigne sur les coteaux de Champtin. Le domaine vous accueille au caveau, Champtin, 8 rue Corbossier, à Crézancy-en-Sancerre."

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

/** How the real bottle looks: its photographed label and glass colours. */
export type BottleLook = {
  label?: { src: string; shape?: "rect" | "diamond"; y: number; height: number; arc: number }
  colors?: { glass?: number; glassOpacity?: number; wine?: number; capsule?: number }
  widthScale?: number
}

const asset = (path: string) => `${import.meta.env.BASE_URL}${path}`

export type Wine = {
  name: string
  style: WineStyle
  appellation: string
  description: string
  /** Studio photo of the bottle. */
  photo?: string
  look?: BottleLook
  /** Technical sheet rows, in display order. */
  sheet: { label: string; value: string }[]
  awards: Medal[]
}

export const wines: Wine[] = [
  {
    name: "Pynoz",
    style: "rouge",
    appellation: "Sancerre Rouge",
    description:
      "Ce Sancerre rouge issu du cépage Pinot Noir, de garde moyenne (4 à 7 ans), est un vin léger au bouquet agréable. Il se marie très bien avec les viandes blanches, les gibiers à plumes et les fromages.",
    photo: asset("bottles/pynoz-rouge.jpg"),
    look: {
      label: { src: asset("labels/pynoz-rouge.jpg"), y: 0.6, height: 0.68, arc: 2.11 },
      colors: { glass: 0x2a1210, glassOpacity: 0.82, wine: 0x3a0a0c, capsule: 0x1e1a19 },
    },
    sheet: [
      { label: "Cépage", value: "Pinot noir 100 %" },
      { label: "Catégorie", value: "Rouge léger sec" },
      { label: "Sol", value: "Calcaire" },
      { label: "Vignes", value: "20 ans en moyenne" },
      { label: "Vendange", value: "Mécanique" },
      { label: "Vinification", value: "Cuves inox, fermentation de 18 à 25 °C, pressoir pneumatique" },
      { label: "Collage", value: "Aucun" },
      { label: "Filtration", value: "Kieselguhr" },
      { label: "Bouchon", value: "Liège naturel" },
      { label: "Bouteille", value: "Verre teinte feuille morte" },
      { label: "Garde", value: "4 à 7 ans" },
      { label: "Service", value: "12 à 15 °C" },
      { label: "Accords", value: "Viandes blanches, gibiers à plumes, fromages ; servi frais, il peut accompagner un poisson" },
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
      "Ce Sancerre rouge élevé en fûts de chêne est issu de vieilles vignes. C'est un vin de garde avec des tanins fins et souples. Il accompagnera à merveille les viandes rouges et les fromages.",
    photo: asset("bottles/romble-rouge.jpg"),
    look: {
      label: { src: asset("labels/romble-rouge.png"), shape: "diamond", y: 0.68, height: 0.81, arc: 2.33 },
      colors: { glass: 0x1c1210, glassOpacity: 0.85, wine: 0x2a0a0a, capsule: 0x4c3428 },
      widthScale: 1.06,
    },
    sheet: [
      { label: "Cépage", value: "Pinot noir 100 %" },
      { label: "Catégorie", value: "Rouge sec" },
      { label: "Sol", value: "Calcaire" },
      { label: "Vignes", value: "45 ans en moyenne" },
      { label: "Vendange", value: "Mécanique" },
      { label: "Vinification", value: "Barriques de chêne, fermentation de 18 à 28 °C, pressoir pneumatique" },
      { label: "Collage", value: "Aucun" },
      { label: "Filtration", value: "Aucune" },
      { label: "Bouchon", value: "Liège" },
      { label: "Bouteille", value: "Verre teinte antique" },
      { label: "Garde", value: "10 ans" },
      { label: "Service", value: "14 à 17 °C" },
      { label: "Accords", value: "Viandes blanches, gibiers, viandes rouges, fromages" },
    ],
    awards: [{ medal: "Or", vintage: 2015, contest: 2017 }],
  },
  {
    name: "Les Caillottes",
    style: "blanc",
    appellation: "Sancerre Blanc",
    description:
      "Ce Sancerre blanc provient de vignes cultivées sur terres calcaires. C'est un vin léger qui se consomme jeune et qui accompagne poissons froids, huîtres, crustacés ainsi que le Crottin de Chavignol.",
    photo: asset("bottles/caillottes.jpg"),
    look: {
      label: { src: asset("labels/caillottes.jpg"), y: 0.6, height: 0.69, arc: 2.11 },
      colors: { glass: 0x7d8a3a, glassOpacity: 0.5, wine: 0xa2962a, capsule: 0x16181b },
    },
    sheet: [
      { label: "Cépage", value: "Sauvignon 100 %" },
      { label: "Catégorie", value: "Blanc sec" },
      { label: "Sol", value: "Calcaire" },
      { label: "Vignes", value: "20 ans en moyenne" },
      { label: "Vendange", value: "Mécanique" },
      { label: "Vinification", value: "Cuves inox, fermentation de 18 à 25 °C, pressoir pneumatique" },
      { label: "Collage", value: "Bentonite uniquement" },
      { label: "Filtration", value: "Kieselguhr" },
      { label: "Bouchon", value: "Liège naturel" },
      { label: "Bouteille", value: "Verre teinte feuille morte" },
      { label: "Garde", value: "3 à 5 ans" },
      { label: "Service", value: "10 à 12 °C environ" },
      { label: "Accords", value: "Poissons froids, huîtres, fruits de mer, crustacés, fromages" },
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
      "Ce Sancerre blanc provient de vignes cultivées sur des terres argilo-calcaires appelées terres blanches. C'est un vin aromatique qui accompagne crustacés, fruits de mer, poissons chauds et fromages.",
    photo: asset("bottles/terres-blanches.jpg"),
    look: {
      label: { src: asset("labels/terres-blanches.jpg"), y: 0.6, height: 0.68, arc: 2.07 },
      colors: { glass: 0x3c4520, glassOpacity: 0.7, wine: 0x6e6a22, capsule: 0x16181b },
    },
    sheet: [
      { label: "Cépage", value: "Sauvignon 100 %" },
      { label: "Catégorie", value: "Blanc sec" },
      { label: "Sol", value: "Argilo-calcaire" },
      { label: "Vignes", value: "28 ans en moyenne" },
      { label: "Vendange", value: "Mécanique" },
      { label: "Vinification", value: "Cuves inox, fermentation de 18 à 25 °C, pressoir pneumatique" },
      { label: "Collage", value: "Bentonite uniquement" },
      { label: "Filtration", value: "Kieselguhr" },
      { label: "Bouchon", value: "Liège naturel" },
      { label: "Bouteille", value: "Verre teinte champagne" },
      { label: "Garde", value: "4 à 7 ans" },
      { label: "Service", value: "10 à 12 °C environ" },
      { label: "Accords", value: "Crustacés, poissons chauds, fruits de mer, viandes grillées, fromages" },
    ],
    awards: [{ medal: "Or", vintage: 2019, contest: 2020 }],
  },
  {
    name: "Clos du Roy",
    style: "blanc",
    appellation: "Sancerre Blanc",
    description:
      "Ce Sancerre blanc est issu de terrains calcaires bénéficiant d'une exposition parfaite plein Sud. Ce vin rond et plein de finesse a une belle tenue au vieillissement. Il accompagne très bien poissons et fruits de mer, et sait également se faire apprécier avec un foie gras après 2 ou 3 ans de garde.",
    photo: asset("bottles/clos-du-roy.jpg"),
    look: {
      label: { src: asset("labels/clos-du-roy.jpg"), y: 0.61, height: 0.69, arc: 2.22 },
      colors: { glass: 0x2a2614, glassOpacity: 0.78, wine: 0x4a3d16, capsule: 0x16181b },
    },
    sheet: [
      { label: "Cépage", value: "Sauvignon 100 %" },
      { label: "Catégorie", value: "Blanc sec" },
      { label: "Sol", value: "Calcaire, exposition plein Sud" },
      { label: "Vignes", value: "45 ans en moyenne" },
      { label: "Vendange", value: "Mécanique" },
      { label: "Vinification", value: "Cuves inox, fermentation de 18 à 25 °C, pressoir pneumatique" },
      { label: "Collage", value: "Bentonite uniquement" },
      { label: "Filtration", value: "Kieselguhr" },
      { label: "Bouchon", value: "Liège" },
      { label: "Bouteille", value: "Verre teinte chêne" },
      { label: "Garde", value: "5 à 8 ans" },
      { label: "Service", value: "10 à 12 °C environ" },
      { label: "Accords", value: "Produits de la mer, foie gras, fromages" },
    ],
    awards: [{ medal: "Argent", vintage: 2018, contest: 2019 }],
  },
  {
    name: "Cuvée Romble",
    style: "blanc",
    appellation: "Sancerre Blanc",
    description:
      "Ce Sancerre blanc élevé sur lies fines en fûts de chêne est issu d'une sélection de nos différents terroirs. Ce vin de garde accompagnera parfaitement vos apéritifs, poissons chauds et fruits de mer.",
    photo: asset("bottles/romble-blanc.jpg"),
    look: {
      label: { src: asset("labels/romble-blanc.png"), shape: "diamond", y: 0.68, height: 0.8, arc: 2.32 },
      colors: { glass: 0x33281a, glassOpacity: 0.75, wine: 0x5a4518, capsule: 0x16181b },
      widthScale: 1.06,
    },
    sheet: [
      { label: "Cépage", value: "Sauvignon 100 %" },
      { label: "Catégorie", value: "Blanc sec" },
      { label: "Sol", value: "Assemblage de nos différents terroirs (calcaire et argilo-calcaire)" },
      { label: "Vignes", value: "40 ans en moyenne" },
      { label: "Vendange", value: "Mécanique" },
      { label: "Vinification", value: "Barriques de chêne, fermentation de 18 à 25 °C, pressoir pneumatique" },
      { label: "Élevage", value: "10 mois en barriques, sur lies fines" },
      { label: "Collage", value: "Bentonite uniquement" },
      { label: "Filtration", value: "Kieselguhr" },
      { label: "Bouchon", value: "Liège" },
      { label: "Bouteille", value: "Verre teinte antique" },
      { label: "Garde", value: "10 ans" },
      { label: "Service", value: "10 à 12 °C environ" },
      { label: "Accords", value: "Apéritifs, poissons chauds, viandes blanches, fromages" },
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
      "Séduisant par son originalité et son bouquet fin et élégant, ce Sancerre rosé est désaltérant et plutôt vin d'été, qui s'associe bien avec les hors d'œuvres, charcuteries, viandes grillées et menus exotiques.",
    photo: asset("bottles/pynoz-rose.jpg"),
    look: {
      label: { src: asset("labels/pynoz-rose.jpg"), y: 0.61, height: 0.68, arc: 2.1 },
      colors: { glass: 0xf2efe8, glassOpacity: 0.2, wine: 0xc8441a, capsule: 0x16181b },
    },
    sheet: [
      { label: "Cépage", value: "Pinot noir 100 %" },
      { label: "Catégorie", value: "Rosé sec" },
      { label: "Sol", value: "Calcaire" },
      { label: "Vignes", value: "16 ans en moyenne" },
      { label: "Vendange", value: "Mécanique" },
      { label: "Vinification", value: "Cuves inox, fermentation de 18 à 25 °C, pressoir pneumatique" },
      { label: "Collage", value: "Bentonite uniquement" },
      { label: "Filtration", value: "Kieselguhr" },
      { label: "Bouchon", value: "Liège naturel" },
      { label: "Bouteille", value: "Verre teinte blanche" },
      { label: "Garde", value: "3 à 5 ans" },
      { label: "Service", value: "8 à 10 °C" },
      { label: "Accords", value: "Hors d'œuvre, charcuteries, viandes grillées, menus exotiques, desserts" },
      { label: "Particularités", value: "Convient au régime végétarien" },
    ],
    awards: [],
  },
]

export const awardsContest = "Concours des Vignerons Indépendants"

export const packagingNote =
  "Cartons de 6 bouteilles · 11 cartons par couche, 9 couches maximum, panachage possible avec nos autres vins."

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

/** Photos of the estate for the gallery; the section stays hidden while this is empty. */
export const gallery: GalleryItem[] = []

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
