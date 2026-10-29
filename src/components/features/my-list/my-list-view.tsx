"use client";

import { ChevronDown } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  countByType,
  FILTER_LABELS,
  SORT_LABELS,
  viewMyList,
  type ListFilter,
  type ListSort,
} from "@/lib/my-list/view";
import { cn } from "@/lib/utils";
import { TitleGrid, TitleGridSkeleton } from "../browse/title-grid";
import { EmptyState } from "../empty-state";
import { useMyList } from "./use-my-list";

const FILTERS = Object.keys(FILTER_LABELS) as ListFilter[];
const SORTS = Object.keys(SORT_LABELS) as ListSort[];

export function MyListView() {
  const { data: items, isPending, isError, error, refetch } = useMyList();
  const [filter, setFilter] = useState<ListFilter>("all");
  const [sort, setSort] = useState<ListSort>("recent");

  let controls = null;
  let body;
  if (isPending) {
    body = <TitleGridSkeleton count={5} />;
  } else if (isError) {
    body = (
      <EmptyState
        title="Couldn't load My List"
        description={error.message}
        action={<Button onClick={() => refetch()}>Try again</Button>}
      />
    );
  } else if (items.length === 0) {
    body = (
      <EmptyState
        title="Your list is empty"
        description="Use the + button on any title to save it here for later."
        action={
          <Link href="/" className={buttonVariants()}>
            Browse trending titles
          </Link>
        }
      />
    );
  } else {
    const counts = countByType(items);
    const visible = viewMyList(items, filter, sort);

    controls = (
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div role="group" aria-label="Filter by type" className="flex flex-wrap gap-2">
          {FILTERS.map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => setFilter(option)}
              aria-pressed={filter === option}
              className={cn(
                "h-10 rounded-full border px-4 text-sm font-medium transition-colors",
                filter === option
                  ? "border-foreground bg-foreground text-background"
                  : "border-border text-muted hover:border-muted hover:text-foreground",
              )}
            >
              {FILTER_LABELS[option]} <span className="opacity-70">{counts[option]}</span>
            </button>
          ))}
        </div>

        <div className="relative inline-flex items-center">
          <label htmlFor="my-list-sort" className="sr-only">
            Sort My List
          </label>
          <select
            id="my-list-sort"
            value={sort}
            onChange={(event) => setSort(event.target.value as ListSort)}
            className="h-10 appearance-none rounded-md border border-border bg-surface pl-4 pr-10 text-sm font-medium text-foreground"
          >
            {SORTS.map((option) => (
              <option key={option} value={option}>
                {SORT_LABELS[option]}
              </option>
            ))}
          </select>
          <ChevronDown className="pointer-events-none absolute right-3 size-4 text-muted" aria-hidden />
        </div>
      </div>
    );

    body =
      visible.length === 0 ? (
        <EmptyState
          title={`No ${FILTER_LABELS[filter].toLowerCase()} in your list yet`}
          action={<Button onClick={() => setFilter("all")}>Show everything</Button>}
        />
      ) : (
        <TitleGrid titles={visible} label={`My List: ${FILTER_LABELS[filter]}`} />
      );
  }

  return (
    <div className="flex flex-col gap-8 px-4 pb-16 pt-28 sm:px-8 lg:px-12">
      <div className="flex items-baseline gap-4">
        <h1 className="font-display text-4xl tracking-wide sm:text-5xl">My List</h1>
        {items?.length ? (
          <p className="text-muted">
            {items.length} {items.length === 1 ? "title" : "titles"}
          </p>
        ) : null}
      </div>
      {controls}
      {body}
    </div>
  );
}
