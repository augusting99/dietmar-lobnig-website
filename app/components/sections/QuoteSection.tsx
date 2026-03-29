import FadeIn from "../FadeIn";

export default function QuoteSection() {
  return (
    <div className="flex justify-center items-center py-20 text-center" id="story-start">
      <FadeIn>
        <blockquote className="flex flex-col justify-center items-center p-15 max-md:p-10">
          <p className="text-[clamp(22px,2.5vw,32px)] font-extralight italic text-white leading-[1.4]">&bdquo;Ein Handschlag zählt mehr als jeder Vertrag.&ldquo;</p>
          <cite className="block mt-5 text-sm not-italic tracking-[2px] uppercase text-white/40">— Dietmar Lobnig</cite>
        </blockquote>
      </FadeIn>
    </div>
  );
}
