"use client";

import { memo } from "react";
import { motion } from "framer-motion";
import type { PROJECTS } from "@/lib/content";
import { CaseStudyContent } from "./CaseStudyContent";
import { DashboardWindow3D } from "./DashboardWindow3D";
import { cn } from "@/lib/utils";

type FeaturedProject = (typeof PROJECTS)[number];

type CaseStudyShowcaseProps = {
  project: FeaturedProject;
  index: number;
  reverse?: boolean;
  reduceMotion: boolean;
};

function CaseStudyShowcaseInner({
  project,
  index,
  reverse = false,
  reduceMotion,
}: CaseStudyShowcaseProps) {
  return (
    <motion.article
      id={project.id}
      initial={{ opacity: 0, y: 40, scale: 0.97 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{
        delay: index * 0.12,
        duration: 0.65,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="relative"
      aria-label={project.title}
    >
      {/* Subtle divider glow between showcases */}
      {index > 0 && (
        <div
          className="pointer-events-none absolute -top-16 left-1/2 h-px w-2/3 -translate-x-1/2 bg-gradient-to-r from-transparent via-white/[0.08] to-transparent sm:-top-20"
          aria-hidden
        />
      )}

      <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-14 xl:gap-20">
        {/* Dashboard — first on mobile/tablet */}
        <div
          className={cn(
            "order-1 lg:col-span-7",
            reverse ? "lg:order-1" : "lg:order-2"
          )}
        >
          <DashboardWindow3D project={project} reduceMotion={reduceMotion} />
        </div>

        {/* Copy — below dashboard on smaller screens */}
        <div
          className={cn(
            "order-2 lg:col-span-5",
            reverse ? "lg:order-2" : "lg:order-1"
          )}
        >
          <CaseStudyContent project={project} index={index} />
        </div>
      </div>
    </motion.article>
  );
}

export const CaseStudyShowcase = memo(CaseStudyShowcaseInner);
