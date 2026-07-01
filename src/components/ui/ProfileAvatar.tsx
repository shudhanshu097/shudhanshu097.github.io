"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { SITE } from "@/lib/content";
import { cn } from "@/lib/utils";

interface ProfileAvatarProps {
  size?: "sm" | "md" | "lg";
  className?: string;
  animated?: boolean;
}

const sizes = {
  sm: { box: "h-10 w-10", px: 120 },
  md: { box: "h-12 w-12", px: 144 },
  lg: { box: "h-32 w-32", px: 256 },
};

export function ProfileAvatar({
  size = "sm",
  className,
  animated = true,
}: ProfileAvatarProps) {
  const s = sizes[size];

  const Wrapper = animated ? motion.span : "span";
  const wrapperProps = animated
    ? {
        initial: { opacity: 0, scale: 0.9 },
        animate: { opacity: 1, scale: 1 },
        transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 0.35 },
        whileHover: { scale: 1.04 },
      }
    : {};

  return (
    <Wrapper
      {...wrapperProps}
      className={cn("relative inline-flex shrink-0", s.box, className)}
    >
      {/* Theme-matched ring — static, subtle */}
      <span
        className="absolute inset-0 rounded-full bg-gradient-to-br from-primary/50 via-purple-accent/30 to-primary/20 p-[1.5px]"
        aria-hidden
      />

      <span className="relative aspect-square h-full w-full overflow-hidden rounded-full bg-[#0a0a0b]">
        <Image
          src={SITE.profileImage}
          alt={SITE.name}
          width={s.px}
          height={s.px}
          sizes={`${s.px}px`}
          className="h-full w-full object-cover object-[center_32%] scale-[1.08]"
          loading="eager"
        />

        {/* Subtle theme blend */}
        <span
          className="pointer-events-none absolute inset-0 bg-gradient-to-br from-primary/8 via-transparent to-purple-accent/8"
          aria-hidden
        />
        <span
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0a0a0b]/50 via-transparent to-transparent"
          aria-hidden
        />
        <span
          className="pointer-events-none absolute inset-0 rounded-full ring-1 ring-inset ring-white/10"
          aria-hidden
        />
      </span>
    </Wrapper>
  );
}
