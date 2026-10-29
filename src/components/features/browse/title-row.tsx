import { Skeleton } from "@/components/ui/skeleton";
import type { RowSpec } from "@/lib/tmdb/catalog";
import { getTitles } from "@/lib/tmdb/queries";
import { RowScroller } from "./row-scroller";
import { TitleCard } from "./title-card";

const CARD_WIDTH = "w-[70vw] shrink-0 snap-start sm:w-[42vw] md:w-[30vw] lg:w-[23vw] xl:w-[18.5vw]";

export async function TitleRow({ spec, priority = false }: { spec: RowSpec; priority?: boolean }) {
  const titles = await getTitles(spec.path, spec.mediaType, spec.params, 2);
  if (titles.length === 0) return null;

  return (
    <section aria-labelledby={`row-${spec.id}`} className="flex flex-col">
      <h2 id={`row-${spec.id}`} className="px-4 text-lg font-semibold text-foreground sm:px-8 sm:text-xl lg:px-12">
        {spec.title}
      </h2>
      <RowScroller label={spec.title}>
        {titles.slice(0, 20).map((title, index) => (
          <div role="listitem" key={`${title.mediaType}-${title.id}`} className={CARD_WIDTH}>
            <TitleCard title={title} priority={priority && index < 4} />
          </div>
        ))}
      </RowScroller>
    </section>
  );
}

export function TitleRowSkeleton() {
  return (
    <div className="flex flex-col gap-4 px-4 sm:px-8 lg:px-12" aria-hidden>
      <Skeleton className="h-6 w-48" />
      <div className="flex gap-3 overflow-hidden">
        {Array.from({ length: 5 }, (_, index) => (
          <Skeleton key={index} className={`aspect-video ${CARD_WIDTH}`} />
        ))}
      </div>
    </div>
  );
}
