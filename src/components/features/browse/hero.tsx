import { Play, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { getTitles } from "@/lib/tmdb/queries";
import type { MediaType } from "@/lib/tmdb/types";
import { watchHref } from "@/lib/watch-href";
import { MyListButton } from "../my-list/my-list-button";

/** Featured title: the top trending item that has a backdrop and a synopsis. */
export async function Hero({ mediaType }: { mediaType: MediaType | "all" }) {
  const titles = await getTitles(`/trending/${mediaType}/day`, mediaType === "tv" ? "tv" : "movie");
  const featured = titles.find((title) => title.overview.length > 0) ?? titles[0];
  if (!featured?.backdropPath) return <div className="h-24" />;

  return (
    <section aria-labelledby="hero-title" className="relative isolate flex min-h-[70svh] items-end md:min-h-[85svh]">
      <Image
        src={featured.backdropPath}
        alt=""
        fill
        priority
        sizes="100vw"
        className="-z-10 object-cover object-top"
      />
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-background via-background/60 to-transparent" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-background via-transparent to-background/40" />

      <div className="flex max-w-2xl flex-col gap-4 px-4 pb-12 pt-28 sm:px-8 md:pb-20 lg:px-12">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">#1 trending today</p>
        <h1 id="hero-title" className="font-display text-5xl leading-none tracking-wide text-balance sm:text-6xl md:text-7xl">
          {featured.name}
        </h1>
        <p className="flex items-center gap-3 text-sm text-muted">
          {featured.year ? <span>{featured.year}</span> : null}
          {featured.rating ? (
            <span className="inline-flex items-center gap-1">
              <Star className="size-4 fill-current text-amber-400" aria-hidden />
              {featured.rating} / 10
            </span>
          ) : null}
          {featured.genres.length ? <span>{featured.genres.join(" · ")}</span> : null}
        </p>
        <p className="line-clamp-3 text-base text-foreground/90 md:text-lg">{featured.overview}</p>
        <div className="mt-2 flex flex-wrap gap-3">
          <Link href={watchHref(featured)} className={buttonVariants({ variant: "light", size: "lg" })}>
            <Play className="fill-current" aria-hidden />
            Play Trailer
          </Link>
          <MyListButton title={featured} variant="full" />
        </div>
      </div>
    </section>
  );
}

export function HeroSkeleton() {
  return (
    <div className="flex min-h-[70svh] items-end px-4 pb-12 sm:px-8 md:min-h-[85svh] lg:px-12" aria-hidden>
      <div className="flex w-full max-w-2xl flex-col gap-4">
        <Skeleton className="h-16 w-3/4" />
        <Skeleton className="h-4 w-1/3" />
        <Skeleton className="h-20 w-full" />
        <div className="flex gap-3">
          <Skeleton className="h-12 w-40" />
          <Skeleton className="h-12 w-36" />
        </div>
      </div>
    </div>
  );
}
