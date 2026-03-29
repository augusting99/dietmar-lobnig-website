export default function Marquee({ items }: { items: string[] }) {
  const content = items.join(" — ");
  return (
    <div className="overflow-hidden border-t border-b border-border py-[18px] bg-bg-primary">
      <div className="flex w-max animate-[marqueeScroll_30s_linear_infinite]">
        <span className="text-xs font-medium tracking-[3px] uppercase text-text-muted whitespace-nowrap pr-1">{content} — </span>
        <span className="text-xs font-medium tracking-[3px] uppercase text-text-muted whitespace-nowrap pr-1">{content} — </span>
        <span className="text-xs font-medium tracking-[3px] uppercase text-text-muted whitespace-nowrap pr-1">{content} — </span>
        <span className="text-xs font-medium tracking-[3px] uppercase text-text-muted whitespace-nowrap pr-1">{content} — </span>
      </div>
    </div>
  );
}
