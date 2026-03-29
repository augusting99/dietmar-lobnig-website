"use client";
import { useEffect, useRef, ReactNode } from "react";

export default function MouseParallax({
  children,
  strength = 20,
  className = "",
}: {
  children: ReactNode;
  strength?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const handleMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;

      const layers = el.querySelectorAll<HTMLElement>("[data-parallax]");
      layers.forEach((layer) => {
        const speed = parseFloat(layer.dataset.parallax || "1");
        layer.style.transform = `translate(${x * strength * speed}px, ${y * strength * speed}px)`;
      });
    };

    const handleLeave = () => {
      const layers = el.querySelectorAll<HTMLElement>("[data-parallax]");
      layers.forEach((layer) => {
        layer.style.transition = "transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)";
        layer.style.transform = "translate(0, 0)";
        setTimeout(() => { layer.style.transition = ""; }, 600);
      });
    };

    el.addEventListener("mousemove", handleMove);
    el.addEventListener("mouseleave", handleLeave);
    return () => {
      el.removeEventListener("mousemove", handleMove);
      el.removeEventListener("mouseleave", handleLeave);
    };
  }, [strength]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
