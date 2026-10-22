"use client";
import Link from "next/link";
import { useState } from "react";
import { cities } from "@/content/cities";
import { cn } from "@/lib/utils";

// Schematic India outline as [lon, lat] points. Illustrative, not survey-accurate.
const outline: [number, number][] = [
  [74.3, 36.9], [77.8, 35.5], [79.0, 34.3], [78.9, 32.5], [80.2, 30.8], [81.0, 30.2], [80.1, 28.8], [84.0, 27.4], [88.1, 26.6],
  [89.8, 26.7], [92.0, 26.9], [95.5, 29.2], [97.3, 28.2], [95.5, 26.5], [94.5, 24.2], [93.2, 22.2], [92.4, 23.4], [91.6, 24.2],
  [91.0, 25.2], [89.8, 25.3], [89.0, 26.2], [88.6, 24.6], [88.7, 22.3], [87.0, 21.5], [86.5, 20.2], [85.0, 19.3], [84.0, 18.2],
  [82.3, 16.6], [80.3, 15.7], [80.2, 13.4], [79.9, 11.5], [79.8, 10.3], [78.9, 9.2], [77.55, 8.1], [76.5, 9.0], [75.9, 11.0],
  [74.8, 12.8], [74.0, 15.0], [73.2, 17.5], [72.8, 19.0], [72.7, 21.0], [72.0, 21.2], [70.2, 20.8], [69.0, 22.3], [70.0, 22.9],
  [68.2, 23.6], [68.9, 24.3], [70.0, 24.2], [70.6, 25.6], [70.0, 27.0], [71.0, 28.0], [72.5, 29.2], [74.0, 30.0], [74.5, 31.0],
  [75.2, 32.4], [74.2, 33.4],
];
const K = 17, X0 = 67, Y0 = 38.2;
const proj = (lon: number, lat: number) => [(lon - X0) * K * 0.93 + 10, (Y0 - lat) * K + 10] as const;
const W = (98 - X0) * K * 0.93 + 20, H = (Y0 - 7.5) * K + 20;
const path = outline.map(([lo, la], i) => `${i ? "L" : "M"}${proj(lo, la).map((n) => n.toFixed(1)).join(" ")}`).join(" ") + "Z";

export function IndiaMap({ className }: { className?: string }) {
  const [active, setActive] = useState<string | null>(null);
  const hovered = cities.find((c) => c.slug === active);

  return (
    <div className={cn("relative mx-auto w-full max-w-md", className)}>
      <svg viewBox={`0 0 ${W} ${H}`} role="group" aria-label="Map of India with Juicer chapter locations" className="h-auto w-full">
        <defs>
          <pattern id="dots" width="9" height="9" patternUnits="userSpaceOnUse"><circle cx="1.5" cy="1.5" r="1.1" fill="rgb(var(--fg) / 0.22)" /></pattern>
        </defs>
        <path d={path} fill="url(#dots)" stroke="rgb(var(--fg) / 0.35)" strokeWidth="1.2" strokeLinejoin="round" />
        {cities.map((c) => {
          const [x, y] = proj(c.lon, c.lat);
          const live = c.status === "live";
          const left = ["salem", "karur", "trichy", "mumbai", "pune", "bengaluru"].includes(c.slug) ? -1 : 1;
          return (
            <Link key={c.slug} href={`/chapters/${c.slug}`} aria-label={`${c.name}, ${live ? "community live" : "software office"}`}
              onMouseEnter={() => setActive(c.slug)} onMouseLeave={() => setActive(null)} onFocus={() => setActive(c.slug)} onBlur={() => setActive(null)}>
              <g className="cursor-pointer">
                {live && <circle cx={x} cy={y} r="6" fill="rgb(var(--lime))" opacity=".4" className="origin-center animate-pulseRing" style={{ transformBox: "fill-box" }} />}
                <circle cx={x} cy={y} r={active === c.slug ? 8 : 5.5} fill={live ? "rgb(var(--lime))" : "rgb(var(--volt))"} stroke="rgb(var(--bg))" strokeWidth="2" style={{ transition: "r .2s" }} />
                <text x={x + left * 11} y={y + 4} textAnchor={left < 0 ? "end" : "start"} fontSize="11" fontWeight="600" fill="rgb(var(--fg))" style={{ paintOrder: "stroke", stroke: "rgb(var(--bg))", strokeWidth: 3 }}>{c.name}</text>
              </g>
            </Link>
          );
        })}
      </svg>
      <div className="mt-2 flex justify-center gap-5 text-xs text-muted" aria-hidden>
        <span className="flex items-center gap-2"><i className="h-2.5 w-2.5 rounded-full bg-lime" /> Community live</span>
        <span className="flex items-center gap-2"><i className="h-2.5 w-2.5 rounded-full bg-volt" /> Software office</span>
      </div>
      <p className="sr-only" aria-live="polite">{hovered ? `${hovered.name}: ${hovered.status === "live" ? "community live" : "software office"}` : ""}</p>
    </div>
  );
}
