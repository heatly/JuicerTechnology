"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { Logo } from "./Logo";
import { ThemeToggle } from "./ThemeToggle";
import { ButtonLink } from "./ui/button";
import { nav } from "@/content/site";
import { cn } from "@/lib/utils";

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const path = usePathname();

  useEffect(() => setOpen(false), [path]);
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 10);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  return (
    <header className={cn("fixed inset-x-0 top-0 z-50 transition-all", scrolled || open ? "glass border-x-0 border-t-0" : "")}>
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:rounded focus:bg-lime focus:px-4 focus:py-2 focus:text-black">Skip to content</a>
      <div className="container flex h-16 items-center justify-between md:h-20">
        <Link href="/" aria-label="Juicer Technology home"><Logo animated /></Link>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary">
          {nav.map((item) => (
            <Link key={item.href} href={item.href} className="rounded-full px-4 py-2 text-sm font-medium text-muted transition hover:text-fg">{item.label}</Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <ButtonLink href="/contact#data" size="sm" variant="volt" className="hidden sm:inline-flex">Request data</ButtonLink>
          <button className="grid h-10 w-10 place-items-center rounded-full border border-fg/20 lg:hidden" aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open} onClick={() => setOpen(!open)}>
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open && (
        <nav className="container max-h-[80vh] overflow-y-auto pb-6 lg:hidden" aria-label="Mobile">
          {nav.map((item) => (
            <div key={item.href} className="border-t border-fg/10 py-3"><Link href={item.href} className="font-display text-lg font-semibold">{item.label}</Link></div>
          ))}
          <ButtonLink href="/contact#data" variant="volt" className="mt-4 w-full">Request data</ButtonLink>
        </nav>
      )}
    </header>
  );
}
