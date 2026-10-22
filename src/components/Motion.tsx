"use client";
import { useRef } from "react";
import { motion, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";
import { LogoMark } from "./Logo";
import { cn } from "@/lib/utils";

/** Thin gradient progress bar pinned to the top of the viewport. */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const x = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });
  return <motion.div aria-hidden style={{ scaleX: x }} className="fixed inset-x-0 top-0 z-[60] h-[3px] origin-left bg-juice" />;
}

/** Decorative drifting orange slices and leaves with scroll parallax. */
export function FloatingSlices({ className }: { className?: string }) {
  const reduce = useReducedMotion();
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 800], [0, -120]);
  const y2 = useTransform(scrollY, [0, 800], [0, 160]);
  const items = [
    { cls: "right-[6%] top-[18%] h-24 md:h-40", y: y1, d: "0s", r: 12 },
    { cls: "right-[22%] top-[58%] h-12 md:h-20 opacity-70", y: y2, d: "1.2s", r: -20 },
  ];
  return (
    <div aria-hidden className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}>
      {items.map((it, i) => (
        <motion.div key={i} style={reduce ? undefined : { y: it.y }} className={cn("absolute", it.cls)}>
          <div className="animate-float h-full" style={{ animationDelay: it.d, transform: `rotate(${it.r}deg)` }}>
            <LogoMark className="h-full drop-shadow-[0_10px_40px_rgba(245,138,18,0.45)]" />
          </div>
        </motion.div>
      ))}
    </div>
  );
}

/** Card that tilts toward the pointer and shows a soft spotlight. */
export function Tilt({ children, className }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const rx = useMotionValue(0), ry = useMotionValue(0);
  const sx = useSpring(rx, { stiffness: 200, damping: 20 }), sy = useSpring(ry, { stiffness: 200, damping: 20 });
  function move(e: React.PointerEvent) {
    if (reduce || e.pointerType === "touch") return;
    const r = ref.current!.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5, py = (e.clientY - r.top) / r.height - 0.5;
    ry.set(px * 8); rx.set(-py * 8);
    ref.current!.style.setProperty("--mx", `${(px + 0.5) * 100}%`);
    ref.current!.style.setProperty("--my", `${(py + 0.5) * 100}%`);
  }
  return (
    <motion.div ref={ref} onPointerMove={move} onPointerLeave={() => { rx.set(0); ry.set(0); }} style={{ rotateX: sx, rotateY: sy, transformPerspective: 900 }} className={cn("relative", className)}>
      {children}
      <span aria-hidden className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-300 [background:radial-gradient(400px_circle_at_var(--mx,50%)_var(--my,50%),rgb(255_255_255/0.12),transparent_60%)] group-hover:opacity-100" />
    </motion.div>
  );
}

/** Words rise in one by one. */
export function SplitHeading({ lines, className }: { lines: { text: string; accent?: boolean }[]; className?: string }) {
  const reduce = useReducedMotion();
  let n = 0;
  return (
    <h1 className={className}>
      {lines.map((l, li) => (
        <span key={li} className="block">
          {l.text.split(" ").map((w, i) => (
            <span key={i} className="inline-block overflow-hidden pb-[0.12em] align-bottom">
              <motion.span className={cn("inline-block", l.accent && "text-juice")} initial={reduce ? false : { y: "110%" }} animate={{ y: 0 }} transition={{ duration: 0.7, delay: 0.1 + 0.07 * n++, ease: [0.22, 1, 0.36, 1] }}>
                {w}&nbsp;
              </motion.span>
            </span>
          ))}
        </span>
      ))}
    </h1>
  );
}
