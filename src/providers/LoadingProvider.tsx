"use client";

import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { AnimatePresence, motion } from "framer-motion";
import { LOADING_STEPS } from "@/lib/content";

interface LoadingContextValue {
  isLoading: boolean;
}

const LoadingContext = createContext<LoadingContextValue>({ isLoading: true });
const LOADED_KEY = "portfolio-session-loaded";

export function useLoading() {
  return useContext(LoadingContext);
}

export function LoadingProvider({ children }: { children: ReactNode }) {
  const [isLoading, setIsLoading] = useState(true);
  const progressRef = useRef<HTMLSpanElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const stepRef = useRef<HTMLParagraphElement>(null);
  const lastStepRef = useRef(-1);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced || sessionStorage.getItem(LOADED_KEY)) {
      setIsLoading(false);
      return;
    }

    const duration = 2600;
    const start = performance.now();
    let rafId = 0;

    const tick = (now: number) => {
      const elapsed = now - start;
      const pct = Math.min((elapsed / duration) * 100, 100);
      const floor = Math.floor(pct);

      if (progressRef.current) progressRef.current.textContent = String(floor);
      if (barRef.current) barRef.current.style.width = `${pct}%`;

      const step = Math.min(
        Math.floor((pct / 100) * LOADING_STEPS.length),
        LOADING_STEPS.length - 1
      );
      if (step !== lastStepRef.current && stepRef.current) {
        lastStepRef.current = step;
        stepRef.current.textContent = LOADING_STEPS[step];
      }

      if (pct < 100) {
        rafId = requestAnimationFrame(tick);
      } else {
        sessionStorage.setItem(LOADED_KEY, "1");
        window.setTimeout(() => setIsLoading(false), 350);
      }
    };

    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, []);

  return (
    <LoadingContext.Provider value={{ isLoading }}>
      <AnimatePresence mode="wait">
        {isLoading && (
          <motion.div
            key="loader"
            exit={{ opacity: 0, scale: 1.02 }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-background"
            role="progressbar"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label="Loading"
          >
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-8 font-mono text-xs uppercase tracking-[0.3em] text-muted-foreground"
            >
              System initialization
            </motion.p>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="mb-6 text-[clamp(3rem,10vw,6rem)] font-semibold tabular-nums tracking-tighter"
            >
              <span ref={progressRef}>0</span>
              <span className="text-2xl text-muted-foreground">%</span>
            </motion.div>

            <div className="h-px w-48 overflow-hidden rounded-full bg-white/10 sm:w-64">
              <div
                ref={barRef}
                className="h-full bg-primary"
                style={{ width: "0%" }}
              />
            </div>

            <p
              ref={stepRef}
              className="mt-6 font-mono text-xs text-muted-foreground"
            >
              {LOADING_STEPS[0]}
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        initial={false}
        animate={{ opacity: isLoading ? 0 : 1 }}
        transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
        style={{ pointerEvents: isLoading ? "none" : "auto" }}
      >
        {children}
      </motion.div>
    </LoadingContext.Provider>
  );
}
