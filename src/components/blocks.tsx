import { Video, Layers, Hand, Mic, Activity, Gamepad2, Tags, ShieldCheck, ClipboardList, UsersRound, Camera, ScanSearch, PackageCheck, Hammer, Shirt, ChefHat, CircuitBoard, Warehouse, Wheat, Home, HeartHandshake, BadgeCheck, Banknote, EyeOff, Boxes, Database, Crosshair, Cpu, Wrench, Handshake, Sparkles, Smartphone, Bike, IndianRupee, CalendarDays, Send, Smile, BookOpen, PhoneCall, Clock, type LucideIcon } from "lucide-react";

const Icons: Record<string, LucideIcon> = { Video, Layers, Hand, Mic, Activity, Gamepad2, Tags, ShieldCheck, ClipboardList, UsersRound, Camera, ScanSearch, PackageCheck, Hammer, Shirt, ChefHat, CircuitBoard, Warehouse, Wheat, Home, HeartHandshake, BadgeCheck, Banknote, EyeOff, Boxes, Database, Crosshair, Cpu, Wrench, Handshake, Sparkles, Smartphone, Bike, IndianRupee, CalendarDays, Send, Smile, BookOpen, PhoneCall, Clock };
import { HeroBackground } from "@/components/HeroBackground";
import { FloatingSlices } from "@/components/Motion";
import { Reveal } from "@/components/Reveal";
import { cn } from "@/lib/utils";

export function Icon({ name, className }: { name: string; className?: string }) {
  const I = Icons[name] ?? Sparkles;
  return <I className={className} aria-hidden />;
}

export function PageHero({ eyebrow, title, accent, children, actions }: { eyebrow: string; title: string; accent?: string; children?: React.ReactNode; actions?: React.ReactNode }) {
  return (
    <section className="relative overflow-hidden pb-16 pt-36 md:pb-24 md:pt-44">
      <div className="grid-bg absolute inset-0 [mask-image:linear-gradient(to_bottom,black,transparent)]" aria-hidden />
      <div className="absolute inset-0 opacity-70"><HeroBackground variant="volt" density={0.6} /></div>
      <div className="pointer-events-none absolute -top-40 left-1/2 h-96 w-[60rem] -translate-x-1/2 rounded-full bg-volt-grad opacity-20 blur-[120px]" aria-hidden />
      <FloatingSlices />
      <div className="container relative">
        <Reveal><p className="eyebrow">{eyebrow}</p></Reveal>
        <Reveal delay={0.05}>
          <h1 className="h-display mt-4 max-w-4xl text-4xl sm:text-5xl md:text-7xl">{title} {accent && <span className="text-volt">{accent}</span>}</h1>
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
