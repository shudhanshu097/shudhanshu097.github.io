"use client";

import { memo, useEffect, useRef, useState } from "react";
import { useAnimationFrame, useMotionValue } from "framer-motion";
import { HERO_WORKSPACE_WINDOWS } from "@/lib/content";
import { subscribePointer } from "@/lib/pointer-bus";
import { getReducedMotion } from "@/hooks/useReducedMotion";

import { WorkspaceWindow } from "./WorkspaceWindow";

function FloatingWorkspaceInner() {
  const rootRef = useRef<HTMLDivElement>(null);
  const [reduceMotion, setReduceMotion] = useState(true);
  const [inView, setInView] = useState(false);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const floatTime = useMotionValue(0);

  useEffect(() => {
    setReduceMotion(getReducedMotion());
  }, []);

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0, rootMargin: "80px 0px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const active = inView && !reduceMotion;

  useEffect(() => {
    if (!active) return;
    return subscribePointer((x, y) => {
      mouseX.set(x - window.innerWidth / 2);
      mouseY.set(y - window.innerHeight / 2);
    });
  }, [active, mouseX, mouseY]);

  // Single RAF drives all window float animations
  useAnimationFrame((time) => {
    if (!active) return;
    floatTime.set(time / 1000);
  });

  return (
    <div
      ref={rootRef}
      className="pointer-events-none absolute inset-0 z-10 [perspective:1400px] [transform-style:preserve-3d]"
      aria-hidden
    >
      <div
        className="pointer-events-none absolute inset-0 z-[1] bg-[radial-gradient(ellipse_55%_50%_at_50%_48%,hsl(var(--background))_0%,hsl(var(--background)/0.72)_45%,transparent_72%)]"
        aria-hidden
      />

      <div className="relative h-full w-full">
        {HERO_WORKSPACE_WINDOWS.map((config) => (
          <WorkspaceWindow
            key={config.id}
            config={config}
            mouseX={mouseX}
            mouseY={mouseY}
            floatTime={floatTime}
            reduceMotion={reduceMotion}
            active={active}
          />
        ))}
      </div>
    </div>
  );
}

export const FloatingWorkspace = memo(FloatingWorkspaceInner);
