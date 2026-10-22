import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Icon, PageHero, SectionHead } from "@/components/blocks";
import { Reveal } from "@/components/Reveal";
import { ButtonLink } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { roadmap } from "@/content/tech";

export const metadata: Metadata = { title: "Juicer Tech Ecosystem: AI software, robotics & Physical AI", description: "Juicer's main business: inventing AI software, robotics and Physical AI, from lab to pilot.", alternates: { canonical: "/tech" } };

const areas = [
  { icon: "BrainCircuit", t: "AI Software", d: "LLM apps, agents, automation, computer vision and GenAI tools. Internal products and custom builds.", href: "/tech/ai-software" },
  { icon: "Bot", t: "Robotics", d: "Robot platforms, prototypes, R&D and custom robotics projects.", href: "/tech/robotics" },
  { icon: "ScanEye", t: "Physical AI", d: "First-person, consented data of real work, to help machines learn the physical world.", href: "/tech/physical-ai" },
  { icon: "FlaskConical", t: "Innovation Lab", d: "Roadmap, research notes, open source, and a way to pilot a project with us.", href: "/tech/lab" },
  { icon: "Code2", t: "Developers & Partners", d: "Docs, APIs, collaboration and investor or partner inquiries.", href: "/tech/developers" },
];

export default function Tech() {
  return (
    <>
      <PageHero variant="volt" eyebrow="Pillar 02 · Tech Ecosystem" title="We invent" accent="what comes next." actions={<><ButtonLink variant="volt" href="/tech/lab#pilot">Pilot a project</ButtonLink><ButtonLink variant="outline" href="/tech/physical-ai">See Physical AI</ButtonLink></>}>
        New AI software, robots and Physical AI, built in the lab, tested in our cities and piloted with partners.
      </PageHero>
      <section className="pb-20">
        <div className="container grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {areas.map((a, i) => (
            <Reveal key={a.t} delay={(i % 3) * 0.07}>
              <Link href={a.href} className="group block h-full">
                <Card className="h-full hover:-translate-y-1 hover:border-volt/60">
                  <Icon name={a.icon} className="h-9 w-9 text-volt" />
                  <h2 className="mt-5 font-display text-2xl font-semibold">{a.t}</h2>
                  <p className="mt-2 text-muted">{a.d}</p>
                  <span className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-volt">Explore <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" aria-hidden /></span>
                </Card>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>
      <section className="section border-t border-fg/10 bg-surface/40">
        <div className="container">
          <SectionHead eyebrow="Roadmap" title="Where the lab is headed." />
          <div className="grid gap-6 md:grid-cols-3">
            {roadmap.map((r) => (
              <Card key={r.phase}><p className="font-display text-3xl text-volt">{r.phase}</p><ul className="mt-4 space-y-2 text-sm text-muted">{r.items.map((i) => <li key={i}>→ {i}</li>)}</ul></Card>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
