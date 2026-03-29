import FadeIn from "../FadeIn";

const steps = [
  {
    number: "01",
    title: "Beratung",
    desc: "Persönliches Gespräch über Ihre Wünsche und Anforderungen — ehrlich und ohne Verkaufsdruck.",
  },
  {
    number: "02",
    title: "Auswahl",
    desc: "Wir finden das passende Fahrzeug — handverlesen, technisch geprüft und transparent dokumentiert.",
  },
  {
    number: "03",
    title: "Übergabe",
    desc: "Unkomplizierte Abwicklung mit Finanzierungsmöglichkeit, Handschlag und Schlüsselübergabe.",
  },
];

export default function HowWeWorkSection() {
  return (
    <div className="py-40 max-tablet:py-24">
      <FadeIn>
        <h2 className="text-[clamp(28px,3.5vw,48px)] font-extralight mb-16 max-tablet:mb-10 -tracking-[0.5px] leading-[1.2]">
          So arbeiten wir.
        </h2>
      </FadeIn>
      <div className="grid grid-cols-3 max-tablet:grid-cols-1 gap-16 max-tablet:gap-10">
        {steps.map((step, i) => (
          <FadeIn key={step.number} delay={i * 0.12}>
            <div>
              <span className="block text-[40px] font-extralight text-text-muted mb-4 -tracking-[1px]">{step.number}</span>
              <h3 className="text-xl font-normal text-white mb-3 tracking-tight">{step.title}</h3>
              <p className="text-[15px] text-text-secondary leading-[1.8]">{step.desc}</p>
            </div>
          </FadeIn>
        ))}
      </div>
    </div>
  );
}
