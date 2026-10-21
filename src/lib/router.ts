import { useSyncExternalStore } from "react"

/**
 * The site's pages. Online, each is its own HTML file (see the *.html files at the project root),
 * which tells the app which page it is through `<html data-page="…">`. The single-file preview
 * (built with VITE_SINGLE_FILE=1) holds every page and switches between them with `#/page/anchor`.
 */
export type Page = "accueil" | "domaine" | "vins" | "ou-trouver" | "visite"

export const pages: Record<Page, { file: string; title: string }> = {
  accueil: { file: "index.html", title: "Vignoble Dauny · Sancerre bio depuis 1964" },
  domaine: { file: "le-domaine.html", title: "Le domaine · Vignoble Dauny" },
  vins: { file: "nos-vins.html", title: "Nos vins · Vignoble Dauny" },
  "ou-trouver": { file: "ou-trouver-nos-vins.html", title: "Où trouver nos vins · Vignoble Dauny" },
  visite: { file: "nous-rendre-visite.html", title: "Nous rendre visite · Vignoble Dauny" },
}

const SINGLE_FILE = import.meta.env.VITE_SINGLE_FILE === "1"

export type Route = { page: Page; anchor?: string }

const isPage = (p: string | undefined): p is Page => !!p && p in pages

/** Link to a page, optionally to an element (or a cuvée) on it. */
export function href(page: Page, anchor?: string) {
  if (SINGLE_FILE) return `#/${page}${anchor ? `/${anchor}` : ""}`
  return `${pages[page].file}${anchor ? `#${anchor}` : ""}`
}

function readRoute(): Route {
  const hash = decodeURIComponent(window.location.hash.slice(1))
  if (SINGLE_FILE) {
    const [, page, anchor] = hash.split("/")
    return isPage(page) ? { page, anchor: anchor || undefined } : { page: "accueil" }
  }
  const page = document.documentElement.dataset.page
  return { page: isPage(page) ? page : "accueil", anchor: hash || undefined }
}

let current = readRoute()

function subscribe(onChange: () => void) {
  const listener = () => {
    current = readRoute()
    onChange()
  }
  window.addEventListener("hashchange", listener)
  return () => window.removeEventListener("hashchange", listener)
}

/** The current page and anchor, updated when the address's #… part changes. */
export function useRoute() {
  return useSyncExternalStore(subscribe, () => current)
}
