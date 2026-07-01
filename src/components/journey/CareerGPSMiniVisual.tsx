"use client";

import { memo } from "react";
import { motion } from "framer-motion";
import type { JourneyVisual } from "@/lib/content";

function FoundationVisual() {
  const bars = [
    { label: "Math", h: 72 },
    { label: "Logic", h: 88 },
    { label: "Stats", h: 64 },
  ];
  return (
    <div className="flex items-end gap-2">
      {bars.map((b, i) => (
        <div key={b.label} className="flex-1">
          <motion.div
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08, duration: 0.45 }}
            className="origin-bottom rounded-sm bg-gradient-to-t from-primary/25 to-primary/80"
            style={{ height: `${b.h * 0.45}px` }}
          />
          <p className="mt-1 text-center font-mono text-[8px] text-white/35">{b.label}</p>
        </div>
      ))}
    </div>
  );
}

function CampusVisual() {
  const dots = [0, 1, 2, 3];
  return (
    <div>
      <div className="flex items-center justify-between">
        {dots.map((d) => (
          <div key={d} className="flex flex-col items-center gap-1">
            <div
              className={`h-2 w-2 rounded-full ${d <= 2 ? "bg-primary shadow-[0_0_8px_rgba(59,130,246,0.5)]" : "bg-white/15"}`}
            />
            <span className="font-mono text-[7px] text-white/30">
              {["Start", "IPM", "Biz", "Tech"][d]}
            </span>
          </div>
        ))}
      </div>
      <svg viewBox="0 0 100 24" className="mt-2 h-6 w-full" aria-hidden>
        <motion.path
          d="M 5 18 Q 35 8 65 14 T 95 6"
          fill="none"
          stroke="rgba(59,130,246,0.6)"
          strokeWidth="1.5"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        />
      </svg>
    </div>
  );
}

function SkillsVisual() {
  const skills = ["Python", "SQL", "Power BI", "Stats"];
  return (
    <div className="flex flex-wrap gap-1.5">
      {skills.map((s, i) => (
        <motion.span
          key={s}
          initial={{ opacity: 0, y: 6 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.06 }}
          className="rounded border border-primary/20 bg-primary/10 px-2 py-0.5 font-mono text-[8px] text-primary/90"
        >
          {s}
        </motion.span>
      ))}
    </div>
  );
}

function ProjectsVisual() {
  const bars = [45, 68, 52, 82, 74];
  return (
    <div className="flex h-12 items-end gap-1">
      {bars.map((h, i) => (
        <motion.div
          key={i}
          initial={{ scaleY: 0 }}
          whileInView={{ scaleY: 1 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.05 }}
          className="w-full origin-bottom rounded-t-sm bg-gradient-to-t from-purple-accent/30 to-primary/70"
          style={{ height: `${h}%` }}
        />
      ))}
    </div>
  );
}

function DestinationVisual({ reduceMotion = false }: { reduceMotion?: boolean }) {
  return (
    <div className="flex items-center gap-3">
      <div className="relative h-10 w-10 shrink-0">
        {!reduceMotion && (
          <motion.span
            animate={{ scale: [1, 1.35, 1], opacity: [0.5, 0, 0.5] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
            className="absolute inset-0 rounded-full bg-primary/30"
          />
        )}
        <div className="absolute inset-2 rounded-full border border-primary/40 bg-primary/20" />
        <div className="absolute inset-[14px] rounded-full bg-primary shadow-[0_0_12px_rgba(59,130,246,0.6)]" />
      </div>
      <div className="flex-1">
        <div className="h-1 overflow-hidden rounded-full bg-white/10">
          <motion.div
            className="h-full w-[72%] rounded-full bg-gradient-to-r from-primary to-purple-glow"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            style={{ transformOrigin: "left" }}
          />
        </div>
        <p className="mt-1 font-mono text-[8px] text-white/40">ETA · Business Data Analyst</p>
      </div>
    </div>
  );
}

function CareerGPSMiniVisualInner({
  type,
  reduceMotion = false,
}: {
  type: JourneyVisual;
  reduceMotion?: boolean;
}) {
  return (
    <div
      className="mt-5 rounded-xl border border-white/[0.06] bg-black/30 p-3"
      aria-hidden
    >
      {type === "foundation" && <FoundationVisual />}
      {type === "campus" && <CampusVisual />}
      {type === "skills" && <SkillsVisual />}
      {type === "projects" && <ProjectsVisual />}
      {type === "destination" && <DestinationVisual reduceMotion={reduceMotion} />}
    </div>
  );
}

export const CareerGPSMiniVisual = memo(CareerGPSMiniVisualInner);
