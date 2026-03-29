import FadeIn from "../FadeIn";
import TiltCard from "../TiltCard";
import ParallaxImage from "../ParallaxImage";
import CountUp from "../CountUp";

export default function AboutSection() {
  return (
    <div className="py-40 max-tablet:py-24" id="about">
      <div className="grid grid-cols-2 max-tablet:grid-cols-1 gap-20 max-tablet:gap-10 items-center">
        <FadeIn direction="left">
          <TiltCard className="overflow-hidden" intensity={5}>
            <ParallaxImage src="/images/behind.jpeg" alt="Showroom" />
          </TiltCard>
        </FadeIn>
        <FadeIn direction="right">
          <div>
            <h2 className="text-[clamp(28px,3.5vw,48px)] font-extralight mb-5 -tracking-[0.5px] leading-[1.2]">
              Nicht der Größte.<br />Aber der Ehrlichste.
            </h2>
            <p className="text-[15px] text-text-secondary max-w-[520px] leading-[1.8] mb-10">
              Seit 1996 steht Dietmar Lobnig für das, was im Autohandel selten geworden ist: ein Handschlag, der zählt. Kein Konzern, kein Callcenter — ein Mensch, der für seine Arbeit einsteht. Persönlich, direkt, seit über 25 Jahren.
            </p>
            <div className="grid grid-cols-3 gap-6 max-mobile:gap-3 py-8 border-t border-b border-border">
              <CountUp end={25} suffix="+" label="Jahre Erfahrung" />
              <CountUp end={3200} suffix="+" label="Zufriedene Kunden" />
              <CountUp end={150} suffix="+" label="Fahrzeuge / Jahr" />
            </div>
          </div>
        </FadeIn>
      </div>
    </div>
  );
}
