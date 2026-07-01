"use client";

import { memo } from "react";
import { motion, useTransform, type MotionValue } from "framer-motion";
import type { WorkspaceWindowConfig } from "@/lib/content";
import { WorkspacePreview } from "./WorkspacePreview";
import { cn } from "@/lib/utils";

const sizeClasses = {
  sm: "h-[7.5rem] w-[10.5rem] sm:h-[8.5rem] sm:w-[12rem]",
  md: "h-[8.5rem] w-[12rem] sm:h-[10rem] sm:w-[14.5rem] lg:h-[11rem] lg:w-[16rem]",
} as const;

const accentGlow: Record<string, string> = {
  blue: "group-hover:shadow-[0_0_40px_-10px_rgba(59,130,246,0.35)]",
  purple: "group-hover:shadow-[0_0_40px_-10px_rgba(139,92,246,0.3)]",
  emerald: "group-hover:shadow-[0_0_40px_-10px_rgba(16,185,129,0.28)]",
  amber: "group-hover:shadow-[0_0_40px_-10px_rgba(245,158,11,0.28)]",
};

type WorkspaceWindowProps = {
  config: WorkspaceWindowConfig;
  mouseX: MotionValue<number>;
  mouseY: MotionValue<number>;
  floatTime: MotionValue<number>;
  reduceMotion: boolean;
  active: boolean;
};

function WorkspaceWindowInner({
  config,
  mouseX,
  mouseY,
  floatTime,
  reduceMotion,
  active,
}: WorkspaceWindowProps) {
  const phase = config.phase;

  const parallaxX = useTransform(
    mouseX,
    (v) => (reduceMotion || !active ? 0 : v * config.depth * 0.018)
  );
  const parallaxY = useTransform(
    mouseY,
    (v) => (reduceMotion || !active ? 0 : v * config.depth * 0.018)
  );
  const floatX = useTransform(floatTime, (t) =>
    reduceMotion || !active ? 0 : Math.cos(t * 0.4 + phase) * 4
  );
  const floatY = useTransform(floatTime, (t) =>
    reduceMotion || !active
      ? 0
      : Math.sin(t * 0.55 + phase) * 7 + Math.cos(t * 0.35 + phase) * 3
  );
  const rotateZ = useTransform(floatTime, (t) =>
    reduceMotion || !active
      ? config.tilt
      : config.tilt + Math.sin(t * 0.3 + phase) * 1.8
  );
  const rotateY = useTransform(
    mouseX,
    (v) => (reduceMotion || !active ? 0 : v * config.depth * 0.004)
  );
  const rotateX = useTransform(
    mouseY,
    (v) => (reduceMotion || !active ? 0 : -v * config.depth * 0.003)
  );

  const x = useTransform([parallaxX, floatX], ([px, fx]) => (px as number) + (fx as number));
  const y = useTransform([parallaxY, floatY], ([py, fy]) => (py as number) + (fy as number));

  return (
    <motion.a
      href={config.link}
      style={{
        x,
        y,
        rotateX,
        rotateY,
        rotateZ,
        top: `${config.position.top}%`,
        left: `${config.position.left}%`,
        zIndex: Math.round(config.depth * 100),
      }}
      className={cn(
        "group pointer-events-auto absolute will-change-transform transform-gpu",
        sizeClasses[config.size],
        config.desktopOnly && "hidden lg:block"
      )}
      whileHover={reduceMotion ? undefined : { scale: 1.04, z: 50 }}
      transition={{ type: "spring", stiffness: 280, damping: 22 }}
      aria-label={`Open project: ${config.title}`}
    >
      <div
        className={cn(
          "flex h-full flex-col overflow-hidden rounded-xl border border-white/[0.12] bg-white/[0.04] shadow-[0_8px_32px_-8px_rgba(0,0,0,0.6)] backdrop-blur-xl transition-[border-color,box-shadow] duration-300 supports-[not(backdrop-filter:blur(1px))]:bg-white/[0.08]",
          accentGlow[config.accent],
          "group-hover:border-white/[0.22]"
        )}
      >
        <div className="flex items-center gap-2 border-b border-white/[0.06] bg-white/[0.03] px-2.5 py-1.5">
          <div className="flex gap-1" aria-hidden>
            <span className="h-2 w-2 rounded-full bg-[#ff5f57]/90" />
            <span className="h-2 w-2 rounded-full bg-[#febc2e]/90" />
            <span className="h-2 w-2 rounded-full bg-[#28c840]/90" />
          </div>
          <p className="min-w-0 flex-1 truncate text-center font-mono text-[9px] text-white/45">
            {config.title}
          </p>
        </div>

        <div className="relative min-h-0 flex-1 overflow-hidden bg-black/20">
          <WorkspacePreview
            type={config.preview}
            image={config.image}
            title={config.title}
            accent={config.accent}
          />
        </div>

        <div className="border-t border-white/[0.05] px-2.5 py-1">
          <p className="truncate font-mono text-[8px] uppercase tracking-wider text-primary/80">
            {config.category}
          </p>
        </div>
      </div>
    </motion.a>
  );
}

export const WorkspaceWindow = memo(WorkspaceWindowInner);
