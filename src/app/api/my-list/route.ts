import { NextResponse } from "next/server";
import { apiError, requireUser, withErrorHandling } from "@/lib/api/server";
import { addToMyListSchema, type MyListEntry, type MyListResponse } from "@/lib/my-list/schema";
import { addToMyList, listMyList } from "@/lib/my-list/service";
import { getTitle } from "@/lib/tmdb/queries";

export const GET = withErrorHandling(async (request: Request) => {
  const user = await requireUser(request);
  if (user instanceof NextResponse) return user;

  const items = await listMyList(user.uid);
  return NextResponse.json<MyListResponse>({ items }, { headers: { "Cache-Control": "private, no-store" } });
});

export const POST = withErrorHandling(async (request: Request) => {
  const user = await requireUser(request);
  if (user instanceof NextResponse) return user;

  const body: unknown = await request.json().catch(() => null);
  const parsed = addToMyListSchema.safeParse(body);
  if (!parsed.success) return apiError(400, "bad_request", "Expected { mediaType: 'movie' | 'tv', tmdbId: number }.");

  // Snapshot from TMDB rather than trusting client-sent titles and image paths.
  const title = await getTitle(parsed.data.mediaType, parsed.data.tmdbId);
  if (!title) return apiError(404, "not_found", "That title doesn't exist on TMDB.");

  const entry = await addToMyList(user.uid, title);
  return NextResponse.json<MyListEntry>(entry, { status: 201 });
});
