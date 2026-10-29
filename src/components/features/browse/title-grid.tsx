import { Skeleton } from "@/components/ui/skeleton";
import type { Title } from "@/lib/tmdb/types";
import { TitleCard } from "./title-card";

const GRID = "grid grid-cols-1 gap-x-3 gap-y-6 min-[420px]:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5";

export function TitleGrid({ titles, label }: { titles: Title[]; label: string }) {
  return (
    <ul aria-label={label} className={GRID}>
      {titles.map((title, index) => (
        <li key={`${title.mediaType}-${title.id}`}>
          <TitleCard title={title} priority={index < 5} />
        </li>
      ))}
    </ul>
  );
}

export function TitleGridSkeleton({ count = 10 }: { count?: number }) {
  return (
    <div className={GRID} aria-hidden>
      {Array.from({ length: count }, (_, index) => (
        <Skeleton key={index} className="aspect-video" />
      ))}
    </div>
  );
}
