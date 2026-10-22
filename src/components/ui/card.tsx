import { cn } from "@/lib/utils";

export function Card({ className, ...p }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("glass rounded-2xl p-6 transition-all duration-300", className)} {...p} />;
}
export const Badge = ({ className, ...p }: React.HTMLAttributes<HTMLSpanElement>) => (
  <span className={cn("inline-flex items-center rounded-full border border-fg/15 px-3 py-1 text-xs font-medium text-muted", className)} {...p} />
);
