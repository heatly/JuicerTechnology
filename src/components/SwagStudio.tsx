"use client";
import { useEffect, useState } from "react";
import { Upload } from "lucide-react";

const colors = [
  { name: "Charcoal", hex: "#1a1d27" },
  { name: "White", hex: "#f4f6fa" },
  { name: "Lime", hex: "#c6ff3d" },
  { name: "Orange", hex: "#ff7a1a" },
];

/** Client-side mockup preview. The design never leaves the browser; share a link in the quote form for production. */
export function SwagStudio() {
  const [img, setImg] = useState<string | null>(null);
  const [color, setColor] = useState(colors[0].hex);

  useEffect(() => () => { if (img) URL.revokeObjectURL(img); }, [img]);

  return (
    <div className="glass rounded-2xl p-6 md:p-8">
      <h3 className="font-display text-xl font-semibold">Mockup preview</h3>
      <p className="mt-1 text-sm text-muted">Drop in your logo or artwork to see it on a T-shirt. Preview only; nothing is uploaded.</p>
      <div className="mt-6 grid items-center gap-6 sm:grid-cols-2">
        <svg viewBox="0 0 300 300" className="mx-auto w-full max-w-xs" role="img" aria-label="T-shirt mockup with your design">
          <path d="M100 30 L40 60 L10 120 L55 140 L70 115 L70 270 L230 270 L230 115 L245 140 L290 120 L260 60 L200 30 Q150 70 100 30Z" fill={color} stroke="rgb(128 128 128 / .5)" strokeWidth="2" />
          {img && <image href={img} x="105" y="95" width="90" height="90" preserveAspectRatio="xMidYMid meet" />}
          {!img && <text x="150" y="150" textAnchor="middle" fontSize="12" fill="rgb(128 128 128)">Your design here</text>}
        </svg>
        <div className="space-y-5">
          <label className="flex cursor-pointer items-center justify-center gap-2 rounded-xl border border-dashed border-fg/30 px-4 py-6 text-sm hover:border-lime focus-within:outline focus-within:outline-2">
            <Upload className="h-4 w-4" aria-hidden /> Choose PNG, JPG or SVG
            <input type="file" accept="image/png,image/jpeg,image/svg+xml" className="sr-only" onChange={(e) => { const f = e.target.files?.[0]; if (f) setImg(URL.createObjectURL(f)); }} />
          </label>
          <fieldset>
            <legend className="mb-2 text-sm font-medium">Garment colour</legend>
            <div className="flex gap-3">
              {colors.map((c) => (
                <label key={c.hex} className="cursor-pointer">
                  <input type="radio" name="garment" className="peer sr-only" checked={color === c.hex} onChange={() => setColor(c.hex)} />
                  <span className="block h-9 w-9 rounded-full border-2 border-transparent ring-1 ring-fg/30 peer-checked:ring-2 peer-checked:ring-lime peer-focus-visible:outline peer-focus-visible:outline-2" style={{ background: c.hex }} title={c.name} />
                  <span className="sr-only">{c.name}</span>
                </label>
              ))}
            </div>
          </fieldset>
        </div>
      </div>
    </div>
  );
}
