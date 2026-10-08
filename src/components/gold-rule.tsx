import { motion } from "motion/react"

import { cn } from "@/lib/utils"

/** Thin gold rule that draws in from the left (scaleX 0 → 1, 0.5s). */
export function GoldRule({ className, delay = 0 }: { className?: string; delay?: number }) {
  return (
    <motion.span
      aria-hidden
      className={cn("block h-px w-24 origin-left bg-accent", className)}
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] }}
    />
  )
}
