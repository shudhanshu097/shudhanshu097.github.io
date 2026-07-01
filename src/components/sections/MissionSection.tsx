"use client";

import { motion } from "framer-motion";
import { MISSION } from "@/lib/content";

export function MissionSection() {
  return (
    <section
      id="mission"
      className="relative flex min-h-screen items-center justify-center px-4 sm:px-6"
      aria-label="Mission statement"
    >
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_50%_50%_at_50%_50%,rgba(59,130,246,0.06),transparent)]"
        aria-hidden
      />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        className="relative mx-auto max-w-4xl text-center"
      >
        <blockquote>
          <p className="text-[clamp(1.5rem,4.5vw,3rem)] font-medium leading-[1.3] tracking-[-0.02em] text-balance">
            &ldquo;{MISSION.quote}&rdquo;
          </p>
          <footer className="mt-10">
            <cite className="not-italic">
              <span className="text-sm text-muted-foreground">— </span>
              <span className="text-sm font-medium">{MISSION.attribution}</span>
            </cite>
          </footer>
        </blockquote>
      </motion.div>
    </section>
  );
}
