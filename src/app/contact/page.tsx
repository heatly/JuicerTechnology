import type { Metadata } from "next";
import { Form } from "@/components/Form";
import { PageHero } from "@/components/blocks";
import { site } from "@/content/site";

export const metadata: Metadata = { title: "Contact: request data or pilot a robot", description: "Request an egocentric dataset or custom collection, propose a robotics pilot, or get in touch with Juicer Technology.", alternates: { canonical: "/contact" } };

export default function Contact() {
  return (
    <>
      <PageHero eyebrow="Contact" title="Let's build" accent="what's next.">Pick the form that fits. Every request goes straight to the team. Or write to <a className="underline" href={`mailto:${site.email}`}>{site.email}</a>.</PageHero>
      <section className="pb-24">
        <div className="container grid gap-8 lg:grid-cols-2">
          <div id="data" className="scroll-mt-28"><Form type="data-request" /></div>
          <div id="pilot" className="scroll-mt-28"><Form type="pilot" /></div>
          <div id="hello" className="scroll-mt-28 lg:col-span-2 lg:mx-auto lg:w-1/2"><Form type="contact" /></div>
        </div>
      </section>
    </>
  );
}
