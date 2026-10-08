# The Aldwick

Dark, editorial boutique hotel website built with React, Vite, TypeScript, Tailwind CSS, Motion (`motion/react`), shadcn/ui and lucide-react.

## Getting started

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # typecheck + production build to dist/
npm run preview    # serve the production build
```

## Structure

```
src/
  App.tsx                    page composition
  index.css                  design tokens (HSL CSS variables) + type utilities
  data/content.ts            all copy: rooms, gallery, testimonials, directions…
  data/images.ts             every photo URL in one place — swap for real photography
  components/ui/             shadcn primitives (button, badge, sheet)
  components/sections/       navbar, hero, rooms, gallery, dining, experiences,
                             testimonials, location, book CTA, footer
  components/gold-rule.tsx   animated gold rule (scaleX 0 → 1)
  components/smart-image.tsx image with an on-brand gradient fallback
```

## Notes

- Photography is placeholder Unsplash imagery; replace the URLs in `src/data/images.ts`.
- "Check availability" opens an email enquiry; point it at your booking engine when ready.
- Animations respect the visitor's reduced-motion preference.
