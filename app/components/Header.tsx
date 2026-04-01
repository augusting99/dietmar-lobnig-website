"use client";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 16);
    const handleResize = () => setIsMobile(window.innerWidth < 600);
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleResize);
    handleScroll();
    handleResize();
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  const closeSidebar = () => setIsOpen(false);

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-[1100] grid grid-cols-[1fr_auto_1fr] items-center transition-all duration-500 py-3.5 px-5 tablet:py-6 tablet:px-10 ${
          isScrolled
            ? "!py-3 tablet:!py-3.5 bg-[rgba(8,8,8,0.9)] backdrop-blur-[24px] backdrop-saturate-[1.3]"
            : "bg-transparent"
        }`}
        style={{ transitionTimingFunction: "var(--ease)" }}
      >
        <button
          aria-label="Menü öffnen"
          className={`burger w-10 h-10 flex flex-col justify-center items-start cursor-pointer bg-transparent border-none z-[1100] p-2 ${isOpen ? "active" : ""}`}
          onClick={() => setIsOpen((o) => !o)}
        >
          <span className="block h-[1.5px] bg-text-primary rounded-sm transition-all duration-400 origin-center" style={{ transitionTimingFunction: "var(--ease)" }} />
          <span className="block h-[1.5px] bg-text-primary rounded-sm transition-all duration-400 origin-center" style={{ transitionTimingFunction: "var(--ease)" }} />
          <span className="block h-[1.5px] bg-text-primary rounded-sm transition-all duration-400 origin-center" style={{ transitionTimingFunction: "var(--ease)" }} />
        </button>

        <div className="justify-self-center">
          <Link
            href="/"
            id="header-logo"
            className={`block relative transition-all duration-500 hover:opacity-70 ${
              isScrolled || isMobile ? "w-[44px] h-[44px]" : "w-[120px] h-[120px]"
            }`}
            style={{ transitionTimingFunction: "var(--ease)" }}
            onClick={closeSidebar}
          >
            <Image
              src="/dl_logo_wei%C3%9F.png"
              alt="Dietmar Lobnig GmbH Logo"
              fill
              className={`object-contain transition-opacity duration-500 ${isScrolled || isMobile ? "opacity-0" : "opacity-100"}`}
              priority
            />
            <Image
              src="/dl_logo_wei%C3%9F_ohne_text.png"
              alt="Dietmar Lobnig GmbH Logo"
              fill
              className={`object-contain transition-opacity duration-500 ${isScrolled || isMobile ? "opacity-100" : "opacity-0"}`}
              priority
            />
          </Link>
        </div>

        <div className="flex items-center justify-self-end">
          <div className="flex items-center gap-0.5">
            <a href="tel:+436643418135" className="w-[38px] h-[38px] flex items-center justify-center text-white transition-all duration-300 hover:-translate-y-0.5 hover:opacity-70" style={{ transitionTimingFunction: "var(--ease)" }} aria-label="Anrufen">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
              </svg>
            </a>
            <a href="https://www.instagram.com/lobniggmbh/" target="_blank" rel="noopener noreferrer" className="w-[38px] h-[38px] flex items-center justify-center text-white transition-all duration-300 hover:-translate-y-0.5 hover:opacity-70" style={{ transitionTimingFunction: "var(--ease)" }} aria-label="Instagram">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
              </svg>
            </a>
          </div>
        </div>
      </header>

      {/* Sidebar overlay */}
      <div
        className={`fixed inset-0 bg-black/65 z-[1040] transition-opacity duration-500 ${isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
        onClick={closeSidebar}
      />

      {/* Sidebar */}
      <aside className={`sidebar fixed top-0 w-[420px] max-w-[85vw] h-dvh bg-bg-secondary z-[1050] flex flex-col justify-center py-15 px-[50px] border-r border-border ${isOpen ? "active left-0" : "-left-[420px]"}`} style={{ transition: "left 0.6s var(--ease-out)" }}>
        <nav>
          <ul className="flex flex-col gap-0.5 p-0 m-0">
            {[
              { href: "/", label: "Home" },
              { href: "/fahrzeuge", label: "Fahrzeuge" },
              { href: "/#ankauf", label: "Ankauf & Verkauf" },
              { href: "/#history", label: "Über uns" },
              { href: "/#contact", label: "Kontakt" },
            ].map((item) => (
              <li key={item.href}>
                <Link href={item.href} onClick={closeSidebar} className="block text-[28px] font-light text-text-muted py-4 opacity-0 hover:text-white" style={{ transition: "all 0.4s var(--ease)" }}>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="mt-12 pt-6 border-t border-border">
          <p className="text-[13px] text-text-muted leading-8">
            DL – Dietmar Lobnig GmbH<br />
            Siriusstraße 13, 9020 Klagenfurt<br />
            <a href="tel:+436643418135" className="text-text-secondary transition-colors duration-300 hover:text-white">+43 (0) 664 34 18 135</a>
          </p>
        </div>
      </aside>
    </>
  );
}
