import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Form } from "@/components/Form";
import { EventCard, PageHero, SectionHead } from "@/components/blocks";
import { JsonLd, eventLd } from "@/components/JsonLd";
import { Card } from "@/components/ui/card";
import { cities, getCity } from "@/content/cities";
import { events, isPast } from "@/content/events";
import { site } from "@/content/site";

export const dynamicParams = false;
export const generateStaticParams = () => cities.map((c) => ({ city: c.slug }));

export async function generateMetadata({ params }: { params: Promise<{ city: string }> }): Promise<Metadata> {
  const c = getCity((await params).city);
  if (!c) return {};
  return {
    title: `AI meetups & hackathons in ${c.name}`,
    description: `Join the Juicer ${c.name} chapter: AI meetups, hackathons, workshops and a community of builders in ${c.name}, ${c.state}.`,
    alternates: { canonical: `/chapters/${c.slug}` },
    openGraph: { title: `Juicer ${c.name}: AI meetups & hackathons`, url: `${site.url}/chapters/${c.slug}` },
  };
}

export default async function Chapter({ params }: { params: Promise<{ city: string }> }) {
  const c = getCity((await params).city);
  if (!c) notFound();
  const live = c.status === "live";
  const mine = events.filter((e) => e.city === c.slug);
  const upcoming = mine.filter((e) => !isPast(e)).sort((a, b) => +new Date(a.date) - +new Date(b.date));
  const past = mine.filter(isPast);

  return (
    <>
      {upcoming.map((e) => <JsonLd key={e.slug} data={eventLd(e)} />)}
      <PageHero eyebrow={live ? "Chapter · Community live" : "Software office"} title={live ? "Juicer" : "Juicer software in"} accent={c.name}>
        {c.blurb} {live ? "Meetups, hackathons and workshops, run by locals." : "There is no community chapter here yet, so you could be the person who starts it."}
      </PageHero>

      <section className="pb-20">
        <div className="container grid gap-10 lg:grid-cols-3">
          <div className="lg:col-span-2">
            {live ? (
              <>
                <h2 className="font-display text-2xl font-semibold">Upcoming events</h2>
                {upcoming.length ? <div className="mt-6 grid gap-6 sm:grid-cols-2">{upcoming.map((e) => <EventCard key={e.slug} event={e} />)}</div> : <p className="mt-4 text-muted">The next event is being planned. Join the chapter to hear first.</p>}
                {past.length > 0 && (<><h2 className="mt-14 font-display text-2xl font-semibold">Past events</h2><div className="mt-6 grid gap-6 sm:grid-cols-2">{past.map((e) => <EventCard key={e.slug} event={e} />)}</div></>)}
                <h2 className="mt-14 font-display text-2xl font-semibold">Gallery</h2>
                <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4" aria-label="Gallery placeholders: add event photos in /public/gallery">
                  {Array.from({ length: 8 }, (_, i) => <div key={i} className={`aspect-square rounded-xl ${i % 3 === 0 ? "bg-juice" : i % 3 === 1 ? "bg-volt-grad" : "bg-fg/10"} opacity-80`} />)}
                </div>
                <p className="mt-2 text-xs text-muted">Event photos appear here. See the content guide for adding images.</p>
              </>
            ) : (
              <Card>
                <h2 className="font-display text-2xl font-semibold">What a chapter gives {c.name}</h2>
                <ul className="mt-4 list-disc space-y-2 pl-5 text-muted">
                  <li>A monthly meetup for local builders, with demos and talks</li>
                  <li>Hackathons and campus programs run with Juicer's playbook</li>
                  <li>Access to Juicer's growth and swag services for your events</li>
                  <li>A path into the Juicer Tech lab, including Physical AI hubs</li>
                </ul>
              </Card>
            )}
            <div className="mt-10 flex flex-wrap gap-2">{c.focus.map((f) => <span key={f} className="rounded-full border border-fg/15 px-3 py-1 text-sm text-muted">{f}</span>)}</div>
          </div>
          <aside className="space-y-6">
            {live && c.lead && (
              <Card><p className="eyebrow">Chapter lead</p><p className="mt-2 font-display text-xl font-semibold">{c.lead.name}</p><p className="text-sm text-muted">{c.lead.role}. Replace with real name, photo and links in content/cities.ts.</p></Card>
            )}
            <Form type={live ? "chapter" : "bring-juicer"} context={{ city: c.name }} title={live ? `Join ${c.name}` : `Bring Juicer to ${c.name}`} />
          </aside>
        </div>
      </section>

      <section className="section border-t border-fg/10 bg-surface/40">
        <div className="container grid gap-10 lg:grid-cols-2">
          <SectionHead title={`Lead the ${c.name} chapter`} eyebrow="Chapter leads">Each chapter has a city lead who plans events, welcomes members and represents Juicer locally. Apply and we'll set up a call.</SectionHead>
          <Form type="chapter-lead" context={{ city: c.name }} />
        </div>
      </section>
    </>
  );
}
