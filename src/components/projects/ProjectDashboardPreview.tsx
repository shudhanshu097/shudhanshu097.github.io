"use client";

import { memo } from "react";
import type { FeaturedProjectPreview } from "@/lib/content";
import { TeaStallPreview } from "./TeaStallPreview";
import { OlistPreview } from "./OlistPreview";

function ProjectDashboardPreviewInner({
  type,
}: {
  type: FeaturedProjectPreview;
}) {
  if (type === "tea-stall") return <TeaStallPreview />;
  return <OlistPreview />;
}

export const ProjectDashboardPreview = memo(ProjectDashboardPreviewInner);
