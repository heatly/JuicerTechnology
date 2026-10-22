"use client";
import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "framer-motion";
import { stats } from "@/content/site";

function Count({ to, suffix }: { to: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const reduce = useReducedMotion();
  const [n, setN] = useState(reduce ? to : 0);
  useEffect(() => {
    if (!inView || reduce) { setN(to); return; }
    const start = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / 1400);
      setN(Math.round(to * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, to, reduce]);
  return <span ref={ref}>{n.toLocaleString("en-IN")}{suffix}</span>;
}

export function Stats() {
  return (
    <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-3xl border border-fg/10 bg-fg/10 md:grid-cols-5">
      {stats.map((s) => (
        <div key={s.label} className="bg-bg/80 px-6 py-8 text-center backdrop-blur">
          <dd className="h-display text-4xl text-juice md:text-5xl"><Count to={s.value} suffix={s.suffix} /></dd>
          <dt className="mt-2 text-sm text-muted">{s.label}</dt>
        </div>
      ))}
    </dl>
  );
}
