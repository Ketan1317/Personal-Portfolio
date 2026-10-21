"use client";

import { useEffect, useRef } from "react";

export function CustomCursor() {
  const containerRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Only enable on desktop with fine pointer and no reduced motion preference
    if (typeof window === "undefined") return;
    if (window.matchMedia("(pointer: coarse)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let mouseX = -100;
    let mouseY = -100;
    let ringX = -100;
    let ringY = -100;
    let isVisible = false;
    let isHovered = false;
    let isClicking = false;
    let animationFrameId: number;

    const updateRingClasses = () => {
      const ring = ringRef.current;
      if (!ring) return;
      if (isClicking) {
        ring.className =
          "fixed top-0 left-0 -ml-4 -mt-4 w-8 h-8 rounded-full border will-change-transform transition-transform duration-100 ease-out flex items-center justify-center scale-75 border-[#C6A76A] bg-[#C6A76A]/25 pointer-events-none";
      } else if (isHovered) {
        ring.className =
          "fixed top-0 left-0 -ml-4 -mt-4 w-8 h-8 rounded-full border will-change-transform transition-transform duration-150 ease-out flex items-center justify-center scale-150 border-[#C6A76A] bg-[#C6A76A]/10 shadow-[0_0_15px_rgba(198,167,106,0.35)] pointer-events-none";
      } else {
        ring.className =
          "fixed top-0 left-0 -ml-4 -mt-4 w-8 h-8 rounded-full border will-change-transform transition-transform duration-150 ease-out flex items-center justify-center scale-100 border-[#C6A76A]/40 bg-transparent pointer-events-none";
      }
    };

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      if (!isVisible) {
        isVisible = true;
        ringX = mouseX;
        ringY = mouseY;
        if (containerRef.current) {
          containerRef.current.style.opacity = "1";
        }
      }

      // Check if hovering interactive target
      const target = e.target as HTMLElement | null;
      const nextHovered = Boolean(
        target &&
          target.closest(
            "a, button, input, textarea, select, [role='button'], [tabindex='0']",
          ),
      );
      if (nextHovered !== isHovered) {
        isHovered = nextHovered;
        updateRingClasses();
      }
    };

    const onMouseDown = () => {
      isClicking = true;
      updateRingClasses();
    };

    const onMouseUp = () => {
      isClicking = false;
      updateRingClasses();
    };

    const onMouseLeave = () => {
      isVisible = false;
      if (containerRef.current) {
        containerRef.current.style.opacity = "0";
      }
    };

    // 120/144Hz Butter-smooth Ring Interpolation (Damped Lerp)
    const render = () => {
      if (isVisible) {
        // Fast responsive follow with fluid deceleration
        ringX += (mouseX - ringX) * 0.22;
        ringY += (mouseY - ringY) * 0.22;

        if (dotRef.current) {
          dotRef.current.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
        }
        if (ringRef.current) {
          ringRef.current.style.transform = `translate3d(${ringX}px, ${ringY}px, 0)`;
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    window.addEventListener("mousedown", onMouseDown, { passive: true });
    window.addEventListener("mouseup", onMouseUp, { passive: true });
    document.addEventListener("mouseleave", onMouseLeave, { passive: true });
    animationFrameId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mouseup", onMouseUp);
      document.removeEventListener("mouseleave", onMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden hidden lg:block opacity-0 transition-opacity duration-200"
      aria-hidden="true"
    >
      {/* Precision Inner Dot */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 -ml-1 -mt-1 w-2 h-2 rounded-full bg-[#C6A76A] shadow-[0_0_8px_rgba(198,167,106,0.85)] will-change-transform pointer-events-none"
      />

      {/* Trailing Fluid Ring */}
      <div
        ref={ringRef}
        className="fixed top-0 left-0 -ml-4 -mt-4 w-8 h-8 rounded-full border border-[#C6A76A]/40 will-change-transform flex items-center justify-center pointer-events-none"
      />
    </div>
  );
}
