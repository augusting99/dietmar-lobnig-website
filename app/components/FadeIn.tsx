"use client";
import { useEffect, useRef, ReactNode } from "react";

export default function FadeIn({
  children,
  direction = "up",
  delay = 0,
  className = "",
  scale = false,
  blur = false,
  distance = 50,
}: {
  children: ReactNode;
  direction?: "up" | "left" | "right" | "none";
  delay?: number;
  className?: string;
  scale?: boolean;
  blur?: boolean;
  distance?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("visible");
          observer.unobserve(el);
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const dirClass =
    direction === "left"
      ? "fade-in-left"
      : direction === "right"
        ? "fade-in-right"
        : direction === "none"
          ? "fade-in-none"
          : "fade-in-up";

  const extraClasses = [
    scale ? "fade-scale" : "",
    blur ? "fade-blur" : "",
  ].filter(Boolean).join(" ");

  return (
    <div
      ref={ref}
      className={`${dirClass} ${extraClasses} ${className}`}
      style={{
        ...(delay ? { transitionDelay: `${delay}s` } : {}),
        ...(distance !== 50 ? { "--fade-distance": `${distance}px` } as React.CSSProperties : {}),
      }}
    >
      {children}
    </div>
  );
}
