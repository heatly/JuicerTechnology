import type { Metadata } from "next";
import { Icon, PageHero, SectionHead } from "@/components/blocks";
import { Form } from "@/components/Form";
import { Card } from "@/components/ui/card";
import { robotics } from "@/content/tech";

export const metadata: Metadata = { title: "Robotics: platforms, prototypes & custom projects", description: "Juicer's robotics R&D: robot platforms, rapid prototypes and custom robotics projects with partners.", alternates: { canonical: "/tech/robotics" } };

export default function Robotics() {
  return (
    <>
      <PageHero variant="volt" eyebrow="Tech · Robotics" title="Robots that earn" accent="their place.">Research platforms, fast prototypes and custom projects. We build, test in the real world, and pilot with partners.</PageHero>
      <section className="pb-20">
        <div className="container grid gap-6 md:grid-cols-3">
          {robotics.map((r, i) => (
            <Card key={r.name} className="p-8">
              <Icon name={["Cpu", "Wrench", "Handshake"][i]} className="h-9 w-9 text-volt" />
              <p className="mt-5 text-xs font-semibold uppercase tracking-wider text-volt">{r.status}</p>
              <h2 className="mt-1 font-display text-2xl font-semibold">{r.name}</h2>
              <p className="mt-2 text-muted">{r.text}</p>
            </Card>
          ))}
        </div>
      </section>
      <section className="section border-t border-fg/10 bg-surface/40">
        <div className="container grid gap-12 lg:grid-cols-2">
          <SectionHead eyebrow="Custom robotics" title="Have a task a robot should do?">Tell us the job, the environment and your timeline. We'll propose a pilot scope. Specs and platform details are shared during scoping.</SectionHead>
          <Form type="pilot" context={{ area: "Robotics" }} />
        </div>
      </section>
    </>
  );
}
