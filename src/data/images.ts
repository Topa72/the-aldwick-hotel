/**
 * Photos du site. Pour ajouter vos photos du domaine (vignes, cave, famille),
 * déposez-les dans public/photos/ et référencez-les ici ou dans `gallery`
 * (src/data/content.ts).
 */
const asset = (path: string) => `${import.meta.env.BASE_URL}${path}`

export const images = {
  /** The seven cuvées, cut out from the estate's studio photos. */
  range: asset("bottles/gamme.webp") as string | null,
  /** Photo beside the organic-farming text; the text spans the page until one is set. */
  cellar: null as string | null,
}
