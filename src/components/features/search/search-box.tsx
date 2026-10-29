"use client";

import { Search, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState, useTransition, type FormEvent } from "react";
import { Input } from "@/components/ui/input";
import { normalizeQuery, searchHref } from "@/lib/search";
import { cn } from "@/lib/utils";

/** Live search kept in the URL (?q=) so results are linkable and the back button works. */
export function SearchBox({ initialQuery }: { initialQuery: string }) {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const [value, setValue] = useState(initialQuery);
  const [isPending, startTransition] = useTransition();

  // Follow the URL on back/forward, but never overwrite what the user is typing.
  useEffect(() => {
    if (document.activeElement !== inputRef.current) setValue(initialQuery);
  }, [initialQuery]);

  // Debounce typing into a URL update.
  useEffect(() => {
    if (normalizeQuery(value) === initialQuery) return;
    const id = setTimeout(() => {
      startTransition(() => router.replace(searchHref(value), { scroll: false }));
    }, 350);
    return () => clearTimeout(id);
  }, [value, initialQuery, router]);

  const onSubmit = (event: FormEvent) => {
    event.preventDefault();
    startTransition(() => router.replace(searchHref(value), { scroll: false }));
  };

  return (
    <form role="search" onSubmit={onSubmit} className="relative max-w-2xl">
      <label htmlFor="search-input" className="sr-only">
        Search movies and TV shows
      </label>
      <Search className="pointer-events-none absolute left-4 top-1/2 size-5 -translate-y-1/2 text-muted" aria-hidden />
      <Input
        id="search-input"
        ref={inputRef}
        type="search"
        value={value}
        onChange={(event) => setValue(event.target.value)}
        placeholder="Search movies and TV shows"
        autoComplete="off"
        autoFocus={!initialQuery}
        enterKeyHint="search"
        maxLength={100}
        className={cn("pl-12 pr-12 [&::-webkit-search-cancel-button]:hidden", isPending && "opacity-80")}
      />
      {value ? (
        <button
          type="button"
          onClick={() => {
            setValue("");
            inputRef.current?.focus();
          }}
          aria-label="Clear search"
          className="absolute inset-y-0 right-0 flex w-12 items-center justify-center rounded-md text-muted hover:text-foreground"
        >
          <X className="size-5" aria-hidden />
        </button>
      ) : null}
    </form>
  );
}
