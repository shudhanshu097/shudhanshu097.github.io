"use client";

import { motion } from "framer-motion";
import { Check, Lock, Loader2 } from "lucide-react";
import { ROADMAP } from "@/lib/content";
import { SectionHeader } from "@/components/layout/SectionHeader";
import { GlowCard } from "@/components/effects/GlowCard";
import { cn } from "@/lib/utils";

const statusConfig = {
  completed: {
    icon: Check,
    color: "text-emerald-400",
    border: "border-emerald-400/30",
    bg: "bg-emerald-400/10",
    label: "Completed",
  },
  "in-progress": {
    icon: Loader2,
    color: "text-primary",
    border: "border-primary/30",
    bg: "bg-primary/10",
    label: "In Progress",
  },
  locked: {
    icon: Lock,
    color: "text-muted-foreground",
    border: "border-white/10",
    bg: "bg-white/[0.02]",
    label: "Upcoming",
  },
};

export function RoadmapSection() {
  return (
    <section id="roadmap" className="section-padding border-t border-white/[0.06]">
      <div className="section-container">
        <SectionHeader
          eyebrow="Learning Roadmap"
          title="A deliberate path to mastery"
          description="Structured progression from fundamentals to advanced analytics and career readiness."
        />

        <div className="relative mx-auto max-w-2xl">
          <div
            className="absolute left-6 top-0 h-full w-px bg-white/[0.06] sm:left-8"
            aria-hidden
          />

          <ol className="space-y-8">
            {ROADMAP.map((phase, i) => {
              const config = statusConfig[phase.status];
              const Icon = config.icon;
              const isLocked = phase.status === "locked";
              const isInProgress = phase.status === "in-progress";

              return (
                <motion.li
                  key={phase.id}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ delay: i * 0.12, duration: 0.6 }}
                  className="relative pl-16 sm:pl-20"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{
                      type: "spring",
                      stiffness: 300,
                      damping: 20,
                      delay: i * 0.12 + 0.1,
                    }}
                    className={cn(
                      "absolute left-3.5 top-1 flex h-6 w-6 items-center justify-center rounded-full border sm:left-5.5",
                      config.border,
                      config.bg,
                      isLocked && "opacity-50"
                    )}
                  >
                    <Icon
                      className={cn(
                        "h-3 w-3",
                        config.color,
                        isInProgress && "animate-spin"
                      )}
                      aria-hidden
                    />
                  </motion.div>

                  {!isLocked ? (
                    <GlowCard
                      variant={
                        phase.status === "completed" ? "blue" : "purple"
                      }
                    >
                      <div
                        className={cn(
                          "glass glow-border rounded-2xl border p-5 sm:p-6",
                          phase.status === "completed" &&
                            "border-emerald-400/20"
                        )}
                      >
                        <div className="flex items-center justify-between gap-4">
                          <h3 className="text-lg font-semibold tracking-tight">
                            {phase.title}
                          </h3>
                          <span
                            className={cn(
                              "text-xs font-medium uppercase tracking-wider",
                              config.color
                            )}
                          >
                            {config.label}
                          </span>
                        </div>

                        <ul className="mt-4 space-y-2">
                          {phase.items.map((item, j) => (
                            <motion.li
                              key={item}
                              initial={{ opacity: 0, x: -10 }}
                              whileInView={{ opacity: 1, x: 0 }}
                              viewport={{ once: true }}
                              transition={{
                                delay: i * 0.12 + j * 0.06 + 0.2,
                              }}
                              className="flex items-center gap-2 text-sm text-muted-foreground"
                            >
                              <span className="h-1 w-1 rounded-full bg-primary" />
                              {item}
                            </motion.li>
                          ))}
                        </ul>

                        {phase.status === "completed" && (
                          <motion.div
                            initial={{ scaleX: 0 }}
                            whileInView={{ scaleX: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.4, duration: 0.6 }}
                            className="mt-4 h-px origin-left bg-emerald-400/30"
                            aria-hidden
                          />
                        )}
                      </div>
                    </GlowCard>
                  ) : (
                    <div className="rounded-2xl border border-white/[0.06] bg-white/[0.01] p-5 opacity-60 sm:p-6">
                      <div className="flex items-center justify-between gap-4">
                        <h3 className="text-lg font-semibold tracking-tight">
                          {phase.title}
                        </h3>
                        <span
                          className={cn(
                            "text-xs font-medium uppercase tracking-wider",
                            config.color
                          )}
                        >
                          {config.label}
                        </span>
                      </div>

                      <ul className="mt-4 space-y-2">
                        {phase.items.map((item, j) => (
                          <motion.li
                            key={item}
                            initial={{ opacity: 0, x: -10 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.12 + j * 0.06 + 0.2 }}
                            className="flex items-center gap-2 text-sm text-muted-foreground"
                          >
                            <span className="h-1 w-1 rounded-full bg-muted" />
                            {item}
                          </motion.li>
                        ))}
                      </ul>

                      <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        className="mt-4 flex items-center gap-2 text-xs text-muted-foreground"
                      >
                        <Lock className="h-3 w-3" aria-hidden />
                        Unlocks with continued progress
                      </motion.div>
                    </div>
                  )}
                </motion.li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
