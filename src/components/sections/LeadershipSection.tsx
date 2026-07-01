"use client";

import { motion } from "framer-motion";
import { LEADERSHIP } from "@/lib/content";
import { SectionHeader } from "@/components/layout/SectionHeader";
import { TiltCard } from "@/components/effects/TiltCard";
import { useCountUp } from "@/hooks/useCountUp";

function MetricCard({
  value,
  prefix,
  suffix,
  display,
  label,
  description,
  isText,
  index,
}: {
  value: number;
  prefix?: string;
  suffix?: string;
  display?: string;
  label: string;
  description: string;
  isText?: boolean;
  index: number;
}) {
  const { ref } = useCountUp({
    end: value,
    prefix: prefix ?? "",
    suffix: suffix ?? "",
  });

  return (
    <TiltCard intensity={6} variant="purple">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ delay: index * 0.1, duration: 0.6 }}
        className="glass glow-border-purple h-full rounded-2xl p-7 sm:p-8"
      >
        {isText ? (
          <p className="text-2xl font-semibold tracking-tight sm:text-3xl">
            {display}
          </p>
        ) : (
          <p
            ref={ref}
            className="text-3xl font-semibold tabular-nums tracking-tight sm:text-4xl"
          />
        )}
        <p className="mt-2 text-sm font-medium text-primary">{label}</p>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
          {description}
        </p>
      </motion.div>
    </TiltCard>
  );
}

export function LeadershipSection() {
  return (
    <section
      id="leadership"
      className="section-padding border-t border-white/[0.06]"
    >
      <div className="section-container">
        <SectionHeader
          eyebrow={LEADERSHIP.eyebrow}
          title={LEADERSHIP.title}
          description={LEADERSHIP.description}
        />

        <div className="grid gap-5 sm:grid-cols-2 lg:gap-6">
          {LEADERSHIP.metrics.map((metric, i) => (
            <MetricCard
              key={metric.label}
              value={metric.value}
              prefix={"prefix" in metric ? metric.prefix : undefined}
              suffix={"suffix" in metric ? metric.suffix : undefined}
              display={"display" in metric ? metric.display : undefined}
              label={metric.label}
              description={metric.description}
              isText={"isText" in metric ? metric.isText : false}
              index={i}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
