import { NextResponse } from "next/server";
import { forms } from "@/lib/forms";

export const runtime = "nodejs";

const clean = (v: unknown) => String(v ?? "").trim().slice(0, 4000);

export async function POST(req: Request) {
  let body: any;
  try { body = await req.json(); } catch { return NextResponse.json({ error: "Invalid request" }, { status: 400 }); }

  const def = forms[body?.type as string];
  if (!def) return NextResponse.json({ error: "Unknown form" }, { status: 400 });

  const data: Record<string, string> = {};
  for (const [k, v] of Object.entries(body.data ?? {})) data[k] = clean(v);

  // Honeypot: bots fill this field. Pretend success.
  if (data.website) return NextResponse.json({ ok: true });

  for (const f of def.fields) {
    if (f.required && !data[f.name]) return NextResponse.json({ error: `${f.label} is required` }, { status: 422 });
    if (f.type === "email" && data[f.name] && !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(data[f.name]))
      return NextResponse.json({ error: "Enter a valid email address" }, { status: 422 });
  }

  const record = {
    form: body.type as string,
    submittedAt: new Date().toISOString(),
    page: clean(body.page),
    ...data,
    utm: JSON.stringify(body.utm ?? {}),
  };

  const tasks: Promise<Response>[] = [];
  const sheets = process.env.GOOGLE_SHEETS_WEBHOOK_URL;
  if (sheets)
    tasks.push(fetch(sheets, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(record) }));

  const key = process.env.RESEND_API_KEY;
  const to = process.env.FORMS_TO_EMAIL;
  if (key && to) {
    const esc = (s: string) => s.replace(/[&<>]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;" }[c]!));
    const rows = Object.entries(record).map(([k, v]) => `<tr><td><b>${esc(k)}</b></td><td>${esc(String(v))}</td></tr>`).join("");
    tasks.push(
      fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
        body: JSON.stringify({
          from: process.env.FORMS_FROM_EMAIL ?? "Juicer Forms <onboarding@resend.dev>",
          to: to.split(",").map((s) => s.trim()),
          subject: `[Juicer] ${def.title}: ${data.name ?? ""}`,
          html: `<table cellpadding="6">${rows}</table>`,
          reply_to: data.email || undefined,
        }),
      })
    );
  }

  if (!tasks.length) {
    // Not configured: keep working in development, but never silently lose real leads in production.
    console.log("[forms] no delivery configured", record);
    if (process.env.NODE_ENV === "production")
      return NextResponse.json({ error: "Form delivery is not configured yet. Please email us directly." }, { status: 503 });
    return NextResponse.json({ ok: true, dev: true });
  }

  const results = await Promise.allSettled(tasks);
  const okCount = results.filter((r) => r.status === "fulfilled" && (r.value as Response).ok).length;
  if (!okCount) return NextResponse.json({ error: "Could not deliver your submission. Please try again." }, { status: 502 });
  return NextResponse.json({ ok: true });
}
