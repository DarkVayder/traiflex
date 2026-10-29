import { z } from "zod";
import type { Title } from "@/lib/tmdb/types";

/** Body of POST /api/my-list. Only identifiers — the server looks the title up on TMDB itself. */
export const addToMyListSchema = z.object({
  mediaType: z.enum(["movie", "tv"]),
  tmdbId: z.number().int().positive(),
});

export type AddToMyListInput = z.infer<typeof addToMyListSchema>;

export const myListParamsSchema = z.object({
  mediaType: z.enum(["movie", "tv"]),
  id: z.coerce.number().int().positive(),
});

export interface MyListEntry extends Title {
  addedAt: string;
}

export interface MyListResponse {
  items: MyListEntry[];
}

export function myListKey(item: { mediaType: string; id: number }): string {
  return `${item.mediaType}:${item.id}`;
}
