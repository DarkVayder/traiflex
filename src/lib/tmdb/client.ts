import "server-only";
import { serverEnv } from "@/lib/env";

const TMDB_BASE_URL = "https://api.themoviedb.org/3";

export class TmdbError extends Error {
  constructor(
    readonly status: number,
    readonly path: string,
  ) {
    super(`TMDB request to ${path} failed with ${status}`);
    this.name = "TmdbError";
  }
}

export type TmdbParams = Record<string, string | number | undefined>;

/** Server-only TMDB GET. The API key never leaves the server. */
export async function tmdbGet<T>(path: string, params: TmdbParams = {}): Promise<T> {
  const url = new URL(`${TMDB_BASE_URL}${path}`);
  url.searchParams.set("api_key", serverEnv().TMDB_API_KEY);
  url.searchParams.set("language", "en-US");
  for (const [key, value] of Object.entries(params)) {
    if (value !== undefined) url.searchParams.set(key, String(value));
  }

  const response = await fetch(url, {
    headers: { Accept: "application/json" },
    signal: AbortSignal.timeout(10_000),
  });
  if (!response.ok) throw new TmdbError(response.status, path);
  return (await response.json()) as T;
}
