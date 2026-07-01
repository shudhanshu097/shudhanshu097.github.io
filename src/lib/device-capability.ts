/** Runtime hints for tuning effects on weaker hardware */
export function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function isCoarsePointer(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(pointer: coarse)").matches;
}

export function isLowEndDevice(): boolean {
  if (typeof window === "undefined") return false;
  if (isCoarsePointer()) return true;

  const cores = navigator.hardwareConcurrency ?? 8;
  const memory = (navigator as Navigator & { deviceMemory?: number }).deviceMemory ?? 8;

  return cores <= 4 || memory <= 4;
}

export function shouldUseHeavyEffects(): boolean {
  return !prefersReducedMotion() && !isLowEndDevice();
}
