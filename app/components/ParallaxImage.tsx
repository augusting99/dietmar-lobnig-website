"use client";
import { useEffect, useRef } from "react";
import Image from "next/image";

export default function ParallaxImage({
  src,
  alt,
  speed = 0.3,
  className = "",
}: {
  src: string;
  alt: string;
  speed?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const img = el.querySelector("img") as HTMLImageElement;
    if (!img) return;

    const handleScroll = () => {
      const rect = el.getBoundingClientRect();
      const viewH = window.innerHeight;
      if (rect.bottom < 0 || rect.top > viewH) return;
      const progress = (viewH - rect.top) / (viewH + rect.height);
      const offset = (progress - 0.5) * speed * 100;
      img.style.transform = `translateY(${offset}px) scale(1.15)`;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [speed]);

  return (
    <div className={`overflow-hidden relative aspect-[4/3] ${className}`} ref={ref}>
      <Image src={src} alt={alt} fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover will-change-transform" />
    </div>
  );
}
