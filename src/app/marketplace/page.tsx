import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Icon, PageHero, SectionHead } from "@/components/blocks";
import { Reveal } from "@/components/Reveal";
import { ButtonLink } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export const metadata: Metadata = { title: "Juicer Marketplace", description: "City chapters, meetups and hackathons, plus growth, promotion and merch services for event organisers, startups and brands.", alternates: { canonical: "/marketplace" } };

const blocks = [
  { icon: "Users", title: "Juicer Community", text: "Chapters in every city with a local lead, monthly meetups, hackathons, workshops, bootcamps and campus programs.", href: "/marketplace/community", cta: "Explore the community" },
  { icon: "Megaphone", title: "Growth & promotion", text: "Meta and Google Ads, Reels production, social media management and launch kits that fill your event.", href: "/marketplace/services", cta: "See services" },
  { icon: "Shirt", title: "Swag & printing", text: "T-shirts, hoodies, stickers, badges, lanyards, notebooks, posters, standees, banners and totes, in bulk.", href: "/marketplace/swag", cta: "Browse the catalog" },
];

export default function Marketplace() {
  return (
    <>
      <PageHero eyebrow="Pillar 01 · Marketplace" title="Where builders meet" accent="and events get made." actions={<><ButtonLink href="/join#join">Join the community</ButtonLink><ButtonLink href="/marketplace/services#quote" variant="outline">Request a quote</ButtonLink></>}>
        A city-by-city community network, plus the promotion and merchandise services that organisers, startups and brands need to run great events.
      </PageHero>
      <section className="pb-24">
        <div className="container grid gap-6 md:grid-cols-3">
          {blocks.map((b, i) => (
            <Reveal key={b.title} delay={i * 0.08}>
              <Link href={b.href} className="group block h-full">
                <Card className="flex h-full flex-col p-8 hover:-translate-y-1 hover:border-lime/60">
                  <span className="grid h-12 w-12 place-items-center rounded-xl bg-juice text-black"><Icon name={b.icon} className="h-6 w-6" /></span>
                  <h2 className="mt-6 font-display text-2xl font-semibold">{b.title}</h2>
                  <p className="mt-3 flex-1 text-muted">{b.text}</p>
                  <span className="mt-6 inline-flex items-center gap-1 font-semibold text-accent">{b.cta} <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" aria-hidden /></span>
                </Card>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>
      <section className="section border-t border-fg/10 bg-surface/40">
        <div className="container">
          <SectionHead eyebrow="How it works" title="From idea to packed room." />
          <ol className="grid gap-6 md:grid-cols-4">
            {["Pick a service or event type", "Request a quote or book", "We plan, produce and promote", "You run the event. We report back."].map((s, i) => (
              <li key={s} className="glass rounded-2xl p-6"><span className="font-display text-4xl text-juice">0{i + 1}</span><p className="mt-3 font-medium">{s}</p></li>
            ))}
          </ol>
        </div>
      </section>
    </>
  );
}
