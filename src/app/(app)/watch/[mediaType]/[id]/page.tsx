import { ArrowLeft } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { SimilarTitles } from "@/components/features/browse/similar-titles";
import { TitleRowSkeleton } from "@/components/features/browse/title-row";
import { EmptyState } from "@/components/features/empty-state";
import { MyListButton } from "@/components/features/my-list/my-list-button";
import { buttonVariants } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { myListParamsSchema } from "@/lib/my-list/schema";
import { getTitle, getTrailerKey } from "@/lib/tmdb/queries";
import { cn } from "@/lib/utils";

type Props = PageProps<"/watch/[mediaType]/[id]">;

async function resolveTitle(params: Props["params"]) {
  const parsed = myListParamsSchema.safeParse(await params);
  if (!parsed.success) notFound();
  const title = await getTitle(parsed.data.mediaType, parsed.data.id);
  if (!title) notFound();
  return title;
}

export const metadata: Metadata = { title: "Trailer" };

async function Watch({ params }: Props) {
  const title = await resolveTitle(params);
  const trailerKey = await getTrailerKey(title.mediaType, title.id);

  return (
    <>
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-4 pb-12 pt-24 sm:px-8">
        {/* React hoists this into <head>; the title depends on the URL, so it can't live in static metadata. */}
        <title>{`${title.name} — Trailer · Traiflex`}</title>
        <Link href={title.mediaType === "tv" ? "/tv" : "/movies"} className={cn(buttonVariants({ variant: "ghost", size: "sm" }), "self-start")}>
          <ArrowLeft aria-hidden />
          Back to browsing
        </Link>

        <div className="aspect-video w-full overflow-hidden rounded-xl bg-surface ring-1 ring-border">
          {trailerKey ? (
            <iframe
              src={`https://www.youtube-nocookie.com/embed/${trailerKey}?autoplay=1&rel=0&modestbranding=1`}
              title={`${title.name} trailer`}
              allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
              allowFullScreen
              className="size-full"
            />
          ) : (
            <div className="flex size-full items-center justify-center">
              <EmptyState title="No trailer yet" description={`TMDB doesn't have a trailer for ${title.name} yet. Check back soon.`} />
            </div>
          )}
        </div>

        <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
          <div className="flex max-w-3xl flex-col gap-3">
            <h1 className="font-display text-4xl tracking-wide sm:text-5xl">{title.name}</h1>
            <p className="text-sm text-muted">
              {[title.year, title.rating ? `★ ${title.rating}` : null, title.genres.join(" · ")].filter(Boolean).join("  ·  ")}
            </p>
            {title.overview ? <p className="text-foreground/90">{title.overview}</p> : null}
          </div>
          <MyListButton title={title} variant="full" className="shrink-0" />
        </div>
      </div>

      <div className="pb-16">
        <Suspense fallback={<TitleRowSkeleton />}>
          <SimilarTitles mediaType={title.mediaType} id={title.id} />
        </Suspense>
      </div>
    </>
  );
}

function WatchSkeleton() {
  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-4 pb-16 pt-24 sm:px-8" aria-hidden>
      <Skeleton className="h-9 w-44" />
      <Skeleton className="aspect-video w-full rounded-xl" />
      <Skeleton className="h-12 w-2/3" />
      <Skeleton className="h-16 w-full max-w-3xl" />
    </div>
  );
}

export default function WatchPage(props: Props) {
  return (
    <Suspense fallback={<WatchSkeleton />}>
      <Watch {...props} />
    </Suspense>
  );
}
