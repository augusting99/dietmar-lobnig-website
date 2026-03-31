"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";

export default function EntranceLoader() {
  const [phase, setPhase] = useState<"animate" | "flyToHeader" | "fadeOut" | "done">("animate");
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Lock scroll during loader
    document.body.style.overflow = "hidden";

    // After pulse completes (~2.6s), fly logo to header
    const t1 = setTimeout(() => setPhase("flyToHeader"), 2600);
    // Fade out background
    const t2 = setTimeout(() => {
      setPhase("fadeOut");
      document.body.style.overflow = "";
    }, 3400);
    // Remove from DOM
    const t3 = setTimeout(() => setPhase("done"), 4200);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      document.body.style.overflow = "";
    };
  }, []);

  useEffect(() => {
    if (phase === "flyToHeader" && wrapRef.current) {
      const headerLogo = document.getElementById("header-logo");
      if (!headerLogo) return;

      const targetRect = headerLogo.getBoundingClientRect();
      const wrapRect = wrapRef.current.getBoundingClientRect();
      const dx = targetRect.left + targetRect.width / 2 - (wrapRect.left + wrapRect.width / 2);
      const dy = targetRect.top + targetRect.height / 2 - (wrapRect.top + wrapRect.height / 2);
      const targetScale = targetRect.width / wrapRect.width;

      // Kill CSS animation, freeze state
      wrapRef.current.style.animation = "none";
      wrapRef.current.style.opacity = "1";
      wrapRef.current.style.transform = "scale(1)";
      // Force reflow
      wrapRef.current.offsetHeight;

      // Slide to header position
      wrapRef.current.style.transition = "all 1.2s cubic-bezier(0.76, 0, 0.24, 1)";
      wrapRef.current.style.transform = `translate(${dx}px, ${dy}px) scale(${targetScale})`;
      wrapRef.current.style.opacity = "0";
    }
  }, [phase]);

  if (phase === "done") return null;

  return (
    <div
      className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center transition-[background] duration-800 ease-in-out ${
        phase === "fadeOut" ? "bg-transparent pointer-events-none" : "bg-bg-primary"
      }`}
    >
      <div
        ref={wrapRef}
        className="relative w-[180px] h-[180px] mobile:w-[250px] mobile:h-[250px] tablet:w-[300px] tablet:h-[300px] opacity-0"
        style={{
          animation:
            "loaderFadeIn 1.4s cubic-bezier(0.16, 1, 0.3, 1) forwards, loaderPulse 0.7s cubic-bezier(0.4, 0, 0.2, 1) 0.8s 2",
        }}
      >
        <Image
          src="/dl_logo_wei%C3%9F.png"
          alt="Dietmar Lobnig GmbH Logo"
          fill
          className="object-contain"
          priority
        />
      </div>
    </div>
  );
}
