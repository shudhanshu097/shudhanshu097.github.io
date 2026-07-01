"use client";

import { memo } from "react";
import { cn } from "@/lib/utils";

function KpiTile({
  label,
  value,
  sub,
}: {
  label: string;
  value: string;
  sub: string;
}) {
  return (
    <div className="rounded-lg border border-white/[0.06] bg-white/[0.03] p-2">
      <p className="font-mono text-[8px] uppercase tracking-wider text-white/40">
        {label}
      </p>
      <p className="mt-0.5 text-sm font-semibold text-white/90">{value}</p>
      <p className="font-mono text-[8px] text-primary/80">{sub}</p>
    </div>
  );
}

function OlistPreviewInner() {
  const categories = [72, 58, 45, 38, 52, 64];
  const trend = [22, 28, 26, 34, 38, 42, 48, 52, 50, 58, 62, 68];

  return (
    <div
      className="grid h-full grid-rows-[auto_1fr_auto] gap-2 p-3"
      role="img"
      aria-label="Olist e-commerce executive dashboard with revenue KPIs, sales trend, category breakdown, customer insights and delivery performance"
    >
      <div className="grid grid-cols-4 gap-2">
        <KpiTile label="Revenue KPI" value="R$12.4M" sub="YoY +18.2%" />
        <KpiTile label="Orders" value="99.4K" sub="Q4 peak" />
        <KpiTile label="Avg Ticket" value="R$124" sub="+6.1%" />
        <KpiTile label="Customers" value="96K" sub="Active base" />
      </div>

      <div className="grid min-h-0 grid-cols-6 gap-2">
        <div className="col-span-3 flex flex-col rounded-lg border border-white/[0.06] bg-black/30 p-2">
          <p className="font-mono text-[8px] uppercase tracking-wider text-white/40">
            Sales Trend
          </p>
          <svg viewBox="0 0 120 48" className="mt-1 h-full w-full" aria-hidden>
            <polyline
              fill="none"
              stroke="rgba(59,130,246,0.75)"
              strokeWidth="1.5"
              points={trend.map((y, i) => `${i * 10},${48 - y * 0.55}`).join(" ")}
            />
            <polyline
              fill="url(#olistTrend)"
              stroke="none"
              points={`0,48 ${trend.map((y, i) => `${i * 10},${48 - y * 0.55}`).join(" ")} 110,48`}
            />
            <defs>
              <linearGradient id="olistTrend" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="rgba(59,130,246,0.25)" />
                <stop offset="100%" stopColor="transparent" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        <div className="col-span-2 flex flex-col rounded-lg border border-white/[0.06] bg-black/30 p-2">
          <p className="font-mono text-[8px] uppercase tracking-wider text-white/40">
            Orders by Category
          </p>
          <div className="mt-2 flex flex-1 items-end gap-1">
            {categories.map((h, i) => (
              <div
                key={i}
                className={cn(
                  "w-full rounded-t-sm",
                  i % 2 === 0
                    ? "bg-gradient-to-t from-purple-accent/30 to-purple-glow/70"
                    : "bg-gradient-to-t from-primary/25 to-primary/70"
                )}
                style={{ height: `${h}%` }}
              />
            ))}
          </div>
        </div>

        <div className="col-span-1 flex flex-col gap-2">
          <div className="flex flex-1 flex-col rounded-lg border border-white/[0.06] bg-black/30 p-2">
            <p className="font-mono text-[8px] uppercase tracking-wider text-white/40">
              Delivery
            </p>
            <div className="relative mx-auto mt-2 h-10 w-10">
              <svg viewBox="0 0 36 36" className="h-full w-full -rotate-90">
                <circle
                  cx="18"
                  cy="18"
                  r="14"
                  fill="none"
                  stroke="rgba(255,255,255,0.08)"
                  strokeWidth="3"
                />
                <circle
                  cx="18"
                  cy="18"
                  r="14"
                  fill="none"
                  stroke="rgba(16,185,129,0.8)"
                  strokeWidth="3"
                  strokeDasharray="72 100"
                />
              </svg>
              <span className="absolute inset-0 flex items-center justify-center font-mono text-[8px] text-emerald-400">
                92%
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2">
        <div className="rounded-lg border border-white/[0.05] bg-white/[0.02] px-2 py-1.5">
          <p className="font-mono text-[8px] uppercase tracking-wider text-white/40">
            Customer Insights
          </p>
          <p className="mt-0.5 text-[9px] text-white/55">
            Repeat rate 28% · Top region: SP · NPS 74
          </p>
        </div>
        <div className="rounded-lg border border-white/[0.05] bg-white/[0.02] px-2 py-1.5">
          <p className="font-mono text-[8px] uppercase tracking-wider text-white/40">
            Executive Summary
          </p>
          <p className="mt-0.5 text-[9px] text-white/55">
            Growth in health &amp; beauty · Delivery SLA improving
          </p>
        </div>
      </div>
    </div>
  );
}

export const OlistPreview = memo(OlistPreviewInner);
