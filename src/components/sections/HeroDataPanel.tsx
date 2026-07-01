"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Database, FileSpreadsheet, BarChart3, Check } from "lucide-react";

const pipelineSteps = [
  { id: "extract", label: "Extract", icon: Database, detail: "SQL query · 50K rows" },
  { id: "transform", label: "Transform", icon: FileSpreadsheet, detail: "Pandas · nulls cleaned" },
  { id: "visualize", label: "Visualize", icon: BarChart3, detail: "Power BI · 4 segments" },
];

const terminalLines = [
  { text: "$ python pipeline.py --source sales_db", color: "text-muted-foreground" },
  { text: "→ Connecting to PostgreSQL...", color: "text-primary/80" },
  { text: "→ Loaded 50,247 rows · 12 columns", color: "text-emerald-400/90" },
  { text: "→ Running K-means segmentation...", color: "text-primary/80" },
  { text: "→ 4 clusters identified · silhouette 0.82", color: "text-emerald-400/90" },
  { text: "→ Dashboard exported to Power BI ✓", color: "text-purple-glow" },
];

export function HeroDataPanel() {
  const [activeStep, setActiveStep] = useState(0);
  const [visibleLines, setVisibleLines] = useState(1);

  useEffect(() => {
    const stepInterval = setInterval(() => {
      setActiveStep((s) => (s + 1) % pipelineSteps.length);
    }, 2800);
    return () => clearInterval(stepInterval);
  }, []);

  useEffect(() => {
    if (visibleLines >= terminalLines.length) return;
    const t = setTimeout(() => setVisibleLines((v) => v + 1), 700);
    return () => clearTimeout(t);
  }, [visibleLines]);

  return (
    <motion.div
      initial={{ opacity: 0, x: 32, y: 16 }}
      animate={{ opacity: 1, x: 0, y: 0 }}
      transition={{ delay: 0.95, duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
      className="relative w-full max-w-md"
    >
      <div className="absolute -inset-6 rounded-3xl bg-gradient-to-br from-primary/8 to-purple-accent/5 blur-3xl" aria-hidden />

      <div className="glass-strong relative overflow-hidden rounded-2xl border border-white/[0.08]">
        {/* Pipeline flow */}
        <div className="border-b border-white/[0.06] px-4 py-4">
          <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
            Data pipeline
          </p>
          <div className="flex items-center justify-between gap-1">
            {pipelineSteps.map((step, i) => {
              const Icon = step.icon;
              const isActive = activeStep === i;
              const isDone = activeStep > i;

              return (
                <div key={step.id} className="flex flex-1 items-center">
                  <motion.div
                    animate={{
                      scale: isActive ? 1.05 : 1,
                      borderColor: isActive
                        ? "rgba(59,130,246,0.5)"
                        : isDone
                          ? "rgba(52,211,153,0.4)"
                          : "rgba(255,255,255,0.08)",
                    }}
                    className="flex w-full flex-col items-center gap-1.5 rounded-xl border bg-black/40 px-2 py-2.5"
                  >
                    <div
                      className={`flex h-7 w-7 items-center justify-center rounded-lg ${
                        isActive
                          ? "bg-primary/20 text-primary"
                          : isDone
                            ? "bg-emerald-500/15 text-emerald-400"
                            : "bg-white/[0.04] text-muted-foreground"
                      }`}
                    >
                      {isDone ? (
                        <Check className="h-3.5 w-3.5" />
                      ) : (
                        <Icon className="h-3.5 w-3.5" />
                      )}
                    </div>
                    <span className="text-[10px] font-medium">{step.label}</span>
                  </motion.div>
                  {i < pipelineSteps.length - 1 && (
                    <motion.div
                      className="mx-0.5 h-px flex-1 max-w-4 bg-white/10"
                      animate={{
                        backgroundColor:
                          activeStep > i
                            ? "rgba(59,130,246,0.5)"
                            : "rgba(255,255,255,0.08)",
                      }}
                    />
                  )}
                </div>
              );
            })}
          </div>
          <AnimatePresence mode="wait">
            <motion.p
              key={activeStep}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              className="mt-3 text-center font-mono text-[10px] text-primary"
            >
              {pipelineSteps[activeStep].detail}
            </motion.p>
          </AnimatePresence>
        </div>

        {/* Terminal output */}
        <div className="bg-black/50 px-4 py-3 font-mono text-[11px] leading-relaxed">
          <div className="mb-2 flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-red-500/70" />
            <span className="h-2 w-2 rounded-full bg-amber-500/70" />
            <span className="h-2 w-2 rounded-full bg-emerald-500/70" />
            <span className="ml-2 text-[10px] text-muted-foreground">
              analyst@iimj ~ pipeline
            </span>
          </div>
          {terminalLines.slice(0, visibleLines).map((line, i) => (
            <motion.p
              key={i}
              initial={{ opacity: 0, x: -6 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
              className={line.color}
            >
              {line.text}
            </motion.p>
          ))}
          {visibleLines < terminalLines.length && (
            <motion.span
              animate={{ opacity: [1, 0] }}
              transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse" }}
              className="inline-block h-3 w-1.5 bg-primary"
            />
          )}
        </div>

        {/* Footer stats */}
        <div className="grid grid-cols-3 divide-x divide-white/[0.06] border-t border-white/[0.06]">
          {[
            { v: "50K+", l: "Rows" },
            { v: "4", l: "Clusters" },
            { v: "0.82", l: "Score" },
          ].map((stat) => (
            <div key={stat.l} className="px-3 py-2.5 text-center">
              <p className="text-sm font-semibold tabular-nums text-foreground">
                {stat.v}
              </p>
              <p className="text-[9px] uppercase tracking-wider text-muted-foreground">
                {stat.l}
              </p>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export function HeroFloatingBadge() {
  return (
    <motion.a
      href="#projects"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 1.3, duration: 0.45 }}
      whileHover={{ scale: 1.02 }}
      className="group mt-8 inline-flex items-center gap-3 rounded-full border border-white/[0.08] bg-white/[0.03] px-4 py-2.5 text-sm backdrop-blur-md transition-[border-color,background-color,transform] hover:border-primary/25 hover:bg-white/[0.05]"
    >
      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary">
        <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      </span>
      <span>
        <span className="block text-[11px] text-muted-foreground">See the full pipeline</span>
        <span className="font-medium">Customer Segmentation Analysis</span>
      </span>
    </motion.a>
  );
}
