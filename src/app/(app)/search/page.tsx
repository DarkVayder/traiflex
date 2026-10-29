import type { Metadata } from "next";
import { Suspense } from "react";
import { TitleGrid, TitleGridSkeleton } from "@/components/features/browse/title-grid";
import { EmptyState } from "@/components/features/empty-state";
import { SearchBox } from "@/components/features/search/search-box";
import { MIN_QUERY_LENGTH, normalizeQuery } from "@/lib/search";
import { searchTitles } from "@/lib/tmdb/queries";

export const metadata: Metadata = { title: "Search" };

async function SearchResults({ query }: { query: string }) {
  const titles = await searchTitles(query);
  if (titles.length === 0) {
    return <EmptyState title={`No results for “${query}”`} description="Check the spelling or try a different title." />;
  }
  return (
    <section className="flex flex-col gap-4" aria-live="polite">
      <p className="text-muted">
        {titles.length} {titles.length === 1 ? "result" : "results"} for “{query}”
      </p>
      <TitleGrid titles={titles} label={`Results for ${query}`} />
    </section>
  );
}

async function SearchContent({ searchParams }: { searchParams: PageProps<"/search">["searchParams"] }) {
  const query = normalizeQuery((await searchParams).q);

  return (
    <div className="flex flex-col gap-8 px-4 pb-16 pt-28 sm:px-8 lg:px-12">
      <h1 className="font-display text-4xl tracking-wide sm:text-5xl">Search</h1>
      <SearchBox initialQuery={query} />
      {query.length < MIN_QUERY_LENGTH ? (
        <EmptyState title="Find something to watch" description="Search movies and TV shows by title." />
      ) : (
        <Suspense key={query} fallback={<TitleGridSkeleton />}>
          <SearchResults query={query} />
        </Suspense>
      )}
    </div>
  );
}

export default function SearchPage({ searchParams }: PageProps<"/search">) {
  return (
    <Suspense fallback={<div className="px-4 pb-16 pt-28 sm:px-8 lg:px-12" aria-hidden />}>
      <SearchContent searchParams={searchParams} />
    </Suspense>
  );
}
