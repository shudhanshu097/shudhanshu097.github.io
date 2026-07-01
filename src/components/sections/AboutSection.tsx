"use client";

import { motion } from "framer-motion";
import { GraduationCap, Target, BarChart3 } from "lucide-react";
import { ABOUT } from "@/lib/content";
import { SectionHeader } from "@/components/layout/SectionHeader";
import { TiltCard } from "@/components/effects/TiltCard";

const icons = [GraduationCap, BarChart3, Target];

export function AboutSection() {
  return (
    <section id="about" className="section-padding border-t border-white/[0.06]">
      <div className="section-container">
        <SectionHeader
          eyebrow={ABOUT.eyebrow}
          title={ABOUT.title}
          align="left"
          className="max-w-2xl"
        />

        <div className="grid items-start gap-12 lg:grid-cols-2 lg:gap-20">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="space-y-6"
          >
            {ABOUT.paragraphs.map((p, i) => (
              <p
                key={i}
                className="text-base leading-relaxed text-muted-foreground sm:text-lg"
              >
                {p}
              </p>
            ))}
          </motion.div>

          <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1 lg:gap-5">
            {ABOUT.highlights.map((item, i) => {
              const Icon = icons[i];
              return (
                <TiltCard key={item.label} intensity={5} variant="blue">
                  <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-40px" }}
                    transition={{ delay: i * 0.1, duration: 0.6 }}
                    className="glass glow-border rounded-2xl p-6"
                  >
                    <Icon className="mb-4 h-5 w-5 text-primary" aria-hidden />
                    <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                      {item.label}
                    </p>
                    <p className="mt-1 text-lg font-semibold tracking-tight">
                      {item.value}
                    </p>
                  </motion.div>
                </TiltCard>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
