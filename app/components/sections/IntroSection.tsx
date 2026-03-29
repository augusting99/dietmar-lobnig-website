"use client";

import Image from "next/image";
import FadeIn from "../FadeIn";

export default function IntroSection() {
  return (
    <div className="py-40 max-tablet:py-24" id="story-start">
      <div className="grid grid-cols-2 max-tablet:grid-cols-1 gap-20 max-tablet:gap-12 items-center">
        <FadeIn direction="left" blur scale>
          <div className="relative aspect-[4/3] overflow-hidden">
            <Image
              src="/images/behind.jpeg"
              alt="Showroom"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
              style={{ filter: "grayscale(20%) brightness(0.7) contrast(1.05)" }}
            />
          </div>
        </FadeIn>
        <FadeIn direction="right" blur delay={0.15}>
          <div>
            <span className="block text-[10px] font-semibold tracking-[4px] uppercase text-text-muted mb-6">Seit 1996</span>
            <h2 className="text-[clamp(28px,3.5vw,48px)] font-extralight mb-6 -tracking-[0.5px] leading-[1.2] text-white">
              Vertrauen statt Versprechen.
            </h2>
            <p className="text-[15px] text-text-secondary leading-[1.8]">
              Kein Konzern, kein Callcenter. Ein Team, das jedes Fahrzeug persönlich auswählt, prüft und für seine Arbeit einsteht. Seit über 25 Jahren in Klagenfurt.
            </p>
          </div>
        </FadeIn>
      </div>
    </div>
  );
}
