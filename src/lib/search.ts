export const MIN_QUERY_LENGTH = 2;
export const MAX_QUERY_LENGTH = 100;

/** Turns a raw ?q= value into a trimmed, single-spaced, length-capped query. */
export function normalizeQuery(raw: string | string[] | undefined): string {
  const value = Array.isArray(raw) ? raw[0] : raw;
  return (value ?? "").replace(/\s+/g, " ").trim().slice(0, MAX_QUERY_LENGTH);
}

export function searchHref(query: string): string {
  const normalized = normalizeQuery(query);
  return normalized ? `/search?q=${encodeURIComponent(normalized)}` : "/search";
}
