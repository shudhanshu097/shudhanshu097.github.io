"use client";

import { useEffect, type ReactNode } from "react";
import Lenis from "lenis";
import { isLowEndDevice, prefersReducedMotion } from "@/lib/device-capability";

export function SmoothScrollProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    if (prefersReducedMotion() || isLowEndDevice()) return;

    const lenis = new Lenis({
      duration: 1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.1,
    });

    let rafId = 0;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }

    const onVisibility = () => {
      if (document.hidden) lenis.stop();
      else lenis.start();
    };

    rafId = requestAnimationFrame(raf);
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      cancelAnimationFrame(rafId);
      document.removeEventListener("visibilitychange", onVisibility);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
