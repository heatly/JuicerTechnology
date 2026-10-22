import type { Metadata } from "next";
import { Form } from "@/components/Form";
import { PageHero } from "@/components/blocks";

export const metadata: Metadata = { title: "Join, Partner or Host a Chapter", description: "Join the Juicer community, partner with us, or apply to lead a chapter in your city.", alternates: { canonical: "/join" } };

export default function Join() {
  return (
    <>
      <PageHero eyebrow="Get involved" title="Pick your way" accent="in.">Members, partners and city leads all start here. Each form goes straight to the team.</PageHero>
      <section className="pb-24">
        <div className="container grid gap-8 lg:grid-cols-3">
          <div id="join" className="scroll-mt-28"><Form type="join-community" /></div>
          <div id="partner" className="scroll-mt-28"><Form type="partner" /></div>
          <div id="chapter-lead" className="scroll-mt-28"><Form type="chapter-lead" /></div>
        </div>
      </section>
    </>
  );
}
