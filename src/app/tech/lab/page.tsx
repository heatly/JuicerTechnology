import type { Metadata } from "next";
import { Github } from "lucide-react";
import { PageHero, SectionHead } from "@/components/blocks";
import { Form } from "@/components/Form";
import { ButtonLink } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { notes, roadmap } from "@/content/tech";
import { site } from "@/content/site";
import { formatDate } from "@/lib/utils";

export const metadata: Metadata = { title: "Innovation Lab: roadmap, research & pilots", description: "Juicer's R&D roadmap, research notes and open source. Work with us or pilot a project.", alternates: { canonical: "/tech/lab" } };

export default function Lab() {
  return (
    <>
      <PageHero variant="volt" eyebrow="Tech · Innovation Lab" title="Research in the open," accent="pilots in the real world." actions={<><ButtonLink variant="volt" href="#pilot">Pilot a project</ButtonLink><ButtonLink variant="outline" href={site.social.github}><Github className="h-4 w-4" aria-hidden /> GitHub</ButtonLink></>}>
        The lab turns ideas into prototypes and prototypes into pilots. We publish what we learn.
      </PageHero>
      <section className="pb-20">
        <div className="container">
          <SectionHead eyebrow="R&D roadmap" title="Now, next, later." />
          <div className="grid gap-6 md:grid-cols-3">{roadmap.map((r) => <Card key={r.phase}><p className="font-display text-3xl text-volt">{r.phase}</p><ul className="mt-4 space-y-2 text-sm text-muted">{r.items.map((i) => <li key={i}>→ {i}</li>)}</ul></Card>)}</div>
        </div>
      </section>
      <section className="section border-t border-fg/10 bg-surface/40">
        <div className="container">
          <SectionHead eyebrow="Research notes" title="What we're learning." />
          <div className="grid gap-6 md:grid-cols-2">{notes.map((n) => <Card key={n.title}><p className="text-xs text-muted">{formatDate(n.date)}</p><h3 className="mt-1 font-display text-xl font-semibold">{n.title}</h3><p className="mt-2 text-muted">{n.summary}</p></Card>)}</div>
        </div>
      </section>
      <section className="section">
        <div className="container grid gap-8 lg:grid-cols-2">
          <div id="work" className="scroll-mt-28"><SectionHead eyebrow="Work with us" title="Join the lab." /><Form type="work" /></div>
          <div id="pilot" className="scroll-mt-28"><SectionHead eyebrow="Pilot a project" title="Test it with us." /><Form type="pilot" /></div>
        </div>
      </section>
    </>
  );
}
