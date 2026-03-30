"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import FadeIn from "../FadeIn";

const featured = [
  {
    brand: "Audi",
    name: "A6 Avant 50 TDI",
    image: "/images/green_audi.jpeg",
    details: [
      { label: "Leistung", value: "286 PS" },
      { label: "Antrieb", value: "Diesel" },
      { label: "Baujahr", value: "2022" },
      { label: "Km-Stand", value: "68.000 km" },
    ],
    price: "49.900",
  },
  {
    brand: "Volkswagen",
    name: "Golf 8 GTI",
    image: "/images/black_mercedes.jpeg",
    details: [
      { label: "Leistung", value: "245 PS" },
      { label: "Antrieb", value: "Benzin" },
      { label: "Baujahr", value: "2023" },
      { label: "Km-Stand", value: "23.000 km" },
    ],
    price: "38.500",
  },
  {
    brand: "BMW",
    name: "520d xDrive Touring",
    image: "/images/g_class.jpeg",
    details: [
      { label: "Leistung", value: "190 PS" },
      { label: "Antrieb", value: "Diesel" },
      { label: "Baujahr", value: "2021" },
      { label: "Km-Stand", value: "57.000 km" },
    ],
    price: "42.900",
  },
];

export default function ProductsSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [active, setActive] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef(0);
  const touchDeltaX = useRef(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold: 0.05 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const goTo = (i: number) => {
    setActive(((i % featured.length) + featured.length) % featured.length);
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
    <div ref={sectionRef} className="py-40 max-tablet:py-24 overflow-hidden" id="products">
      {/* Header */}
      <div
        className="max-w-[1280px] mx-auto px-10 max-tablet:px-5 mb-12"
        style={{
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? "translateY(0)" : "translateY(20px)",
          transition: "opacity 1s, transform 1s",
        }}
      >
        <h2 className="text-[clamp(28px,3.5vw,48px)] font-extralight mb-5 -tracking-[0.5px] leading-none">Top Fahrzeuge</h2>
        <p className="text-[15px] text-text-secondary max-w-[520px] leading-[1.8]">Jedes dieser Fahrzeuge wurde persönlich ausgewählt, geprüft und aufbereitet.</p>
      </div>

      {/* Slider */}
      <div
        className={`relative transition-all duration-1000 ${isVisible ? "opacity-100" : "opacity-0"}`}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div className="relative h-[400px] tablet:h-[600px] mx-4 mobile:mx-5 tablet:mx-auto tablet:max-w-[1280px] tablet:px-10 overflow-hidden">
          {featured.map((car, i) => (
            <div
              key={car.name}
              className="absolute inset-0 transition-all duration-700"
              style={{
                opacity: active === i ? 1 : 0,
                transform: active === i ? "scale(1)" : "scale(1.05)",
                transitionTimingFunction: "cubic-bezier(0.25, 0.8, 0.25, 1)",
                pointerEvents: active === i ? "auto" : "none",
              }}
            >
              <Image
                src={car.image}
                alt={car.name}
                fill
                sizes="(max-width: 600px) 100vw, (max-width: 900px) 90vw, 1280px"
                className="object-cover"
                style={{
                  filter: "grayscale(20%) brightness(0.6) contrast(1.05)",
                }}
                priority={i === 0}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

              <div className="absolute bottom-0 left-0 right-0 p-5 mobile:p-8 tablet:p-10">
                <span className="block text-[10px] font-semibold tracking-[3px] uppercase text-white/40 mb-2">{car.brand}</span>
                <h3 className="text-[clamp(24px,3vw,40px)] font-light text-white mb-5 leading-none">{car.name}</h3>
                <div className="flex flex-wrap gap-4 mobile:gap-6 mb-5">
                  {car.details.map((d) => (
                    <div key={d.label} className="text-[10px] text-white/40 uppercase tracking-[0.5px]">
                      <strong className="block text-white/80 text-sm font-medium mb-0.5">{d.value}</strong>
                      {d.label}
                    </div>
                  ))}
                </div>
                <span className="text-2xl font-semibold text-white">&euro; {car.price}</span>
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

      {/* Dots */}
      <div className="flex items-center justify-center gap-3 mt-8 mobile:mt-10">
        {featured.map((car, i) => (
          <button key={car.name} onClick={() => goTo(i)} className="bg-transparent border-none p-2 cursor-pointer" aria-label={`Zu ${car.name}`}>
            <div className="h-[2px] transition-all duration-500" style={{ width: active === i ? "32px" : "12px", backgroundColor: "#f5f5f5", opacity: active === i ? 1 : 0.35 }} />
          </button>
        ))}
      </div>

      {/* CTA */}
      <FadeIn>
        <div className="text-center mt-16">
          <Link href="/fahrzeuge" className="inline-flex items-center gap-2.5 py-3.5 px-8 bg-white text-[#080808] font-semibold text-xs tracking-[1.5px] uppercase border-none cursor-pointer transition-all duration-400 hover:bg-[#e0e0e0] hover:-translate-y-0.5 hover:shadow-[0_12px_40px_rgba(255,255,255,0.06)]" style={{ transitionTimingFunction: "var(--ease)" }}>
            Alle Fahrzeuge ansehen
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14" /><path d="m12 5 7 7-7 7" />
            </svg>
          </Link>
        </div>
      </FadeIn>
    </div>
  );
}
