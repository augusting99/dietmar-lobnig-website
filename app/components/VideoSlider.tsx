"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";

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

export default function VideoSlider() {
  const [isVisible, setIsVisible] = useState(false);
  const [active, setActive] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const touchStartX = useRef(0);
  const touchDeltaX = useRef(0);

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

  const goTo = (i: number) => {
    setActive(((i % slides.length) + slides.length) % slides.length);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchDeltaX.current = 0;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchDeltaX.current = e.touches[0].clientX - touchStartX.current;
  };

  const handleTouchEnd = () => {
    if (Math.abs(touchDeltaX.current) > 50) {
      goTo(active + (touchDeltaX.current < 0 ? 1 : -1));
    }
  };

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
        <h2 className="text-[clamp(28px,3.5vw,48px)] font-extralight mb-5 -tracking-[0.5px] leading-[1.2]">
          Unsere Fahrzeuge
        </h2>
      </div>

      <div
        className={`relative transition-all duration-1000 ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div className="relative h-[300px] mobile:h-[400px] tablet:h-[680px] mx-4 mobile:mx-5 tablet:mx-auto tablet:max-w-[1280px] tablet:px-10 overflow-hidden">
          {slides.map((slide, i) => (
            <div
              key={slide.id}
              className="absolute inset-0 transition-all duration-700"
              style={{
                opacity: active === i ? 1 : 0,
                transform: active === i ? "scale(1)" : "scale(1.05)",
                transitionTimingFunction: "cubic-bezier(0.25, 0.8, 0.25, 1)",
                pointerEvents: active === i ? "auto" : "none",
              }}
            >
              <Image
                src={slide.image}
                alt={slide.title}
                fill
                sizes="(max-width: 600px) 100vw, (max-width: 900px) 90vw, 1280px"
                className="object-cover"
                style={{
                  filter: "grayscale(30%) brightness(0.7) contrast(1.05) saturate(0.7)",
                }}
                priority={i === 0}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

              <div className="absolute bottom-0 left-0 right-0 p-5 mobile:p-8 tablet:p-10">
                <h3 className="text-[clamp(22px,3vw,40px)] font-light text-white mb-1 leading-none">
                  {slide.title}
                </h3>
                <p className="text-sm text-white/50">{slide.subtitle}</p>
              </div>
            </div>
          ))}

          {/* Navigation arrows */}
          <button
            onClick={() => goTo(active - 1)}
            className="absolute left-3 mobile:left-4 tablet:left-6 top-1/2 -translate-y-1/2 z-10 w-10 h-10 mobile:w-12 mobile:h-12 flex items-center justify-center bg-black/30 backdrop-blur-sm rounded-full text-white/80 hover:bg-black/50 hover:text-white transition-all duration-300 border-none cursor-pointer"
            aria-label="Zurück"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>
          <button
            onClick={() => goTo(active + 1)}
            className="absolute right-3 mobile:right-4 tablet:right-6 top-1/2 -translate-y-1/2 z-10 w-10 h-10 mobile:w-12 mobile:h-12 flex items-center justify-center bg-black/30 backdrop-blur-sm rounded-full text-white/80 hover:bg-black/50 hover:text-white transition-all duration-300 border-none cursor-pointer"
            aria-label="Weiter"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>
        </div>
      </div>

      {/* Indicators */}
      <div className="flex items-center justify-center gap-3 mt-8 mobile:mt-10">
        {slides.map((slide, i) => (
          <button
            key={slide.id}
            onClick={() => goTo(i)}
            className="bg-transparent border-none p-2 cursor-pointer"
            aria-label={`Zu ${slide.title}`}
          >
            <div
              className="h-[2px] transition-all duration-500"
              style={{
                width: active === i ? "32px" : "12px",
                backgroundColor: "#f5f5f5",
                opacity: active === i ? 1 : 0.35,
              }}
            />
          </button>
        ))}
      </div>
    </section>
  );
}
