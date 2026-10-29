import { motion } from "motion/react"

import { GoldRule } from "@/components/gold-rule"
import { fadeUp } from "@/lib/motion"
import { cn } from "@/lib/utils"

type Props = {
  eyebrow?: string
  title: string
  id?: string
  className?: string
  align?: "left" | "center"
}

export function SectionHeading({ eyebrow, title, id, className, align = "left" }: Props) {
  const centered = align === "center"
  return (
    <motion.div
      className={cn("flex flex-col gap-5", centered && "items-center text-center", className)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-80px" }}
      variants={fadeUp}
    >
      {eyebrow && <p className="label text-accent">{eyebrow}</p>}
      <h2 id={id} className="section-title">
        {title}
      </h2>
      <GoldRule delay={0.2} />
    </motion.div>
  )
}
