import type { Metadata } from "next";
import { BrowsePage } from "@/components/features/browse/browse-page";

export const metadata: Metadata = { title: "Movies" };

export default function MoviesPage({ searchParams }: PageProps<"/movies">) {
  return <BrowsePage mediaType="movie" searchParams={searchParams} />;
}
