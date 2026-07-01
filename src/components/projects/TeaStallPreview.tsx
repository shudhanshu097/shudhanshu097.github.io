"use client";

import { memo } from "react";
import { cn } from "@/lib/utils";

function KpiTile({
  label,
  value,
  delta,
  tone = "blue",
}: {
  label: string;
  value: string;
  delta: string;
  tone?: "blue" | "emerald" | "amber";
}) {
  const toneClass = {
    blue: "text-primary",
    emerald: "text-emerald-400",
    amber: "text-amber-400",
  }[tone];

  return (
    <div className="rounded-lg border border-white/[0.06] bg-white/[0.03] p-2.5">
      <p className="font-mono text-[8px] uppercase tracking-wider text-white/40">
        {label}
      </p>
      <p className="mt-1 text-sm font-semibold tracking-tight text-white/90">
        {value}
      </p>
      <p className={cn("mt-0.5 font-mono text-[9px]", toneClass)}>{delta}</p>
    </div>
  );
}

function TeaStallPreviewInner() {
  const histogram = [12, 18, 28, 42, 58, 72, 65, 48, 32, 22, 14, 10];

  return (
    <div
      className="grid h-full grid-rows-[auto_1fr_auto] gap-2 p-3"
      role="img"
      aria-label="Monte Carlo simulation dashboard showing revenue KPI, profit KPI, probability distribution, histogram, and risk metrics"
    >
      <div className="grid grid-cols-3 gap-2">
        <KpiTile label="Revenue KPI" value="₹4.2L" delta="μ ± σ modeled" />
        <KpiTile label="Profit KPI" value="₹68K" delta="+12.4% P50" tone="emerald" />
        <KpiTile label="Risk Index" value="Low" delta="VaR within tolerance" tone="amber" />
      </div>

      <div className="grid min-h-0 grid-cols-5 gap-2">
        <div className="col-span-3 flex flex-col rounded-lg border border-white/[0.06] bg-black/30 p-2">
          <p className="font-mono text-[8px] uppercase tracking-wider text-white/40">
            Monte Carlo Histogram
          </p>
          <div className="mt-2 flex flex-1 items-end gap-0.5">
            {histogram.map((h, i) => (
              <div
                key={i}
                className="w-full rounded-t-sm bg-gradient-to-t from-primary/30 to-primary/80"
                style={{ height: `${h}%` }}
              />
            ))}
          </div>
        </div>

        <div className="col-span-2 flex flex-col gap-2">
          <div className="flex flex-1 flex-col rounded-lg border border-white/[0.06] bg-black/30 p-2">
            <p className="font-mono text-[8px] uppercase tracking-wider text-white/40">
              Probability Distribution
            </p>
            <svg viewBox="0 0 100 50" className="mt-1 h-full w-full" aria-hidden>
              <path
                d="M0,42 C15,38 25,12 45,18 S75,8 100,22"
                fill="none"
                stroke="rgba(59,130,246,0.7)"
                strokeWidth="1.5"
              />
              <path
                d="M0,42 C15,38 25,12 45,18 S75,8 100,22 L100,50 L0,50 Z"
                fill="url(#teaGrad)"
                opacity="0.35"
              />
              <defs>
                <linearGradient id="teaGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="rgba(59,130,246,0.5)" />
                  <stop offset="100%" stopColor="transparent" />
                </linearGradient>
              </defs>
            </svg>
          </div>

          <div className="rounded-lg border border-amber-500/20 bg-amber-500/[0.06] p-2">
            <p className="font-mono text-[8px] uppercase tracking-wider text-amber-400/80">
              Risk Indicator
            </p>
            <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-white/10">
              <div className="h-full w-[28%] rounded-full bg-gradient-to-r from-emerald-500 to-amber-400" />
            </div>
            <p className="mt-1 font-mono text-[9px] text-white/50">
              Downside exposure: 12%
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-1.5 font-mono text-[8px] text-white/45">
        <span className="rounded border border-white/[0.05] bg-white/[0.02] px-2 py-1">
          Customers: 340/day
        </span>
        <span className="rounded border border-white/[0.05] bg-white/[0.02] px-2 py-1">
          σ Demand: 18%
        </span>
        <span className="rounded border border-white/[0.05] bg-white/[0.02] px-2 py-1">
          Break-even: Day 42
        </span>
        <span className="rounded border border-white/[0.05] bg-white/[0.02] px-2 py-1">
          Scenarios: 10K
        </span>
      </div>
    </div>
  );
}

export const TeaStallPreview = memo(TeaStallPreviewInner);
