"use client";

import { useEffect, useRef, useState } from "react";
import {
  useMotionValueEvent,
  useScroll,
  useTransform,
} from "framer-motion";
import { JOURNEY, JOURNEY_SECTION } from "@/lib/content";
import { SectionHeader } from "@/components/layout/SectionHeader";
import { CareerGPSRoute } from "@/components/journey/CareerGPSRoute";
import { CareerGPSCheckpoint } from "@/components/journey/CareerGPSCheckpoint";
import { getReducedMotion } from "@/hooks/useReducedMotion";

export function JourneySection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [reduceMotion, setReduceMotion] = useState(true);
  const [litCount, setLitCount] = useState(1);
  const reduceMotionRef = useRef(true);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.75", "end 0.35"],
  });

  const routeProgress = useTransform(scrollYProgress, [0, 1], [0, 1]);

  useEffect(() => {
    const reduced = getReducedMotion();
    reduceMotionRef.current = reduced;
    setReduceMotion(reduced);
    if (reduced) setLitCount(JOURNEY.length);
  }, []);

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    if (reduceMotionRef.current) return;
    const segment = 1 / JOURNEY.length;
    const count = Math.min(JOURNEY.length, Math.floor(v / segment) + 1);
    setLitCount((prev) => (prev === count ? prev : count));
  });

  return (
    <section
      id="journey"
      className="relative border-t border-white/[0.06] px-4 py-28 sm:px-6 sm:py-36 lg:py-44"
      aria-labelledby="journey-title"
    >
      <div
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:72px_72px] [mask-image:radial-gradient(ellipse_at_center,black_15%,transparent_75%)]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-x-0 top-1/4 h-1/2 bg-[radial-gradient(ellipse_at_center,rgba(59,130,246,0.05),transparent_65%)]"
        aria-hidden
      />

      <div className="section-container relative">
        <SectionHeader
          eyebrow={JOURNEY_SECTION.eyebrow}
          title={JOURNEY_SECTION.title}
          description={JOURNEY_SECTION.description}
          titleId="journey-title"
          className="mb-20 sm:mb-28"
        />

        <div ref={containerRef} className="relative">
          <CareerGPSRoute progress={routeProgress} reduceMotion={reduceMotion} />

          <div
            className="pointer-events-none absolute top-0 bottom-0 left-1/2 z-0 w-px -translate-x-1/2 bg-gradient-to-b from-primary/40 via-primary/15 to-purple-accent/20 sm:hidden"
            aria-hidden
          />

          <ol
            className="relative z-10 flex list-none flex-col gap-20 sm:gap-28 lg:gap-32"
            aria-label="Career navigation checkpoints"
          >
            {JOURNEY.map((checkpoint, index) => {
              const align =
                index % 2 === 0 ? ("left" as const) : ("right" as const);

              return (
                <li key={checkpoint.id}>
                  <CareerGPSCheckpoint
                    checkpoint={checkpoint}
                    index={index}
                    align={align}
                    isLit={index < litCount}
                    isNext={index === Math.min(litCount, JOURNEY.length - 1)}
                    reduceMotion={reduceMotion}
                  />
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
