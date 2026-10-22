import { NextResponse } from "next/server";

// Order tracking lookup. Proxies to a Google Apps Script web app (see docs/DEPLOYMENT.md) that returns { status, updated, note }.
export async function GET(req: Request) {
  const id = new URL(req.url).searchParams.get("id")?.trim().slice(0, 40);
  if (!id) return NextResponse.json({ error: "Enter an order ID" }, { status: 400 });
  const hook = process.env.TRACKING_WEBHOOK_URL;
  if (!hook) return NextResponse.json({ error: "Order tracking is not connected yet. Email us your order ID and we'll update you." }, { status: 503 });
  try {
    const r = await fetch(`${hook}?id=${encodeURIComponent(id)}`, { cache: "no-store" });
    if (!r.ok) throw new Error();
    const json = await r.json();
    if (!json?.status) return NextResponse.json({ error: "Order not found. Check the ID and try again." }, { status: 404 });
    return NextResponse.json(json);
  } catch {
    return NextResponse.json({ error: "Could not look up that order right now." }, { status: 502 });
  }
}
