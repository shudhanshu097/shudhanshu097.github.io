"use client";

import { useEffect, useState } from "react";
import { PROJECTS, PROJECTS_SECTION } from "@/lib/content";
import { SectionHeader } from "@/components/layout/SectionHeader";
import { CaseStudyShowcase } from "@/components/projects/CaseStudyShowcase";
import { getReducedMotion } from "@/hooks/useReducedMotion";

export function ProjectsSection() {
  const [reduceMotion, setReduceMotion] = useState(true);

  useEffect(() => {
    setReduceMotion(getReducedMotion());
  }, []);

  return (
    <section
      id="projects"
      className="relative border-t border-white/[0.06] px-4 py-32 sm:px-6 sm:py-40 lg:py-48"
      aria-labelledby="projects-title"
    >
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_45%_at_50%_0%,rgba(59,130,246,0.06),transparent_65%)]"
        aria-hidden
      />

      <div className="section-container relative max-w-6xl">
        <SectionHeader
          eyebrow={PROJECTS_SECTION.eyebrow}
          title={PROJECTS_SECTION.title}
          description={PROJECTS_SECTION.description}
          titleId="projects-title"
          className="mb-24 sm:mb-32"
        />

        <div className="flex flex-col gap-24 sm:gap-32 lg:gap-40">
          {PROJECTS.map((project, index) => (
            <CaseStudyShowcase
              key={project.id}
              project={project}
              index={index}
              reverse={index % 2 === 1}
              reduceMotion={reduceMotion}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
