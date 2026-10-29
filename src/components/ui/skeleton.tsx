import { cn } from "@/lib/utils";

export function Skeleton({ className }: { className?: string }) {
  return <div aria-hidden className={cn("animate-pulse rounded-md bg-surface-raised", className)} />;
}

export function Spinner({ label = "Loading" }: { label?: string }) {
  return (
    <span role="status" className="inline-flex items-center gap-2">
      <span className="size-6 animate-spin rounded-full border-2 border-muted border-t-primary" aria-hidden />
      <span className="sr-only">{label}</span>
    </span>
  );
}
