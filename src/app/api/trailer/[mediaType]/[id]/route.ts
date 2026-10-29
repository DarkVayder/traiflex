import { NextResponse } from "next/server";
import { apiError, requireUser, withErrorHandling } from "@/lib/api/server";
import { myListParamsSchema } from "@/lib/my-list/schema";
import { getTrailerKey } from "@/lib/tmdb/queries";

/** The YouTube key for a title's best trailer, used by the hover preview. Signed-in users only. */
export const GET = withErrorHandling(async (request: Request, ctx: RouteContext<"/api/trailer/[mediaType]/[id]">) => {
  const user = await requireUser(request);
  if (user instanceof NextResponse) return user;

  const parsed = myListParamsSchema.safeParse(await ctx.params);
  if (!parsed.success) return apiError(400, "bad_request", "Unknown title.");

  const key = await getTrailerKey(parsed.data.mediaType, parsed.data.id);
  return NextResponse.json({ key }, { headers: { "Cache-Control": "private, max-age=3600" } });
});
