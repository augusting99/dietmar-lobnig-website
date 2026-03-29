"use client";

const input = "bg-bg-card border border-border rounded-sm text-text-primary font-[inherit] text-sm py-3 px-4 outline-none w-full transition-[border-color] duration-300 focus:border-border-light placeholder:text-text-muted";
const label = "text-[10px] font-semibold tracking-[1.5px] uppercase text-text-muted";

export default function ContactForm() {
  return (
    <form
      className="flex flex-col gap-4 p-10 max-tablet:p-6 border border-border transition-all duration-500 hover:border-border-light hover:shadow-[0_0_60px_rgba(255,255,255,0.03)]"
      style={{ transitionTimingFunction: "var(--ease)" }}
      onSubmit={(e) => { e.preventDefault(); alert("Vielen Dank! Wir melden uns in Kürze."); }}
    >
      <div className="grid grid-cols-2 max-tablet:grid-cols-1 gap-4">
        <div className="flex flex-col gap-1.5">
          <label htmlFor="vorname" className={label}>Vorname</label>
          <input id="vorname" type="text" placeholder="Max" required className={input} />
        </div>
        <div className="flex flex-col gap-1.5">
          <label htmlFor="nachname" className={label}>Nachname</label>
          <input id="nachname" type="text" placeholder="Mustermann" required className={input} />
        </div>
      </div>
      <div className="grid grid-cols-2 max-tablet:grid-cols-1 gap-4">
        <div className="flex flex-col gap-1.5">
          <label htmlFor="email" className={label}>E-Mail</label>
          <input id="email" type="email" placeholder="max@beispiel.at" required className={input} />
        </div>
        <div className="flex flex-col gap-1.5">
          <label htmlFor="telefon" className={label}>Telefon</label>
          <input id="telefon" type="tel" placeholder="+43 ..." className={input} />
        </div>
      </div>
      <div className="flex flex-col gap-1.5">
        <label htmlFor="betreff" className={label}>Betreff</label>
        <select id="betreff" className={`${input} appearance-none bg-[url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%23555' stroke-width='2'%3E%3Cpolyline points='6 9 12 15 18 9'/%3E%3C/svg%3E")] bg-no-repeat bg-[right_14px_center] pr-9`}>
          <option value="">Bitte wählen</option>
          <option value="kaufanfrage">Kaufanfrage</option>
          <option value="verkauf">Fahrzeug verkaufen</option>
          <option value="finanzierung">Finanzierung</option>
          <option value="sonstiges">Sonstiges</option>
        </select>
      </div>
      <div className="flex flex-col gap-1.5">
        <label htmlFor="nachricht" className={label}>Nachricht</label>
        <textarea id="nachricht" rows={5} placeholder="Ihre Nachricht..." required className={`${input} resize-y min-h-[120px]`} />
      </div>
      <button type="submit" className="w-full inline-flex items-center justify-center gap-2.5 py-3.5 px-8 bg-white text-[#080808] font-semibold text-xs tracking-[1.5px] uppercase border-none cursor-pointer transition-all duration-400 hover:bg-[#e0e0e0] hover:-translate-y-0.5" style={{ transitionTimingFunction: "var(--ease)" }}>
        Nachricht senden
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M5 12h14" /><path d="m12 5 7 7-7 7" />
        </svg>
      </button>
    </form>
  );
}
