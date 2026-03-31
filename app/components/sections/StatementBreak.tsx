"use client";

import Image from "next/image";
import FadeIn from "../FadeIn";

export default function StatementBreak({
  text,
  lines,
  image,
  subtext,
}: {
  text?: string;
  lines?: string[];
  image?: string;
  subtext?: string;
}) {
  return (
    <div className={`relative ${image ? "h-[60vh] min-h-[400px]" : "py-32 max-tablet:py-20"} flex items-center justify-center text-center overflow-hidden`}>
      {image && (
        <>
          <Image src={image} alt="Fahrzeug im Showroom von hinten — persönlich ausgewählt und geprüft" fill className="object-cover" style={{ filter: "grayscale(40%) brightness(0.4) contrast(1.1)" }} />
          <div className="absolute inset-0 bg-black/40" />
        </>
      )}
      <FadeIn className="relative z-[2] w-full max-w-[1280px] mx-auto px-10 max-tablet:px-5 text-center">
        {text && (
          <p className="font-[family-name:var(--font-display)] text-[clamp(20px,3vw,42px)] font-normal text-white/85 leading-[1.3] -tracking-[0.06em] uppercase">
            {text}
          </p>
        )}
        {lines && (
          <div className="flex flex-col gap-2">
            {lines.map((line, i) => (
              <p key={i} className="font-[family-name:var(--font-display)] text-[clamp(16px,2vw,28px)] font-normal text-white leading-[1.2] -tracking-[0.06em] uppercase">
                {line}
              </p>
            ))}
          </div>
        )}
        {subtext && (
          <span className="block mt-6 text-sm tracking-[2px] uppercase text-white/40">{subtext}</span>
        )}
      </FadeIn>
    </div>
  );
}
