import type { Metadata } from "next";
import { Form } from "@/components/Form";
import { Icon, PageHero, SectionHead } from "@/components/blocks";
import { Reveal } from "@/components/Reveal";
import { SwagStudio } from "@/components/SwagStudio";
import { TrackOrder } from "@/components/TrackOrder";
import { ButtonLink } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { swag } from "@/content/marketplace";

export const metadata: Metadata = { title: "Event swag & custom printing", description: "Custom T-shirts, hoodies, stickers, badges, lanyards, notebooks, posters, standees, banners and tote bags in bulk for events.", alternates: { canonical: "/marketplace/swag" } };

export default function Swag() {
  return (
    <>
      <PageHero eyebrow="Marketplace · Merchandise" title="Swag your attendees" accent="actually keep." actions={<ButtonLink href="#quote">Bulk quote</ButtonLink>}>
        Custom event merchandise and printing, from a single sticker sheet to a full hackathon kit.
      </PageHero>
      <section className="pb-20">
        <div className="container grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
          {swag.map((s, i) => (
            <Reveal key={s.slug} delay={(i % 5) * 0.05}>
              <Card className="h-full p-5 hover:-translate-y-1 hover:border-lime/50">
                <Icon name={s.icon} className="h-7 w-7 text-accent" />
                <h2 className="mt-3 font-display text-lg font-semibold">{s.name}</h2>
                <p className="mt-1 text-sm text-muted">{s.note}</p>
              </Card>
            </Reveal>
          ))}
        </div>
      </section>
      <section className="section border-t border-fg/10 bg-surface/40">
        <div className="container grid gap-8 lg:grid-cols-2">
          <SwagStudio />
          <TrackOrder />
        </div>
      </section>
      <section className="section scroll-mt-20" id="quote">
        <div className="container grid gap-12 lg:grid-cols-2">
          <SectionHead eyebrow="Bulk quote" title="Send the brief. Get a proof.">List items and quantities, add a link to your design, and say when you need it. We return a quote and a mockup.</SectionHead>
          <Form type="quote" />
        </div>
      </section>
    </>
  );
}
