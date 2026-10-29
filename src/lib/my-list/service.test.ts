import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import { afterAll, beforeAll, beforeEach, describe, expect, it } from "vitest";
import type { Title } from "@/lib/tmdb/types";
import { MyListItem } from "./model";
import { addToMyList, listMyList, removeFromMyList } from "./service";

let mongo: MongoMemoryServer;

const dune: Title = {
  id: 438631,
  mediaType: "movie",
  name: "Dune",
  overview: "Spice.",
  backdropPath: "/b.jpg",
  posterPath: "/p.jpg",
  year: "2021",
  rating: 7.8,
  genres: ["Science Fiction"],
};
const shogun: Title = { ...dune, id: 126308, mediaType: "tv", name: "Shōgun" };

beforeAll(async () => {
  mongo = await MongoMemoryServer.create();
  process.env.MONGODB_URI = mongo.getUri("traiflex");
  process.env.TMDB_API_KEY = "test";
  process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID = "test";
  await mongoose.connect(process.env.MONGODB_URI);
  await MyListItem.syncIndexes();
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongo?.stop();
});

beforeEach(async () => {
  await MyListItem.deleteMany({});
});

describe("My List service", () => {
  it("adds titles and lists newest first", async () => {
    await addToMyList("u1", dune);
    await new Promise((resolve) => setTimeout(resolve, 5));
    await addToMyList("u1", shogun);

    const items = await listMyList("u1");
    expect(items.map((item) => item.name)).toEqual(["Shōgun", "Dune"]);
    expect(items[1]).toMatchObject({ id: 438631, mediaType: "movie", backdropPath: "/b.jpg", genres: ["Science Fiction"] });
    expect(Date.parse(items[0].addedAt)).not.toBeNaN();
  });

  it("is idempotent when the same title is added twice", async () => {
    await addToMyList("u1", dune);
    await addToMyList("u1", dune);
    expect(await listMyList("u1")).toHaveLength(1);
  });

  it("keeps lists separate per user", async () => {
    await addToMyList("u1", dune);
    await addToMyList("u2", shogun);
    expect((await listMyList("u1")).map((item) => item.id)).toEqual([dune.id]);
    expect((await listMyList("u2")).map((item) => item.id)).toEqual([shogun.id]);
  });

  it("removes only the matching media type and id", async () => {
    await addToMyList("u1", dune);
    await addToMyList("u1", { ...dune, mediaType: "tv" });

    expect(await removeFromMyList("u1", "movie", dune.id)).toBe(true);
    expect(await removeFromMyList("u1", "movie", dune.id)).toBe(false);
    expect((await listMyList("u1")).map((item) => item.mediaType)).toEqual(["tv"]);
  });

  it("can't remove another user's entry", async () => {
    await addToMyList("u1", dune);
    expect(await removeFromMyList("u2", "movie", dune.id)).toBe(false);
    expect(await listMyList("u1")).toHaveLength(1);
  });
});
