import type { Metadata } from "next";
import { PageHero, SectionHead } from "@/components/blocks";
import { Form } from "@/components/Form";
import { ButtonLink } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { site } from "@/content/site";

export const metadata: Metadata = { title: "Developers & Partners", description: "Docs, APIs and collaboration for developers, plus partner and investor inquiries for Juicer Technology.", alternates: { canonical: "/tech/developers" } };

const cards = [
  { t: "Docs", d: "Guides for Juicer's tools and agents. Published as each product reaches pilot.", status: "Coming with first public release" },
  { t: "APIs", d: "Programmatic access to Juicer products for partners and pilots.", status: "Early access on request" },
  { t: "Open source", d: "Selected tools released on GitHub as they mature.", status: "Follow on GitHub" },
];

export default function Developers() {
  return (
    <>
      <PageHero variant="volt" eyebrow="Tech · Developers & Partners" title="Build with us," accent="back us, or both." actions={<ButtonLink variant="outline" href={site.social.github}>GitHub</ButtonLink>}>
        Developer resources, collaboration, and a direct line for partners and investors.
      </PageHero>
      <section className="pb-20">
        <div className="container grid gap-6 md:grid-cols-3">
          {cards.map((c) => <Card key={c.t}><h2 className="font-display text-2xl font-semibold">{c.t}</h2><p className="mt-2 text-muted">{c.d}</p><p className="mt-4 text-sm font-medium text-volt">{c.status}</p></Card>)}
        </div>
      </section>
      <section className="section border-t border-fg/10 bg-surface/40">
        <div className="container grid gap-12 lg:grid-cols-2">
          <SectionHead eyebrow="Partner & investor inquiry" title="Let's talk.">Sponsors, technology partners, investors and hiring partners: tell us what you have in mind.</SectionHead>
          <Form type="partner" />
        </div>
      </section>
    </>
  );
}
