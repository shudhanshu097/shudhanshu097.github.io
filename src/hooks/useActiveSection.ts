"use client";

import { useEffect, useState } from "react";

const SECTION_IDS = ["about", "journey", "skills", "projects", "contact"];

export function useActiveSection() {
  const [active, setActive] = useState("");

  useEffect(() => {
    const elements = SECTION_IDS.map((id) => document.getElementById(id)).filter(
      Boolean
    ) as HTMLElement[];

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActive((prev) => (prev === entry.target.id ? prev : entry.target.id));
          }
        }
      },
      { rootMargin: "-40% 0px -50% 0px", threshold: 0 }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return active;
}
