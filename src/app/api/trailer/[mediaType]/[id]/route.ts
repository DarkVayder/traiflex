import { NextResponse } from "next/server";
import { apiError, withErrorHandling } from "@/lib/api/server";
import { myListParamsSchema } from "@/lib/my-list/schema";
import { getTrailerKey } from "@/lib/tmdb/queries";

/**
 * The YouTube key for a title's best trailer, used by the hover preview. Public: it only exposes
 * TMDB data that every page already shows, and guests can browse. Lookups are cached server-side.
 */
export const GET = withErrorHandling(async (_request: Request, ctx: RouteContext<"/api/trailer/[mediaType]/[id]">) => {
  const parsed = myListParamsSchema.safeParse(await ctx.params);
  if (!parsed.success) return apiError(400, "bad_request", "Unknown title.");

  const key = await getTrailerKey(parsed.data.mediaType, parsed.data.id);
  return NextResponse.json({ key }, { headers: { "Cache-Control": "public, max-age=3600, s-maxage=3600" } });
});
