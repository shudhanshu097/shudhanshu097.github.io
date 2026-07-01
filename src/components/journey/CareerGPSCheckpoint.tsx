"use client";

import { memo } from "react";
import { motion } from "framer-motion";
import {
  BookOpen,
  Briefcase,
  Compass,
  Flag,
  Target,
  type LucideIcon,
} from "lucide-react";
import type { JOURNEY, JourneyIcon } from "@/lib/content";
import { CareerGPSMiniVisual } from "./CareerGPSMiniVisual";
import { cn } from "@/lib/utils";

type JourneyCheckpoint = (typeof JOURNEY)[number];

const iconMap: Record<JourneyIcon, LucideIcon> = {
  academic: BookOpen,
  compass: Compass,
  target: Target,
  briefcase: Briefcase,
  flag: Flag,
};

type CareerGPSCheckpointProps = {
  checkpoint: JourneyCheckpoint;
  index: number;
  align: "left" | "right" | "center";
  isLit: boolean;
  isNext: boolean;
  reduceMotion: boolean;
};

function CareerGPSCheckpointInner({
  checkpoint,
  index,
  align,
  isLit,
  isNext,
  reduceMotion,
}: CareerGPSCheckpointProps) {
  const Icon = iconMap[checkpoint.icon] ?? Compass;
  const isUpcoming = checkpoint.status === "upcoming";

  return (
    <motion.div
      initial={{ opacity: 0, y: 36, scale: 0.97 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-12%" }}
      transition={{
        duration: 0.6,
        delay: index * 0.08,
        ease: [0.22, 1, 0.36, 1],
      }}
      style={{ transform: "translate3d(0,0,0)" }}
      className={cn(
        "relative grid grid-cols-1 items-center gap-6 lg:min-h-[220px] lg:grid-cols-12 lg:gap-6"
      )}
    >
      {/* Route marker */}
      <div className="relative z-20 flex justify-center lg:col-span-2 lg:col-start-6">
        <motion.div
          className={cn(
            "relative flex h-14 w-14 items-center justify-center rounded-2xl border bg-background/90 transition-[border-color] duration-300",
            isLit || isNext
              ? "border-primary/40"
              : "border-white/[0.1]"
          )}
        >
          <Icon className="h-5 w-5 text-primary" aria-hidden />
          <span className="absolute -top-2 -right-2 rounded-full border border-white/10 bg-black/80 px-1.5 py-0.5 font-mono text-[9px] text-white/50">
            {checkpoint.checkpoint}
          </span>
        </motion.div>
      </div>

      {/* Destination card */}
      <article
        tabIndex={0}
        className={cn(
          "relative z-10 mx-auto w-full max-w-lg rounded-[20px] outline-none transition-shadow focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
          align === "left" && "lg:col-span-5 lg:col-start-1 lg:row-start-1 lg:mx-0",
          align === "right" && "lg:col-span-5 lg:col-start-8 lg:row-start-1 lg:mx-0"
        )}
        aria-label={`Checkpoint ${checkpoint.checkpoint}: ${checkpoint.title}`}
      >
        <div
          className={cn(
            "rounded-[20px] border bg-white/[0.03] p-6 transition-[border-color] duration-300 sm:p-7",
            isLit
              ? "border-primary/20"
              : "border-white/[0.08]",
            isNext && isUpcoming && "border-primary/30"
          )}
        >
          <div className="flex flex-wrap items-center justify-between gap-3">
            <p className="font-mono text-xs tracking-wider text-primary">{checkpoint.year}</p>
            <span
              className={cn(
                "rounded-full border px-2.5 py-1 font-mono text-[9px] uppercase tracking-wider",
                isUpcoming
                  ? "border-primary/30 bg-primary/10 text-primary"
                  : "border-emerald-500/25 bg-emerald-500/10 text-emerald-400"
              )}
            >
              {isUpcoming ? "Destination Ahead" : "Checkpoint Reached"}
            </span>
          </div>

          <h3 className="mt-3 text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
            {checkpoint.title}
          </h3>

          <p className="mt-3 text-sm leading-relaxed text-muted-foreground sm:text-base">
            {checkpoint.description}
          </p>

          <CareerGPSMiniVisual type={checkpoint.visual} reduceMotion={reduceMotion} />
        </div>
      </article>
    </motion.div>
  );
}

export const CareerGPSCheckpoint = memo(CareerGPSCheckpointInner);
CareerGPSCheckpoint.displayName = "CareerGPSCheckpoint";
