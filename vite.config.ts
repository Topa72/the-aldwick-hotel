import path from "node:path"
import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"

// One HTML file per page (see src/lib/router.ts). VITE_SINGLE_FILE=1 builds only index.html, with
// every page inside and no lazy chunks, for the one-file preview.
const singleFile = process.env.VITE_SINGLE_FILE === "1"
const pageFiles = [
  "index.html",
  "le-domaine.html",
  "nos-vins.html",
  "ou-trouver-nos-vins.html",
  "nous-rendre-visite.html",
]

export default defineConfig({
  plugins: [react()],
  // Relative paths: the built site works at the domain root or in a sub-folder.
  base: "./",
  resolve: {
    alias: { "@": path.resolve(__dirname, "./src") },
  },
  build: {
    rollupOptions: singleFile
      ? { input: path.resolve(__dirname, "index.html"), output: { inlineDynamicImports: true } }
      : { input: Object.fromEntries(pageFiles.map((f) => [f.replace(".html", ""), path.resolve(__dirname, f)])) },
  },
})
