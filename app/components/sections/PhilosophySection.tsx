import FadeIn from "../FadeIn";

const beliefs = [
  "Passt ein Fahrzeug nicht, sagen wir es. Lieber kein Verkauf als der falsche.",
  "Kein Massenbestand. Jedes Auto wird persönlich ausgewählt und geprüft, bevor es hier steht.",
  "Sie kaufen nicht bei einer Firma. Sie kaufen bei Dietmar. Seit 1996, mit Handschlag.",
];

export default function PhilosophySection() {
  return (
    <div className="py-40 max-tablet:py-24" id="philosophy">
      <div className="grid grid-cols-[1.1fr_1fr] max-tablet:grid-cols-1 gap-20 max-tablet:gap-10 items-start">
        <FadeIn direction="left">
          <h2 className="text-[clamp(26px,3vw,40px)] font-extralight leading-[1.35] -tracking-[0.3px] text-white">
            Wir machen nicht alles.<br />Aber das, was wir machen,<br />machen wir richtig.
          </h2>
        </FadeIn>
        <FadeIn direction="right">
          <div className="flex flex-col">
            {beliefs.map((text, i) => (
              <div key={i} className="philosophy-belief py-7 border-b border-border first:pt-0 last:border-b-0 last:pb-0">
                <p className="text-base text-text-muted leading-[1.75] transition-all duration-400" style={{ transitionTimingFunction: "var(--ease)" }}>{text}</p>
              </div>
            ))}
          </div>
        </FadeIn>
      </div>
    </div>
  );
}
