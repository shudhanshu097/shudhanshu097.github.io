"use client";

import { memo } from "react";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { ArrowDown, ChevronRight, FileText, Mail } from "lucide-react";
import { HERO, SITE } from "@/lib/content";
import { ParticleBackground } from "@/components/effects/ParticleBackground";
import { Button } from "@/components/ui/button";

const FloatingWorkspace = dynamic(
  () =>
    import("@/components/hero/FloatingWorkspace").then((m) => m.FloatingWorkspace),
  { ssr: false }
);

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { delay, duration: 0.5, ease: [0.22, 1, 0.36, 1] },
});

function HeroContent() {
  const [firstName, ...rest] = SITE.name.split(" ");

  return (
    <div className="relative z-20 mx-auto max-w-3xl px-4 text-center sm:px-6">
      <motion.p
        {...fadeUp(0.2)}
        className="font-mono text-xs uppercase tracking-[0.3em] text-primary"
      >
        {SITE.tagline}
      </motion.p>

      <motion.h1
        {...fadeUp(0.28)}
        className="mt-5 text-[clamp(2.75rem,8vw,5rem)] font-semibold leading-[1.02] tracking-[-0.04em]"
      >
        <span className="block text-white">{firstName}</span>
        <span className="block bg-gradient-to-r from-white via-white/90 to-white/50 bg-clip-text text-transparent">
          {rest.join(" ")}
        </span>
      </motion.h1>

      <motion.p
        {...fadeUp(0.36)}
        className="mt-4 text-[clamp(1.125rem,2.8vw,1.5rem)] font-medium text-foreground"
      >
        {HERO.role}
      </motion.p>

      <motion.p
        {...fadeUp(0.42)}
        className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg"
      >
        {HERO.intro}
      </motion.p>

      <motion.div
        {...fadeUp(0.5)}
        className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row sm:flex-wrap"
      >
        <Button variant="default" size="lg" className="group min-w-[168px]" asChild>
          <a href={HERO.ctas.projects.href}>
            {HERO.ctas.projects.label}
            <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </a>
        </Button>
        <Button variant="outline" size="lg" className="min-w-[140px]" asChild>
          <a href={HERO.ctas.resume.href}>
            <FileText className="h-4 w-4" />
            {HERO.ctas.resume.label}
          </a>
        </Button>
        <Button variant="outline" size="lg" className="min-w-[140px]" asChild>
          <a href={HERO.ctas.contact.href}>
            <Mail className="h-4 w-4" />
            {HERO.ctas.contact.label}
          </a>
        </Button>
      </motion.div>
    </div>
  );
}

const HeroContentMemo = memo(HeroContent);

export function HeroSection() {
  return (
    <section
      id="hero"
      aria-label="Introduction"
      className="relative flex min-h-screen items-center justify-center overflow-hidden bg-background pt-28 pb-20 sm:pt-32"
    >
      <ParticleBackground />

      <div
        className="pointer-events-none absolute inset-0 z-0 bg-[linear-gradient(rgba(255,255,255,0.028)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.028)_1px,transparent_1px)] bg-[size:72px_72px] [mask-image:radial-gradient(ellipse_at_center,black_12%,transparent_78%)]"
        aria-hidden
      />

      {/* GPU-friendly radial glows — no CSS blur filters */}
      <div
        className="pointer-events-none absolute top-1/2 left-1/2 z-0 h-[min(90vw,720px)] w-[min(90vw,720px)] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(59,130,246,0.12)_0%,rgba(59,130,246,0.04)_40%,transparent_70%)]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute top-1/3 right-1/4 z-0 h-64 w-64 rounded-full bg-[radial-gradient(circle,rgba(139,92,246,0.1)_0%,transparent_70%)]"
        aria-hidden
      />

      <div
        className="pointer-events-none absolute inset-x-0 top-0 z-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"
        aria-hidden
      />

      <FloatingWorkspace />

      <HeroContentMemo />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="pointer-events-none absolute bottom-8 left-1/2 z-20 -translate-x-1/2"
        aria-hidden
      >
        <div className="flex flex-col items-center gap-2 text-muted-foreground motion-safe:animate-[hero-bounce_2s_ease-in-out_infinite]">
          <span className="text-[10px] font-medium uppercase tracking-[0.2em]">
            Scroll
          </span>
          <ArrowDown className="h-4 w-4" />
        </div>
      </motion.div>
    </section>
  );
}
