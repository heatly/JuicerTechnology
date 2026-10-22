"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { ChevronDown, Menu, X } from "lucide-react";
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
            <div key={item.label} className="group relative">
              <Link href={item.href} className="flex items-center gap-1 rounded-full px-4 py-2 text-sm font-medium text-muted transition hover:text-fg">
                {item.label}
                {item.children && <ChevronDown className="h-3.5 w-3.5" aria-hidden />}
              </Link>
              {item.children && (
                <div className="invisible absolute left-0 top-full pt-2 opacity-0 transition group-focus-within:visible group-focus-within:opacity-100 group-hover:visible group-hover:opacity-100">
                  <div className="glass min-w-60 rounded-2xl bg-bg/90 p-2 shadow-2xl">
                    {item.children.map((c) => (
                      <Link key={c.href} href={c.href} className="block rounded-xl px-4 py-2.5 text-sm hover:bg-fg/10">{c.label}</Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <ButtonLink href="/join" size="sm" className="hidden sm:inline-flex">Join Juicer</ButtonLink>
          <button className="grid h-10 w-10 place-items-center rounded-full border border-fg/20 lg:hidden" aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open} onClick={() => setOpen(!open)}>
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open && (
        <nav className="container max-h-[80vh] overflow-y-auto pb-6 lg:hidden" aria-label="Mobile">
          {nav.map((item) => (
            <div key={item.label} className="border-t border-fg/10 py-3">
              <Link href={item.href} className="font-display text-lg font-semibold">{item.label}</Link>
              <div className="mt-2 grid gap-1 pl-3">
                {item.children?.map((c) => <Link key={c.href} href={c.href} className="py-1.5 text-sm text-muted">{c.label}</Link>)}
              </div>
            </div>
          ))}
          <ButtonLink href="/join" className="mt-4 w-full">Join Juicer</ButtonLink>
        </nav>
      )}
    </header>
  );
}
