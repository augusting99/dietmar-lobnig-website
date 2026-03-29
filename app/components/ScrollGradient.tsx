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

      // Cyan/turquoise from the Mercedes AMG GT in hero
      const intensity = Math.sin(progress * Math.PI) * 0.1;
      const angle = 160 + progress * 40;

      el.style.background = `linear-gradient(${angle}deg,
        rgba(0, 180, 220, ${intensity}) 0%,
        transparent 40%,
        transparent 60%,
        rgba(0, 150, 200, ${intensity * 0.5}) 100%
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
