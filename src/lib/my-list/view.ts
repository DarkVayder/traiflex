import type { MyListEntry } from "./schema";

export type ListFilter = "all" | "movie" | "tv";
export type ListSort = "recent" | "title" | "rating";

export const FILTER_LABELS: Record<ListFilter, string> = { all: "All", movie: "Movies", tv: "TV Shows" };
export const SORT_LABELS: Record<ListSort, string> = {
  recent: "Recently added",
  title: "Title A–Z",
  rating: "Highest rated",
};

export function countByType(items: MyListEntry[]): Record<ListFilter, number> {
  const movie = items.filter((item) => item.mediaType === "movie").length;
  return { all: items.length, movie, tv: items.length - movie };
}

/** Filters by media type and sorts a copy; the cached list is never mutated. */
export function viewMyList(items: MyListEntry[], filter: ListFilter, sort: ListSort): MyListEntry[] {
  const visible = filter === "all" ? [...items] : items.filter((item) => item.mediaType === filter);

  switch (sort) {
    case "title":
      return visible.sort((a, b) => a.name.localeCompare(b.name));
    case "rating":
      return visible.sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0) || a.name.localeCompare(b.name));
    default:
      return visible.sort((a, b) => Date.parse(b.addedAt) - Date.parse(a.addedAt));
  }
}
