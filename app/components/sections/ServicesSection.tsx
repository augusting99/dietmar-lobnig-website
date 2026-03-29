import Image from "next/image";
import FadeIn from "../FadeIn";
import CountUp from "../CountUp";

const milestones = [
  {
    year: "1996",
    title: "Der Anfang",
    image: "/images/behind.jpeg",
    desc: "Dietmar Lobnig startet mit einer Handvoll Fahrzeugen und einem Versprechen: Ehrlichkeit vor Profit.",
  },
  {
    year: "2005",
    title: "Siriusstraße 13",
    image: "/images/hero.jpeg",
    desc: "Der eigene Standort in Klagenfurt wird bezogen — ein fixer Anlaufpunkt für die wachsende Stammkundschaft.",
  },
  {
    year: "Heute",
    title: "Über 3.200 Kunden",
    image: "/images/g_class.jpeg",
    desc: "150+ Fahrzeuge im Jahr, persönlich ausgewählt. Kein Konzern, kein Callcenter — immer noch derselbe Handschlag.",
  },
];

export default function ServicesSection() {
  return (
    <div className="py-40 max-tablet:py-24" id="history">
      <FadeIn blur>
        <div className="mb-20 max-tablet:mb-14">
          <span className="block text-[10px] font-semibold tracking-[4px] uppercase text-text-muted mb-4">Unsere Geschichte</span>
          <h2 className="text-[clamp(28px,3.5vw,48px)] font-extralight -tracking-[0.5px] leading-none">
            Seit 1996. Derselbe Anspruch.
          </h2>
        </div>
      </FadeIn>

      <div className="flex flex-col gap-24 max-tablet:gap-16">
        {milestones.map((m, i) => (
          <FadeIn key={m.year} direction={i % 2 === 0 ? "left" : "right"} blur>
            <div className={`grid grid-cols-2 max-tablet:grid-cols-1 gap-16 max-tablet:gap-8 items-center ${i % 2 !== 0 ? "tablet:direction-rtl" : ""}`}>
              <div className={`relative aspect-[16/10] overflow-hidden ${i % 2 !== 0 ? "tablet:order-2" : ""}`}>
                <Image
                  src={m.image}
                  alt={m.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover"
                  style={{ filter: "grayscale(30%) brightness(0.65) contrast(1.05)" }}
                />
              </div>
              <div className={i % 2 !== 0 ? "tablet:order-1" : ""}>
                <span className="block text-[40px] font-extralight text-text-muted -tracking-[1px] mb-2">{m.year}</span>
                <h3 className="text-xl font-normal text-white mb-4 tracking-tight">{m.title}</h3>
                <p className="text-[15px] text-text-secondary leading-[1.8] max-w-[480px]">{m.desc}</p>
              </div>
            </div>
          </FadeIn>
        ))}
      </div>

      <FadeIn delay={0.2}>
        <div className="grid grid-cols-3 gap-6 max-mobile:gap-3 py-8 mt-24 border-t border-b border-border text-center">
          <CountUp end={25} suffix="+" label="Jahre Erfahrung" />
          <CountUp end={3200} suffix="+" label="Zufriedene Kunden" />
          <CountUp end={150} suffix="+" label="Fahrzeuge / Jahr" />
        </div>
      </FadeIn>
    </div>
  );
}
