import { Play, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type { Title } from "@/lib/tmdb/types";
import { cn } from "@/lib/utils";
import { watchHref } from "@/lib/watch-href";
import { MyListButton } from "../my-list/my-list-button";
import { HoverPreview } from "./hover-preview";

interface TitleCardProps {
  title: Title;
  className?: string;
  /** Eager-load the first few cards of the first row. */
  priority?: boolean;
}

export function TitleCard({ title, className, priority = false }: TitleCardProps) {
  return (
    <HoverPreview title={title}>
      <article
        className={cn(
          "group relative aspect-video overflow-hidden rounded-md bg-surface-raised ring-1 ring-border/40",
          "transition-transform duration-300 hover:z-10 hover:scale-[1.04] focus-within:z-10 focus-within:scale-[1.04]",
          className,
        )}
      >
        <Link href={watchHref(title)} className="absolute inset-0 block focus-visible:outline-offset-[-2px]">
          {title.backdropPath ? (
            <Image
              src={title.backdropPath}
              alt=""
              fill
              sizes="(max-width: 640px) 70vw, (max-width: 1024px) 40vw, 22vw"
              priority={priority}
              className="object-cover"
            />
          ) : null}
          <span className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent opacity-90 transition-opacity group-hover:opacity-100" />
          <span className="absolute inset-x-0 bottom-0 flex flex-col gap-1 p-3">
            <span className="line-clamp-1 text-sm font-semibold text-foreground sm:text-base">{title.name}</span>
            <span className="flex items-center gap-2 text-xs text-muted">
              {title.year ? <span>{title.year}</span> : null}
              {title.rating ? (
                <span className="inline-flex items-center gap-0.5">
                  <Star className="size-3 fill-current text-amber-400" aria-hidden />
                  <span className="sr-only">Rated</span>
                  {title.rating}
                </span>
              ) : null}
              <span className="hidden truncate md:inline">{title.genres.join(" · ")}</span>
            </span>
          </span>
          <span className="absolute left-1/2 top-1/2 flex size-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-foreground/90 text-background opacity-0 transition-opacity group-hover:opacity-100">
            <Play className="size-5 translate-x-0.5 fill-current" aria-hidden />
          </span>
          <span className="sr-only">Watch the trailer for {title.name}</span>
        </Link>
        <MyListButton
          title={title}
          className="absolute right-2 top-2 opacity-100 transition-opacity md:opacity-0 md:group-hover:opacity-100 md:focus-visible:opacity-100 md:group-focus-within:opacity-100"
        />
      </article>
    </HoverPreview>
  );
}
