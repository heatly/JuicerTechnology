import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CalendarDays, MapPin, Trophy } from "lucide-react";
import { Form } from "@/components/Form";
import { PageHero } from "@/components/blocks";
import { JsonLd, eventLd } from "@/components/JsonLd";
import { Card } from "@/components/ui/card";
import { getCity } from "@/content/cities";
import { events, getEvent, isPast, typeLabel } from "@/content/events";
import { formatDate } from "@/lib/utils";

export const dynamicParams = false;
export const generateStaticParams = () => events.map((e) => ({ slug: e.slug }));

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const e = getEvent((await params).slug);
  if (!e) return {};
  return { title: `${e.title} · ${getCity(e.city)?.name}`, description: e.summary, alternates: { canonical: `/events/${e.slug}` } };
}

export default async function EventPage({ params }: { params: Promise<{ slug: string }> }) {
  const e = getEvent((await params).slug);
  if (!e) notFound();
  const city = getCity(e.city);
  const past = isPast(e);
  const hack = e.type === "hackathon";

  return (
    <>
      <JsonLd data={eventLd(e)} />
      <PageHero eyebrow={`${typeLabel[e.type]}${past ? " · Past" : ""}`} title={e.title}>{e.summary}</PageHero>
      <section className="pb-24">
        <div className="container grid gap-10 lg:grid-cols-3">
          <div className="space-y-8 lg:col-span-2">
            <div className="flex flex-wrap gap-6 text-sm">
              <p className="flex items-center gap-2"><CalendarDays className="h-4 w-4 text-accent" aria-hidden />{formatDate(e.date, { weekday: "short", day: "numeric", month: "long", year: "numeric", hour: "numeric", minute: "2-digit" })}</p>
              <p className="flex items-center gap-2"><MapPin className="h-4 w-4 text-accent" aria-hidden />{e.venue}</p>
            </div>
            <p className="text-lg leading-relaxed text-muted">{e.description}</p>
            {e.tracks && <Card><h2 className="font-display text-xl font-semibold">Tracks</h2><ul className="mt-3 grid gap-2 sm:grid-cols-2">{e.tracks.map((t) => <li key={t} className="rounded-lg bg-fg/5 px-4 py-2 text-sm">{t}</li>)}</ul></Card>}
            {e.prizes && <Card><h2 className="flex items-center gap-2 font-display text-xl font-semibold"><Trophy className="h-5 w-5 text-orange" aria-hidden />Prizes</h2><ul className="mt-3 list-disc space-y-1 pl-5 text-muted">{e.prizes.map((t) => <li key={t}>{t}</li>)}</ul></Card>}
            {e.winners && <Card><h2 className="font-display text-xl font-semibold">Past winners</h2><ul className="mt-3 list-disc space-y-1 pl-5 text-muted">{e.winners.map((t) => <li key={t}>{t}</li>)}</ul></Card>}
            <p className="text-sm text-muted">City: <Link href={`/chapters/${e.city}`} className="text-accent underline">{city?.name} chapter</Link></p>
          </div>
          <aside>
            {past ? <Card><p className="font-display text-lg font-semibold">This event has ended.</p><Link href="/events" className="mt-2 inline-block text-accent underline">See upcoming events</Link></Card>
              : hack ? <Form type="hackathon" trackOptions={e.tracks} context={{ event: e.slug, eventTitle: e.title }} />
              : <Form type="rsvp" context={{ event: e.slug, eventTitle: e.title }} />}
          </aside>
        </div>
      </section>
    </>
  );
}
