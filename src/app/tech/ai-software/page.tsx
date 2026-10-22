import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PageHero, SectionHead } from "@/components/blocks";
import { Form } from "@/components/Form";
import { Card } from "@/components/ui/card";
import { products } from "@/content/tech";

export const metadata: Metadata = { title: "AI Software: agents, vision, automation & GenAI", description: "Juicer's AI software inventions and custom builds: LLM apps, agents, automation, computer vision and GenAI tools.", alternates: { canonical: "/tech/ai-software" } };

export default function AISoftware() {
  return (
    <>
      <PageHero variant="volt" eyebrow="Tech · AI Software" title="Software that" accent="does the work.">LLM apps, agents, automation, computer vision and GenAI tools. Our own products, and custom builds for yours.</PageHero>
      <section className="pb-20">
        <div className="container grid gap-6 md:grid-cols-2">
          {products.map((p) => (
            <Link key={p.slug} href={`/tech/ai-software/${p.slug}`} className="group block">
              <Card className="h-full hover:-translate-y-1 hover:border-volt/60">
                <p className="text-xs font-semibold uppercase tracking-wider text-volt">{p.tag} · {p.status}</p>
                <h2 className="mt-2 font-display text-2xl font-semibold">{p.name}</h2>
                <p className="mt-3 text-muted"><b className="text-fg">Problem:</b> {p.problem}</p>
                <p className="mt-2 text-muted"><b className="text-fg">Solution:</b> {p.solution}</p>
                <span className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-volt">View product <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" aria-hidden /></span>
              </Card>
            </Link>
          ))}
        </div>
      </section>
      <section className="section border-t border-fg/10 bg-surface/40">
        <div className="container grid gap-12 lg:grid-cols-2">
          <SectionHead eyebrow="Custom builds" title="Need something that doesn't exist yet?">Describe the problem. We'll scope a pilot, build it, and tell you honestly if AI isn't the right tool.</SectionHead>
          <Form type="pilot" />
        </div>
      </section>
    </>
  );
}
