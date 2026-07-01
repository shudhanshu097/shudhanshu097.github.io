type PointerListener = (
  x: number,
  y: number,
  target: EventTarget | null
) => void;

const listeners = new Set<PointerListener>();
let listening = false;
let lastX = 0;
let lastY = 0;
let lastTarget: EventTarget | null = null;
let rafScheduled = false;

function flush() {
  rafScheduled = false;
  listeners.forEach((fn) => fn(lastX, lastY, lastTarget));
}

function onPointerMove(e: MouseEvent) {
  lastX = e.clientX;
  lastY = e.clientY;
  lastTarget = e.target;
  if (!rafScheduled) {
    rafScheduled = true;
    requestAnimationFrame(flush);
  }
}

function ensureListening() {
  if (listening || typeof window === "undefined") return;
  listening = true;
  window.addEventListener("mousemove", onPointerMove, { passive: true });
}

function stopListening() {
  if (!listening || listeners.size > 0) return;
  listening = false;
  window.removeEventListener("mousemove", onPointerMove);
}

/** Batched pointer pipeline for hero parallax — one listener, one RAF flush */
export function subscribePointer(listener: PointerListener): () => void {
  listeners.add(listener);
  ensureListening();
  listener(lastX, lastY, lastTarget);
  return () => {
    listeners.delete(listener);
    stopListening();
  };
}
