"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import FadeIn from "../FadeIn";

const CONTENT_WIDTH = 1280;
const GAP = 24;

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
    image: "/images/sls_behind.jpeg",
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

const extSlides = [...featured, ...featured, ...featured];
const CENTER_OFFSET = featured.length;

function CarOverlay({ car }: { car: (typeof featured)[0] }) {
  return (
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
  );
}

export default function ProductsSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [active, setActive] = useState(0);
  const [rawIndex, setRawIndex] = useState(CENTER_OFFSET);
  const [isAnimating, setIsAnimating] = useState(true);
  const [viewportWidth, setViewportWidth] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef(0);
  const touchDeltaX = useRef(0);

  const measure = useCallback(() => {
    setIsMobile(window.innerWidth < 900);
    setViewportWidth(window.innerWidth);
  }, []);

  useEffect(() => {
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [measure]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold: 0.05 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  // Desktop: reset rawIndex to center after animation
  useEffect(() => {
    if (isMobile || !isAnimating) return;
    const timeout = setTimeout(() => {
      const realIndex = rawIndex % featured.length;
      if (rawIndex !== CENTER_OFFSET + realIndex) {
        setIsAnimating(false);
        setRawIndex(CENTER_OFFSET + realIndex);
        requestAnimationFrame(() => {
          requestAnimationFrame(() => setIsAnimating(true));
        });
      }
    }, 700);
    return () => clearTimeout(timeout);
  }, [rawIndex, isAnimating, isMobile]);

  const goToDesktop = (index: number) => { setIsAnimating(true); setRawIndex(index); };
  const goToMobile = (i: number) => {
    setActive(((i % featured.length) + featured.length) % featured.length);
  };

  const activeRealIndex = ((rawIndex % featured.length) + featured.length) % featured.length;
  const slideWidth = Math.min(CONTENT_WIDTH, viewportWidth * 0.9);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchDeltaX.current = 0;
  };
  const handleTouchMove = (e: React.TouchEvent) => {
    touchDeltaX.current = e.touches[0].clientX - touchStartX.current;
  };
  const handleTouchEnd = () => {
    if (Math.abs(touchDeltaX.current) > 50) {
      if (isMobile) {
        goToMobile(active + (touchDeltaX.current < 0 ? 1 : -1));
      } else {
        goToDesktop(rawIndex + (touchDeltaX.current < 0 ? 1 : -1));
      }
    }
  };

  const currentMobileIndex = active;
  const currentDesktopIndex = activeRealIndex;

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
        {/* Mobile: crossfade */}
        {isMobile ? (
          <div className="relative h-[400px] mx-4 mobile:mx-5 overflow-hidden">
            {featured.map((car, i) => (
              <div
                key={car.name}
                className="absolute inset-0 transition-all duration-700"
                style={{
                  opacity: currentMobileIndex === i ? 1 : 0,
                  transform: currentMobileIndex === i ? "scale(1)" : "scale(1.05)",
                  transitionTimingFunction: "cubic-bezier(0.25, 0.8, 0.25, 1)",
                  pointerEvents: currentMobileIndex === i ? "auto" : "none",
                }}
              >
                <Image
                  src={car.image}
                  alt={car.name}
                  fill
                  sizes="100vw"
                  className="object-cover"
                  style={{ filter: "grayscale(20%) brightness(0.6) contrast(1.05)" }}
                  priority={i === 0}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                <CarOverlay car={car} />
              </div>
            ))}

            <button onClick={() => goToMobile(active - 1)} className="absolute left-3 top-1/2 -translate-y-1/2 z-10 w-10 h-10 flex items-center justify-center bg-black/30 backdrop-blur-sm rounded-full text-white/80 transition-all duration-300 border-none cursor-pointer" aria-label="Zurück">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><polyline points="15 18 9 12 15 6" /></svg>
            </button>
            <button onClick={() => goToMobile(active + 1)} className="absolute right-3 top-1/2 -translate-y-1/2 z-10 w-10 h-10 flex items-center justify-center bg-black/30 backdrop-blur-sm rounded-full text-white/80 transition-all duration-300 border-none cursor-pointer" aria-label="Weiter">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><polyline points="9 18 15 12 9 6" /></svg>
            </button>
          </div>
        ) : viewportWidth > 0 ? (
          /* Desktop: translateX sliding carousel */
          <div
            className="flex"
            style={{
              gap: `${GAP}px`,
              transform: `translateX(${viewportWidth / 2 - slideWidth / 2 - rawIndex * (slideWidth + GAP)}px)`,
              transition: isAnimating ? "transform 700ms cubic-bezier(0.25, 0.8, 0.25, 1)" : "none",
            }}
          >
            {extSlides.map((car, i) => {
              const isActive = i === rawIndex;
              return (
                <div
                  key={`${car.name}-${i}`}
                  className="shrink-0 relative cursor-pointer transition-opacity duration-500"
                  style={{ width: `${slideWidth}px`, opacity: isActive ? 1 : 0.4 }}
                  onClick={() => { if (!isActive) goToDesktop(i); }}
                >
                  <div className="relative h-[600px] overflow-hidden">
                    <Image
                      src={car.image}
                      alt={car.name}
                      fill
                      sizes="1280px"
                      className="object-cover transition-[filter] duration-500"
                      style={{
                        filter: isActive
                          ? "grayscale(20%) brightness(0.6) contrast(1.05)"
                          : "grayscale(100%) brightness(0.25) contrast(1.1)",
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

                    {isActive && (
                      <>
                        <CarOverlay car={car} />
                        <button onClick={(e) => { e.stopPropagation(); goToDesktop(rawIndex - 1); }} className="absolute left-6 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center bg-black/30 backdrop-blur-sm rounded-full text-white/80 hover:bg-black/50 hover:text-white transition-all duration-300 border-none cursor-pointer" aria-label="Zurück">
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><polyline points="15 18 9 12 15 6" /></svg>
                        </button>
                        <button onClick={(e) => { e.stopPropagation(); goToDesktop(rawIndex + 1); }} className="absolute right-6 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center bg-black/30 backdrop-blur-sm rounded-full text-white/80 hover:bg-black/50 hover:text-white transition-all duration-300 border-none cursor-pointer" aria-label="Weiter">
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><polyline points="9 18 15 12 9 6" /></svg>
                        </button>
                      </>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        ) : null}
      </div>

      {/* Dots */}
      <div className="flex items-center justify-center gap-3 mt-10">
        {featured.map((car, i) => {
          const isActive = isMobile ? currentMobileIndex === i : currentDesktopIndex === i;
          return (
            <button
              key={car.name}
              onClick={() => isMobile ? goToMobile(i) : goToDesktop(CENTER_OFFSET + i)}
              className="bg-transparent border-none p-2 cursor-pointer"
              aria-label={`Zu ${car.name}`}
            >
              <div className="h-[2px] transition-all duration-500" style={{ width: isActive ? "32px" : "12px", backgroundColor: "#f5f5f5", opacity: isActive ? 1 : 0.35 }} />
            </button>
          );
        })}
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
