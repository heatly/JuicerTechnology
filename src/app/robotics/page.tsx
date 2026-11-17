import type { Metadata } from "next";
import { Check } from "lucide-react";
import { Form } from "@/components/Form";
import { LoopRing, RobotArm } from "@/components/Graphics";
import { Reveal } from "@/components/Reveal";
import { Icon, PageHero, SectionHead } from "@/components/blocks";
import { ButtonLink } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { loop, robotCapabilities, roboticsTracks } from "@/content/data";

export const metadata: Metadata = {
  title: "Robotics: platforms, prototypes and custom projects",
  description: "Juicer builds research robot platforms, rapid prototypes and custom robotics projects, trained on first-person human demonstrations.",
  alternates: { canonical: "/robotics" },
};

export default function Robotics() {
  return (
    <>
      <PageHero eyebrow="Machines · Robotics" title="Robots that learn from" accent="human skill." actions={<><ButtonLink variant="volt" href="/contact#pilot">Pilot a robot</ButtonLink><ButtonLink variant="outline" href="/egocentric-data">See the data</ButtonLink></>}>
        We build robot platforms and prototypes, and train them on the first-person demonstrations we collect. Real tasks, tested on real hardware.
      </PageHero>

      <section className="pb-20">
        <div className="container grid items-center gap-12 lg:grid-cols-2">
          <Reveal><div className="rounded-3xl border border-orange/30 bg-gradient-to-br from-orange/10 to-transparent p-8"><RobotArm /><p className="mt-2 text-center text-xs text-muted">Illustration. Not a product render.</p></div></Reveal>
          <div className="grid gap-4">
            {roboticsTracks.map((r, i) => (
              <Reveal key={r.t} delay={i * 0.08}>
                <Card className="flex gap-5 hover:border-orange/60"><Icon name={r.icon} className="h-9 w-9 shrink-0 text-orange" /><div><p className="text-xs font-semibold uppercase tracking-wider text-orange">{r.status}</p><h2 className="font-display text-xl font-semibold">{r.t}</h2><p className="mt-1 text-muted">{r.d}</p></div></Card>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section border-y border-fg/10 bg-surface/40">
        <div className="container grid items-center gap-12 lg:grid-cols-2">
          <div>
            <SectionHead eyebrow="The loop" title="Collect. Train. Test. Repeat.">Our robots and our data sourcing feed each other, so what a robot gets wrong becomes the next thing we record.</SectionHead>
            <ol className="space-y-3">
              {loop.map((l, i) => <li key={l.t} className="flex gap-4"><span className="grid h-8 w-8 shrink-0 place-items-center rounded-full border border-lime/60 font-display text-sm font-bold">{i + 1}</span><p><b className="font-display">{l.t}.</b> <span className="text-muted">{l.d}</span></p></li>)}
            </ol>
          </div>
          <Reveal><LoopRing /></Reveal>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHead eyebrow="What we work on" title="Capabilities." />
          <ul className="grid gap-4 md:grid-cols-2">
            {robotCapabilities.map((c) => <li key={c} className="glass flex gap-3 rounded-2xl p-5"><Check className="mt-0.5 h-5 w-5 shrink-0 text-accent" aria-hidden />{c}</li>)}
          </ul>
          <p className="mt-6 max-w-2xl text-sm text-muted">Platform specifications are shared during scoping. None are published here.</p>
        </div>
      </section>

      <section className="section border-t border-fg/10 bg-surface/40 scroll-mt-20" id="pilot">
        <div className="container grid gap-12 lg:grid-cols-2">
          <SectionHead eyebrow="Pilot a robot" title="Tell us the job.">Describe the task, the environment and your timeline. We will propose a pilot scope.</SectionHead>
          <Form type="pilot" />
        </div>
      </section>
    </>
  );
}
