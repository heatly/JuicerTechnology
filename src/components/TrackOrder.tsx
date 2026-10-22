"use client";
import { useState } from "react";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const steps = ["Quote approved", "Design proof", "In production", "Quality check", "Shipped", "Delivered"];

export function TrackOrder() {
  const [id, setId] = useState("");
  const [res, setRes] = useState<{ status: string; updated?: string; note?: string } | null>(null);
  const [err, setErr] = useState("");
  const [busy, setBusy] = useState(false);

  async function go(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true); setErr(""); setRes(null);
    try {
      const r = await fetch(`/api/track?id=${encodeURIComponent(id)}`);
      const j = await r.json();
      if (!r.ok) throw new Error(j.error);
      setRes(j);
    } catch (x) { setErr(x instanceof Error ? x.message : "Something went wrong"); }
    setBusy(false);
  }
  const idx = res ? steps.findIndex((s) => s.toLowerCase() === res.status.toLowerCase()) : -1;

  return (
    <div className="glass rounded-2xl p-6 md:p-8">
      <h3 className="font-display text-xl font-semibold">Track your order</h3>
      <form onSubmit={go} className="mt-4 flex gap-3">
        <label className="sr-only" htmlFor="oid">Order ID</label>
        <input id="oid" value={id} onChange={(e) => setId(e.target.value)} required placeholder="Order ID, e.g. JCR-1042" className="min-w-0 flex-1 rounded-xl border border-fg/20 bg-fg/5 px-4 py-3 text-sm focus:border-lime focus:outline-none focus:ring-2 focus:ring-lime/40" />
        <Button type="submit" disabled={busy}>{busy ? "Checking…" : "Track"}</Button>
      </form>
      {err && <p role="alert" className="mt-4 text-sm text-orange">{err}</p>}
      {res && (
        <ol className="mt-6 grid gap-3 sm:grid-cols-6" aria-label="Order progress">
          {steps.map((s, i) => (
            <li key={s} className={cn("flex items-center gap-2 text-xs sm:flex-col sm:text-center", i <= idx ? "text-fg" : "text-muted")}>
              <span className={cn("grid h-8 w-8 place-items-center rounded-full border", i <= idx ? "border-lime bg-lime text-black" : "border-fg/30")}>{i <= idx ? <Check className="h-4 w-4" aria-hidden /> : i + 1}</span>
              {s}
            </li>
          ))}
        </ol>
      )}
      {res?.note && <p className="mt-4 text-sm text-muted">{res.note}</p>}
    </div>
  );
}
