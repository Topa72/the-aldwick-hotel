import * as DialogPrimitive from "@radix-ui/react-dialog"
import { X, ZoomIn } from "lucide-react"

import { cn } from "@/lib/utils"

/** A thumbnail that opens the photo nearly full screen; click anywhere or press Escape to close. */
export function PhotoLightbox({ src, alt, className }: { src: string; alt: string; className?: string }) {
  return (
    <DialogPrimitive.Root>
      <DialogPrimitive.Trigger
        className={cn(
          "group relative block shrink-0 self-start overflow-hidden bg-white outline-none ring-accent focus-visible:ring-2",
          className,
        )}
        aria-label={`Agrandir la photo : ${alt}`}
      >
        <img
          src={src}
          alt={alt}
          loading="lazy"
          className="w-full transition-transform duration-300 group-hover:scale-105"
        />
        <span className="absolute bottom-1.5 right-1.5 flex h-7 w-7 items-center justify-center bg-background/80 text-foreground transition-colors group-hover:bg-accent group-hover:text-accent-foreground">
          <ZoomIn className="h-3.5 w-3.5" strokeWidth={1.5} />
        </span>
      </DialogPrimitive.Trigger>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className="fixed inset-0 z-50 bg-background/95 backdrop-blur-sm data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:animate-in data-[state=open]:fade-in-0" />
        <DialogPrimitive.Content
          className="fixed inset-0 z-50 flex cursor-zoom-out items-center justify-center p-4 outline-none data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95 sm:p-10"
        >
          <DialogPrimitive.Close className="absolute inset-0 cursor-zoom-out" aria-label="Fermer la photo" />
          <DialogPrimitive.Title className="sr-only">{alt}</DialogPrimitive.Title>
          <DialogPrimitive.Description className="sr-only">Photo agrandie</DialogPrimitive.Description>
          <figure className="pointer-events-none relative flex w-full flex-col items-center">
            <img src={src} alt={alt} className="h-auto w-[min(100%,calc((100dvh-7rem)*2/3))] bg-white shadow-2xl" />
            <figcaption className="label mt-4 text-center text-muted-foreground">{alt}</figcaption>
          </figure>
          <DialogPrimitive.Close
            className="absolute right-4 top-4 flex h-11 w-11 items-center justify-center border border-border bg-background/80 text-foreground transition-colors hover:border-accent hover:text-accent"
            aria-label="Fermer"
          >
            <X className="h-5 w-5" strokeWidth={1.5} />
          </DialogPrimitive.Close>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  )
}
