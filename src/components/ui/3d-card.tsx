"use client";

import { cn } from "@/lib/utils";
import React, {
  createContext,
  memo,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

const MouseEnterContext = createContext<
  [boolean, React.Dispatch<React.SetStateAction<boolean>>] | undefined
>(undefined);

const CardContainerInner = ({
  children,
  className,
  containerClassName,
  disabled = false,
}: {
  children?: React.ReactNode;
  className?: string;
  containerClassName?: string;
  disabled?: boolean;
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const rectRef = useRef<DOMRect | null>(null);
  const rafRef = useRef(0);
  const pendingRef = useRef<{ x: number; y: number } | null>(null);
  const [isMouseEntered, setIsMouseEntered] = useState(false);

  const applyTransform = useCallback((clientX: number, clientY: number) => {
    const el = containerRef.current;
    const rect = rectRef.current;
    if (!el || !rect) return;

    const x = (clientX - rect.left - rect.width / 2) / 28;
    const y = (clientY - rect.top - rect.height / 2) / 28;
    el.style.transform = `translate3d(0,0,0) rotateY(${x}deg) rotateX(${-y}deg)`;
  }, []);

  const scheduleTransform = useCallback(
    (clientX: number, clientY: number) => {
      pendingRef.current = { x: clientX, y: clientY };
      if (rafRef.current) return;
      rafRef.current = requestAnimationFrame(() => {
        rafRef.current = 0;
        const p = pendingRef.current;
        if (p) applyTransform(p.x, p.y);
      });
    },
    [applyTransform]
  );

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (disabled) return;
    scheduleTransform(e.clientX, e.clientY);
  };

  const handleMouseEnter = () => {
    if (disabled || !containerRef.current) return;
    rectRef.current = containerRef.current.getBoundingClientRect();
    setIsMouseEntered(true);
  };

  const handleMouseLeave = () => {
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = 0;
    }
    pendingRef.current = null;
    rectRef.current = null;
    setIsMouseEntered(false);
    if (containerRef.current) {
      containerRef.current.style.transform =
        "translate3d(0,0,0) rotateY(0deg) rotateX(0deg)";
    }
  };

  useEffect(() => {
    if (!isMouseEntered || disabled) return;
    const onResize = () => {
      if (containerRef.current) {
        rectRef.current = containerRef.current.getBoundingClientRect();
      }
    };
    window.addEventListener("resize", onResize, { passive: true });
    return () => window.removeEventListener("resize", onResize);
  }, [isMouseEntered, disabled]);

  useEffect(() => {
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <MouseEnterContext.Provider value={[isMouseEntered, setIsMouseEntered]}>
      <div
        className={cn("flex items-center justify-center", containerClassName)}
        style={{ perspective: "1200px" }}
      >
        <div
          ref={containerRef}
          onMouseEnter={handleMouseEnter}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          onFocus={handleMouseEnter}
          onBlur={handleMouseLeave}
          tabIndex={disabled ? -1 : 0}
          className={cn(
            "relative flex w-full transform-gpu items-center justify-center will-change-transform",
            !disabled &&
              "group/card focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
            !disabled && !isMouseEntered && "transition-transform duration-300 ease-out",
            className
          )}
          style={{ transformStyle: "preserve-3d" }}
        >
          {children}
        </div>
      </div>
    </MouseEnterContext.Provider>
  );
};

export const CardContainer = memo(CardContainerInner);

const CardBodyInner = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <div
    className={cn(
      "h-96 w-96 [transform-style:preserve-3d] [&>*]:[transform-style:preserve-3d]",
      className
    )}
  >
    {children}
  </div>
);

export const CardBody = memo(CardBodyInner);

const CardItemInner = ({
  as: Tag = "div",
  children,
  className,
  translateX = 0,
  translateY = 0,
  translateZ = 0,
  rotateX = 0,
  rotateY = 0,
  rotateZ = 0,
  ...rest
}: {
  as?: React.ElementType;
  children: React.ReactNode;
  className?: string;
  translateX?: number | string;
  translateY?: number | string;
  translateZ?: number | string;
  rotateX?: number | string;
  rotateY?: number | string;
  rotateZ?: number | string;
} & React.HTMLAttributes<HTMLElement>) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isMouseEntered] = useMouseEnter();

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (isMouseEntered) {
      el.style.transform = `translate3d(${translateX}px, ${translateY}px, ${translateZ}px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) rotateZ(${rotateZ}deg)`;
    } else {
      el.style.transform =
        "translate3d(0px, 0px, 0px) rotateX(0deg) rotateY(0deg) rotateZ(0deg)";
    }
  }, [
    isMouseEntered,
    translateX,
    translateY,
    translateZ,
    rotateX,
    rotateY,
    rotateZ,
  ]);

  return (
    <Tag
      ref={ref}
      className={cn(
        "w-fit transform-gpu transition-transform duration-300 ease-out will-change-transform",
        className
      )}
      {...rest}
    >
      {children}
    </Tag>
  );
};

export const CardItem = memo(CardItemInner);

export const useMouseEnter = () => {
  const context = useContext(MouseEnterContext);
  if (context === undefined) {
    throw new Error("useMouseEnter must be used within a MouseEnterProvider");
  }
  return context;
};
