import type { Metadata } from "next";
import { EventCard, PageHero, SectionHead } from "@/components/blocks";
import { events, isPast } from "@/content/events";

export const metadata: Metadata = { title: "Events: AI meetups, hackathons & workshops", description: "Upcoming and past Juicer meetups, hackathons, workshops, bootcamps and demo days across India.", alternates: { canonical: "/events" } };

export default function Events() {
  const sorted = [...events].sort((a, b) => +new Date(a.date) - +new Date(b.date));
  const upcoming = sorted.filter((e) => !isPast(e));
  const past = sorted.filter(isPast).reverse();
  return (
    <>
      <PageHero eyebrow="Events" title="Show up." accent="Build something.">Meetups every month, hackathons every season, plus workshops, bootcamps and demo days in every live city.</PageHero>
      <section className="pb-20">
        <div className="container">
          <SectionHead title="Upcoming" />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">{upcoming.map((e) => <EventCard key={e.slug} event={e} />)}</div>
        </div>
      </section>
      {past.length > 0 && (
        <section className="section border-t border-fg/10 bg-surface/40">
          <div className="container">
            <SectionHead title="Past events" />
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">{past.map((e) => <EventCard key={e.slug} event={e} />)}</div>
          </div>
        </section>
      )}
    </>
  );
}
