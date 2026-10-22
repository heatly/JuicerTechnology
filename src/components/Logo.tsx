import { cn } from "@/lib/utils";

/**
 * Juicer mark, redrawn as vector from the supplied logo: an orange with a leaf and a half-slice window.
 * `animated` sways the leaf and draws the slice segments in (used in header and hero).
 */
export function LogoMark({ className, animated }: { className?: string; animated?: boolean }) {
  return (
    <svg viewBox="0 0 100 112" className={cn("h-10 w-auto", className)} aria-hidden>
      <defs>
        <linearGradient id="orangeG" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#FF9A1F" />
          <stop offset="1" stopColor="#F07F0A" />
        </linearGradient>
      </defs>
      {/* leaf */}
      <g className={animated ? "origin-[50px_30px] animate-sway" : ""}>
        <path d="M52 28 C52 10 66 2 88 4 C88 22 76 34 52 28Z" fill="#2E8B3A" />
        <path d="M54 27 C64 20 72 14 82 9" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" fill="none" />
      </g>
      {/* fruit */}
      <circle cx="50" cy="68" r="40" fill="url(#orangeG)" />
      {/* half slice */}
      <g fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 66 A30 30 0 0 1 80 66 Z" />
        <path d="M26 64 A24 24 0 0 1 74 64" strokeWidth="2" />
        {[40, 70, 110, 140].map((a, i) => {
          const r = (a * Math.PI) / 180;
          return (
            <line key={a} x1="50" y1="64" x2={50 + 24 * Math.cos(r)} y2={64 - 24 * Math.sin(r)} strokeWidth="2.4" className={animated ? "animate-draw" : ""} style={animated ? { strokeDasharray: 30, animationDelay: `${0.2 + i * 0.12}s` } : undefined} />
          );
        })}
      </g>
    </svg>
  );
}

type Props = { className?: string; variant?: "horizontal" | "stacked" | "mark"; animated?: boolean };

/** Wordmark colours follow the theme: navy in light mode, white in dark mode. */
export function Logo({ className, variant = "horizontal", animated }: Props) {
  if (variant === "mark") return <LogoMark className={className} animated={animated} />;
  if (variant === "stacked")
    return (
      <span className={cn("inline-flex flex-col items-center text-center", className)}>
        <LogoMark className="h-24" animated={animated} />
        <span className="mt-2 font-display text-4xl font-bold leading-none tracking-tight">Juicer</span>
        <span className="font-display text-xl font-medium tracking-tight">Technology</span>
      </span>
    );
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <LogoMark className="h-10" animated={animated} />
      <span className="flex flex-col leading-none">
        <span className="font-display text-xl font-bold tracking-tight">Juicer</span>
        <span className="font-display text-[0.8rem] font-medium tracking-tight text-muted">Technology</span>
      </span>
    </span>
  );
}
