/**
 * Photos du site (reprises du site actuel du domaine, dans public/photos). Pour en ajouter,
 * déposez-les dans public/photos et référencez-les ici.
 */
const asset = (path: string) => `${import.meta.env.BASE_URL}${path}`

/**
 * A wide photo at the top of a page; `position` picks the part kept when the frame crops it, and
 * `tone` is the background of the section below, which the photo fades into.
 */
export type Banner = { src: string; alt: string; position?: string; tone?: "background" | "surface" }

export type GalleryItem = {
  src: string
  label: string
  alt: string
  ratio: "portrait" | "landscape"
}

export const images = {
  /**
   * The setting of the home page's bottles: a sunlit stone ledge against a pale wall, olive branches
   * and an earthenware jar (an illustration, its own basket and bottles removed). Null puts them on a
   * plain background.
   */
  heroBackdrop: asset("photos/accueil-muret.webp") as string | null,
  /**
   * The front of a wicker basket (photo, cut out, straw and leaves included) the 3D bottles stand in,
   * on that soil. Null shows the bottles in a basket drawn in 3D instead.
   */
  basketPhoto: asset("photos/panier-devant.webp") as string | null,
  /** The straw filling that basket, behind the bottles (seen when one is lifted out). */
  basketBack: asset("photos/panier-fond.webp"),
  /** That basket's shadow on the ledge. */
  basketShadow: asset("photos/panier-ombre.webp"),
  /** The same soil, faint behind the home page's cards under the hero (a strip without the corner stones). */
  soil: asset("photos/terre.webp") as string | null,
  /** Beside the estate's history. */
  family: asset("photos/famille.webp") as string | null,
  familyAlt: "La famille Dauny réunie au caveau, autour d'une table de bouteilles et de médailles",
  familyCaption: "La famille Dauny au caveau",
  /** Photo beside the organic-farming text; the text spans the page until one is set. */
  cellar: asset("photos/chai.webp") as string | null,
  cellarAlt: "Le chai à barriques du Vignoble Dauny",
  /** Labels shown with the organic-farming text and at the foot of every page. */
  labels: [
    { src: asset("logos/agriculture-biologique.png"), alt: "Agriculture biologique (logo AB)" },
    { src: asset("logos/vigneron-independant.jpg"), alt: "Vigneron indépendant" },
  ] as { src: string; alt: string }[],
  /** One wide photo at the top of each page but the home page; null leaves the page without one. */
  banners: {
    domaine: {
      src: asset("photos/domaine.webp"),
      alt: "Le Vignoble Dauny à Champtin, entre ses vignes, le village et les coteaux",
      position: "72% 40%",
    },
    vins: {
      src: asset("photos/bouteilles-dans-les-vignes.webp"),
      alt: "Des bouteilles du Vignoble Dauny posées dans le feuillage de la vigne",
      position: "50% 45%",
      tone: "surface",
    },
    "ou-trouver": {
      src: asset("photos/bouteilles-caveau.webp"),
      alt: "Trois cuvées du Vignoble Dauny sur leur présentoir",
      position: "50% 60%",
      tone: "surface",
    },
    visite: {
      src: asset("photos/caveau.webp"),
      alt: "Le caveau de dégustation du domaine, ses bouteilles et ses objets de vigneron",
      position: "50% 55%",
    },
  } as Record<"domaine" | "vins" | "ou-trouver" | "visite", Banner | null>,
}

/** Photos of the estate for the gallery; the section stays hidden while this is empty. */
export const gallery: GalleryItem[] = [
  { src: asset("photos/coteaux.webp"), label: "Les coteaux", alt: "Les coteaux de Sancerre vus du ciel", ratio: "landscape" },
  { src: asset("photos/a-la-vigne.webp"), label: "À la vigne", alt: "Travail de la vigne au printemps, entre les rangs", ratio: "portrait" },
  { src: asset("photos/floraison.webp"), label: "La floraison", alt: "Grappes de vigne en fleur", ratio: "portrait" },
  { src: asset("photos/facade.jpg"), label: "Le domaine", alt: "La façade du domaine à Champtin, avec son vieux pressoir et l'inscription « Culture biologique »", ratio: "landscape" },
  { src: asset("photos/rangs-de-vigne.webp"), label: "Les rangs", alt: "Les rangs de vigne vus du ciel, avec l'équipe au travail", ratio: "landscape" },
  { src: asset("photos/cuves-inox.webp"), label: "Les cuves", alt: "Les cuves inox thermorégulées du chai", ratio: "landscape" },
  { src: asset("photos/foudres.webp"), label: "Les foudres", alt: "Les grands foudres en bois du chai", ratio: "portrait" },
  { src: asset("photos/mise-en-bouteille.webp"), label: "La mise en bouteille", alt: "La mise en bouteille au domaine", ratio: "landscape" },
  { src: asset("photos/cave-a-barriques.webp"), label: "La cave", alt: "Les barriques derrière la grille en fer forgé de la cave", ratio: "landscape" },
  { src: asset("photos/panneau-cave.webp"), label: "Bienvenue", alt: "Le panneau « Cave » sur une vieille charrette fleurie", ratio: "portrait" },
  { src: asset("photos/famille-au-chai.webp"), label: "La famille", alt: "La famille Dauny accoudée aux barriques", ratio: "landscape" },
  { src: asset("photos/domaine-vu-du-ciel.webp"), label: "Vu du ciel", alt: "Le domaine vu du ciel, au milieu de ses vignes", ratio: "landscape" },
]
