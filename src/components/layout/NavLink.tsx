"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface NavLinkProps {
  href: string;
  label: string;
  isActive: boolean;
  onClick?: () => void;
}

export function NavLink({ href, label, isActive, onClick }: NavLinkProps) {
  return (
    <a
      href={href}
      onClick={onClick}
      className={cn(
        "group relative px-3 py-1.5 text-sm transition-colors duration-300",
        isActive ? "text-foreground" : "text-muted-foreground hover:text-foreground"
      )}
    >
      <span className="relative z-10 font-medium">{label}</span>
      {isActive && (
        <motion.span
          layoutId="nav-pill"
          className="absolute inset-0 rounded-lg bg-white/[0.06] ring-1 ring-white/10"
          transition={{ type: "spring", stiffness: 380, damping: 30 }}
        />
      )}
      <span
        className={cn(
          "absolute bottom-0 left-1/2 h-px w-0 -translate-x-1/2 bg-gradient-to-r from-transparent via-primary to-transparent transition-[width] duration-300 group-hover:w-full",
          isActive && "w-full"
        )}
      />
    </a>
  );
}
