import type { RowSpec } from "@/lib/tmdb/catalog";
import { getTitles } from "@/lib/tmdb/queries";
import type { MediaType } from "@/lib/tmdb/types";
import { TitleRow } from "./title-row";

/** Recommendations are a nice-to-have, so a TMDB hiccup here must not take down the trailer page. */
export async function SimilarTitles({ mediaType, id }: { mediaType: MediaType; id: number }) {
  const spec: RowSpec = {
    id: "more-like-this",
    title: "More like this",
    path: `/${mediaType}/${id}/recommendations`,
    mediaType,
  };

  try {
    const titles = await getTitles(spec.path, spec.mediaType, spec.params, 2);
    if (titles.length === 0) return null;
  } catch {
    return null;
  }

  return <TitleRow spec={spec} />;
}
