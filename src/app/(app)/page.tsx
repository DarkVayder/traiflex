import { Suspense } from "react";
import { Hero, HeroSkeleton } from "@/components/features/browse/hero";
import { TitleRow, TitleRowSkeleton } from "@/components/features/browse/title-row";
import { HOME_ROWS } from "@/lib/tmdb/catalog";

export default function HomePage() {
  return (
    <>
      <Suspense fallback={<HeroSkeleton />}>
        <Hero mediaType="all" />
      </Suspense>
      <div className="relative z-10 -mt-10 flex flex-col gap-8 pb-16">
        {HOME_ROWS.map((spec, index) => (
          <Suspense key={spec.id} fallback={<TitleRowSkeleton />}>
            <TitleRow spec={spec} priority={index === 0} />
          </Suspense>
        ))}
      </div>
    </>
  );
}
