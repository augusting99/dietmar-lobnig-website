"use client";

import Image from "next/image";
import FadeIn from "../FadeIn";

export default function StatementBreak({
  text,
  image,
  subtext,
}: {
  text: string;
  image?: string;
  subtext?: string;
}) {
  return (
    <div className={`relative ${image ? "h-[60vh] min-h-[400px]" : "py-32 max-tablet:py-20"} flex items-center justify-center text-center overflow-hidden`}>
      {image && (
        <>
          <Image src={image} alt="" fill className="object-cover" style={{ filter: "grayscale(40%) brightness(0.4) contrast(1.1)" }} />
          <div className="absolute inset-0 bg-black/40" />
        </>
      )}
      <FadeIn className={`relative z-[2] max-w-[900px] px-10 max-tablet:px-5`}>
        <p className="text-[clamp(24px,4vw,56px)] font-extralight text-white leading-[1.2] -tracking-[0.5px]">
          {text}
        </p>
        {subtext && (
          <span className="block mt-6 text-sm tracking-[2px] uppercase text-white/40">{subtext}</span>
        )}
      </FadeIn>
    </div>
  );
}
