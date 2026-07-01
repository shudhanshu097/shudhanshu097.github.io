"use client";

import { motion } from "framer-motion";
import {
  Code2,
  Database,
  Table2,
  BarChart3,
  LayoutDashboard,
  TrendingUp,
} from "lucide-react";
import { SKILLS } from "@/lib/content";
import { SectionHeader } from "@/components/layout/SectionHeader";
import { TiltCard } from "@/components/effects/TiltCard";

const iconMap = {
  python: Code2,
  database: Database,
  table: Table2,
  chart: BarChart3,
  layout: LayoutDashboard,
  trending: TrendingUp,
};

export function SkillsSection() {
  return (
    <section id="skills" className="section-padding border-t border-white/[0.06]">
      <div className="section-container">
        <SectionHeader
          eyebrow="Skills"
          title="Tools I use to uncover insight"
          description="A focused toolkit for analysis, visualization, and strategic decision-making."
        />

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {SKILLS.map((skill, i) => {
            const Icon = iconMap[skill.icon];
            return (
              <TiltCard key={skill.name} intensity={7} variant="mixed">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ delay: i * 0.08, duration: 0.6 }}
                  whileHover={{ y: -6 }}
                  className="group glass h-full rounded-2xl p-6 transition-[border-color,box-shadow,transform] duration-300 sm:p-7"
                >
                  <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] transition-colors group-hover:border-primary/30 group-hover:bg-primary/10">
                    <Icon className="h-5 w-5 text-primary" aria-hidden />
                  </div>
                  <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                    {skill.category}
                  </p>
                  <h3 className="mt-1 text-lg font-semibold tracking-tight">
                    {skill.name}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    {skill.description}
                  </p>
                </motion.div>
              </TiltCard>
            );
          })}
        </div>
      </div>
    </section>
  );
}
