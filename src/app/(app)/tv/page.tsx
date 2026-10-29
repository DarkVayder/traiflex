import type { Metadata } from "next";
import { BrowsePage } from "@/components/features/browse/browse-page";

export const metadata: Metadata = { title: "TV Shows" };

export default function TvPage({ searchParams }: PageProps<"/tv">) {
  return <BrowsePage mediaType="tv" searchParams={searchParams} />;
}
