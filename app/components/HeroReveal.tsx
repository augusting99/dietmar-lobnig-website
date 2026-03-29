"use client";
import { useEffect, useRef } from "react";

export default function HeroReveal() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    requestAnimationFrame(() => {
      el.classList.add("revealed");
    });
  }, []);

  return (
    <div className="hero-reveal" ref={ref}>
      <h1 className="hero-reveal-text font-[family-name:var(--font-display)] text-[28px] mobile:text-[clamp(30px,8vw,48px)] tablet:text-[clamp(36px,5.5vw,88px)] font-normal leading-[1.05] text-white tracking-[0.04em] uppercase">
        Dietmar Lobnig
      </h1>
      <p className="hero-reveal-btn mt-6 text-[clamp(14px,1.5vw,18px)] text-white/50 font-light leading-[1.6]">
        Ihr zuverlässiger Partner in Klagenfurt
      </p>
      <div className="hero-reveal-btn mt-10 flex gap-4 flex-wrap justify-center">
        <a
          href="/fahrzeuge"
          className="inline-flex items-center gap-2.5 py-3.5 px-8 bg-white text-[#080808] font-semibold text-xs tracking-[1.5px] uppercase border-none cursor-pointer transition-all duration-400 hover:bg-[#e0e0e0] hover:-translate-y-0.5 hover:shadow-[0_12px_40px_rgba(255,255,255,0.06)]"
          style={{ transitionTimingFunction: "var(--ease)" }}
        >
          Fahrzeuge entdecken
        </a>
      </div>
    </div>
  );
}
