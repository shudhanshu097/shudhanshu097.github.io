"use client";

import { memo } from "react";
import type { PROJECTS } from "@/lib/content";
import { CardBody, CardContainer, CardItem } from "@/components/ui/3d-card";
import { ProjectDashboardPreview } from "./ProjectDashboardPreview";
import { cn } from "@/lib/utils";

type FeaturedProject = (typeof PROJECTS)[number];

type DashboardWindow3DProps = {
  project: FeaturedProject;
  reduceMotion: boolean;
};

function DashboardWindow3DInner({ project, reduceMotion }: DashboardWindow3DProps) {
  return (
    <CardContainer
      disabled={reduceMotion}
      containerClassName="w-full py-0"
      className="w-full"
    >
      <CardBody className="h-auto w-full [transform-style:preserve-3d]">
        <div
          className={cn(
            "overflow-hidden rounded-[22px] border border-white/[0.1] bg-white/[0.03] shadow-[0_24px_64px_-28px_rgba(0,0,0,0.85)] backdrop-blur-xl transition-[box-shadow,border-color] duration-300",
            "group-hover/card:border-primary/20 group-hover/card:shadow-[0_32px_80px_-24px_rgba(0,0,0,0.9),0_0_60px_-24px_rgba(59,130,246,0.2)]"
          )}
          role="img"
          aria-label={`${project.title} interactive dashboard preview`}
        >
          {/* Chrome + toolbar */}
          <CardItem translateZ={14} translateY={-3} className="w-full">
            <header className="border-b border-white/[0.06] bg-white/[0.02]">
              <div className="flex items-center gap-3 px-4 py-3">
                <div className="flex gap-1.5" aria-hidden>
                  <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]/90" />
                  <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]/90" />
                  <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]/90" />
                </div>
                <p className="min-w-0 flex-1 truncate text-center font-mono text-[11px] text-white/45">
                  {project.title}
                </p>
                <span className="font-mono text-[9px] text-white/25">v1.0</span>
              </div>
              <div className="flex items-center gap-4 border-t border-white/[0.04] px-4 py-2 font-mono text-[9px] text-white/35">
                <span className="text-white/55">File</span>
                <span>View</span>
                <span>Run</span>
                <span className="ml-auto text-primary/70">● Live</span>
              </div>
            </header>
          </CardItem>

          {/* Dashboard canvas */}
          <CardItem translateZ={52} className="w-full">
            <div className="relative min-h-[260px] w-full bg-gradient-to-br from-[#080c14] via-[#0a101c] to-[#06080e] sm:min-h-[300px] lg:min-h-[360px]">
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(59,130,246,0.14),transparent_55%)]" />
              <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_at_center,black,transparent_85%)]" />
              <ProjectDashboardPreview type={project.preview} />
            </div>
          </CardItem>

          {/* Floating metric strip */}
          <CardItem translateZ={22} className="w-full">
            <div className="border-t border-white/[0.05] bg-black/25 px-4 py-2">
              <p className="font-mono text-[9px] text-white/40">
                Workspace · Analytics Engine · GPU transforms enabled
              </p>
            </div>
          </CardItem>

          {/* Status bar */}
          <CardItem translateZ={8} className="w-full">
            <footer className="flex flex-col gap-1.5 border-t border-white/[0.06] bg-black/40 px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
              <p className="flex items-center gap-2 font-mono text-[10px] text-emerald-400/90">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.55)]" />
                {project.status.label}
              </p>
              <p className="font-mono text-[10px] text-white/45">
                {project.status.primary}
              </p>
              <p className="font-mono text-[10px] text-white/35">
                {project.status.secondary}
              </p>
            </footer>
          </CardItem>
        </div>
      </CardBody>
    </CardContainer>
  );
}

export const DashboardWindow3D = memo(DashboardWindow3DInner);
