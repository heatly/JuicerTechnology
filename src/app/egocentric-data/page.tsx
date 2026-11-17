import type { Metadata } from "next";
import { ArrowUpRight } from "lucide-react";
import { Form } from "@/components/Form";
import { GapBars, Pipeline, RigDiagram } from "@/components/Graphics";
import { LazyPhysicalScene } from "@/components/LazyPhysicalScene";
import { Reveal } from "@/components/Reveal";
import { Icon, PageHero, SectionHead } from "@/components/blocks";
import { ButtonLink } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { domains, modalities, offers, sources, stances } from "@/content/data";

export const metadata: Metadata = {
  title: "Egocentric data sourcing for physical AI",
  description: "Consented, paid, first-person video of real work: collected, reviewed, labelled and delivered to train robots and world models. License a dataset or commission a collection.",
  alternates: { canonical: "/egocentric-data" },
};

export default function Egocentric() {
  return (
    <>
      <PageHero eyebrow="Data · Egocentric sourcing" title="First-person data of" accent="real work." actions={<><ButtonLink variant="volt" href="/contact#data">Request data</ButtonLink><ButtonLink variant="outline" href="#contribute">Become a contributor</ButtonLink></>}>
        Machines learned to talk by reading us. To understand the physical world, they have to watch us work. We record skilled people at their jobs, with consent and for pay, and deliver the data your models need.
      </PageHero>

      <section className="pb-20">
        <div className="container"><div className="relative mx-auto aspect-[16/9] max-w-5xl overflow-hidden rounded-3xl border border-volt/30 bg-black"><LazyPhysicalScene /></div></div>
      </section>

      <section className="section pt-0">
        <div className="container grid items-center gap-12 lg:grid-cols-2">
          <Reveal><RigDiagram /></Reveal>
          <SectionHead eyebrow="What it is" title="The camera sees what the worker sees.">Egocentric data is captured from the wearer's own point of view with a head-mounted rig. It shows hands, tools, materials and the order of steps, which is exactly what a robot has to imitate.</SectionHead>
        </div>
      </section>

      <section className="section border-y border-fg/10 bg-surface/40">
        <div className="container">
          <SectionHead eyebrow="What you can get" title="More than video." />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {modalities.map((m, i) => (
              <Reveal key={m.t} delay={(i % 4) * 0.06}>
                <Card className="h-full p-5 hover:-translate-y-1 hover:border-volt/60"><Icon name={m.icon} className="h-7 w-7 text-volt" /><h3 className="mt-3 font-display text-lg font-semibold">{m.t}</h3><p className="mt-1 text-sm text-muted">{m.d}</p></Card>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container grid items-center gap-12 lg:grid-cols-2">
          <SectionHead eyebrow="Why it is scarce" title="The data robots need barely exists.">Text, images and web video are abundant. Open, first-person footage of people doing real work is thousands of hours, not millions. Research suggests variety of people, places and objects helps more than repeating the same scene.</SectionHead>
          <Reveal><GapBars /></Reveal>
        </div>
      </section>

      <section className="section border-y border-fg/10 bg-surface/40">
        <div className="container">
          <SectionHead eyebrow="Environments" title="Skilled work, wherever it happens." />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {domains.map((d, i) => (
              <Reveal key={d.t} delay={(i % 4) * 0.06}>
                <div className="group relative overflow-hidden rounded-2xl border border-fg/10 p-6 transition hover:border-lime/60">
                  <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-juice opacity-20 blur-xl transition group-hover:opacity-50" aria-hidden />
                  <Icon name={d.icon} className="relative h-8 w-8 text-accent" />
                  <h3 className="relative mt-4 font-display text-lg font-semibold">{d.t}</h3>
                  <p className="relative mt-1 text-sm text-muted">{d.d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHead eyebrow="How it works" title="A managed pipeline, end to end." />
          <Pipeline />
        </div>
      </section>

      <section className="section border-t border-fg/10 bg-surface/40" id="offers">
        <div className="container">
          <SectionHead eyebrow="Two ways to work with us" title="License it or commission it." />
          <div className="grid gap-6 md:grid-cols-2">
            {offers.map((o) => (
              <Card key={o.t} className="p-8"><Icon name={o.icon} className="h-9 w-9 text-volt" /><h3 className="mt-4 font-display text-2xl font-semibold">{o.t}</h3><p className="mt-2 text-muted">{o.d}</p><ButtonLink href="/contact#data" variant="volt" className="mt-6">{o.cta}</ButtonLink></Card>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHead eyebrow="Our principles" title="Collected the right way." />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {stances.map((s) => (
              <Card key={s.t}><Icon name={s.icon} className="h-8 w-8 text-accent" /><h3 className="mt-4 font-display text-lg font-semibold">{s.t}</h3><p className="mt-1 text-sm text-muted">{s.d}</p></Card>
            ))}
          </div>
        </div>
      </section>

      <section className="section border-t border-fg/10 bg-surface/40 scroll-mt-20" id="contribute">
        <div className="container grid gap-12 lg:grid-cols-2">
          <div>
            <SectionHead eyebrow="Contribute" title="Your skill is the data.">Most trades are learned by watching and doing. Record your work with consent and for pay.</SectionHead>
            <div className="space-y-4">
              {[["Wearer", "Wear a device during tasks you already do. Paid per session."], ["Operator", "Fit devices and guide wearers at your local hub."], ["City lead", "Build and manage a hub. A paid lead role."]].map(([t, d]) => (
                <Card key={t}><h3 className="font-display text-xl font-semibold">{t}</h3><p className="mt-1 text-muted">{d}</p></Card>
              ))}
            </div>
          </div>
          <Form type="contributor" />
        </div>
      </section>

      <section className="py-12">
        <div className="container">
          <h2 className="font-display text-sm font-semibold uppercase tracking-wider text-muted">Sources</h2>
          <ul className="mt-3 flex flex-wrap gap-x-6 gap-y-2 text-sm">
            {sources.map(([n, h]) => <li key={h}><a href={h} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-volt underline">{n}<ArrowUpRight className="h-3.5 w-3.5" aria-hidden /></a></li>)}
          </ul>
          <p className="mt-4 max-w-2xl text-xs text-muted">Figures are rounded, industry-level approximations from public research and dataset releases. They are not Juicer output.</p>
        </div>
      </section>
    </>
  );
}
