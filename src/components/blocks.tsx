import Link from "next/link";
import * as Icons from "lucide-react";
import { ArrowRight, CalendarDays, MapPin } from "lucide-react";
import { Card, Badge } from "@/components/ui/card";
import { HeroBackground } from "@/components/HeroBackground";
import { FloatingSlices } from "@/components/Motion";
import { Reveal } from "@/components/Reveal";
import { cn, formatDate } from "@/lib/utils";
import { getCity, type City } from "@/content/cities";
import { typeLabel, isPast, type JuicerEvent } from "@/content/events";

export function Icon({ name, className }: { name: string; className?: string }) {
  const I = (Icons as unknown as Record<string, Icons.LucideIcon>)[name] ?? Icons.Sparkles;
  return <I className={className} aria-hidden />;
}

export function PageHero({ eyebrow, title, accent, children, variant = "juice", actions }: { eyebrow: string; title: string; accent?: string; children?: React.ReactNode; variant?: "juice" | "volt"; actions?: React.ReactNode }) {
  return (
    <section className="relative overflow-hidden pb-16 pt-36 md:pb-24 md:pt-44">
      <div className="grid-bg absolute inset-0 [mask-image:linear-gradient(to_bottom,black,transparent)]" aria-hidden />
      <div className="absolute inset-0 opacity-70"><HeroBackground variant={variant} density={0.6} /></div>
      <div className={cn("pointer-events-none absolute -top-40 left-1/2 h-96 w-[60rem] -translate-x-1/2 rounded-full blur-[120px] opacity-25", variant === "juice" ? "bg-juice" : "bg-volt-grad")} aria-hidden />
      {variant === "juice" && <FloatingSlices />}
      <div className="container relative">
        <Reveal><p className="eyebrow">{eyebrow}</p></Reveal>
        <Reveal delay={0.05}>
          <h1 className="h-display mt-4 max-w-4xl text-4xl sm:text-5xl md:text-7xl">{title} {accent && <span className={variant === "juice" ? "text-juice" : "text-volt"}>{accent}</span>}</h1>
        </Reveal>
        {children && <Reveal delay={0.1}><div className="mt-6 max-w-2xl text-lg text-muted">{children}</div></Reveal>}
        {actions && <Reveal delay={0.15}><div className="mt-8 flex flex-wrap gap-3">{actions}</div></Reveal>}
      </div>
    </section>
  );
}

export function SectionHead({ eyebrow, title, children, className }: { eyebrow?: string; title: string; children?: React.ReactNode; className?: string }) {
  return (
    <Reveal className={cn("mb-12 max-w-3xl", className)}>
      {eyebrow && <p className="eyebrow">{eyebrow}</p>}
      <h2 className="h-display mt-3 text-3xl md:text-5xl">{title}</h2>
      {children && <p className="mt-4 text-lg text-muted">{children}</p>}
    </Reveal>
  );
}

export function CityCard({ city, upcoming }: { city: City; upcoming?: JuicerEvent }) {
  const live = city.status === "live";
  return (
    <Link href={`/chapters/${city.slug}`} className="group block h-full">
      <Card className="flex h-full flex-col hover:-translate-y-1 hover:border-lime/50">
        <div className="flex items-start justify-between">
          <h3 className="font-display text-2xl font-semibold">{city.name}</h3>
          <Badge className={live ? "border-lime/50 text-accent" : "border-volt/50 text-volt"}>{live ? "Community live" : "Software office"}</Badge>
        </div>
        <p className="mt-1 text-sm text-muted">{city.state}</p>
        <p className="mt-4 flex-1 text-sm text-muted">{city.blurb}</p>
        <div className="mt-5 text-sm">
          {live ? (
            <>
              {upcoming ? <p className="font-medium">Next: {upcoming.title} <span className="text-muted">· {formatDate(upcoming.date, { day: "numeric", month: "short" })}</span></p> : <p className="text-muted">Next event announced soon</p>}
              <p className="mt-1 text-muted">Lead: {city.lead?.name}</p>
            </>
          ) : <p className="text-muted">Our software team is here. Community is not live yet.</p>}
        </div>
        <span className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-accent">{live ? "Join chapter" : "Bring community here"} <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" aria-hidden /></span>
      </Card>
    </Link>
  );
}

export function EventCard({ event }: { event: JuicerEvent }) {
  const city = getCity(event.city);
  const past = isPast(event);
  return (
    <Link href={`/events/${event.slug}`} className="group block h-full">
      <Card className="flex h-full flex-col overflow-hidden p-0 hover:-translate-y-1 hover:border-lime/50">
        <div className={cn("relative h-36 p-5", event.type === "hackathon" ? "bg-juice" : event.type === "workshop" || event.type === "bootcamp" ? "bg-volt-grad" : "bg-gradient-to-br from-orange to-lime")}>
          <span className="rounded-full bg-black/80 px-3 py-1 text-xs font-semibold text-white">{typeLabel[event.type]}</span>
          {past && <span className="ml-2 rounded-full bg-black/60 px-3 py-1 text-xs text-white">Past</span>}
        </div>
        <div className="flex flex-1 flex-col p-6">
          <h3 className="font-display text-lg font-semibold leading-snug">{event.title}</h3>
          <p className="mt-2 flex-1 text-sm text-muted">{event.summary}</p>
          <div className="mt-4 space-y-1 text-sm text-muted">
            <p className="flex items-center gap-2"><CalendarDays className="h-4 w-4" aria-hidden />{formatDate(event.date)}</p>
            <p className="flex items-center gap-2"><MapPin className="h-4 w-4" aria-hidden />{city?.name}</p>
          </div>
        </div>
      </Card>
    </Link>
  );
}
