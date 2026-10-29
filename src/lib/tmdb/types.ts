export type MediaType = "movie" | "tv";

export const MEDIA_TYPES: readonly MediaType[] = ["movie", "tv"];

export function isMediaType(value: unknown): value is MediaType {
  return value === "movie" || value === "tv";
}

/** The app's normalized view of a TMDB movie or TV show. */
export interface Title {
  id: number;
  mediaType: MediaType;
  name: string;
  overview: string;
  backdropPath: string | null;
  posterPath: string | null;
  year: string | null;
  rating: number | null;
  genres: string[];
}

export interface Genre {
  id: number;
  name: string;
}

/** Raw list item as returned by TMDB list/trending/discover endpoints. */
export interface TmdbListItem {
  id: number;
  media_type?: string;
  title?: string;
  name?: string;
  overview?: string;
  backdrop_path?: string | null;
  poster_path?: string | null;
  release_date?: string;
  first_air_date?: string;
  vote_average?: number;
  genre_ids?: number[];
}

export interface TmdbPage {
  page: number;
  results: TmdbListItem[];
  total_pages: number;
}

/** Raw detail payload (movie or TV) — only the fields we read. */
export interface TmdbDetails extends Omit<TmdbListItem, "genre_ids"> {
  genres?: Genre[];
}

export interface TmdbVideo {
  key: string;
  site: string;
  type: string;
  official?: boolean;
  name?: string;
}
