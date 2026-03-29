import Image from "next/image";
import HeroReveal from "../HeroReveal";

export default function HeroSection() {
  return (
    <div className="relative h-dvh min-h-[600px] flex items-start justify-center overflow-hidden">
      <div className="absolute inset-0 animate-[heroZoom_20s_ease-out_forwards]">
        <Image src="/images/hero.jpeg" alt="Hero" fill sizes="100vw" priority className="object-cover " />
      </div>
      <div className="absolute inset-0" style={{ background: "linear-gradient(0deg, rgba(8,8,8,0.85) 0%, rgba(8,8,8,0.4) 50%, rgba(8,8,8,0.2) 100%)" }} />
      <div className="relative z-[2] w-full text-center px-7 tablet:px-15" style={{ paddingTop: "25vh" }}>
        <HeroReveal />
      </div>
      <a href="#story-start" className="absolute bottom-7 left-1/2 -translate-x-1/2 z-[2] text-white/30 animate-[arrowBounce_3s_ease-in-out_infinite]" aria-label="Scroll down">
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </a>
    </div>
  );
}
