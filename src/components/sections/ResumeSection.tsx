"use client";

import { motion } from "framer-motion";
import { Download, FileText } from "lucide-react";
import { SITE } from "@/lib/content";
import { SectionHeader } from "@/components/layout/SectionHeader";
import { Button } from "@/components/ui/button";
import { TiltCard } from "@/components/effects/TiltCard";

export function ResumeSection() {
  return (
    <section id="resume" className="section-padding border-t border-white/[0.06]">
      <div className="section-container">
        <SectionHeader
          eyebrow="Resume"
          title="Experience at a glance"
          description="A concise overview of my academic background, skills, and leadership experience."
        />

        <TiltCard intensity={4} variant="blue">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7 }}
            className="glass-strong glow-border mx-auto max-w-2xl overflow-hidden rounded-2xl"
          >
            <div className="border-b border-white/[0.06] bg-white/[0.02] px-6 py-4 sm:px-8">
              <div className="flex items-center gap-3">
                <FileText className="h-5 w-5 text-primary" aria-hidden />
                <div>
                  <p className="text-sm font-medium">{SITE.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {SITE.role} · {SITE.institution}
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-6 p-6 sm:p-8">
              <div>
                <h3 className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  Education
                </h3>
                <p className="mt-2 font-medium">{SITE.program}</p>
                <p className="text-sm text-muted-foreground">
                  {SITE.institution}
                </p>
              </div>

              <div>
                <h3 className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  Core Competencies
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  Python · SQL · Pandas · Power BI · Tableau · Business Analytics
                  · Data Visualization · Statistical Analysis · Cross-functional
                  Leadership
                </p>
              </div>

              <div>
                <h3 className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  Leadership Highlights
                </h3>
                <ul className="mt-2 space-y-1.5 text-sm text-muted-foreground">
                  <li>Mess Committee member — coordinated 550+ participants across campus initiatives</li>
                  <li>Managed ₹10 Lakhs Mess Committee budget with full accountability</li>
                  <li>Led cross-functional teams across operations and student welfare</li>
                </ul>
              </div>
            </div>

            <div className="border-t border-white/[0.06] px-6 py-5 sm:px-8">
              <Button variant="default" className="w-full sm:w-auto" asChild>
                <a
                  href={`mailto:${SITE.email}?subject=${encodeURIComponent("Resume Request")}&body=${encodeURIComponent("Hi Shudhanshu,\n\nI would like to request a copy of your resume.\n\nThank you.")}`}
                >
                  <Download className="h-4 w-4" />
                  Request Resume
                </a>
              </Button>
            </div>
          </motion.div>
        </TiltCard>
      </div>
    </section>
  );
}
