import type { Metadata } from "next";
import { CityCard, Icon, PageHero, SectionHead } from "@/components/blocks";
import { Form } from "@/components/Form";
import { ButtonLink } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { cities } from "@/content/cities";
import { events, isPast } from "@/content/events";

export const metadata: Metadata = { title: "Juicer Community: city chapters, meetups & hackathons", description: "Every city runs its own Juicer chapter with a local lead, meetups, hackathons, workshops, bootcamps and campus programs.", alternates: { canonical: "/marketplace/community" } };

const programs = [
  { icon: "Coffee", t: "Meetups", d: "Monthly or weekly nights with lightning demos, a deep talk and networking. RSVP in one tap." },
  { icon: "Trophy", t: "Hackathons", d: "Themed builds with tracks, prizes, mentors and a demo round. Registration, past winners and galleries live on each event page." },
  { icon: "Wrench", t: "Workshops", d: "Hands-on days on a single skill, from agents to robot control." },
  { icon: "GraduationCap", t: "Bootcamps & campus", d: "Student programs that take an idea to a deployed project in a day." },
  { icon: "Presentation", t: "Demo days", d: "Projects present live to founders, investors and potential customers." },
];

export default function Community() {
  const upcoming = events.filter((e) => !isPast(e));
  return (
    <>
      <PageHero eyebrow="Marketplace · Community" title="One brand." accent="Seven local chapters." actions={<><ButtonLink href="/join#join">Join a chapter</ButtonLink><ButtonLink href="/join#chapter-lead" variant="outline">Become a chapter lead</ButtonLink></>}>
        Each city runs its own chapter with a city lead who plans events, welcomes members and speaks for Juicer locally.
      </PageHero>
      <section className="pb-20">
        <div className="container grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {programs.map((p) => (
            <Card key={p.t}><Icon name={p.icon} className="h-8 w-8 text-accent" /><h2 className="mt-4 font-display text-xl font-semibold">{p.t}</h2><p className="mt-2 text-muted">{p.d}</p></Card>
          ))}
        </div>
      </section>
      <section className="section border-t border-fg/10 bg-surface/40">
        <div className="container">
          <SectionHead eyebrow="Chapters" title="Find yours." />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">{cities.map((c) => <CityCard key={c.slug} city={c} upcoming={upcoming.find((e) => e.city === c.slug)} />)}</div>
        </div>
      </section>
      <section className="section">
        <div className="container grid gap-12 lg:grid-cols-2">
          <div>
            <SectionHead eyebrow="Lead a chapter" title="Run the room in your city.">Chapter leads get Juicer's playbook, event support, promotion and swag at member rates, and a direct line to the Tech lab. Tell us what you've organised and why you want to lead.</SectionHead>
            <ul className="list-disc space-y-2 pl-5 text-muted">
              <li>Apply with the form. We reply to set up a call.</li>
              <li>Run a pilot meetup with our support.</li>
              <li>Open the chapter page, calendar and join form for your city.</li>
            </ul>
          </div>
          <Form type="chapter-lead" />
        </div>
      </section>
    </>
  );
}
