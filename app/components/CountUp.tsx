"use client";
import { useEffect, useRef, useState } from "react";

export default function CountUp({
  end,
  suffix = "",
  duration = 2000,
  label,
}: {
  end: number;
  suffix?: string;
  duration?: number;
  label: string;
}) {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) {
          setStarted(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.5 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [started]);

  useEffect(() => {
    if (!started) return;
    const steps = 60;
    const increment = end / steps;
    let current = 0;
    const stepTime = duration / steps;
    const timer = setInterval(() => {
      current += increment;
      if (current >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, stepTime);
    return () => clearInterval(timer);
  }, [started, end, duration]);

  const formatted = end >= 1000 ? count.toLocaleString("de-AT") : count.toString();

  return (
    <div ref={ref}>
      <span className="block text-4xl max-mobile:text-[28px] font-extralight text-white -tracking-[0.5px] tabular-nums">
        {formatted}{suffix}
      </span>
      <span className="block text-[10px] text-text-muted mt-1.5 uppercase tracking-[1.5px]">{label}</span>
    </div>
  );
}
