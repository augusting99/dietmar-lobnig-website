"use client";

import { useEffect, useRef } from "react";

export default function ScrollGradient() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const handleScroll = () => {
      const scrollY = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = Math.min(scrollY / docHeight, 1);
      const intensity = Math.sin(progress * Math.PI) * 0.1;

      el.style.background = `radial-gradient(120% 60% at 50% 0%,
        rgba(0, 180, 220, ${intensity}) 0%,
        transparent 70%
      )`;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      ref={ref}
      className="fixed inset-0 z-0 pointer-events-none"
      style={{ transition: "background 0.5s ease" }}
    />
  );
}
