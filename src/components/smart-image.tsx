import { useState, type ImgHTMLAttributes } from "react"

import { cn } from "@/lib/utils"

/**
 * Image that degrades to a warm, on-brand gradient if the source fails,
 * so a missing photo never leaves a broken-image icon in the layout.
 */
export function SmartImage({ className, onError, ...props }: ImgHTMLAttributes<HTMLImageElement>) {
  const [failed, setFailed] = useState(false)

  if (failed) {
    return (
      <div
        role="img"
        aria-label={props.alt}
        className={cn(
          "bg-[radial-gradient(ellipse_at_30%_20%,hsl(38_46%_56%/0.28),transparent_60%),linear-gradient(160deg,hsl(215_12%_17%),hsl(215_16%_9%))]",
          className,
        )}
      />
    )
  }

  return (
    <img
      className={className}
      onError={(event) => {
        setFailed(true)
        onError?.(event)
      }}
      {...props}
    />
  )
}
