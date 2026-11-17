import Link from "next/link";
import { Github, Instagram, Linkedin } from "lucide-react";
import { Logo } from "./Logo";
import { nav, site } from "@/content/site";

export function Footer() {
  return (
    <footer className="border-t border-fg/10 bg-surface/40">
      <div className="container grid gap-10 py-14 md:grid-cols-3">
        <div>
          <Logo variant="stacked" className="items-start text-left [&>svg]:h-20 [&>span:nth-of-type(1)]:text-3xl" />
          <p className="mt-4 max-w-xs text-sm text-muted">{site.tagline} Egocentric data sourcing and robotics.</p>
        </div>
        <div>
          <h2 className="font-display text-sm font-semibold uppercase tracking-wider">Explore</h2>
          <ul className="mt-4 space-y-2 text-sm text-muted">
            {nav.map((n) => <li key={n.href}><Link href={n.href} className="hover:text-fg">{n.label}</Link></li>)}
          </ul>
        </div>
        <div>
          <h2 className="font-display text-sm font-semibold uppercase tracking-wider">Connect</h2>
          <p className="mt-4 text-sm"><a href={`mailto:${site.email}`} className="text-muted hover:text-fg">{site.email}</a></p>
          <div className="mt-4 flex gap-3">
            {[[Linkedin, site.social.linkedin, "LinkedIn"], [Github, site.social.github, "GitHub"], [Instagram, site.social.instagram, "Instagram"]].map(([Icon, href, label]) => {
              const I = Icon as typeof Github;
              return <a key={label as string} href={href as string} aria-label={label as string} target="_blank" rel="noopener noreferrer" className="grid h-10 w-10 place-items-center rounded-full border border-fg/20 hover:bg-fg/10"><I className="h-4 w-4" /></a>;
            })}
          </div>
        </div>
      </div>
      <div className="border-t border-fg/10"><div className="container py-6 text-xs text-muted">© {new Date().getFullYear()} Juicer Technology. All rights reserved.</div></div>
    </footer>
  );
}
