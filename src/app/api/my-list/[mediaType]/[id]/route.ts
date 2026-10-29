import { NextResponse } from "next/server";
import { apiError, requireUser, withErrorHandling } from "@/lib/api/server";
import { myListParamsSchema } from "@/lib/my-list/schema";
import { removeFromMyList } from "@/lib/my-list/service";

export const DELETE = withErrorHandling(
  async (request: Request, ctx: RouteContext<"/api/my-list/[mediaType]/[id]">) => {
    const user = await requireUser(request);
    if (user instanceof NextResponse) return user;

    const parsed = myListParamsSchema.safeParse(await ctx.params);
    if (!parsed.success) return apiError(400, "bad_request", "Unknown title.");

    // Removing something that isn't saved is a no-op, so the client can retry safely.
    await removeFromMyList(user.uid, parsed.data.mediaType, parsed.data.id);
    return new NextResponse(null, { status: 204 });
  },
);
