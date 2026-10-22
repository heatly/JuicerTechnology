"use client";
import { useEffect, useRef } from "react";

/**
 * Lazy-loaded 3D visual (pure canvas, no 3D library): a rotating point-cloud "room" with a
 * first-person viewfinder, to evoke egocentric capture. Decorative only.
 */
export default function PhysicalScene() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current!;
    const ctx = canvas.getContext("2d")!;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let w = 0, h = 0, raf = 0, t = 0, visible = true;

    // Point cloud: room floor grid, a table, and a hand-like arc of points.
    const pts: [number, number, number, number][] = [];
    for (let x = -5; x <= 5; x++) for (let z = -5; z <= 5; z++) pts.push([x * 0.5, 1, z * 0.5, 0]);
    for (let i = 0; i < 160; i++) { const a = (i / 160) * 6.283; pts.push([Math.cos(a) * 1.2, 0.3, Math.sin(a) * 0.8, 1]); }
    for (let i = 0; i < 90; i++) { const a = (i / 90) * 3.1; pts.push([Math.cos(a) * 0.7 + 0.2, 0.3 - Math.sin(a) * 0.9, 0.1 * Math.sin(a * 6), 2]); }
    for (let i = 0; i < 120; i++) pts.push([(Math.random() - 0.5) * 5, -1.6 + Math.random() * 2.6, -2.6, 0]);

    function resize() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = canvas.clientWidth; h = canvas.clientHeight;
      canvas.width = w * dpr; canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function draw() {
      ctx.clearRect(0, 0, w, h);
      const cx = w / 2, cy = h / 2, f = Math.min(w, h) * 0.55;
      const ca = Math.cos(t), sa = Math.sin(t);
      const cols = ["rgba(61,224,255,", "rgba(198,255,61,", "rgba(255,122,26,"];
      for (const [x, y, z, k] of pts) {
        const rx = x * ca - z * sa, rz = x * sa + z * ca + 4.2;
        const s = f / rz;
        const px = cx + rx * s, py = cy + y * s * 0.9;
        const a = Math.max(0.15, Math.min(1, 2.2 / rz));
        ctx.fillStyle = cols[k] + a.toFixed(2) + ")";
        ctx.beginPath(); ctx.arc(px, py, k === 0 ? 1.4 : 2.1, 0, 6.283); ctx.fill();
      }
      // viewfinder
      ctx.strokeStyle = "rgba(198,255,61,0.9)"; ctx.lineWidth = 2;
      const m = 18, l = 26;
      for (const [x, y, dx, dy] of [[m, m, 1, 1], [w - m, m, -1, 1], [m, h - m, 1, -1], [w - m, h - m, -1, -1]] as const) {
        ctx.beginPath(); ctx.moveTo(x, y + dy * l); ctx.lineTo(x, y); ctx.lineTo(x + dx * l, y); ctx.stroke();
      }
      ctx.fillStyle = "rgba(255,122,26,1)";
      if (Math.floor(t * 3) % 2 === 0) { ctx.beginPath(); ctx.arc(m + 8, m + 38, 4, 0, 6.283); ctx.fill(); }
      ctx.fillStyle = "rgba(244,246,250,0.75)"; ctx.font = "11px ui-monospace, monospace";
      ctx.fillText("POV · CONSENTED CAPTURE", m + 18, m + 42);
    }

    function loop() { t += reduce ? 0 : 0.006; draw(); if (visible && !reduce) raf = requestAnimationFrame(loop); }
    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; if (visible) { cancelAnimationFrame(raf); loop(); } });
    io.observe(canvas);
    resize(); loop();
    window.addEventListener("resize", resize);
    return () => { cancelAnimationFrame(raf); io.disconnect(); window.removeEventListener("resize", resize); };
  }, []);

  return <canvas ref={ref} role="img" aria-label="Animated 3D point cloud of a room seen from a first-person camera" className="h-full w-full" />;
}
