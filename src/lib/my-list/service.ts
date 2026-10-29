import "server-only";
import { connectMongo } from "@/lib/db/mongo";
import type { MediaType, Title } from "@/lib/tmdb/types";
import { MyListItem, type MyListItemDoc } from "./model";
import type { MyListEntry } from "./schema";

function toEntry(doc: MyListItemDoc): MyListEntry {
  return {
    id: doc.tmdbId,
    mediaType: doc.mediaType,
    name: doc.name,
    overview: "",
    backdropPath: doc.backdropPath ?? null,
    posterPath: doc.posterPath ?? null,
    year: doc.year ?? null,
    rating: doc.rating ?? null,
    genres: doc.genres ?? [],
    addedAt: new Date(doc.addedAt ?? 0).toISOString(),
  };
}

export async function listMyList(uid: string): Promise<MyListEntry[]> {
  await connectMongo();
  const docs = await MyListItem.find({ uid }).sort({ addedAt: -1 }).limit(500).lean<MyListItemDoc[]>();
  return docs.map(toEntry);
}

/** Idempotent: adding a title that is already saved returns the existing entry. */
export async function addToMyList(uid: string, title: Title): Promise<MyListEntry> {
  await connectMongo();
  const doc = await MyListItem.findOneAndUpdate(
    { uid, mediaType: title.mediaType, tmdbId: title.id },
    {
      $setOnInsert: {
        uid,
        mediaType: title.mediaType,
        tmdbId: title.id,
        name: title.name,
        backdropPath: title.backdropPath,
        posterPath: title.posterPath,
        year: title.year,
        rating: title.rating,
        genres: title.genres,
      },
    },
    { upsert: true, returnDocument: "after" },
  ).lean<MyListItemDoc>();
  if (!doc) throw new Error("Upsert returned no document");
  return toEntry(doc);
}

/** Returns true when an entry was removed. */
export async function removeFromMyList(uid: string, mediaType: MediaType, tmdbId: number): Promise<boolean> {
  await connectMongo();
  const result = await MyListItem.deleteOne({ uid, mediaType, tmdbId });
  return result.deletedCount === 1;
}
