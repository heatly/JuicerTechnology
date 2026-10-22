"use client";
import { useId, useState } from "react";
import { CheckCircle2, Loader2 } from "lucide-react";
import { forms, type Field } from "@/lib/forms";
import { Button } from "@/components/ui/button";
import { track } from "@/components/Analytics";
import { cn } from "@/lib/utils";

const input =
  "w-full rounded-xl border border-fg/20 bg-fg/5 px-4 py-3 text-sm text-fg placeholder:text-muted/70 focus:border-lime focus:outline-none focus:ring-2 focus:ring-lime/40";

export function Form({
  type,
  context = {},
  trackOptions,
  title,
  className,
}: {
  type: keyof typeof forms;
  /** Extra data sent with the form, e.g. { event: "slug", city: "chennai" } */
  context?: Record<string, string>;
  /** Overrides the options of the "track" field (hackathons) */
  trackOptions?: string[];
  title?: string;
  className?: string;
}) {
  const def = forms[type];
  const uid = useId();
  const [state, setState] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [error, setError] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setState("sending");
    setError("");
    const fd = new FormData(e.currentTarget);
    const data: Record<string, string> = { ...context };
    fd.forEach((v, k) => (data[k] = String(v)));
    let utm = {};
    try { utm = JSON.parse(sessionStorage.getItem("juicer_utm") || "{}"); } catch {}
    try {
      const res = await fetch("/api/forms", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type, data, utm, page: location.pathname }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Something went wrong");
      track("generate_lead", { form: type });
      setState("done");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
      setState("error");
    }
  }

  if (state === "done")
    return (
      <div role="status" className={cn("glass rounded-2xl p-8 text-center", className)}>
        <CheckCircle2 className="mx-auto mb-3 h-10 w-10 text-accent" aria-hidden />
        <p className="font-display text-xl font-semibold">{def.success}</p>
      </div>
    );

  const fields: Field[] = def.fields.map((f) => (f.name === "track" && trackOptions ? { ...f, options: trackOptions } : f));

  return (
    <form onSubmit={onSubmit} className={cn("glass rounded-2xl p-6 md:p-8 space-y-4", className)} noValidate={false}>
      <h3 className="font-display text-xl font-semibold">{title ?? def.title}</h3>
      {/* honeypot */}
      <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />
      {fields.map((f) => {
        const id = `${uid}-${f.name}`;
        if (f.type === "checkbox")
          return (
            <label key={f.name} htmlFor={id} className="flex items-start gap-3 text-sm text-muted">
              <input id={id} name={f.name} type="checkbox" required={f.required} className="mt-1 h-4 w-4 accent-[rgb(var(--lime))]" />
              <span>{f.label}</span>
            </label>
          );
        return (
          <div key={f.name}>
            <label htmlFor={id} className="mb-1.5 block text-sm font-medium">
              {f.label}
              {f.required && <span className="text-orange" aria-hidden> *</span>}
            </label>
            {f.type === "textarea" ? (
              <textarea id={id} name={f.name} rows={4} required={f.required} placeholder={f.placeholder} className={input} />
            ) : f.type === "select" ? (
              <select id={id} name={f.name} required={f.required} defaultValue="" className={cn(input, "appearance-none")}>
                <option value="" disabled>Select…</option>
                {f.options?.map((o) => <option key={o} value={o} className="text-black">{o}</option>)}
              </select>
            ) : (
              <input id={id} name={f.name} type={f.type ?? "text"} required={f.required} placeholder={f.placeholder} min={f.type === "number" ? 1 : undefined} className={input} />
            )}
            {f.hint && <p className="mt-1 text-xs text-muted">{f.hint}</p>}
          </div>
        );
      })}
      {state === "error" && <p role="alert" className="text-sm text-orange">{error}</p>}
      <Button type="submit" size="lg" className="w-full" disabled={state === "sending"}>
        {state === "sending" ? <><Loader2 className="h-4 w-4 animate-spin" aria-hidden /> Sending…</> : def.submit}
      </Button>
    </form>
  );
}
