"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";

function useVisible(ref: React.RefObject<HTMLDivElement | HTMLElement | null>) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [ref]);
  return visible;
}

function Card({
  image,
  alt,
  label,
  title,
  className = "",
  height = "h-full",
}: {
  image: string;
  alt: string;
  label?: string;
  title: string;
  className?: string;
  height?: string;
}) {
  return (
    <div className={`relative ${height} overflow-hidden group ${className}`}>
      <Image
        src={image}
        alt={alt}
        fill
        className="object-cover transition-transform duration-700 group-hover:scale-105"
        style={{ filter: "grayscale(30%) brightness(0.55) contrast(1.05)" }}
        sizes="(min-width: 768px) 50vw, 100vw"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 p-5 tablet:p-6">
        {label && (
          <span className="block text-[10px] font-semibold tracking-[3px] uppercase text-white/40 mb-2">{label}</span>
        )}
        <h3 className="text-[clamp(16px,1.5vw,22px)] font-light text-white leading-tight">
          {title}
        </h3>
      </div>
    </div>
  );
}

export default function HighlightsGrid() {
  const sectionRef = useRef<HTMLElement>(null);
  const isVisible = useVisible(sectionRef);

  return (
    <section ref={sectionRef} className="py-40 max-tablet:py-24 px-10 max-tablet:px-5">
      <div className="max-w-[1280px] mx-auto">
        <div className={`mb-4 transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <span className="block text-[10px] font-semibold tracking-[4px] uppercase text-text-muted mb-4">Vom Ankauf zum Verkauf</span>
          <h2 className="text-[clamp(28px,3.5vw,48px)] font-extralight -tracking-[0.5px] leading-[1.2] mb-3">
            Der Weg jedes Fahrzeugs.
          </h2>
          <p className="text-[15px] text-text-secondary max-w-[520px] leading-[1.8]">
            Bevor ein Auto bei uns steht, hat es einen Prozess durchlaufen — lückenlos, persönlich, ohne Abkürzungen.
          </p>
        </div>

        <div className={`flex flex-col gap-4 mt-14 transition-all duration-1000 delay-200 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          {/* Row 1: Ankauf — finding & buying the car */}
          <div className="grid grid-cols-1 tablet:grid-cols-12 gap-4 min-h-[520px]">
            <div className="tablet:col-span-7">
              <Card
                image="/images/behind.jpeg"
                alt="Ankauf"
                label="Ankauf"
                title="Wir finden das perfekte Fahrzeug für Sie"
              />
            </div>
            <div className="tablet:col-span-5 flex flex-col gap-4">
              <Card
                image="/images/green_audi.jpeg"
                alt="Prüfung"
                label="Prüfung"
                title="Technik, Historie, Zustand — nichts wird ausgelassen"
                height="h-[200px] tablet:h-1/2"
              />
              <Card
                image="/images/black_mercedes.jpeg"
                alt="Aufbereitung"
                label="Aufbereitung"
                title="Professionell aufbereitet, innen wie außen"
                height="h-[200px] tablet:h-1/2"
              />
            </div>
          </div>

          {/* Row 2: Verkauf — selling to the customer */}
          <div className="grid grid-cols-1 tablet:grid-cols-12 gap-4 min-h-[520px]">
            <div className="tablet:col-span-5 flex flex-col gap-4">
              <Card
                image="/images/g_class.jpeg"
                alt="Beratung"
                label="Beratung"
                title="Ehrliche Beratung — auch wenn wir mal Nein sagen"
                height="h-[200px] tablet:h-1/2"
              />
              <Card
                image="/images/hero.jpeg"
                alt="Finanzierung"
                label="Finanzierung"
                title="Kredit, Leasing oder bar — flexibel und fair kalkuliert"
                height="h-[200px] tablet:h-1/2"
              />
            </div>
            <div className="tablet:col-span-7">
              <Card
                image="/images/black_mercedes.jpeg"
                alt="Übergabe"
                label="Verkauf"
                title="Handschlag, Schlüssel, Ihr Auto — seit 1996 so gemacht"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
