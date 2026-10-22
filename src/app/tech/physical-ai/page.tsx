import type { Metadata } from "next";
import { ArrowUpRight } from "lucide-react";
import { PageHero, SectionHead } from "@/components/blocks";
import { Form } from "@/components/Form";
import { LazyPhysicalScene } from "@/components/LazyPhysicalScene";
import { Reveal } from "@/components/Reveal";
import { ButtonLink } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { physicalAI as p } from "@/content/tech";

export const metadata: Metadata = { title: "Physical AI: ego data for world models", description: "Machines learned to talk by reading us. To understand the world, they have to watch us work. Juicer's Physical AI program records consented, paid, first-person work.", alternates: { canonical: "/tech/physical-ai" } };

export default function PhysicalAI() {
  return (
    <>
      <PageHero variant="volt" eyebrow="Tech · Physical AI" title="Ego data for" accent="world models." actions={<><ButtonLink variant="volt" href="#join">Join</ButtonLink><ButtonLink variant="outline" href="#why">Read the case</ButtonLink></>}>
        {p.thesis} {p.sub}
      </PageHero>

      <section className="pb-20">
        <div className="container">
          <div className="relative mx-auto aspect-[16/9] max-w-5xl overflow-hidden rounded-3xl border border-volt/30 bg-black"><LazyPhysicalScene /></div>
        </div>
      </section>

      <section className="section pt-0">
        <div className="container">
          <SectionHead eyebrow="The gap" title="The internet taught machines language. Nobody recorded the work.">{p.gapNote}</SectionHead>
          <div className="grid gap-6 md:grid-cols-3">
            {p.gap.map((g, i) => (
              <Reveal key={g.label} delay={i * 0.08}>
                <Card className={i === 2 ? "border-orange/60" : ""}><p className="text-sm text-muted">{g.label}</p><p className="h-display mt-2 text-4xl text-volt">{g.value}</p><p className="mt-1 text-sm text-muted">{g.note}</p></Card>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section border-y border-fg/10 bg-surface/40 scroll-mt-20" id="why">
        <div className="container">
          <SectionHead eyebrow="Why" title="Models still miss what people find obvious." />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {p.why.map((w, i) => (
              <Reveal key={w.t} delay={(i % 3) * 0.07}>
                <Card className="h-full"><p className="h-display text-5xl text-volt">{w.n}</p><h3 className="mt-3 font-display text-lg font-semibold">{w.t}</h3><p className="mt-2 text-sm text-muted">{w.d}</p><a href={w.href} target="_blank" rel="noopener noreferrer" className="mt-3 inline-flex items-center gap-1 text-sm text-volt underline">Source <ArrowUpRight className="h-3.5 w-3.5" aria-hidden /></a></Card>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHead eyebrow="Proof" title="Human first-person footage works." />
          <div className="grid gap-6 md:grid-cols-2">
            {p.proof.map((w) => (
              <Card key={w.t} className="p-8"><p className="h-display text-6xl text-volt">{w.n}</p><h3 className="mt-3 font-display text-xl font-semibold">{w.t}</h3><p className="mt-2 text-muted">{w.d}</p><a href={w.href} target="_blank" rel="noopener noreferrer" className="mt-3 inline-flex items-center gap-1 text-sm text-volt underline">Source <ArrowUpRight className="h-3.5 w-3.5" aria-hidden /></a></Card>
            ))}
          </div>
        </div>
      </section>

      <section className="section border-y border-fg/10 bg-surface/40">
        <div className="container">
          <SectionHead eyebrow="How it works" title="From your hands to a world model." />
          <ol className="grid gap-4 md:grid-cols-5">
            {p.steps.map((s, i) => (
              <Reveal key={s.t} delay={i * 0.07}>
                <li className="glass h-full list-none rounded-2xl p-5"><span className="font-display text-3xl text-volt">0{i + 1}</span><h3 className="mt-2 font-display font-semibold">{s.t}</h3><p className="mt-1 text-sm text-muted">{s.d}</p></li>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHead eyebrow="Belief & applications" title="Skills that were never written down.">{p.belief}</SectionHead>
          <ul className="flex flex-wrap gap-3" aria-label="Examples of skills and trades">
            {p.trades.map((t) => <li key={t} className="rounded-full border border-volt/40 px-5 py-2 font-display text-lg">{t}</li>)}
          </ul>
        </div>
      </section>

      <section className="section border-t border-fg/10 bg-surface/40 scroll-mt-20" id="join">
        <div className="container grid gap-12 lg:grid-cols-2">
          <div>
            <SectionHead eyebrow="Join" title="Three ways in." />
            <div className="space-y-4">{p.roles.map((r) => <Card key={r.t}><h3 className="font-display text-xl font-semibold">{r.t}</h3><p className="mt-1 text-muted">{r.d}</p></Card>)}</div>
          </div>
          <Form type="physical-ai" />
        </div>
      </section>

      <section className="py-12">
        <div className="container">
          <h2 className="font-display text-sm font-semibold uppercase tracking-wider text-muted">Sources</h2>
          <ul className="mt-3 flex flex-wrap gap-x-6 gap-y-2 text-sm">{p.sources.map(([n, h]) => <li key={h}><a href={h} target="_blank" rel="noopener noreferrer" className="text-volt underline">{n}</a></li>)}</ul>
          <p className="mt-4 max-w-2xl text-xs text-muted">Research figures are drawn from the cited public studies via ego.mom. No device specifications are published for this program yet.</p>
        </div>
      </section>
    </>
  );
}
