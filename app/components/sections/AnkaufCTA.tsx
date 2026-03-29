import Image from "next/image";
import FadeIn from "../FadeIn";
import MouseParallax from "../MouseParallax";

export default function AnkaufCTA() {
  return (
    <MouseParallax className="relative h-[70vh] min-h-[500px] flex items-center justify-center text-center overflow-hidden p-0" strength={10}>
      <div className="absolute inset-0" data-parallax="-1">
        <Image src="/images/black_mercedes.jpeg" alt="Ankauf" fill sizes="100vw" className="object-cover" />
      </div>
      <div className="absolute inset-0 bg-black/65" />
      <FadeIn className="relative z-[2] max-w-[700px] px-10">
        <h2 className="text-[clamp(32px,5vw,60px)] font-extralight text-white mb-8 -tracking-[0.5px] leading-[1.15]">
          Sie möchten Ihr<br />Auto verkaufen?
        </h2>
        <p className="text-base text-white/55 mb-10 leading-[1.7] max-w-[480px] mx-auto">Faire Bewertung, schnelle Abwicklung, Barauszahlung. Kein Verhandlungstheater.</p>
        <a href="#contact" className="inline-flex items-center gap-2.5 py-3.5 px-8 bg-white text-[#080808] font-semibold text-xs tracking-[1.5px] uppercase border-none cursor-pointer transition-all duration-400 hover:bg-[#e0e0e0] hover:-translate-y-0.5" style={{ transitionTimingFunction: "var(--ease)" }}>
          Jetzt anfragen
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12h14" /><path d="m12 5 7 7-7 7" />
          </svg>
        </a>
      </FadeIn>
    </MouseParallax>
  );
}
