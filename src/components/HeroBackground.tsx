"use client";
import { useEffect, useRef } from "react";

/** Lightweight canvas neural mesh. Pauses off-screen, honours reduced motion, no dependencies. */
export function HeroBackground({ variant = "juice", density = 1 }: { variant?: "juice" | "volt"; density?: number }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current!;
    const ctx = canvas.getContext("2d")!;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let w = 0, h = 0, raf = 0, visible = true;
    const mouse = { x: -999, y: -999 };
    type P = { x: number; y: number; vx: number; vy: number; hue: number };
    let pts: P[] = [];

    const colors = variant === "juice" ? ["198,255,61", "255,122,26"] : ["198,255,61", "61,224,255"];

    function resize() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = canvas.clientWidth; h = canvas.clientHeight;
      canvas.width = w * dpr; canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const n = Math.round(Math.min(90, (w * h) / 16000) * density);
      pts = Array.from({ length: n }, () => ({ x: Math.random() * w, y: Math.random() * h, vx: (Math.random() - 0.5) * 0.35, vy: (Math.random() - 0.5) * 0.35, hue: Math.random() > 0.5 ? 1 : 0 }));
    }

    function frame() {
      ctx.clearRect(0, 0, w, h);
      for (const p of pts) {
        if (!reduce) { p.x += p.vx; p.y += p.vy; }
        if (p.x < 0 || p.x > w) p.vx *= -1;
        if (p.y < 0 || p.y > h) p.vy *= -1;
      }
      const max = 130;
      for (let i = 0; i < pts.length; i++) {
        const a = pts[i];
        for (let j = i + 1; j < pts.length; j++) {
          const b = pts[j];
          const d = Math.hypot(a.x - b.x, a.y - b.y);
          if (d < max) {
            ctx.strokeStyle = `rgba(${colors[a.hue]},${(1 - d / max) * 0.32})`;
            ctx.lineWidth = 1;
            ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();
          }
        }
        const md = Math.hypot(a.x - mouse.x, a.y - mouse.y);
        if (md < 160) {
          ctx.strokeStyle = `rgba(${colors[a.hue]},${(1 - md / 160) * 0.7})`;
          ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(mouse.x, mouse.y); ctx.stroke();
        }
        ctx.fillStyle = `rgba(${colors[a.hue]},0.9)`;
        ctx.beginPath(); ctx.arc(a.x, a.y, 1.8, 0, 6.283); ctx.fill();
      }
      if (visible && !reduce) raf = requestAnimationFrame(frame);
    }

    const onMove = (e: PointerEvent) => { const r = canvas.getBoundingClientRect(); mouse.x = e.clientX - r.left; mouse.y = e.clientY - r.top; };
    const io = new IntersectionObserver(([en]) => { visible = en.isIntersecting; if (visible) { cancelAnimationFrame(raf); frame(); } });
    io.observe(canvas);
    resize(); frame();
    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => { cancelAnimationFrame(raf); io.disconnect(); window.removeEventListener("resize", resize); window.removeEventListener("pointermove", onMove); };
  }, [variant, density]);

  return <canvas ref={ref} aria-hidden className="absolute inset-0 h-full w-full" />;
}
