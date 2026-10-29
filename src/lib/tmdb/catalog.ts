import type { TmdbParams } from "./client";
import type { MediaType } from "./types";

/** A named browse row backed by one TMDB list endpoint. */
export interface RowSpec {
  id: string;
  title: string;
  path: string;
  mediaType: MediaType;
  params?: TmdbParams;
}

export const HOME_ROWS: RowSpec[] = [
  { id: "trending", title: "Trending This Week", path: "/trending/all/week", mediaType: "movie" },
  { id: "popular-movies", title: "Popular Movies", path: "/movie/popular", mediaType: "movie" },
  { id: "popular-tv", title: "Popular TV Shows", path: "/tv/popular", mediaType: "tv" },
  { id: "top-rated-movies", title: "Top Rated Movies", path: "/movie/top_rated", mediaType: "movie" },
  { id: "upcoming", title: "Coming Soon", path: "/movie/upcoming", mediaType: "movie" },
  {
    id: "action",
    title: "Action",
    path: "/discover/movie",
    mediaType: "movie",
    params: { with_genres: 28, sort_by: "popularity.desc" },
  },
  { id: "top-rated-tv", title: "Top Rated TV", path: "/tv/top_rated", mediaType: "tv" },
  {
    id: "comedy",
    title: "Comedy",
    path: "/discover/movie",
    mediaType: "movie",
    params: { with_genres: 35, sort_by: "popularity.desc" },
  },
];

export const BROWSE_ROWS: Record<MediaType, RowSpec[]> = {
  movie: [
    { id: "trending", title: "Trending Movies", path: "/trending/movie/week", mediaType: "movie" },
    { id: "now-playing", title: "Now Playing", path: "/movie/now_playing", mediaType: "movie" },
    { id: "popular", title: "Popular", path: "/movie/popular", mediaType: "movie" },
    { id: "top-rated", title: "Top Rated", path: "/movie/top_rated", mediaType: "movie" },
    { id: "upcoming", title: "Coming Soon", path: "/movie/upcoming", mediaType: "movie" },
  ],
  tv: [
    { id: "trending", title: "Trending Shows", path: "/trending/tv/week", mediaType: "tv" },
    { id: "airing-today", title: "Airing Today", path: "/tv/airing_today", mediaType: "tv" },
    { id: "on-the-air", title: "On The Air", path: "/tv/on_the_air", mediaType: "tv" },
    { id: "popular", title: "Popular", path: "/tv/popular", mediaType: "tv" },
    { id: "top-rated", title: "Top Rated", path: "/tv/top_rated", mediaType: "tv" },
  ],
};
