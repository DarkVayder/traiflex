import { Suspense } from "react";
import { BROWSE_ROWS } from "@/lib/tmdb/catalog";
import { getGenres, getTitles } from "@/lib/tmdb/queries";
import type { MediaType } from "@/lib/tmdb/types";
import { EmptyState } from "../empty-state";
import { GenreSelect } from "./genre-select";
import { Hero, HeroSkeleton } from "./hero";
import { TitleGrid, TitleGridSkeleton } from "./title-grid";
import { TitleRow, TitleRowSkeleton } from "./title-row";

const HEADINGS: Record<MediaType, string> = { movie: "Movies", tv: "TV Shows" };

function parseGenre(raw: string | string[] | undefined, valid: number[]): number | null {
  const id = Number(Array.isArray(raw) ? raw[0] : raw);
  return Number.isInteger(id) && valid.includes(id) ? id : null;
}

async function GenreResults({ mediaType, genreId, genreName }: { mediaType: MediaType; genreId: number; genreName: string }) {
  const titles = await getTitles(
    `/discover/${mediaType}`,
    mediaType,
    { with_genres: genreId, sort_by: "popularity.desc", "vote_count.gte": 50 },
    3,
  );

  if (titles.length === 0) {
    return <EmptyState title={`No ${genreName} titles yet`} description="Try another genre." />;
  }
  return <TitleGrid titles={titles} label={`${genreName} ${HEADINGS[mediaType]}`} />;
}

async function BrowseContent({
  mediaType,
  searchParams,
}: {
  mediaType: MediaType;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const [genres, params] = await Promise.all([getGenres(mediaType), searchParams]);
  const genreId = parseGenre(params.genre, genres.map((genre) => genre.id));
  const genreName = genres.find((genre) => genre.id === genreId)?.name;

  const toolbar = (
    <div className="flex flex-wrap items-center gap-4 px-4 sm:px-8 lg:px-12">
      <h1 className="font-display text-4xl tracking-wide sm:text-5xl">{genreName ?? HEADINGS[mediaType]}</h1>
      <GenreSelect genres={genres} value={genreId} />
    </div>
  );

  if (genreId && genreName) {
    return (
      <div className="flex flex-col gap-8 pb-16 pt-24">
        {toolbar}
        <div className="px-4 sm:px-8 lg:px-12">
          <Suspense key={genreId} fallback={<TitleGridSkeleton />}>
            <GenreResults mediaType={mediaType} genreId={genreId} genreName={genreName} />
          </Suspense>
        </div>
      </div>
    );
  }

  return (
    <>
      <Suspense fallback={<HeroSkeleton />}>
        <Hero mediaType={mediaType} />
      </Suspense>
      <div className="relative z-10 -mt-10 flex flex-col gap-8 pb-16">
        {toolbar}
        {BROWSE_ROWS[mediaType].map((spec, index) => (
          <Suspense key={spec.id} fallback={<TitleRowSkeleton />}>
            <TitleRow spec={spec} priority={index === 0} />
          </Suspense>
        ))}
      </div>
    </>
  );
}

/** Shared /movies and /tv page: rows by default, a grid when a genre is selected. */
export function BrowsePage({
  mediaType,
  searchParams,
}: {
  mediaType: MediaType;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  return (
    <Suspense fallback={<HeroSkeleton />}>
      <BrowseContent mediaType={mediaType} searchParams={searchParams} />
    </Suspense>
  );
}
