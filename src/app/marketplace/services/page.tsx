import type { Metadata } from "next";
import { Check } from "lucide-react";
import { Form } from "@/components/Form";
import { Icon, PageHero, SectionHead } from "@/components/blocks";
import { Reveal } from "@/components/Reveal";
import { ButtonLink } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { JsonLd } from "@/components/JsonLd";
import { portfolio, services, tiers } from "@/content/marketplace";
import { site } from "@/content/site";

export const metadata: Metadata = { title: "Growth & promotion services for events and startups", description: "Meta and Google Ads, Reels and Shorts production, social media management and event launch kits from Juicer.", alternates: { canonical: "/marketplace/services" } };

export default function Services() {
  const ld = { "@context": "https://schema.org", "@type": "ItemList", itemListElement: services.map((s, i) => ({ "@type": "ListItem", position: i + 1, item: { "@type": "Service", name: s.title, description: s.short, provider: { "@type": "Organization", name: site.name } } })) };
  return (
    <>
      <JsonLd data={ld} />
      <PageHero eyebrow="Marketplace · Growth services" title="Get your event" accent="seen, filled and remembered." actions={<ButtonLink href="#quote">Request a quote</ButtonLink>}>
        Promotion, campaigns and content for event organisers, startups and brands, run by the team that fills Juicer's own events.
      </PageHero>
      <section className="pb-20">
        <div className="container grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => (
            <Reveal key={s.slug} delay={(i % 3) * 0.07}>
              <Card className="h-full">
                <Icon name={s.icon} className="h-8 w-8 text-accent" />
                <h2 className="mt-4 font-display text-xl font-semibold">{s.title}</h2>
                <p className="mt-2 text-muted">{s.short}</p>
                <ul className="mt-4 space-y-2 text-sm">{s.points.map((p) => <li key={p} className="flex gap-2"><Check className="mt-0.5 h-4 w-4 shrink-0 text-accent" aria-hidden />{p}</li>)}</ul>
              </Card>
            </Reveal>
          ))}
        </div>
      </section>
      <section className="section border-t border-fg/10 bg-surface/40" id="pricing">
        <div className="container">
          <SectionHead eyebrow="Pricing tiers" title="Start small. Scale with the event.">Pricing is quoted per brief. Tell us the goal, the date and the budget range.</SectionHead>
          <div className="grid gap-6 md:grid-cols-3">
            {tiers.map((t) => (
              <Card key={t.name} className={t.featured ? "border-lime/60 shadow-[0_0_60px_-20px_rgb(var(--lime)/0.6)]" : ""}>
                {t.featured && <p className="eyebrow mb-2">Most popular</p>}
                <h3 className="font-display text-2xl font-semibold">{t.name}</h3>
                <p className="text-sm text-muted">{t.for}</p>
                <p className="mt-4 font-display text-xl text-juice">{t.price}</p>
                <ul className="mt-5 space-y-2 text-sm">{t.features.map((f) => <li key={f} className="flex gap-2"><Check className="mt-0.5 h-4 w-4 text-accent" aria-hidden />{f}</li>)}</ul>
                <ButtonLink href="#quote" variant={t.featured ? "primary" : "outline"} className="mt-6 w-full">Get a quote</ButtonLink>
              </Card>
            ))}
          </div>
        </div>
      </section>
      <section className="section">
        <div className="container">
          <SectionHead eyebrow="Portfolio & case studies" title="Work that moved numbers." />
          <div className="grid gap-6 md:grid-cols-3">
            {portfolio.map((p) => (
              <Card key={p.title}><div className="mb-4 aspect-video rounded-xl bg-juice opacity-80" aria-hidden /><h3 className="font-display text-lg font-semibold">{p.title}</h3><p className="mt-1 text-sm text-muted">{p.result}</p><p className="mt-3 text-xs text-muted">{p.tags.join(" · ")}</p></Card>
            ))}
          </div>
        </div>
      </section>
      <section className="section border-t border-fg/10 bg-surface/40 scroll-mt-20" id="quote">
        <div className="container grid gap-12 lg:grid-cols-2">
          <SectionHead eyebrow="Request a quote or book" title="Tell us what you're planning.">Share the event, the channels and the date. You'll get a plan and a quote within one working day.</SectionHead>
          <Form type="quote" />
        </div>
      </section>
    </>
  );
}
