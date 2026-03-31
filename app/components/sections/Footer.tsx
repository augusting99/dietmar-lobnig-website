import Link from "next/link";
import Image from "next/image";
import FadeIn from "../FadeIn";

export default function Footer() {
  return (
    <footer className="bg-bg-primary border-t border-border pt-20 pb-10 px-10 max-tablet:px-5">
      <FadeIn distance={20}>
      <div className="grid grid-cols-[2fr_1fr_1fr_1fr] max-tablet:grid-cols-2 max-mobile:grid-cols-1 gap-12 max-w-[1280px] mx-auto mb-15">
        <div>
          <div className="relative w-[140px] h-[140px] mb-4">
            <Image src="/dl_logo_wei%C3%9F.png" alt="Dietmar Lobnig GmbH Logo — Gebrauchtwagen Klagenfurt" fill className="object-contain" />
          </div>
          <p className="text-sm text-text-muted leading-[1.8] max-w-[320px]">Dietmar Lobnig GmbH — Ihr verlässlicher Partner für Gebrauchtwagen in Klagenfurt seit 1996.</p>
        </div>
        <div>
          <h4 className="text-[10px] font-semibold tracking-[3px] uppercase text-text-secondary mb-5">Navigation</h4>
          <ul>
            <li className="mb-2.5"><Link href="/" className="text-sm text-text-muted transition-colors duration-300 hover:text-white">Home</Link></li>
            <li className="mb-2.5"><Link href="/fahrzeuge" className="text-sm text-text-muted transition-colors duration-300 hover:text-white">Fahrzeuge</Link></li>
            <li className="mb-2.5"><Link href="/#services" className="text-sm text-text-muted transition-colors duration-300 hover:text-white">Services</Link></li>
            <li className="mb-2.5"><Link href="/#about" className="text-sm text-text-muted transition-colors duration-300 hover:text-white">Über uns</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-[10px] font-semibold tracking-[3px] uppercase text-text-secondary mb-5">Kontakt</h4>
          <ul>
            <li className="mb-2.5"><a href="tel:+436643418135" className="text-sm text-text-muted transition-colors duration-300 hover:text-white">+43 664 34 18 135</a></li>
            <li className="mb-2.5"><a href="mailto:lobnig@lobnig.cc" className="text-sm text-text-muted transition-colors duration-300 hover:text-white">lobnig@lobnig.cc</a></li>
          </ul>
        </div>
        <div>
          <h4 className="text-[10px] font-semibold tracking-[3px] uppercase text-text-secondary mb-5">Adresse</h4>
          <ul>
            <li className="mb-2.5 text-sm text-text-muted">Siriusstraße 13</li>
            <li className="mb-2.5 text-sm text-text-muted">9020 Klagenfurt</li>
            <li className="mb-2.5 text-sm text-text-muted">Österreich</li>
          </ul>
        </div>
      </div>
      <div className="max-w-[1280px] mx-auto pt-8 border-t border-border flex items-center justify-between flex-wrap gap-4">
        <p className="text-[13px] text-text-muted">&copy; {new Date().getFullYear()} Dietmar Lobnig GmbH</p>
        <div className="flex gap-6">
          <a href="#" className="text-[13px] text-text-muted transition-colors duration-300 hover:text-white">Impressum</a>
          <a href="#" className="text-[13px] text-text-muted transition-colors duration-300 hover:text-white">Datenschutz</a>
        </div>
      </div>
      </FadeIn>
    </footer>
  );
}
