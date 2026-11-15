import { estate } from "@/data/content"
import { estateLogo } from "@/data/logo"
import { cn } from "@/lib/utils"

/** The estate's handwritten name (its height sets its size), or the name in type when there is no logo. */
export function EstateLogo({ className }: { className?: string }) {
  if (!estateLogo) {
    return <span className={cn("font-serif font-semibold italic leading-none", className)}>{estate.name}</span>
  }
  return (
    <svg viewBox={estateLogo.viewBox} role="img" aria-label={estate.name} className={cn("block w-auto", className)}>
      {/* The traced outline relies on even-odd filling to leave the letters' loops open. */}
      <path d={estateLogo.path} fill="currentColor" fillRule="evenodd" />
    </svg>
  )
}
