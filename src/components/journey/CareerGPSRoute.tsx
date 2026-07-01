"use client";

import { memo } from "react";
import { motion, type MotionValue, useTransform } from "framer-motion";

export const GPS_ROUTE_PATH =
  "M 200 24 C 200 72, 318 96, 318 168 C 318 240, 82 264, 82 336 C 82 408, 318 432, 318 504 C 318 576, 82 600, 82 672 C 82 744, 200 768, 200 816";

type CareerGPSRouteProps = {
  progress: MotionValue<number>;
  reduceMotion: boolean;
};

function CareerGPSRouteInner({ progress, reduceMotion }: CareerGPSRouteProps) {
  const pathLength = useTransform(progress, [0, 1], reduceMotion ? [1, 1] : [0, 1]);

  return (
    <div
      className="pointer-events-none absolute inset-0 z-0 hidden sm:block"
      aria-hidden
    >
      <div className="absolute inset-x-[18%] top-8 bottom-8 rounded-full bg-primary/[0.04]" />

      <svg
        viewBox="0 0 400 840"
        preserveAspectRatio="xMidYMid meet"
        className="absolute inset-x-0 top-0 mx-auto h-full w-full max-w-md"
      >
        <defs>
          <linearGradient id="gpsRouteGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="rgba(59,130,246,0.9)" />
            <stop offset="55%" stopColor="rgba(59,130,246,0.55)" />
            <stop offset="100%" stopColor="rgba(139,92,246,0.45)" />
          </linearGradient>
        </defs>

        <path
          d={GPS_ROUTE_PATH}
          fill="none"
          stroke="rgba(255,255,255,0.07)"
          strokeWidth="2"
          strokeLinecap="round"
        />

        <motion.path
          d={GPS_ROUTE_PATH}
          fill="none"
          stroke="url(#gpsRouteGrad)"
          strokeWidth="2.5"
          strokeLinecap="round"
          style={{ pathLength }}
        />
      </svg>
    </div>
  );
}

export const CareerGPSRoute = memo(CareerGPSRouteInner);
CareerGPSRoute.displayName = "CareerGPSRoute";
