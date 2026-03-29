"use client";

export default function ShareButton({
  brand,
  model,
  year,
  price,
}: {
  brand: string;
  model: string;
  year: number | string;
  price: string;
}) {
  const handleShare = () => {
    const subject = encodeURIComponent(
      `Fahrzeug-Anfrage: ${brand} ${model}`
    );
    const body = encodeURIComponent(
      `Guten Tag,\n\nich interessiere mich für folgendes Fahrzeug:\n\n` +
        `Marke: ${brand}\n` +
        `Modell: ${model}\n` +
        `Baujahr: ${year}\n` +
        `Preis: € ${price}\n\n` +
        `Bitte kontaktieren Sie mich für weitere Informationen.\n\n` +
        `Mit freundlichen Grüßen`
    );
    window.location.href = `mailto:lobnig@lobnig.cc?subject=${subject}&body=${body}`;
  };

  return (
    <button
      className="absolute bottom-3 right-3 z-[3] w-9 h-9 flex items-center justify-center bg-black/40 backdrop-blur-[8px] border border-white/10 rounded-full text-white/70 cursor-pointer transition-all duration-300 hover:bg-white/15 hover:border-white/30 hover:text-white hover:scale-110"
      style={{ transitionTimingFunction: "var(--ease)" }}
      onClick={(e) => {
        e.stopPropagation();
        handleShare();
      }}
      aria-label="Per E-Mail anfragen"
      title="Per E-Mail anfragen"
    >
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect width="20" height="16" x="2" y="4" rx="2" />
        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
      </svg>
    </button>
  );
}
