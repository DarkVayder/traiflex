import { describe, expect, it } from "vitest";
import { loginHref } from "./auth/login-href";
import { isDatabaseUnavailable } from "./db/errors";
import type { MyListEntry } from "./my-list/schema";
import { countByType, viewMyList } from "./my-list/view";
import { normalizeQuery, searchHref } from "./search";

const entry = (overrides: Partial<MyListEntry>): MyListEntry => ({
  id: 1,
  mediaType: "movie",
  name: "Alpha",
  overview: "",
  backdropPath: "/a.jpg",
  posterPath: null,
  year: "2024",
  rating: 7,
  genres: [],
  addedAt: "2026-01-01T00:00:00.000Z",
  ...overrides,
});

const items = [
  entry({ id: 1, name: "Zulu", rating: 6.5, addedAt: "2026-01-01T00:00:00.000Z" }),
  entry({ id: 2, name: "Alpha", mediaType: "tv", rating: 9, addedAt: "2026-03-01T00:00:00.000Z" }),
  entry({ id: 3, name: "Mike", rating: null, addedAt: "2026-02-01T00:00:00.000Z" }),
];

describe("viewMyList", () => {
  it("sorts by most recently added by default", () => {
    expect(viewMyList(items, "all", "recent").map((item) => item.id)).toEqual([2, 3, 1]);
  });

  it("sorts by title and by rating, with unrated titles last", () => {
    expect(viewMyList(items, "all", "title").map((item) => item.name)).toEqual(["Alpha", "Mike", "Zulu"]);
    expect(viewMyList(items, "all", "rating").map((item) => item.id)).toEqual([2, 1, 3]);
  });

  it("filters by media type without mutating the input", () => {
    const before = items.map((item) => item.id);
    expect(viewMyList(items, "tv", "recent").map((item) => item.id)).toEqual([2]);
    expect(items.map((item) => item.id)).toEqual(before);
  });

  it("counts titles per type", () => {
    expect(countByType(items)).toEqual({ all: 3, movie: 2, tv: 1 });
  });
});

describe("search query helpers", () => {
  it("trims, collapses spaces and caps the length", () => {
    expect(normalizeQuery("  the   dark  knight ")).toBe("the dark knight");
    expect(normalizeQuery(["dune", "ignored"])).toBe("dune");
    expect(normalizeQuery(undefined)).toBe("");
    expect(normalizeQuery("x".repeat(300))).toHaveLength(100);
  });

  it("builds a safe search URL", () => {
    expect(searchHref("")).toBe("/search");
    expect(searchHref("a&b=c d")).toBe("/search?q=a%26b%3Dc%20d");
  });
});

describe("loginHref", () => {
  it("returns visitors to the page they came from, and skips ?next for the home page", () => {
    expect(loginHref("/")).toBe("/login");
    expect(loginHref("/watch/movie/1?x=1")).toBe("/login?next=%2Fwatch%2Fmovie%2F1%3Fx%3D1");
  });
});

describe("isDatabaseUnavailable", () => {
  it("recognises MongoDB connection failures", () => {
    const refused = new Error("connect ECONNREFUSED 127.0.0.1:27017");
    refused.name = "MongooseServerSelectionError";
    expect(isDatabaseUnavailable(refused)).toBe(true);
    expect(isDatabaseUnavailable(new Error("Operation `x.find()` buffering timed out after 10000ms"))).toBe(true);
  });

  it("leaves ordinary errors alone", () => {
    expect(isDatabaseUnavailable(new Error("boom"))).toBe(false);
    expect(isDatabaseUnavailable("MongoNetworkError")).toBe(false);
  });
});
