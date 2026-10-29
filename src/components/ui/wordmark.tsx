import Link from "next/link";
import { cn } from "@/lib/utils";

export function Wordmark({ className, href = "/" }: { className?: string; href?: string }) {
  return (
    <Link
      href={href}
      aria-label="Traiflex home"
      className={cn("font-display text-3xl leading-none tracking-wide text-primary sm:text-4xl", className)}
    >
      TRAIFLEX
    </Link>
  );
}
