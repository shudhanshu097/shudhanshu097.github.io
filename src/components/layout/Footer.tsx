import { SITE } from "@/lib/content";

export function Footer() {
  return (
    <footer className="border-t border-white/[0.06] px-4 py-10 sm:px-6">
      <div className="section-container flex flex-col items-center justify-between gap-4 sm:flex-row">
        <p className="text-sm text-muted-foreground">
          © {SITE.year} {SITE.name}. All rights reserved.
        </p>
        <p className="font-mono text-xs text-muted-foreground">
          {SITE.tagline}
        </p>
      </div>
    </footer>
  );
}
