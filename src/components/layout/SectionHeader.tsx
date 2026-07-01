"use client";

import { memo } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  eyebrow: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
  titleId?: string;
}

function SectionHeaderInner({
  eyebrow,
  title,
  description,
  align = "center",
  className,
  titleId,
}: SectionHeaderProps) {
  const isCenter = align === "center";

  return (
    <motion.header
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        "mb-16 sm:mb-20",
        isCenter && "mx-auto max-w-3xl text-center",
        className
      )}
    >
      <p className="mb-4 font-mono text-xs uppercase tracking-[0.25em] text-primary">
        {eyebrow}
      </p>
      <h2
        id={titleId}
        className="text-balance text-[clamp(1.75rem,4vw,3rem)] font-semibold leading-[1.1] tracking-[-0.03em]"
      >
        {title}
      </h2>
      {description && (
        <p className="mt-5 text-balance text-base leading-relaxed text-muted-foreground sm:text-lg">
          {description}
        </p>
      )}
    </motion.header>
  );
}

export const SectionHeader = memo(SectionHeaderInner);
