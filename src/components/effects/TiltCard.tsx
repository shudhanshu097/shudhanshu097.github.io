"use client";

import { memo, useEffect, useRef, useState, type ReactNode } from "react";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import { getReducedMotion } from "@/hooks/useReducedMotion";
import { cn } from "@/lib/utils";

type GlowVariant = "blue" | "purple" | "mixed";

interface TiltCardProps {
  children: ReactNode;
  className?: string;
  intensity?: number;
  variant?: GlowVariant;
}

const VARIANT_STOPS: Record<
  GlowVariant,
  { spotlight: string; border: string }
> = {
  blue: {
    spotlight:
      "rgba(59,130,246,0.22), rgba(96,165,250,0.1) 38%, transparent 68%",
    border:
      "rgba(59,130,246,0.55), rgba(96,165,250,0.25) 32%, transparent 58%",
  },
  purple: {
    spotlight:
      "rgba(139,92,246,0.22), rgba(167,139,250,0.1) 38%, transparent 68%",
    border:
      "rgba(139,92,246,0.55), rgba(167,139,250,0.25) 32%, transparent 58%",
  },
  mixed: {
    spotlight:
      "rgba(59,130,246,0.2), rgba(139,92,246,0.14) 42%, transparent 70%",
    border:
      "rgba(59,130,246,0.45), rgba(139,92,246,0.35) 35%, transparent 60%",
  },
};

function TiltCardFull({
  children,
  className,
  intensity = 8,
  variant = "mixed",
}: TiltCardProps) {
  const rectRef = useRef<DOMRect | null>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseX = useMotionValue(50);
  const mouseY = useMotionValue(50);

  const stops = VARIANT_STOPS[variant];

  const smoothX = useSpring(mouseX, { stiffness: 220, damping: 26 });
  const smoothY = useSpring(mouseY, { stiffness: 220, damping: 26 });

  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [intensity, -intensity]), {
    stiffness: 320,
    damping: 28,
  });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-intensity, intensity]), {
    stiffness: 320,
    damping: 28,
  });

  const spotlight = useMotionTemplate`radial-gradient(700px circle at ${smoothX}% ${smoothY}%, ${stops.spotlight})`;
  const borderGlow = useMotionTemplate`radial-gradient(900px circle at ${smoothX}% ${smoothY}%, ${stops.border})`;

  return (
    <motion.div
      onMouseMove={(e) => {
        const rect = rectRef.current;
        if (!rect) return;
        const px = ((e.clientX - rect.left) / rect.width) * 100;
        const py = ((e.clientY - rect.top) / rect.height) * 100;
        mouseX.set(px);
        mouseY.set(py);
        x.set((e.clientX - rect.left) / rect.width - 0.5);
        y.set((e.clientY - rect.top) / rect.height - 0.5);
      }}
      onMouseEnter={(e) => {
        rectRef.current = e.currentTarget.getBoundingClientRect();
      }}
      onMouseLeave={() => {
        rectRef.current = null;
        x.set(0);
        y.set(0);
        mouseX.set(50);
        mouseY.set(50);
      }}
      style={{ rotateX, rotateY, transformPerspective: 1200 }}
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 400, damping: 28 }}
      className={cn("group relative isolate transform-gpu rounded-2xl", className)}
    >
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-[inherit] opacity-0 transition-opacity duration-150 group-hover:opacity-100"
        style={{ background: borderGlow }}
        aria-hidden
      />

      <motion.div
        className="pointer-events-none absolute inset-0 z-[1] rounded-[inherit] opacity-0 transition-opacity duration-150 group-hover:opacity-100"
        style={{ background: spotlight }}
        aria-hidden
      />

      <div className="relative z-10 h-full">{children}</div>
    </motion.div>
  );
}

function TiltCardInner(props: TiltCardProps) {
  const [reduceMotion, setReduceMotion] = useState(true);

  useEffect(() => {
    setReduceMotion(getReducedMotion());
  }, []);

  if (reduceMotion) {
    return (
      <div
        className={cn(
          "group relative rounded-2xl transition-transform duration-150 ease-out hover:scale-[1.02]",
          props.className
        )}
      >
        {props.children}
      </div>
    );
  }

  return <TiltCardFull {...props} />;
}

export const TiltCard = memo(TiltCardInner);
