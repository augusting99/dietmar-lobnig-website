"use client";
import { useEffect, useRef, ReactNode } from "react";

export default function ScrollColorShift({
  children,
  from = "#080808",
  to = "#0a0a0f",
}: {
  children: ReactNode;
  from?: string;
  to?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const handleScroll = () => {
      const rect = el.getBoundingClientRect();
      const viewH = window.innerHeight;
      if (rect.bottom < 0 || rect.top > viewH + rect.height) return;

      const progress = Math.min(
        Math.max((viewH - rect.top) / (viewH + rect.height), 0),
        1
      );
      el.style.backgroundColor = progress > 0.5 ? to : from;
    };

    // Use interpolation for smoother transitions
    const smoothScroll = () => {
      const rect = el.getBoundingClientRect();
      const viewH = window.innerHeight;
      const progress = Math.min(
        Math.max((viewH - rect.top) / (viewH + rect.height), 0),
        1
      );

      const fromRGB = hexToRGB(from);
      const toRGB = hexToRGB(to);
      const r = Math.round(fromRGB.r + (toRGB.r - fromRGB.r) * progress);
      const g = Math.round(fromRGB.g + (toRGB.g - fromRGB.g) * progress);
      const b = Math.round(fromRGB.b + (toRGB.b - fromRGB.b) * progress);
      el.style.backgroundColor = `rgb(${r},${g},${b})`;
    };

    window.addEventListener("scroll", smoothScroll, { passive: true });
    smoothScroll();
    return () => window.removeEventListener("scroll", smoothScroll);
  }, [from, to]);

  return (
    <div ref={ref} style={{ backgroundColor: from, transition: "background-color 0.3s" }}>
      {children}
    </div>
  );
}

function hexToRGB(hex: string) {
  const h = hex.replace("#", "");
  return {
    r: parseInt(h.substring(0, 2), 16),
    g: parseInt(h.substring(2, 4), 16),
    b: parseInt(h.substring(4, 6), 16),
  };
}
