/**
 * Photography placeholders (Unsplash). Swap these for the hotel's own
 * photography — every image on the site is referenced from here.
 */
const unsplash = (id: string, w = 1600) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=80`

export const images = {
  // Boutique hotel exterior at dusk, warm windows glowing, stone building
  hero: unsplash("1542314831-068cd1dbfeeb", 2400),
  // Restaurant plated dish, candlelit table
  dining: unsplash("1414235077428-338989a2e8c0", 1400),
  gallery: {
    // Bedroom, four-poster bed, stone walls, warm lamp light
    bedroom: unsplash("1631049307264-da0ec9d70304", 1200),
    // Bathroom with roll-top bath, countryside window
    bathroom: unsplash("1552321554-5fefe8c9ef14", 1200),
    // Restaurant, candles, stone fireplace
    restaurant: unsplash("1517248135467-4c7edcad34c4", 1200),
    // Lounge, armchairs, bookshelves, firelight
    lounge: unsplash("1513694203232-719a280e022f", 1200),
    // Grounds at sunrise, mist, rolling fields
    grounds: unsplash("1501785888041-af3ef285b470", 1200),
    // Terrace, morning coffee, countryside view
    terrace: unsplash("1495474472287-4d71bcdd2085", 1200),
  },
} as const
