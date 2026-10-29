import "server-only";
import { cacheLife } from "next/cache";
import { TmdbError, tmdbGet, type TmdbParams } from "./client";
import { normalizeDetails, normalizeList, pickTrailerKey, toGenreLookup, type GenreLookup } from "./normalize";

// TMDB data is public and changes slowly, so every query is cached server-side
// ("use cache") — rows render into the static shell and the key never reaches the browser.
import type { Genre, MediaType, Title, TmdbDetails, TmdbPage, TmdbVideo } from "./types";

export async function getGenres(mediaType: MediaType): Promise<Genre[]> {
  "use cache";
  cacheLife("days");
  const { genres } = await tmdbGet<{ genres: Genre[] }>(`/genre/${mediaType}/list`);
  return genres;
}

async function getGenreLookup(): Promise<GenreLookup> {
  const [movie, tv] = await Promise.all([getGenres("movie"), getGenres("tv")]);
  return toGenreLookup(movie, tv);
}

/**
 * Fetches and normalizes a TMDB list endpoint. `pages` > 1 fetches pages in
 * parallel so a row has enough titles after people/backdrop-less items are dropped.
 */
export async function getTitles(
  path: string,
  fallbackType: MediaType,
  params: TmdbParams = {},
  pages = 1,
): Promise<Title[]> {
  "use cache";
  cacheLife("hours");

  const [lookup, results] = await Promise.all([
    getGenreLookup(),
    Promise.all(
      Array.from({ length: pages }, (_, index) => tmdbGet<TmdbPage>(path, { ...params, page: index + 1 })),
    ),
  ]);
  return normalizeList(
    results.flatMap((page) => page.results),
    fallbackType,
    lookup,
  );
}

/** Movies and shows matching a free-text query. People and backdrop-less results are dropped. */
export async function searchTitles(query: string): Promise<Title[]> {
  "use cache";
  cacheLife("hours");
  const [lookup, page] = await Promise.all([
    getGenreLookup(),
    tmdbGet<TmdbPage>("/search/multi", { query, include_adult: "false" }),
  ]);
  return normalizeList(page.results, "movie", lookup);
}

/** A single movie or show, or null when TMDB has no such title. */
export async function getTitle(mediaType: MediaType, id: number): Promise<Title | null> {
  "use cache";
  cacheLife("hours");
  try {
    const details = await tmdbGet<TmdbDetails>(`/${mediaType}/${id}`);
    return normalizeDetails(details, mediaType);
  } catch (error) {
    if (error instanceof TmdbError && error.status === 404) return null;
    throw error;
  }
}

export async function getTrailerKey(mediaType: MediaType, id: number): Promise<string | null> {
  "use cache";
  cacheLife("hours");
  try {
    const { results } = await tmdbGet<{ results: TmdbVideo[] }>(`/${mediaType}/${id}/videos`);
    return pickTrailerKey(results);
  } catch (error) {
    if (error instanceof TmdbError && error.status === 404) return null;
    throw error;
  }
}
