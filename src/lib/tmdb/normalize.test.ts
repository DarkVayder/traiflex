import { describe, expect, it } from "vitest";
import { tmdbSizeFor } from "./image-loader";
import { normalizeDetails, normalizeList, normalizeListItem, pickTrailerKey, toGenreLookup } from "./normalize";

const genres = toGenreLookup(
  [
    { id: 28, name: "Action" },
    { id: 12, name: "Adventure" },
  ],
  [{ id: 18, name: "Drama" }],
);

describe("normalizeListItem", () => {
  it("maps a movie and resolves genre names", () => {
    expect(
      normalizeListItem(
        {
          id: 1,
          title: "Dune",
          overview: "Spice.",
          backdrop_path: "/b.jpg",
          poster_path: "/p.jpg",
          release_date: "2021-09-15",
          vote_average: 7.83,
          genre_ids: [28, 12, 999],
        },
        "movie",
        genres,
      ),
    ).toEqual({
      id: 1,
      mediaType: "movie",
      name: "Dune",
      overview: "Spice.",
      backdropPath: "/b.jpg",
      posterPath: "/p.jpg",
      year: "2021",
      rating: 7.8,
      genres: ["Action", "Adventure"],
    });
  });

  it("uses the item's media_type over the fallback and reads TV fields", () => {
    const title = normalizeListItem(
      { id: 2, media_type: "tv", name: "Shogun", backdrop_path: "/s.jpg", first_air_date: "2024-02-27", genre_ids: [18] },
      "movie",
      genres,
    );
    expect(title).toMatchObject({ mediaType: "tv", name: "Shogun", year: "2024", genres: ["Drama"], rating: null });
  });

  it("drops people and titles without a backdrop", () => {
    expect(normalizeListItem({ id: 3, media_type: "person", name: "Someone", backdrop_path: "/x.jpg" }, "movie", genres)).toBeNull();
    expect(normalizeListItem({ id: 4, title: "No art", backdrop_path: null }, "movie", genres)).toBeNull();
  });
});

describe("normalizeList", () => {
  it("de-duplicates titles that appear on several pages", () => {
    const item = { id: 5, title: "Twice", backdrop_path: "/t.jpg" };
    expect(normalizeList([item, item, { ...item, id: 6 }], "movie", genres).map((title) => title.id)).toEqual([5, 6]);
  });

  it("keeps a movie and a show that share an id", () => {
    const list = normalizeList(
      [
        { id: 7, media_type: "movie", title: "A", backdrop_path: "/a.jpg" },
        { id: 7, media_type: "tv", name: "B", backdrop_path: "/b.jpg" },
      ],
      "movie",
      genres,
    );
    expect(list).toHaveLength(2);
  });
});

describe("normalizeDetails", () => {
  it("reads genre objects from detail payloads", () => {
    expect(
      normalizeDetails({ id: 8, name: "Show", genres: [{ id: 18, name: "Drama" }], backdrop_path: "/d.jpg" }, "tv"),
    ).toMatchObject({ id: 8, mediaType: "tv", genres: ["Drama"], backdropPath: "/d.jpg" });
  });
});

describe("pickTrailerKey", () => {
  it("prefers official YouTube trailers", () => {
    expect(
      pickTrailerKey([
        { key: "teaser", site: "YouTube", type: "Teaser", official: true },
        { key: "fan", site: "YouTube", type: "Trailer", official: false },
        { key: "vimeo", site: "Vimeo", type: "Trailer", official: true },
        { key: "best", site: "YouTube", type: "Trailer", official: true },
      ]),
    ).toBe("best");
  });

  it("falls back to any YouTube video and returns null when there is none", () => {
    expect(pickTrailerKey([{ key: "bts", site: "YouTube", type: "Behind the Scenes" }])).toBe("bts");
    expect(pickTrailerKey([{ key: "v", site: "Vimeo", type: "Trailer" }])).toBeNull();
  });
});

describe("tmdbSizeFor", () => {
  it("rounds up to the next TMDB rendition", () => {
    expect(tmdbSizeFor(256)).toBe("w300");
    expect(tmdbSizeFor(640)).toBe("w780");
    expect(tmdbSizeFor(1280)).toBe("w1280");
    expect(tmdbSizeFor(1920)).toBe("original");
  });
});
