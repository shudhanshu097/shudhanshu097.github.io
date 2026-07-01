"use client";

import { useEffect, useRef } from "react";
import { useInView } from "framer-motion";

interface UseCountUpOptions {
  end: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
}

export function useCountUp({
  end,
  duration = 2000,
  prefix = "",
  suffix = "",
}: UseCountUpOptions) {
  const ref = useRef<HTMLParagraphElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const hasAnimated = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (end === 0) {
      el.textContent = "";
      return;
    }
    el.textContent = `${prefix}0${suffix}`;
  }, [end, prefix, suffix]);

  useEffect(() => {
    if (!isInView || hasAnimated.current || end === 0) return;
    hasAnimated.current = true;

    const el = ref.current;
    const startTime = performance.now();

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const val = Math.floor(eased * end);
      if (el) el.textContent = `${prefix}${val}${suffix}`;

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [isInView, end, duration, prefix, suffix]);

  return { ref, display: `${prefix}${end}${suffix}` };
}
