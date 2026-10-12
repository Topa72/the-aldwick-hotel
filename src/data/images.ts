/**
 * Photos du site. Pour ajouter vos photos du domaine (vignes, cave, famille),
 * déposez-les dans public/photos/ et référencez-les ici ou dans `gallery`
 * (src/data/content.ts).
 */
const asset = (path: string) => `${import.meta.env.BASE_URL}${path}`

export const images = {
  /** The seven cuvées, cut out from the estate's studio photos. */
  range: asset("bottles/gamme.webp") as string | null,
  rangeAlt:
    "Les sept cuvées du Vignoble Dauny : Pynoz et Cuvée Romble rouges, Les Caillottes, Terres Blanches, Clos du Roy et Cuvée Romble blancs, Pynoz rosé",
  /** The estate's cellar and shop at Champtin. */
  facade: asset("photos/facade.jpg") as string | null,
  facadeAlt: "La façade du Vignoble Dauny à Champtin, avec son vieux pressoir et l'inscription « Culture biologique »",
  /** Photo beside the organic-farming text; the text spans the page until one is set. */
  cellar: null as string | null,
}
