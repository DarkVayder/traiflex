"use client";

import type { ImageLoaderProps } from "next/image";

const TMDB_IMAGE_BASE = "https://image.tmdb.org/t/p";
const TMDB_WIDTHS = [300, 500, 780, 1280] as const;

/** Maps a requested width onto the closest TMDB rendition at or above it. */
export function tmdbSizeFor(width: number): string {
  const match = TMDB_WIDTHS.find((size) => size >= width);
  return match ? `w${match}` : "original";
}

/**
 * next/image loader for TMDB file paths (e.g. "/abc123.jpg").
 * Absolute URLs pass through untouched.
 */
export default function tmdbImageLoader({ src, width }: ImageLoaderProps): string {
  if (/^https?:\/\//.test(src)) return src;
  return `${TMDB_IMAGE_BASE}/${tmdbSizeFor(width)}${src}`;
}
