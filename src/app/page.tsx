import Link from "next/link";
import { ArrowRight, Camera, Cpu } from "lucide-react";
import { GapBars, LoopRing, Pipeline, RigDiagram, RobotArm } from "@/components/Graphics";
import { HeroBackground } from "@/components/HeroBackground";
import { LazyPhysicalScene } from "@/components/LazyPhysicalScene";
import { FloatingSlices, SplitHeading, Tilt } from "@/components/Motion";
import { Reveal } from "@/components/Reveal";
import { SectionHead } from "@/components/blocks";
import { ButtonLink } from "@/components/ui/button";
import { loop } from "@/content/data";

export default function Home() {
  return (
    <>
      <section className="relative isolate overflow-hidden pb-16 pt-32 md:pt-40">
        <div className="grid-bg absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]" aria-hidden />
        <HeroBackground variant="volt" />
        <FloatingSlices />
        <div className="pointer-events-none absolute left-1/3 top-1/4 h-[28rem] w-[50rem] -translate-x-1/2 rounded-full bg-volt-grad opacity-15 blur-[140px]" aria-hidden />
        <div className="container relative grid items-center gap-12 lg:grid-cols-2">
          <div>
            <Reveal><p className="eyebrow">Juicer Technology · Physical AI</p></Reveal>
            <SplitHeading className="h-display mt-5 text-5xl sm:text-6xl md:text-7xl" lines={[{ text: "Real-world data" }, { text: "for physical AI.", accent: true }]} />
            <Reveal delay={0.15}>
              <p className="mt-7 max-w-xl text-lg text-muted md:text-xl">We source consented, first-person video of skilled work to train robots and world models. Then we build the robots that learn from it.</p>
            </Reveal>
            <Reveal delay={0.22}>
              <div className="mt-9 flex flex-wrap gap-4">
                <ButtonLink href="/contact#data" size="lg" variant="volt">Request data <ArrowRight className="h-5 w-5" aria-hidden /></ButtonLink>
                <ButtonLink href="/robotics" size="lg" variant="outline">See robotics</ButtonLink>
              </div>
            </Reveal>
          </div>
          <Reveal delay={0.2}>
            <div className="relative aspect-[4/3] overflow-hidden rounded-3xl border border-volt/30 bg-black shadow-[0_0_80px_-20px_rgb(var(--volt)/0.5)]"><LazyPhysicalScene /></div>
          </Reveal>
        </div>
      </section>

      <section className="section pt-8">
        <div className="container grid gap-6 lg:grid-cols-2">
          <Reveal>
            <Tilt className="group h-full">
              <Link href="/egocentric-data" className="relative block h-full overflow-hidden rounded-3xl border border-volt/30 bg-gradient-to-br from-volt/15 via-lime/5 to-transparent p-8 transition hover:border-volt md:p-10">
                <Camera className="h-9 w-9 text-volt" aria-hidden />
                <p className="eyebrow mt-6 !text-volt">Data</p>
                <h2 className="h-display mt-2 text-3xl md:text-4xl">Egocentric data sourcing</h2>
                <p className="mt-3 max-w-md text-muted">Consented first-person recordings of real work, captured by skilled people, reviewed, labelled and delivered to your spec.</p>
                <div className="mx-auto mt-6 max-w-md"><RigDiagram /></div>
                <span className="mt-4 inline-flex items-center gap-2 font-display font-semibold text-volt">Explore data sourcing <ArrowRight className="h-5 w-5 transition group-hover:translate-x-1" aria-hidden /></span>
              </Link>
            </Tilt>
          </Reveal>
          <Reveal delay={0.1}>
            <Tilt className="group h-full">
              <Link href="/robotics" className="relative block h-full overflow-hidden rounded-3xl border border-orange/30 bg-gradient-to-br from-orange/15 via-lime/5 to-transparent p-8 transition hover:border-orange md:p-10">
                <Cpu className="h-9 w-9 text-orange" aria-hidden />
                <p className="eyebrow mt-6 !text-orange">Machines</p>
                <h2 className="h-display mt-2 text-3xl md:text-4xl">Robotics</h2>
                <p className="mt-3 max-w-md text-muted">Research platforms, fast prototypes and custom robots, trained on the human demonstrations we collect.</p>
                <div className="mx-auto mt-6 max-w-[16rem]"><RobotArm /></div>
                <span className="mt-4 inline-flex items-center gap-2 font-display font-semibold text-orange">Explore robotics <ArrowRight className="h-5 w-5 transition group-hover:translate-x-1" aria-hidden /></span>
              </Link>
            </Tilt>
          </Reveal>
        </div>
      </section>

      <section className="section border-y border-fg/10 bg-surface/40">
        <div className="container grid items-center gap-12 lg:grid-cols-2">
          <SectionHead eyebrow="The data gap" title="Machines read the internet. Nobody recorded the work.">Text and images are everywhere. Video of skilled hands doing real tasks, from the worker's own point of view, is rare. That is the data robots need.</SectionHead>
          <Reveal><GapBars /></Reveal>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHead eyebrow="How data sourcing works" title="From a brief to a delivered dataset." />
          <Pipeline />
        </div>
      </section>

      <section className="section border-t border-fg/10 bg-surface/40">
        <div className="container grid items-center gap-12 lg:grid-cols-2">
          <Reveal><LoopRing /></Reveal>
          <div>
            <SectionHead eyebrow="One loop" title="Data feeds robots. Robots sharpen the data.">Because we collect the demonstrations and build the machines, what a robot gets wrong becomes the next thing we record.</SectionHead>
            <ol className="space-y-3">
              {loop.map((l, i) => (
                <li key={l.t} className="flex gap-4"><span className="grid h-8 w-8 shrink-0 place-items-center rounded-full border border-lime/60 font-display text-sm font-bold">{i + 1}</span><p><b className="font-display">{l.t}.</b> <span className="text-muted">{l.d}</span></p></li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="relative overflow-hidden rounded-3xl bg-volt-grad p-10 text-center text-[#0b0d12] md:p-20">
            <h2 className="h-display mx-auto max-w-3xl text-4xl md:text-6xl">Tell us what your robot needs to learn.</h2>
            <p className="mx-auto mt-5 max-w-xl text-lg text-black/80">License a dataset, commission a collection, or pilot a robot with us.</p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Link href="/contact#data" className="inline-flex h-14 items-center rounded-full bg-black px-8 font-display font-semibold text-white hover:bg-black/80">Request data</Link>
              <Link href="/contact#pilot" className="inline-flex h-14 items-center rounded-full border-2 border-black px-8 font-display font-semibold hover:bg-black/10">Pilot a robot</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
