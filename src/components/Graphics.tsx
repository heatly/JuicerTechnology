"use client";
import { motion, useReducedMotion } from "framer-motion";
import { gap, loop, pipeline } from "@/content/data";
import { Icon } from "@/components/blocks";
import { cn } from "@/lib/utils";

/** Log-scale bars: how little first-person work video exists next to text, images and web video. */
export function GapBars() {
  const reduce = useReducedMotion();
  return (
    <figure aria-label="Log-scale comparison of training data volumes">
      <div className="space-y-5">
        {gap.map((g, i) => (
          <div key={g.label}>
            <div className="mb-1.5 flex flex-wrap items-baseline justify-between gap-2 text-sm">
              <span className="text-muted">{g.label}</span>
              <span className={cn("font-display font-semibold", g.tone === "hot" ? "text-orange" : "text-fg")}>{g.value}</span>
            </div>
            <div className="h-4 overflow-hidden rounded-full bg-fg/10">
              <motion.div
                className={cn("h-full rounded-full", g.tone === "hot" ? "bg-juice" : "bg-volt-grad")}
                initial={reduce ? false : { width: 0 }}
                whileInView={{ width: `${(g.exp / 14) * 100}%` }}
                viewport={{ once: true }}
                transition={{ duration: 1.1, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
                style={reduce ? { width: `${(g.exp / 14) * 100}%` } : undefined}
              />
            </div>
          </div>
        ))}
      </div>
      <figcaption className="mt-4 text-xs text-muted">Log scale, rounded. Industry-level approximations from public sources, not Juicer figures.</figcaption>
    </figure>
  );
}

/** Five-step collection pipeline with a travelling pulse between steps. */
export function Pipeline() {
  return (
    <ol className="relative grid gap-4 md:grid-cols-5">
      <div aria-hidden className="absolute left-0 right-0 top-9 hidden h-px bg-fg/15 md:block">
        <div className="h-px w-1/3 animate-flow bg-gradient-to-r from-transparent via-volt to-transparent" />
      </div>
      {pipeline.map((s, i) => (
        <li key={s.t} className="glass relative rounded-2xl p-5">
          <span className="relative z-10 grid h-[4.5rem] w-[4.5rem] place-items-center rounded-2xl bg-bg text-volt ring-1 ring-volt/40">
            <Icon name={s.icon} className="h-8 w-8" />
          </span>
          <p className="mt-4 font-display text-xs font-semibold uppercase tracking-widest text-muted">Step 0{i + 1}</p>
          <h3 className="mt-1 font-display text-lg font-semibold">{s.t}</h3>
          <p className="mt-1 text-sm text-muted">{s.d}</p>
        </li>
      ))}
    </ol>
  );
}

/** Contributor wearing a head rig: field of view cone, tracked hands, labelled sensors. */
export function RigDiagram() {
  return (
    <svg viewBox="0 0 520 340" role="img" aria-label="Diagram of a contributor wearing a head-mounted capture rig recording their hands at work" className="h-auto w-full">
      <defs>
        <linearGradient id="fov" x1="0" x2="1">
          <stop offset="0" stopColor="rgb(61 224 255)" stopOpacity=".5" />
          <stop offset="1" stopColor="rgb(61 224 255)" stopOpacity="0" />
        </linearGradient>
      </defs>
      {/* work surface */}
      <rect x="250" y="250" width="250" height="14" rx="4" fill="rgb(var(--fg) / .2)" />
      <rect x="270" y="264" width="8" height="60" fill="rgb(var(--fg) / .15)" />
      <rect x="470" y="264" width="8" height="60" fill="rgb(var(--fg) / .15)" />
      {/* field of view */}
      <path d="M142 118 L500 40 L500 262 Z" fill="url(#fov)" className="origin-[142px_118px] animate-pulse" />
      <path d="M142 118 L500 40 M142 118 L500 262" stroke="rgb(61 224 255)" strokeOpacity=".7" strokeDasharray="5 5" fill="none" />
      {/* person */}
      <circle cx="105" cy="105" r="38" fill="rgb(var(--fg) / .18)" />
      <path d="M40 330 C45 245 70 205 105 190 C140 205 165 245 170 330 Z" fill="rgb(var(--fg) / .14)" />
      <rect x="138" y="100" width="22" height="26" rx="5" fill="rgb(255 122 26)" />
      <circle cx="154" cy="113" r="5" fill="#0b0d12" />
      {/* hands + task */}
      <g className="animate-float">
        <rect x="330" y="205" width="48" height="45" rx="6" fill="rgb(245 138 18)" opacity=".9" />
        {[[318, 218], [388, 222], [350, 196]].map(([x, y]) => (
          <g key={x}>
            <circle cx={x} cy={y} r="9" fill="none" stroke="rgb(198 255 61)" strokeWidth="2" />
            <circle cx={x} cy={y} r="2.5" fill="rgb(198 255 61)" />
          </g>
        ))}
      </g>
      {/* callouts */}
      {[
        { x: 20, y: 40, t: "RGB + depth camera", tx: 142, ty: 108 },
        { x: 20, y: 70, t: "IMU motion sensor", tx: 120, ty: 70 },
        { x: 330, y: 150, t: "Hands tracked", tx: 350, ty: 190 },
        { x: 20, y: 150, t: "Audio", tx: 80, ty: 120 },
      ].map((c) => (
        <g key={c.t}>
          <line x1={c.x + 6} y1={c.y + 2} x2={c.tx} y2={c.ty} stroke="rgb(var(--fg) / .35)" strokeDasharray="3 3" />
          <text x={c.x} y={c.y} fontSize="12" fontWeight="600" fill="rgb(var(--fg))" style={{ paintOrder: "stroke", stroke: "rgb(var(--bg))", strokeWidth: 4 }}>{c.t}</text>
        </g>
      ))}
    </svg>
  );
}

/** Animated two-link arm reaching for an object. Illustrative, not a product render. */
export function RobotArm() {
  return (
    <svg viewBox="0 0 300 300" role="img" aria-label="Animated illustration of a robot arm reaching for an object" className="h-auto w-full">
      <rect x="20" y="272" width="260" height="8" rx="4" fill="rgb(var(--fg) / .2)" />
      <circle cx="224" cy="262" r="10" fill="rgb(245 138 18)" />
      <path d="M150 262 C190 130 215 150 224 252" fill="none" stroke="rgb(61 224 255)" strokeOpacity=".5" strokeDasharray="4 6" />
      <rect x="120" y="258" width="60" height="16" rx="5" fill="rgb(var(--fg) / .3)" />
      <g className="animate-armA" style={{ transformOrigin: "150px 260px" }}>
        <rect x="141" y="160" width="18" height="102" rx="9" fill="rgb(var(--fg) / .75)" />
        <circle cx="150" cy="168" r="11" fill="rgb(61 224 255)" />
        <g className="animate-armB" style={{ transformOrigin: "150px 168px" }}>
          <rect x="142" y="78" width="16" height="92" rx="8" fill="rgb(var(--fg) / .55)" />
          <circle cx="150" cy="84" r="9" fill="rgb(198 255 61)" />
          <g>
            <rect x="141" y="62" width="4" height="22" rx="2" fill="rgb(var(--fg))" className="animate-grip" />
            <rect x="155" y="62" width="4" height="22" rx="2" fill="rgb(var(--fg))" className="animate-grip [animation-direction:reverse]" />
          </g>
        </g>
      </g>
    </svg>
  );
}

/** Rotating ring showing the human-skill-to-robot loop. */
export function LoopRing() {
  const r = 108, cx = 150, cy = 150;
  return (
    <div className="relative mx-auto aspect-square w-full max-w-sm">
      <svg viewBox="0 0 300 300" className="absolute inset-0 h-full w-full" aria-hidden>
        <circle cx={cx} cy={cy} r={r} fill="none" stroke="rgb(var(--fg) / .15)" />
        <circle cx={cx} cy={cy} r={r} fill="none" stroke="rgb(61 224 255)" strokeWidth="2" strokeDasharray="6 14" className="origin-center animate-[spin_30s_linear_infinite]" />
        {loop.map((_, i) => {
          const a = (i / loop.length) * Math.PI * 2 - Math.PI / 2;
          return (
            <g key={i}>
              <circle cx={cx + r * Math.cos(a)} cy={cy + r * Math.sin(a)} r="16" fill="rgb(var(--bg))" stroke="rgb(198 255 61)" strokeWidth="2" />
              <text x={cx + r * Math.cos(a)} y={cy + r * Math.sin(a) + 5} textAnchor="middle" fontSize="14" fontWeight="700" fill="rgb(var(--fg))">{i + 1}</text>
            </g>
          );
        })}
      </svg>
      <div className="absolute inset-0 grid place-items-center text-center">
        <p className="font-display text-lg font-semibold leading-tight">Human skill<br />to robot skill</p>
      </div>
    </div>
  );
}
