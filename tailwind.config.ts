import type { Config } from "tailwindcss"
import animate from "tailwindcss-animate"

const hsl = (name: string) => `hsl(var(--${name}) / <alpha-value>)`

export default {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    container: {
      center: true,
      padding: { DEFAULT: "1.25rem", md: "2.5rem" },
      screens: { "2xl": "1320px" },
    },
    extend: {
      colors: {
        background: hsl("background"),
        foreground: hsl("foreground"),
        primary: { DEFAULT: hsl("primary"), foreground: hsl("primary-foreground") },
        accent: { DEFAULT: hsl("accent"), foreground: hsl("accent-foreground") },
        surface: { DEFAULT: hsl("surface"), raised: hsl("surface-raised") },
        muted: { DEFAULT: hsl("surface"), foreground: hsl("muted-foreground") },
        border: hsl("border"),
        input: hsl("border"),
        ring: hsl("accent"),
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', "Georgia", "serif"],
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      letterSpacing: {
        label: "0.14em",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 1px)",
        sm: "calc(var(--radius) - 2px)",
      },
    },
  },
  plugins: [animate],
} satisfies Config
