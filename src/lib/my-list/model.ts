import { Schema, model, models, type Model } from "mongoose";

export interface MyListItemDoc {
  uid: string;
  mediaType: "movie" | "tv";
  tmdbId: number;
  name: string;
  backdropPath: string | null;
  posterPath: string | null;
  year: string | null;
  rating: number | null;
  genres: string[];
  addedAt: Date;
}

/** One saved title per document, keyed by Firebase uid — adds and removes are single atomic writes. */
const myListItemSchema = new Schema<MyListItemDoc>(
  {
    uid: { type: String, required: true, index: true },
    mediaType: { type: String, required: true, enum: ["movie", "tv"] },
    tmdbId: { type: Number, required: true },
    name: { type: String, required: true },
    backdropPath: { type: String, default: null },
    posterPath: { type: String, default: null },
    year: { type: String, default: null },
    rating: { type: Number, default: null },
    genres: { type: [String], default: [] },
  },
  { timestamps: { createdAt: "addedAt", updatedAt: false }, collection: "my_list_items" },
);

myListItemSchema.index({ uid: 1, mediaType: 1, tmdbId: 1 }, { unique: true });

export const MyListItem: Model<MyListItemDoc> =
  (models.MyListItem as Model<MyListItemDoc> | undefined) ?? model<MyListItemDoc>("MyListItem", myListItemSchema);
