import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Form } from "@/components/Form";
import { PageHero } from "@/components/blocks";
import { JsonLd } from "@/components/JsonLd";
import { Card } from "@/components/ui/card";
import { getProduct, products } from "@/content/tech";
import { site } from "@/content/site";

export const dynamicParams = false;
export const generateStaticParams = () => products.map((p) => ({ slug: p.slug }));

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const p = getProduct((await params).slug);
  return p ? { title: `${p.name}: ${p.tag}`, description: p.solution, alternates: { canonical: `/tech/ai-software/${p.slug}` } } : {};
}

export default async function Product({ params }: { params: Promise<{ slug: string }> }) {
  const p = getProduct((await params).slug);
  if (!p) notFound();
  return (
    <>
      <JsonLd data={{ "@context": "https://schema.org", "@type": "SoftwareApplication", name: p.name, applicationCategory: "BusinessApplication", description: p.solution, publisher: { "@type": "Organization", name: site.name } }} />
      <PageHero variant="volt" eyebrow={`${p.tag} · ${p.status}`} title={p.name}>{p.solution}</PageHero>
      <section className="pb-24">
        <div className="container grid gap-8 lg:grid-cols-3">
          <div className="space-y-6 lg:col-span-2">
            <Card><h2 className="eyebrow !text-volt">The problem</h2><p className="mt-3 text-lg">{p.problem}</p></Card>
            <Card><h2 className="eyebrow !text-volt">Our solution</h2><p className="mt-3 text-lg">{p.solution}</p></Card>
            <Card><h2 className="eyebrow !text-volt">Demo</h2><div className="mt-3 grid aspect-video place-items-center rounded-xl border border-dashed border-fg/25 text-sm text-muted">{p.demo}</div></Card>
            <Card><h2 className="eyebrow !text-volt">Tech stack</h2><ul className="mt-3 flex flex-wrap gap-2">{p.stack.map((s) => <li key={s} className="rounded-full border border-volt/40 px-3 py-1 text-sm">{s}</li>)}</ul></Card>
          </div>
          <Form type="pilot" title={`Pilot ${p.name}`} context={{ product: p.slug }} />
        </div>
      </section>
    </>
  );
}
