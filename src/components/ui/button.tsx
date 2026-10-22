import * as React from "react";
import Link from "next/link";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const button = cva(
  "inline-flex items-center justify-center gap-2 rounded-full font-display font-semibold transition-all duration-200 focus-visible:outline-offset-2 disabled:opacity-50 disabled:pointer-events-none active:scale-[0.98]",
  {
    variants: {
      variant: {
        primary: "bg-juice text-[#0b0d12] hover:shadow-[0_0_32px_-4px_rgb(var(--orange)/0.7)] hover:-translate-y-0.5",
        volt: "bg-volt-grad text-[#0b0d12] hover:shadow-[0_0_32px_-4px_rgb(var(--volt)/0.7)] hover:-translate-y-0.5",
        outline: "border border-fg/25 text-fg hover:border-fg/60 hover:bg-fg/5",
        ghost: "text-fg hover:bg-fg/10",
      },
      size: { sm: "h-9 px-4 text-sm", md: "h-11 px-6 text-sm", lg: "h-14 px-8 text-base" },
    },
    defaultVariants: { variant: "primary", size: "md" },
  }
);

type Props = VariantProps<typeof button> & { className?: string; children: React.ReactNode };

export function Button({ variant, size, className, ...p }: Props & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return <button className={cn(button({ variant, size }), className)} {...p} />;
}

export function ButtonLink({ variant, size, className, href, ...p }: Props & { href: string } & Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "href">) {
  const cls = cn(button({ variant, size }), className);
  if (href.startsWith("http")) return <a href={href} className={cls} target="_blank" rel="noopener noreferrer" {...p} />;
  return <Link href={href} className={cls} {...p} />;
}
