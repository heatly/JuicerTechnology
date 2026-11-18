import { NextResponse } from "next/server";
import { forms } from "@/lib/forms";

export const runtime = "nodejs";

const clean = (v: unknown) => String(v ?? "").trim().slice(0, 4000);
// Trim whitespace and stray quotes, a common mistake when pasting values into Vercel.
const env = (k: string) => (process.env[k] ?? "").trim().replace(/^["']|["']$/g, "");

export const dynamic = "force-dynamic";

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

  if (data.phone && !/^[0-9+ ]{10,15}$/.test(data.phone)) return NextResponse.json({ error: "Enter a valid 10 digit phone number" }, { status: 422 });
  if (body.type === "apply") {
    const age = Number(data.age);
    if (!Number.isFinite(age) || age < 18 || age > 65) return NextResponse.json({ error: "You must be 18 or older to apply" }, { status: 422 });
  }

  const record = {
    form: body.type as string,
    submittedAt: new Date().toISOString(),
    page: clean(body.page),
    ...data,
    utm: JSON.stringify(body.utm ?? {}),
  };

  const sheetsUrl = env("GOOGLE_SHEETS_WEBHOOK_URL");
  const resendKey = env("RESEND_API_KEY");
  const mailTo = env("FORMS_TO_EMAIL");

  if (!sheetsUrl && !(resendKey && mailTo)) {
    // Never pretend a submission was saved. Log only the form type, not the applicant's details.
    console.error(`[forms] NOT DELIVERED (${body.type}): set GOOGLE_SHEETS_WEBHOOK_URL (or RESEND_API_KEY + FORMS_TO_EMAIL) and redeploy`);
    const msg = process.env.NODE_ENV === "production"
      ? "Form delivery is not configured yet. Please email us directly."
      : "No form delivery configured. Set GOOGLE_SHEETS_WEBHOOK_URL in .env.local and restart.";
    return NextResponse.json({ error: msg }, { status: 503 });
  }

  const jobs: Promise<boolean>[] = [];
  if (sheetsUrl) jobs.push(toSheet(sheetsUrl, { ...record, token: env("SHEETS_SHARED_SECRET") || undefined }));
  if (resendKey && mailTo) jobs.push(toEmail(resendKey, mailTo, def.title, data, record));

  const results = await Promise.all(jobs);
  if (!results.some(Boolean)) return NextResponse.json({ error: "Could not deliver your submission. Please try again." }, { status: 502 });
  return NextResponse.json({ ok: true });
}

/** Lets you check, in a browser, which deployment you are hitting and whether delivery is configured. No secrets are shown. */
export async function GET() {
  return NextResponse.json({
    sheetsConfigured: Boolean(env("GOOGLE_SHEETS_WEBHOOK_URL")),
    emailConfigured: Boolean(env("RESEND_API_KEY") && env("FORMS_TO_EMAIL")),
    environment: process.env.VERCEL_ENV ?? "local",
    commit: process.env.VERCEL_GIT_COMMIT_SHA?.slice(0, 7) ?? null,
  });
}

// Apps Script answers 200 even when its own code fails, so the JSON body must say ok:true.
async function toSheet(url: string, payload: Record<string, unknown>): Promise<boolean> {
  try {
    const r = await fetch(url, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload), redirect: "follow" });
    const text = await r.text();
    let ok = false;
    try { ok = JSON.parse(text).ok === true; } catch {}
    if (!r.ok || !ok) console.error("[forms] sheet delivery failed", r.status, text.replace(/\s+/g, " ").slice(0, 200));
    return r.ok && ok;
  } catch (e) {
    console.error("[forms] sheet request error", e instanceof Error ? e.message : e);
    return false;
  }
}

async function toEmail(key: string, to: string, title: string, data: Record<string, string>, record: Record<string, unknown>): Promise<boolean> {
  const esc = (s: string) => s.replace(/[&<>]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;" }[c]!));
  const rows = Object.entries(record).map(([k, v]) => `<tr><td><b>${esc(k)}</b></td><td>${esc(String(v))}</td></tr>`).join("");
  try {
    const r = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: env("FORMS_FROM_EMAIL") || "Juicer Forms <onboarding@resend.dev>",
        to: to.split(",").map((x) => x.trim()),
        subject: `[Juicer] ${title}: ${data.name ?? ""}`,
        html: `<table cellpadding="6">${rows}</table>`,
        reply_to: data.email || undefined,
      }),
    });
    if (!r.ok) console.error("[forms] email delivery failed", r.status);
    return r.ok;
  } catch (e) {
    console.error("[forms] email request error", e instanceof Error ? e.message : e);
    return false;
  }
}
