"use client";

import { ChevronDown } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useTransition } from "react";
import type { Genre } from "@/lib/tmdb/types";
import { cn } from "@/lib/utils";

/** Genre filter kept in the URL (?genre=28) so filtered views are linkable and survive reloads. */
export function GenreSelect({ genres, value }: { genres: Genre[]; value: number | null }) {
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  return (
    <div className="relative inline-flex items-center">
      <label htmlFor="genre-select" className="sr-only">
        Filter by genre
      </label>
      <select
        id="genre-select"
        value={value ?? ""}
        onChange={(event) => {
          const next = event.target.value;
          startTransition(() => router.push(next ? `${pathname}?genre=${next}` : pathname, { scroll: false }));
        }}
        className={cn(
          "h-10 appearance-none rounded-md border border-border bg-surface pl-4 pr-10 text-sm font-medium text-foreground",
          isPending && "opacity-60",
        )}
      >
        <option value="">All genres</option>
        {genres.map((genre) => (
          <option key={genre.id} value={genre.id}>
            {genre.name}
          </option>
        ))}
      </select>
      <ChevronDown className="pointer-events-none absolute right-3 size-4 text-muted" aria-hidden />
    </div>
  );
}
