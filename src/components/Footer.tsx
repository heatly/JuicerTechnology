import Link from "next/link";
import { Github, Instagram, Linkedin, Youtube } from "lucide-react";
import { Logo } from "./Logo";
import { cities } from "@/content/cities";
import { nav, site } from "@/content/site";

export function Footer() {
  return (
    <footer className="border-t border-fg/10 bg-surface/40">
      <div className="container grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-5">
        <div className="lg:col-span-2">
          <Logo variant="stacked" className="items-start text-left [&>svg]:h-20 [&>span:nth-of-type(1)]:text-3xl" />
          <p className="mt-4 max-w-sm text-sm text-muted">{site.tagline} A city-based builder community and a lab inventing AI software, robotics and Physical AI.</p>
          <div className="mt-6 flex gap-3">
            {[[Instagram, site.social.instagram, "Instagram"], [Linkedin, site.social.linkedin, "LinkedIn"], [Github, site.social.github, "GitHub"], [Youtube, site.social.youtube, "YouTube"]].map(([Icon, href, label]) => {
              const I = Icon as typeof Github;
              return (
                <a key={label as string} href={href as string} aria-label={label as string} target="_blank" rel="noopener noreferrer" className="grid h-10 w-10 place-items-center rounded-full border border-fg/20 hover:bg-fg/10"><I className="h-4 w-4" /></a>
              );
            })}
          </div>
        </div>
        {nav.slice(0, 2).map((g) => (
          <div key={g.label}>
            <h2 className="font-display text-sm font-semibold uppercase tracking-wider">{g.label}</h2>
            <ul className="mt-4 space-y-2 text-sm text-muted">
              {g.children!.map((c) => <li key={c.href}><Link href={c.href} className="hover:text-fg">{c.label}</Link></li>)}
            </ul>
          </div>
        ))}
        <div>
          <h2 className="font-display text-sm font-semibold uppercase tracking-wider">Cities</h2>
          <ul className="mt-4 space-y-2 text-sm text-muted">
            {cities.map((c) => (
              <li key={c.slug}>
                <Link href={`/chapters/${c.slug}`} className="hover:text-fg">{c.name}{c.status === "office" && <span className="ml-2 text-xs opacity-70">software office</span>}</Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="border-t border-fg/10">
        <div className="container flex flex-col gap-3 py-6 text-xs text-muted md:flex-row md:justify-between">
          <p>© {new Date().getFullYear()} Juicer Technology. All rights reserved.</p>
          <p className="flex flex-wrap gap-4">
            <Link href="/join" className="hover:text-fg">Join / Partner / Host a chapter</Link>
            <a href={`mailto:${site.email}`} className="hover:text-fg">{site.email}</a>
          </p>
        </div>
      </div>
    </footer>
  );
}
