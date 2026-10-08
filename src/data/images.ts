/**
 * Photographies provisoires (Unsplash). Remplacez-les par les photos du
 * domaine : toutes les images du site sont référencées ici.
 */
const unsplash = (id: string, w = 1600) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=80`

export const images = {
  // Coteaux de vignes au crépuscule
  hero: unsplash("1506377247377-2a5b3b417ebb", 2400),
  // Chai, cuves et barriques
  cellar: unsplash("1474722883778-792e7990302f", 1400),
  gallery: {
    // Rangs de vigne sur les coteaux
    vines: unsplash("1528823872057-9c018a7a7553", 1200),
    // Grappes de raisin
    grapes: unsplash("1560148218-1a83060f7b32", 1200),
    // Verres de vin blanc
    tasting: unsplash("1510812431401-41d2bd2722f3", 1200),
    // Cave, barriques
    barrels: unsplash("1504279577054-acfeccf8fc52", 1200),
    // Paysage du Sancerrois
    landscape: unsplash("1516594915697-87eb3b1c14ea", 1200),
    // Bouteilles
    bottles: unsplash("1566754436893-98224ee05f2d", 1200),
  },
} as const
