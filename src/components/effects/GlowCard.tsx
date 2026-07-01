"use client";

import { memo, useRef, type ReactNode, type MouseEvent } from "react";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useSpring,
} from "framer-motion";
import { cn } from "@/lib/utils";

interface GlowCardProps {
  children: ReactNode;
  className?: string;
  variant?: "blue" | "purple" | "mixed";
}

function GlowCardInner({
  children,
  className,
  variant = "mixed",
}: GlowCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const rectRef = useRef<DOMRect | null>(null);
  const mouseX = useMotionValue(50);
  const mouseY = useMotionValue(50);

  const smoothX = useSpring(mouseX, { stiffness: 200, damping: 24 });
  const smoothY = useSpring(mouseY, { stiffness: 200, damping: 24 });

  const spotlightStops = {
    blue: "rgba(59,130,246,0.2), rgba(96,165,250,0.08) 40%, transparent 70%",
    purple:
      "rgba(139,92,246,0.2), rgba(167,139,250,0.08) 40%, transparent 70%",
    mixed:
      "rgba(59,130,246,0.18), rgba(139,92,246,0.12) 42%, transparent 72%",
  };

  const borderStops = {
    blue: "rgba(59,130,246,0.5), rgba(96,165,250,0.2) 35%, transparent 60%",
    purple:
      "rgba(139,92,246,0.5), rgba(167,139,250,0.2) 35%, transparent 60%",
    mixed:
      "rgba(59,130,246,0.4), rgba(139,92,246,0.3) 38%, transparent 62%",
  };

  const spotlight = useMotionTemplate`radial-gradient(650px circle at ${smoothX}% ${smoothY}%, ${spotlightStops[variant]})`;
  const borderGlow = useMotionTemplate`radial-gradient(850px circle at ${smoothX}% ${smoothY}%, ${borderStops[variant]})`;

  const handleMouse = (e: MouseEvent) => {
    if (!ref.current) return;
    const rect = rectRef.current;
    if (!rect) return;
    mouseX.set(((e.clientX - rect.left) / rect.width) * 100);
    mouseY.set(((e.clientY - rect.top) / rect.height) * 100);
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMouse}
      onMouseEnter={() => {
        if (ref.current) rectRef.current = ref.current.getBoundingClientRect();
      }}
      onMouseLeave={() => {
        rectRef.current = null;
        mouseX.set(50);
        mouseY.set(50);
      }}
      className={cn("group relative isolate overflow-hidden rounded-2xl", className)}
    >
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition-opacity duration-150 group-hover:opacity-100"
        style={{ background: borderGlow }}
        aria-hidden
      />
      <motion.div
        className="pointer-events-none absolute inset-0 z-[1] rounded-2xl opacity-0 transition-opacity duration-150 group-hover:opacity-100"
        style={{ background: spotlight }}
        aria-hidden
      />
      <div className="relative z-10">{children}</div>
    </div>
  );
}

export const GlowCard = memo(GlowCardInner);
