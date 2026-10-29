import type { Title } from "@/lib/tmdb/types";

export function watchHref(title: Pick<Title, "mediaType" | "id">) {
  return `/watch/${title.mediaType}/${title.id}`;
}
