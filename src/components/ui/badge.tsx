import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva("label inline-flex items-center whitespace-nowrap px-3 py-1.5 transition-colors", {
  variants: {
    variant: {
      gold: "border border-accent/45 bg-background/40 text-accent backdrop-blur-sm",
      solid: "bg-accent text-accent-foreground",
    },
  },
  defaultVariants: { variant: "gold" },
})

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement>, VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <span className={cn(badgeVariants({ variant }), className)} {...props} />
}

export { Badge, badgeVariants }
