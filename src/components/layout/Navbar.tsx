"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Menu, X, Sparkles } from "lucide-react";
import { NAV_LINKS, SITE } from "@/lib/content";
import { ProfileAvatar } from "@/components/ui/ProfileAvatar";
import { NavLink } from "@/components/layout/NavLink";
import { useActiveSection } from "@/hooks/useActiveSection";
import { cn } from "@/lib/utils";

export function Navbar() {
  const activeSection = useActiveSection();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const next = window.scrollY > 20;
        setScrolled((prev) => (prev === next ? prev : next));
        ticking = false;
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-5 sm:pt-4">
      <nav
        className={cn(
          "relative mx-auto flex max-w-6xl items-center justify-between gap-4 overflow-hidden rounded-2xl border px-3 py-2.5 transition-[border-color,background-color] duration-300 sm:px-4 sm:py-3",
          scrolled
            ? "border-white/[0.12] bg-black/55 shadow-[0_8px_40px_-12px_rgba(0,0,0,0.8)] backdrop-blur-xl"
            : "border-white/[0.08] bg-black/40 backdrop-blur-lg"
        )}
        aria-label="Main navigation"
      >
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"
          aria-hidden
        />

        <a
          href="#hero"
          className="group flex min-w-0 items-center gap-3 rounded-xl py-1 pr-2 transition-colors hover:bg-white/[0.03]"
          aria-label={`${SITE.name} home`}
        >
          <ProfileAvatar size="sm" animated={false} />
          <div className="hidden min-w-0 sm:block">
            <p className="truncate text-sm font-semibold leading-none tracking-tight">
              {SITE.name.split(" ")[0]}
            </p>
            <p className="mt-1 truncate font-mono text-[10px] uppercase tracking-wider text-primary">
              {SITE.role}
            </p>
          </div>
        </a>

        <ul className="hidden items-center gap-1 rounded-xl border border-white/[0.06] bg-white/[0.02] p-1 md:flex">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <NavLink
                href={link.href}
                label={link.label}
                isActive={activeSection === link.href.replace("#", "")}
              />
            </li>
          ))}
        </ul>

        <div className="hidden items-center gap-3 md:flex">
          <div className="flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1.5">
            <span className="relative flex h-2 w-2">
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
            </span>
            <span className="text-[11px] font-medium text-emerald-400">
              Open to work
            </span>
          </div>

          <a
            href="#contact"
            className="group inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-medium text-black transition-transform duration-150 hover:scale-[1.02]"
          >
            Let&apos;s talk
            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
          </a>
        </div>

        <button
          type="button"
          className="rounded-lg p-2 text-muted-foreground hover:bg-white/[0.05] hover:text-foreground md:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-expanded={mobileOpen}
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="mx-auto mt-2 max-w-6xl overflow-hidden rounded-2xl border border-white/10 bg-black/80 p-4 backdrop-blur-xl md:hidden"
          >
            <div className="mb-3 flex items-center gap-2 text-xs text-primary">
              <Sparkles className="h-3.5 w-3.5" />
              Navigate
            </div>
            <ul className="flex flex-col gap-1">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className={cn(
                      "block rounded-lg px-3 py-2.5 text-sm transition-colors",
                      activeSection === link.href.replace("#", "")
                        ? "bg-white/[0.08] text-foreground"
                        : "text-muted-foreground hover:bg-white/[0.04] hover:text-foreground"
                    )}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
            <a
              href="#contact"
              onClick={() => setMobileOpen(false)}
              className="mt-4 flex w-full items-center justify-center gap-2 rounded-full bg-white py-2.5 text-sm font-medium text-black"
            >
              Let&apos;s talk
              <ArrowRight className="h-4 w-4" />
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
