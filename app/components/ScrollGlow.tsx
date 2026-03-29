"use client";

import { useEffect, useRef, ReactNode } from "react";

export default function ScrollGlow({
  children,
  color = "rgba(20, 20, 40, 0.4)",
}: {
  children: ReactNode;
  color?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    const glow = glowRef.current;
    if (!el || !glow) return;

    const handleScroll = () => {
      const rect = el.getBoundingClientRect();
      const viewH = window.innerHeight;
      const progress = Math.min(Math.max((viewH - rect.top) / (viewH + rect.height), 0), 1);

      // Glow peaks at center of scroll (progress ~0.5)
      const intensity = Math.sin(progress * Math.PI);
      glow.style.opacity = `${intensity}`;
      glow.style.transform = `translateY(${(progress - 0.5) * -80}px)`;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div ref={ref} className="relative">
      <div
        ref={glowRef}
        className="absolute inset-0 pointer-events-none -z-0"
        style={{
          background: `radial-gradient(ellipse 80% 50% at 50% 50%, ${color} 0%, transparent 70%)`,
          opacity: 0,
        }}
      />
      <div className="relative z-[1]">
        {children}
      </div>
    </div>
  );
}
