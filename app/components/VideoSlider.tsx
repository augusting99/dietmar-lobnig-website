"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";

const CONTENT_WIDTH = 1280;

const slides = [
  {
    id: "verkauf",
    title: "Verkauf",
    subtitle: "Handverlesene Fahrzeuge, persönlich geprüft",
    image: "/images/green_audi.jpeg",
  },
  {
    id: "ankauf",
    title: "Ankauf",
    subtitle: "Faire Bewertung in 24 Stunden",
    image: "/images/black_mercedes.jpeg",
  },
  {
    id: "beratung",
    title: "Beratung",
    subtitle: "Persönlich, direkt, seit über 25 Jahren",
    image: "/images/g_class.jpeg",
  },
];

const extSlides = [...slides, ...slides, ...slides];
const CENTER_OFFSET = slides.length;

export default function VideoSlider() {
  const [isVisible, setIsVisible] = useState(false);
  const [rawIndex, setRawIndex] = useState(CENTER_OFFSET);
  const [isAnimating, setIsAnimating] = useState(true);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.05 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isAnimating) return;
    const timeout = setTimeout(() => {
      const realIndex = rawIndex % slides.length;
      if (rawIndex !== CENTER_OFFSET + realIndex) {
        setIsAnimating(false);
        setRawIndex(CENTER_OFFSET + realIndex);
        requestAnimationFrame(() => {
          requestAnimationFrame(() => setIsAnimating(true));
        });
      }
    }, 700);
    return () => clearTimeout(timeout);
  }, [rawIndex, isAnimating]);

  const goTo = (index: number) => {
    setIsAnimating(true);
    setRawIndex(index);
  };

  const activeRealIndex =
    ((rawIndex % slides.length) + slides.length) % slides.length;
  const GAP = 24;

  return (
    <section
      ref={sectionRef}
      className="py-24 tablet:py-40 overflow-hidden"
    >
      <div
        className="max-w-[1280px] mx-auto px-10 max-tablet:px-5 mb-12"
        style={{
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? "translateY(0)" : "translateY(20px)",
          transition: "opacity 1s, transform 1s",
        }}
      >
        <h2 className="text-[clamp(28px,3.5vw,48px)] font-extralight mb-5 -tracking-[0.5px] leading-[1.2]">Unsere Fahrzeuge</h2>
      </div>

      <div
        className={`relative transition-all duration-1000 ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}
      >
        <div
          className="flex"
          style={{
            gap: `${GAP}px`,
            transform: `translateX(calc(50vw - min(${CONTENT_WIDTH}px, 90vw) / 2 - ${rawIndex} * (min(${CONTENT_WIDTH}px, 90vw) + ${GAP}px)))`,
            transition: isAnimating
              ? "transform 700ms cubic-bezier(0.25, 0.8, 0.25, 1)"
              : "none",
          }}
        >
          {extSlides.map((slide, i) => {
            const isActive = i === rawIndex;
            return (
              <div
                key={`${slide.id}-${i}`}
                className="shrink-0 relative cursor-pointer transition-opacity duration-500"
                style={{
                  width: `min(${CONTENT_WIDTH}px, 90vw)`,
                  opacity: isActive ? 1 : 0.4,
                }}
                onClick={() => {
                  if (!isActive) goTo(i);
                }}
              >
                <div className="relative h-[400px] tablet:h-[680px] overflow-hidden">
                  <Image
                    src={slide.image}
                    alt={slide.title}
                    fill
                    sizes="(max-width: 768px) 90vw, 1280px"
                    className="object-cover transition-[filter] duration-500 hover:!filter-none"
                    style={{
                      filter: isActive
                        ? "grayscale(30%) brightness(0.7) contrast(1.05) saturate(0.7)"
                        : "grayscale(100%) brightness(0.3) contrast(1.1) saturate(0.3)",
                    }}
                  />
                  <div className="absolute inset-0 bg-white/[0.03] mix-blend-multiply" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                  {isActive && (
                    <>
                      <div className="absolute bottom-0 left-0 right-0 p-8 tablet:p-10">
                        <h3 className="text-[clamp(22px,3vw,40px)] font-light text-white mb-1 leading-none">
                          {slide.title}
                        </h3>
                        <p className="text-sm text-white/50">
                          {slide.subtitle}
                        </p>
                      </div>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          goTo(rawIndex - 1);
                        }}
                        className="absolute left-4 tablet:left-6 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center bg-black/30 backdrop-blur-sm rounded-full text-white/80 hover:bg-black/50 hover:text-white transition-all duration-300 border-none cursor-pointer"
                        aria-label="Zurück"
                      >
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                          <polyline points="15 18 9 12 15 6" />
                        </svg>
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          goTo(rawIndex + 1);
                        }}
                        className="absolute right-4 tablet:right-6 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center bg-black/30 backdrop-blur-sm rounded-full text-white/80 hover:bg-black/50 hover:text-white transition-all duration-300 border-none cursor-pointer"
                        aria-label="Weiter"
                      >
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                          <polyline points="9 18 15 12 9 6" />
                        </svg>
                      </button>
                    </>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="flex items-center justify-center gap-3 mt-10">
        {slides.map((slide, i) => (
          <button
            key={slide.id}
            onClick={() => goTo(CENTER_OFFSET + i)}
            className="bg-transparent border-none p-2 cursor-pointer"
            aria-label={`Zu ${slide.title}`}
          >
            <div
              className="h-[2px] transition-all duration-500"
              style={{
                width: activeRealIndex === i ? "32px" : "12px",
                backgroundColor: "#f5f5f5",
                opacity: activeRealIndex === i ? 1 : 0.35,
              }}
            />
          </button>
        ))}
      </div>
    </section>
  );
}
