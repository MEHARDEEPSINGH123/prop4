"use client";

import { useEffect, useRef, useState } from "react";

export default function CustomCursor() {
  const [mounted, setMounted] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Only run on non-touch devices
    if (window.matchMedia("(pointer: coarse)").matches) return;
    setMounted(true);

    let mouseX = -100;
    let mouseY = -100;
    let currentX = -100;
    let currentY = -100;
    let rafId: number;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    // Smooth linear interpolation loop without spring overshoot or oscillation
    const loop = () => {
      const ease = 0.22;
      currentX += (mouseX - currentX) * ease;
      currentY += (mouseY - currentY) * ease;

      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${currentX}px, ${currentY}px, 0) translate(-50%, -50%)`;
      }
      rafId = requestAnimationFrame(loop);
    };

    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target) return;
      const interactive = target.closest("button, a, input, select, textarea, [data-interactive], .cursor-pointer");
      setIsHovered(!!interactive);
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    window.addEventListener("mouseover", onMouseOver, { passive: true });
    rafId = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseover", onMouseOver);
      cancelAnimationFrame(rafId);
    };
  }, []);

  if (!mounted) return null;

  return (
    <div
      ref={cursorRef}
      className="pointer-events-none fixed top-0 left-0 z-[9999] will-change-transform"
      style={{ transform: "translate3d(-100px, -100px, 0)" }}
    >
      {/* Luxury Minimalist Circular Ring - NO inner dots, NO jerky lag */}
      <div
        className={`rounded-full border transition-all duration-300 ease-out ${
          isHovered
            ? "w-12 h-12 border-accent bg-accent/15 scale-110 shadow-lg shadow-accent/20"
            : "w-8 h-8 border-accent/70 bg-accent/5 scale-100"
        }`}
      />
    </div>
  );
}
