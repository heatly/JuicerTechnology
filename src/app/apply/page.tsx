import type { Metadata } from "next";
import { Form } from "@/components/Form";
import { HeroBackground } from "@/components/HeroBackground";
import { Reveal } from "@/components/Reveal";
import { Icon } from "@/components/blocks";
import { Card } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Work From Your Own City: Field Operator Jobs, Physical AI",
  description: "Work from your own city as a Field Operator (Forward Deployment Engineer). Field job for people with a smartphone and a two-wheeler. Earn Rs 15,000 to 18,000 per month based on daily activity. Full-time, part-time and per-day work. No qualification needed. Apply now.",
  alternates: { canonical: "/apply" },
};

const facts = [
  { icon: "IndianRupee", t: "₹15,000 to ₹18,000", d: "per month, based on daily activity" },
  { icon: "CalendarDays", t: "Daily, weekly or monthly pay", d: "Paid on schedule" },
  { icon: "Clock", t: "Full-time, part-time or per-day", d: "Choose what suits you" },
  { icon: "BookOpen", t: "No qualification needed", d: "If you can learn, you can do it" },
];

const needs = [
  { icon: "Smartphone", t: "A smartphone" },
  { icon: "Bike", t: "A two-wheeler" },
  { icon: "Smile", t: "A soft, respectful nature" },
];

const steps = [
  { icon: "Send", t: "Apply", d: "Fill the short form below." },
  { icon: "PhoneCall", t: "We call you", d: "Our team explains the work and answers your questions." },
  { icon: "BookOpen", t: "Get trained", d: "Learn the work in the field with our team. No experience needed." },
  { icon: "Send", t: "Daily updates", d: "Share your day's work in our Telegram group. Get paid as agreed." },
];

export default function Apply() {
  return (
    <>
      <section className="relative overflow-hidden pb-10 pt-28 md:pt-36">
        <div className="grid-bg absolute inset-0 [mask-image:linear-gradient(to_bottom,black,transparent)]" aria-hidden />
        <div className="absolute inset-0 opacity-50"><HeroBackground variant="juice" density={0.5} /></div>
        <div className="container relative grid items-start gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <Reveal><p className="eyebrow">We are hiring · Field Operator · Physical AI</p></Reveal>
            <Reveal delay={0.05}>
              <h1 className="h-display mt-3 text-4xl sm:text-5xl md:text-6xl">Work From Your Own City. <span className="text-juice">₹15,000 to ₹18,000 a month.</span></h1>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-5 max-w-xl text-lg text-muted">Forward Deployment Engineer for physical AI. You visit workers in your area, explain our project, and invite them to wear a small camera while they work. Always by choice, never by pressure.</p>
            </Reveal>
            <Reveal delay={0.15}>
              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                {facts.map((f) => (
                  <div key={f.t} className="glass flex items-start gap-3 rounded-2xl p-4">
                    <Icon name={f.icon} className="mt-0.5 h-6 w-6 shrink-0 text-accent" />
                    <div><p className="font-display font-semibold leading-tight">{f.t}</p><p className="text-sm text-muted">{f.d}</p></div>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>

          <div id="apply" className="scroll-mt-24">
            <Form type="apply" />
            <p className="mt-3 text-center text-xs text-muted">Free to apply. We never ask for any fee.</p>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container grid gap-10 lg:grid-cols-2">
          <div>
            <h2 className="h-display text-3xl md:text-4xl">What you will do</h2>
            <ul className="mt-5 space-y-3 text-muted">
              <li>Meet workers such as tailors, cooks and mechanics in your area.</li>
              <li>Explain the project in simple words and answer their questions.</li>
              <li>Invite them to wear a camera while they do their normal work. They sign a consent form first, and they can say no at any time.</li>
              <li>Share a short update of your day in our Telegram group.</li>
            </ul>
          </div>
          <div>
            <h2 className="h-display text-3xl md:text-4xl">What you need</h2>
            <div className="mt-5 grid gap-3 sm:grid-cols-3">
              {needs.map((n) => <Card key={n.t} className="text-center"><Icon name={n.icon} className="mx-auto h-8 w-8 text-accent" /><p className="mt-3 font-display font-semibold">{n.t}</p></Card>)}
            </div>
            <p className="mt-5 text-muted">That is all. Qualification is not the main thing. If you are good at learning and good with people, we will teach you the rest.</p>
          </div>
        </div>
      </section>

      <section className="section border-y border-fg/10 bg-surface/40">
        <div className="container">
          <h2 className="h-display text-3xl md:text-4xl">How it works</h2>
          <ol className="mt-8 grid gap-4 md:grid-cols-4">
            {steps.map((s, i) => (
              <li key={s.t} className="glass rounded-2xl p-5">
                <span className="grid h-12 w-12 place-items-center rounded-xl bg-juice text-black"><Icon name={s.icon} className="h-6 w-6" /></span>
                <p className="mt-3 text-xs font-semibold uppercase tracking-widest text-muted">Step {i + 1}</p>
                <h3 className="font-display text-lg font-semibold">{s.t}</h3>
                <p className="text-sm text-muted">{s.d}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section">
        <div className="container max-w-3xl">
          <h2 className="h-display text-3xl md:text-4xl">Common questions</h2>
          <div className="mt-6 divide-y divide-fg/10">
            {[
              ["Is this a real, registered job?", "Yes. Juicer Technology is a registered company and payment is made as agreed: daily, weekly or monthly."],
              ["How much will I earn?", "Full-time monthly earnings are ₹15,000 to ₹18,000, based on your daily activity. Per-day and part-time work are also available."],
              ["Do I need a degree?", "No. We care that you are willing to learn and good with people."],
              ["Do I need my own two-wheeler?", "Yes, a two-wheeler and a smartphone are the basic requirements, because the work is in the field."],
              ["How will I report my work?", "You share your daily updates in a Telegram group run by our team."],
              ["Is there any fee to apply?", "No. Applying is free and we never ask for money."],
            ].map(([q, a]) => (
              <details key={q} className="group py-4">
                <summary className="cursor-pointer list-none font-display text-lg font-semibold marker:content-none">{q}</summary>
                <p className="mt-2 text-muted">{a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <a href="#apply" className="fixed inset-x-4 bottom-4 z-40 grid h-14 place-items-center rounded-full bg-juice font-display text-base font-bold text-[#0b0d12] shadow-2xl lg:hidden">Apply now</a>
    </>
  );
}
