"use client";

import { useEffect, useRef } from "react";
import { isLowEndDevice, prefersReducedMotion } from "@/lib/device-capability";

const PARTICLE_COUNT = 40;
const MAX_DIST = 90;
const MAX_DIST_SQ = MAX_DIST * MAX_DIST;
const CELL = MAX_DIST;

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
}

export function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let visible = true;
    let w = 0;
    let h = 0;
    let particles: Particle[] = [];
    const grid = new Map<string, number[]>();

    const init = (width: number, height: number) => {
      particles = Array.from({ length: PARTICLE_COUNT }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.22,
        vy: (Math.random() - 0.5) * 0.22,
      }));
    };

    const cellKey = (cx: number, cy: number) => `${cx},${cy}`;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio, isLowEndDevice() ? 1.25 : 1.5);
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      init(w, h);
    };

    let rafId = 0;

    const draw = () => {
      if (!visible || document.hidden) {
        rafId = 0;
        return;
      }

      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > w) p.vx *= -1;
        if (p.y < 0 || p.y > h) p.vy *= -1;
      }

      ctx.clearRect(0, 0, w, h);

      ctx.fillStyle = "rgba(59, 130, 246, 0.35)";
      ctx.beginPath();
      for (const p of particles) {
        ctx.moveTo(p.x + 1, p.y);
        ctx.arc(p.x, p.y, 1, 0, Math.PI * 2);
      }
      ctx.fill();

      grid.clear();
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        const cx = Math.floor(p.x / CELL);
        const cy = Math.floor(p.y / CELL);
        const key = cellKey(cx, cy);
        const bucket = grid.get(key);
        if (bucket) bucket.push(i);
        else grid.set(key, [i]);
      }

      ctx.lineWidth = 1;
      for (let i = 0; i < particles.length; i++) {
        const pi = particles[i];
        const cx = Math.floor(pi.x / CELL);
        const cy = Math.floor(pi.y / CELL);

        for (let gx = cx - 1; gx <= cx + 1; gx++) {
          for (let gy = cy - 1; gy <= cy + 1; gy++) {
            const bucket = grid.get(cellKey(gx, gy));
            if (!bucket) continue;

            for (const j of bucket) {
              if (j <= i) continue;
              const pj = particles[j];
              const dx = pi.x - pj.x;
              const dy = pi.y - pj.y;
              const distSq = dx * dx + dy * dy;
              if (distSq < MAX_DIST_SQ) {
                const alpha = (1 - distSq / MAX_DIST_SQ) * 0.06;
                ctx.strokeStyle = `rgba(59, 130, 246, ${alpha})`;
                ctx.beginPath();
                ctx.moveTo(pi.x, pi.y);
                ctx.lineTo(pj.x, pj.y);
                ctx.stroke();
              }
            }
          }
        }
      }

      rafId = requestAnimationFrame(draw);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        if (visible && !rafId) rafId = requestAnimationFrame(draw);
        else if (!visible) {
          cancelAnimationFrame(rafId);
          rafId = 0;
        }
      },
      { threshold: 0 }
    );
    observer.observe(canvas);

    const onVisibility = () => {
      if (document.hidden) {
        cancelAnimationFrame(rafId);
        rafId = 0;
      } else if (visible && !rafId) {
        rafId = requestAnimationFrame(draw);
      }
    };

    resize();
    rafId = requestAnimationFrame(draw);
    window.addEventListener("resize", resize, { passive: true });
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", onVisibility);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none absolute inset-0 z-0 contain-strict"
      aria-hidden
    />
  );
}
