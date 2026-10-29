import type { Genre, MediaType, Title, TmdbDetails, TmdbListItem, TmdbVideo } from "./types";

export type GenreLookup = Record<number, string>;

export function toGenreLookup(...lists: Genre[][]): GenreLookup {
  const lookup: GenreLookup = {};
  for (const list of lists) for (const { id, name } of list) lookup[id] = name;
  return lookup;
}

function yearOf(date: string | undefined): string | null {
  return date && date.length >= 4 ? date.slice(0, 4) : null;
}

function ratingOf(vote: number | undefined): number | null {
  return typeof vote === "number" && vote > 0 ? Math.round(vote * 10) / 10 : null;
}

/**
 * Normalizes a list item. Returns null for people (trending/all mixes them in)
 * and for titles without a backdrop, which can't render as a card.
 */
export function normalizeListItem(
  item: TmdbListItem,
  fallbackType: MediaType,
  genres: GenreLookup,
): Title | null {
  const mediaType = item.media_type ?? fallbackType;
  if (mediaType !== "movie" && mediaType !== "tv") return null;
  if (!item.backdrop_path) return null;

  return {
    id: item.id,
    mediaType,
    name: item.title ?? item.name ?? "Untitled",
    overview: item.overview ?? "",
    backdropPath: item.backdrop_path,
    posterPath: item.poster_path ?? null,
    year: yearOf(item.release_date ?? item.first_air_date),
    rating: ratingOf(item.vote_average),
    genres: (item.genre_ids ?? [])
      .map((id) => genres[id])
      .filter((name): name is string => Boolean(name))
      .slice(0, 3),
  };
}

export function normalizeList(items: TmdbListItem[], fallbackType: MediaType, genres: GenreLookup): Title[] {
  const seen = new Set<string>();
  const titles: Title[] = [];
  for (const item of items) {
    const title = normalizeListItem(item, fallbackType, genres);
    if (!title) continue;
    const key = `${title.mediaType}:${title.id}`;
    if (seen.has(key)) continue;
    seen.add(key);
    titles.push(title);
  }
  return titles;
}

export function normalizeDetails(details: TmdbDetails, mediaType: MediaType): Title {
  return {
    id: details.id,
    mediaType,
    name: details.title ?? details.name ?? "Untitled",
    overview: details.overview ?? "",
    backdropPath: details.backdrop_path ?? null,
    posterPath: details.poster_path ?? null,
    year: yearOf(details.release_date ?? details.first_air_date),
    rating: ratingOf(details.vote_average),
    genres: (details.genres ?? []).map((genre) => genre.name).slice(0, 3),
  };
}

const VIDEO_TYPE_RANK: Record<string, number> = { Trailer: 0, Teaser: 1, Clip: 2, Featurette: 3 };

/** Picks the best YouTube video: official trailers first, then teasers, then anything. */
export function pickTrailerKey(videos: TmdbVideo[]): string | null {
  const candidates = videos.filter((video) => video.site === "YouTube" && video.key);
  if (candidates.length === 0) return null;

  const rank = (video: TmdbVideo) =>
    (VIDEO_TYPE_RANK[video.type] ?? 9) * 2 + (video.official ? 0 : 1);

  return [...candidates].sort((a, b) => rank(a) - rank(b))[0].key;
}
