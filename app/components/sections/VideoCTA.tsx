"use client";

import { useEffect, useRef, useState } from "react";

export default function VideoCTA() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.2 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className="relative h-[80vh] min-h-[500px] flex items-center justify-center text-center overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0 bg-[url('/images/green_audi_dark.jpeg')] bg-cover bg-center" style={{ filter: "grayscale(40%)  contrast(1.1)" }} />
      <div className="absolute inset-0 bg-black/10" />

      {/* Content */}
      <div
        className={`relative z-[2] max-w-[800px] px-10 max-tablet:px-5 transition-all duration-1000 ${
          visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
        style={{ transitionTimingFunction: "var(--ease-out)" }}
      >
        <span className="block text-[10px] font-semibold tracking-[4px] uppercase text-white/40 mb-6">Ihr nächstes Auto wartet</span>
        <h2 className="font-[family-name:var(--font-display)] text-[clamp(16px,2vw,28px)] font-normal text-white/85 leading-[1.2] -tracking-[0.06em] uppercase mb-6">
          Interessiert?
        </h2>
        <p className="text-base text-white/50 leading-[1.7] max-w-[500px] mx-auto mb-10">
          Vereinbaren Sie einen Termin für eine persönliche Beratung — unverbindlich, ehrlich und direkt.
        </p>
        <div className="flex gap-4 justify-center flex-wrap">
          <a
            href="#contact"
            className="inline-flex items-center gap-2.5 py-4 px-10 bg-white text-[#080808] font-semibold text-xs tracking-[1.5px] uppercase border-none cursor-pointer transition-all duration-400 hover:bg-[#e0e0e0] hover:-translate-y-0.5 hover:shadow-[0_12px_40px_rgba(255,255,255,0.1)]"
            style={{ transitionTimingFunction: "var(--ease)" }}
          >
            Kontakt aufnehmen
          </a>
          <a
            href="tel:+436643418135"
            className="inline-flex items-center gap-2.5 py-4 px-10 bg-transparent text-white font-semibold text-xs tracking-[1.5px] uppercase border border-white/20 cursor-pointer transition-all duration-400 hover:border-white/60 hover:bg-white/5"
            style={{ transitionTimingFunction: "var(--ease)" }}
          >
            Jetzt anrufen
          </a>
        </div>
      </div>
    </div>
  );
}
