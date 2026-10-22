import Link from "next/link";
import { ArrowRight, Cpu, Users } from "lucide-react";
import { HeroBackground } from "@/components/HeroBackground";
import { FloatingSlices, SplitHeading, Tilt } from "@/components/Motion";
import { Reveal } from "@/components/Reveal";
import { Stats } from "@/components/Stats";
import { IndiaMap } from "@/components/IndiaMap";
import { ButtonLink } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CityCard, EventCard, SectionHead } from "@/components/blocks";
import { cities } from "@/content/cities";
import { events, isPast } from "@/content/events";
import { products } from "@/content/tech";
import { partners, site, testimonials } from "@/content/site";

export default function Home() {
  const upcoming = events.filter((e) => !isPast(e)).sort((a, b) => +new Date(a.date) - +new Date(b.date));
  const featured = upcoming.filter((e) => e.featured).slice(0, 3);
  const nextFor = (slug: string) => upcoming.find((e) => e.city === slug);

  return (
    <>
      <section className="relative isolate flex min-h-[100svh] items-center overflow-hidden pt-24">
        <div className="grid-bg absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]" aria-hidden />
        <HeroBackground />
        <FloatingSlices />
        <div className="pointer-events-none absolute left-1/2 top-1/3 h-[28rem] w-[50rem] -translate-x-1/2 rounded-full bg-juice opacity-20 blur-[140px]" aria-hidden />
        <div className="container relative py-16">
          <Reveal><p className="eyebrow">Juicer Technology · India</p></Reveal>
          <SplitHeading className="h-display mt-5 max-w-5xl text-5xl sm:text-6xl md:text-8xl" lines={[{ text: "Community-powered." }, { text: "Invention-driven.", accent: true }]} />
          <Reveal delay={0.12}>
            <p className="mt-7 max-w-2xl text-lg text-muted md:text-xl">
              We run builder communities in seven Indian cities, with software offices in four more, and we invent AI software, robots and Physical AI. One side brings the people. The other builds what they need.
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <div className="mt-10 flex flex-wrap gap-4">
              <ButtonLink href="/join" size="lg">Join the Community <ArrowRight className="h-5 w-5" aria-hidden /></ButtonLink>
              <ButtonLink href="/tech" size="lg" variant="outline">Explore Our Tech</ButtonLink>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Two portals */}
      <section className="section pt-0">
        <div className="container grid gap-6 lg:grid-cols-2">
          <Reveal>
            <Tilt className="group h-full"><Link href="/marketplace" className="group relative block overflow-hidden rounded-3xl border border-lime/30 bg-gradient-to-br from-lime/15 via-orange/10 to-transparent p-8 transition hover:-translate-y-1 hover:border-lime md:p-12">
              <Users className="h-10 w-10 text-accent" aria-hidden />
              <p className="eyebrow mt-8">Pillar 01</p>
              <h2 className="h-display mt-2 text-4xl md:text-5xl">Juicer Marketplace</h2>
              <p className="mt-4 max-w-md text-muted">City chapters, meetups, hackathons, plus the growth and merch services that make events work: ads, Reels, swag and print.</p>
              <span className="mt-8 inline-flex items-center gap-2 font-display font-semibold text-accent">Enter the Marketplace <ArrowRight className="h-5 w-5 transition group-hover:translate-x-1" aria-hidden /></span>
            </Link></Tilt>
          </Reveal>
          <Reveal delay={0.1}>
            <Tilt className="group h-full"><Link href="/tech" className="group relative block overflow-hidden rounded-3xl border border-volt/30 bg-gradient-to-br from-volt/15 via-lime/5 to-transparent p-8 transition hover:-translate-y-1 hover:border-volt md:p-12">
              <Cpu className="h-10 w-10 text-volt" aria-hidden />
              <p className="eyebrow mt-8 !text-volt">Pillar 02</p>
              <h2 className="h-display mt-2 text-4xl md:text-5xl">Juicer Tech Ecosystem</h2>
              <p className="mt-4 max-w-md text-muted">Our main business: AI software, robotics and Physical AI, invented in the lab and piloted with partners.</p>
              <span className="mt-8 inline-flex items-center gap-2 font-display font-semibold text-volt">Explore the Tech <ArrowRight className="h-5 w-5 transition group-hover:translate-x-1" aria-hidden /></span>
            </Link></Tilt>
          </Reveal>
        </div>
      </section>

      <section className="pb-20"><div className="container"><Reveal><Stats /></Reveal></div></section>

      <section className="section pt-0">
        <div className="container">
          <SectionHead eyebrow="Featured events" title="Come build with us, in person.">Meetups, workshops and hackathons across our chapters. RSVP is free.</SectionHead>
          <div className="grid gap-6 md:grid-cols-3">
            {featured.map((e, i) => <Reveal key={e.slug} delay={i * 0.08}><EventCard event={e} /></Reveal>)}
          </div>
          <div className="mt-8"><ButtonLink href="/events" variant="outline">All events</ButtonLink></div>
        </div>
      </section>

      <section className="section border-y border-fg/10 bg-surface/40">
        <div className="container">
          <SectionHead eyebrow="Featured inventions" title="What the lab is building.">Concept-to-pilot products from the Juicer Tech Ecosystem.</SectionHead>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {products.map((p, i) => (
              <Reveal key={p.slug} delay={i * 0.07}>
                <Link href={`/tech/ai-software/${p.slug}`} className="block h-full">
                  <Card className="h-full hover:-translate-y-1 hover:border-volt/60">
                    <p className="text-xs font-semibold uppercase tracking-wider text-volt">{p.tag}</p>
                    <h3 className="mt-2 font-display text-xl font-semibold">{p.name}</h3>
                    <p className="mt-3 text-sm text-muted">{p.solution}</p>
                    <p className="mt-4 text-xs text-muted">Status: {p.status}</p>
                  </Card>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section" id="locations">
        <div className="container grid items-center gap-12 lg:grid-cols-2">
          <div>
            <SectionHead eyebrow="Locations" title="Eleven cities. One brand.">Community runs in seven cities. Software teams work from four more. Pick a pin to see events, the lead, and how to join.</SectionHead>
            <ButtonLink href="/locations" variant="outline">See all locations</ButtonLink>
          </div>
          <Reveal><IndiaMap /></Reveal>
        </div>
        <div className="container mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {cities.map((c, i) => <Reveal key={c.slug} delay={(i % 4) * 0.06}><CityCard city={c} upcoming={nextFor(c.slug)} /></Reveal>)}
        </div>
      </section>

      <section className="section bg-surface/40">
        <div className="container">
          <SectionHead eyebrow="Testimonials" title="In their words." />
          <div className="grid gap-6 md:grid-cols-3">
            {testimonials.map((t) => (
              <Card key={t.role}><blockquote className="text-lg leading-snug">“{t.quote}”</blockquote><p className="mt-5 text-sm font-semibold">{t.name}</p><p className="text-sm text-muted">{t.role}</p></Card>
            ))}
          </div>
          <div className="mt-14 overflow-hidden" aria-label="Partners and sponsors">
            <p className="mb-5 text-center text-xs uppercase tracking-[0.2em] text-muted">Partners & sponsors</p>
            <div className="flex w-max animate-marquee gap-12">
              {[...partners, ...partners].map((p, i) => <span key={i} className="whitespace-nowrap font-display text-2xl font-semibold text-fg/40" aria-hidden={i >= partners.length}>{p}</span>)}
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="relative overflow-hidden rounded-3xl bg-juice p-10 text-center text-[#0b0d12] md:p-20">
            <h2 className="h-display mx-auto max-w-3xl text-4xl md:text-6xl">Your city is next.</h2>
            <p className="mx-auto mt-5 max-w-xl text-lg text-black/80">Join as a member, partner with {site.name}, or open a chapter and lead the builders around you.</p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Link href="/join#join" className="inline-flex h-14 items-center rounded-full bg-black px-8 font-display font-semibold text-white hover:bg-black/80">Join</Link>
              <Link href="/join#partner" className="inline-flex h-14 items-center rounded-full border-2 border-black px-8 font-display font-semibold hover:bg-black/10">Partner</Link>
              <Link href="/join#chapter-lead" className="inline-flex h-14 items-center rounded-full border-2 border-black px-8 font-display font-semibold hover:bg-black/10">Host a chapter</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
