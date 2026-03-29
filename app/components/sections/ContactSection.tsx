import FadeIn from "../FadeIn";
import ContactForm from "../ContactForm";

const details = [
  { title: "Adresse", content: <><span>Siriusstraße 13</span><br /><span>9020 Klagenfurt, Österreich</span></> },
  { title: "Telefon", content: <a href="tel:+436643418135" className="text-text-secondary transition-colors duration-300 hover:text-white">+43 (0) 664 34 18 135</a> },
  { title: "E-Mail", content: <a href="mailto:lobnig@lobnig.cc" className="text-text-secondary transition-colors duration-300 hover:text-white">lobnig@lobnig.cc</a> },
  { title: "Öffnungszeiten", content: <><span>Mo–Fr: 08:00 – 16:00</span><br /><span>Sa: 08:00 – 12:00</span></> },
];

export default function ContactSection() {
  return (
    <section className="py-36 max-tablet:py-24 px-10 max-tablet:px-5 border-t border-border" id="contact">
      <div className="max-w-[1280px] mx-auto">
        <div className="grid grid-cols-[1fr_1.2fr] max-tablet:grid-cols-1 gap-20 max-tablet:gap-12 items-start">
          <FadeIn direction="left" blur>
            <div>
              <h2 className="text-[clamp(28px,3.5vw,48px)] font-extralight mb-5 -tracking-[0.5px] leading-[1.2]">Schreiben Sie uns.</h2>
              <p className="text-[15px] text-text-secondary max-w-[520px] leading-[1.8] mb-10">Interesse an einem Fahrzeug oder eine Frage? Wir melden uns innerhalb von 24 Stunden.</p>
              <div className="grid gap-6">
                {details.map((d) => (
                  <div key={d.title}>
                    <h4 className="text-[10px] font-semibold tracking-[3px] uppercase text-text-muted mb-1.5">{d.title}</h4>
                    <p className="text-[15px] text-text-secondary leading-[1.7]">{d.content}</p>
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>
          <FadeIn direction="right" blur delay={0.15}>
            <ContactForm />
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
