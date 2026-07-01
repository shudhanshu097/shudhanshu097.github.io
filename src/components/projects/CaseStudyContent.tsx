"use client";

import { memo } from "react";
import { ExternalLink, FileText } from "lucide-react";
import type { PROJECTS } from "@/lib/content";
import { GithubIcon } from "@/components/icons/SocialIcons";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

type FeaturedProject = (typeof PROJECTS)[number];

type CaseStudyContentProps = {
  project: FeaturedProject;
  index: number;
};

function CaseStudyContentInner({ project, index }: CaseStudyContentProps) {
  const demoIsRepo = project.demo === project.github;

  return (
    <div className="flex flex-col justify-center">
      <p className="mb-4 font-mono text-xs text-white/30">
        {String(index + 1).padStart(2, "0")}
      </p>

      <Badge variant="electric" className="mb-5 w-fit text-[11px]">
        {project.category}
      </Badge>

      <h3 className="text-balance text-[clamp(1.5rem,3.5vw,2.25rem)] font-semibold leading-[1.12] tracking-[-0.03em] text-foreground">
        {project.title}
      </h3>

      <p className="mt-5 max-w-lg text-base leading-relaxed text-muted-foreground sm:text-[1.05rem]">
        {project.description}
      </p>

      <div className="mt-8">
        <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.2em] text-white/35">
          Technology Stack
        </p>
        <div className="flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-white/[0.08] bg-white/[0.04] px-3 py-1.5 font-mono text-[11px] text-white/60"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      <div className="mt-10 flex flex-wrap gap-3">
        <Button variant="outline" size="lg" asChild>
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${project.title} on GitHub`}
          >
            <GithubIcon className="h-4 w-4" />
            GitHub
          </a>
        </Button>
        <Button variant="default" size="lg" asChild>
          <a
            href={project.demo}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${project.title} ${demoIsRepo ? "repository" : "live demo"}`}
          >
            <ExternalLink className="h-4 w-4" />
            {demoIsRepo ? "Repository" : "Live Demo"}
          </a>
        </Button>
        <Button variant="ghost" size="lg" asChild>
          <a href={project.caseStudy} aria-label={`${project.title} case study`}>
            <FileText className="h-4 w-4" />
            Case Study
          </a>
        </Button>
      </div>
    </div>
  );
}

export const CaseStudyContent = memo(CaseStudyContentInner);
