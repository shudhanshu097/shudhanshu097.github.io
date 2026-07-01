"use client";

import { memo } from "react";
import Image from "next/image";
import type { WorkspacePreview as PreviewType } from "@/lib/content";
import { cn } from "@/lib/utils";

const accentBar: Record<string, string> = {
  blue: "from-primary/80 to-electric-glow/60",
  purple: "from-purple-accent/80 to-purple-glow/60",
  emerald: "from-emerald-500/80 to-emerald-400/60",
  amber: "from-amber-500/80 to-amber-400/60",
};

function MiniChart({ accent }: { accent: string }) {
  const bars = [42, 68, 55, 82, 61, 74, 48];
  return (
    <div className="flex h-full items-end gap-1 px-3 pb-3 pt-2">
      {bars.map((h, i) => (
        <div
          key={i}
          className={cn("w-full rounded-sm bg-gradient-to-t opacity-80", accentBar[accent])}
          style={{ height: `${h}%` }}
        />
      ))}
    </div>
  );
}

function MiniCode() {
  const lines = [
    "import pandas as pd",
    "df = pd.read_sql(q, conn)",
    "df.groupby('region').agg()",
    "pipeline.run(schedule='daily')",
  ];
  return (
    <div className="space-y-1 px-3 py-2 font-mono text-[9px] leading-relaxed text-white/55">
      {lines.map((line, i) => (
        <p key={i}>
          <span className={cn("mr-1.5", i === 0 ? "text-purple-glow/80" : "text-primary/70")}>
            {i + 1}
          </span>
          {line}
        </p>
      ))}
    </div>
  );
}

function MiniSql() {
  return (
    <div className="space-y-1 px-3 py-2 font-mono text-[9px] leading-relaxed">
      <p className="text-primary/80">SELECT region,</p>
      <p className="pl-2 text-white/60">SUM(revenue) AS rev</p>
      <p className="text-primary/80">FROM sales_fact</p>
      <p className="text-purple-glow/70">GROUP BY 1 ORDER BY 2;</p>
    </div>
  );
}

function MiniSimulation({ accent }: { accent: string }) {
  return (
    <div className="relative h-full overflow-hidden px-3 py-2">
      <div
        className={cn(
          "absolute inset-3 rounded-lg border border-white/[0.06] bg-gradient-to-br opacity-40",
          accent === "amber" ? "from-amber-500/20 to-transparent" : "from-primary/15 to-transparent"
        )}
      />
      <svg viewBox="0 0 120 60" className="h-full w-full opacity-70" aria-hidden>
        <path
          d="M0,45 Q30,10 60,35 T120,25"
          fill="none"
          stroke="rgba(59,130,246,0.5)"
          strokeWidth="1.5"
        />
        <path
          d="M0,50 Q30,30 60,42 T120,38"
          fill="none"
          stroke="rgba(139,92,246,0.35)"
          strokeWidth="1"
          strokeDasharray="3 3"
        />
      </svg>
      <p className="absolute bottom-2 left-3 font-mono text-[8px] text-white/40">
        n=10,000 · σ=0.12
      </p>
    </div>
  );
}

type WorkspacePreviewProps = {
  type: PreviewType;
  image?: string;
  title: string;
  accent: string;
};

function WorkspacePreviewInner({ type, image, title, accent }: WorkspacePreviewProps) {
  if (type === "image" && image) {
    return (
      <div className="relative h-full w-full">
        <Image
          src={image}
          alt={title}
          fill
          sizes="(max-width: 1024px) 160px, 256px"
          className="object-cover"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
      </div>
    );
  }

  if (type === "chart") return <MiniChart accent={accent} />;
  if (type === "code") return <MiniCode />;
  if (type === "sql") return <MiniSql />;
  if (type === "simulation") return <MiniSimulation accent={accent} />;

  return <MiniChart accent={accent} />;
}

export const WorkspacePreview = memo(WorkspacePreviewInner);
