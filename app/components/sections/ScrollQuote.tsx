"use client";

import { useEffect, useRef } from "react";

export default function ScrollQuote({
  text,
  cite,
}: {
  text: string;
  cite: string;
}) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const wordsRef = useRef<HTMLSpanElement[]>([]);
  const citeRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const handleScroll = () => {
      const rect = section.getBoundingClientRect();
      const viewH = window.innerHeight;

      // Progress 0→1: starts when section is 40% in view, completes well before it leaves
      const progress = Math.min(Math.max((viewH * 0.6 - rect.top) / (viewH * 0.5), 0), 1);

      const words = wordsRef.current;
      const total = words.length;

      words.forEach((word, i) => {
        // Spread words across 0→0.85 of progress, so all finish by progress=1
        const wordStart = (i / total) * 0.85;
        const wordProgress = Math.min(Math.max((progress - wordStart) / 0.2, 0), 1);

        if (word) {
          word.style.opacity = `${0.12 + wordProgress * 0.88}`;
        }
      });

      if (citeRef.current) {
        const citeProgress = Math.min(Math.max((progress - 0.85) / 0.15, 0), 1);
        citeRef.current.style.opacity = `${citeProgress * 0.4}`;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const words = text.split(" ");

  return (
    <div ref={sectionRef} className="py-[20vh] max-tablet:py-[12vh] px-10 max-tablet:px-5">
      <div className="max-w-[900px] mx-auto">
        <p className="text-[clamp(24px,3.5vw,48px)] font-extralight leading-[1.4] -tracking-[0.5px]">
          {words.map((word, i) => (
            <span
              key={i}
              ref={(el) => { if (el) wordsRef.current[i] = el; }}
              className="inline-block mr-[0.3em] text-white"
              style={{ opacity: 0.12 }}
            >
              {word}
            </span>
          ))}
        </p>
        <span
          ref={citeRef}
          className="block mt-8 text-sm tracking-[2px] uppercase text-white"
          style={{ opacity: 0 }}
        >
          — {cite}
        </span>
      </div>
    </div>
  );
}
