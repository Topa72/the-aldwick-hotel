/**
 * Photos du site. Pour ajouter vos photos du domaine (vignes, cave, famille),
 * déposez-les dans le dossier public et référencez-les ici ou dans `gallery`
 * (src/data/content.ts).
 */
const asset = (path: string) => `${import.meta.env.BASE_URL}${path}`

export const images = {
  /** The estate's cellar and shop, shown in the Domaine section. */
  facade: asset("photos/facade.jpg") as string | null,
  facadeAlt: "La façade du Vignoble Dauny à Champtin, avec son vieux pressoir et l'inscription « Culture biologique »",
  facadeCaption: "Le domaine à Champtin",
  /** Photo beside the organic-farming text; the text spans the page until one is set. */
  cellar: null as string | null,
}
