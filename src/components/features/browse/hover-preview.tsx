"use client";

import { useQuery } from "@tanstack/react-query";
import { ChevronDown, Play, Star, Volume2, VolumeX } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState, type PointerEvent, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { buttonVariants } from "@/components/ui/button";
import { apiFetch } from "@/lib/api/client";
import { previewPlacement, type PreviewPlacement } from "@/lib/preview-position";
import type { Title } from "@/lib/tmdb/types";
import { cn } from "@/lib/utils";
import { watchHref } from "@/lib/watch-href";
import { MyListButton } from "../my-list/my-list-button";

/** How long the pointer must rest on a card before the preview opens. */
const DWELL_MS = 650;
/** Lets the pointer travel from the card into the preview without closing it. */
const LEAVE_GRACE_MS = 140;
/** Time between the player loading and fading it in, so viewers don't see YouTube's black start-up frame. */
const PLAYER_FADE_DELAY_MS = 900;
const YOUTUBE_ORIGIN = "https://www.youtube-nocookie.com";

function canHover() {
  return window.matchMedia("(hover: hover) and (pointer: fine)").matches;
}

function PreviewCard({
  title,
  placement,
  onEnter,
  onLeave,
}: {
  title: Title;
  placement: PreviewPlacement;
  onEnter: () => void;
  onLeave: () => void;
}) {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [reduceMotion] = useState(() => window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  const [muted, setMuted] = useState(true);
  const [playing, setPlaying] = useState(false);

  const { data } = useQuery({
    queryKey: ["trailer", title.mediaType, title.id],
    queryFn: () => apiFetch<{ key: string | null }>(`/api/trailer/${title.mediaType}/${title.id}`),
    staleTime: 60 * 60_000,
    retry: false,
  });
  // Autoplaying video is skipped for people who asked their system to reduce motion.
  const trailerKey = reduceMotion ? null : (data?.key ?? null);

  const toggleMute = () => {
    const next = !muted;
    setMuted(next);
    iframeRef.current?.contentWindow?.postMessage(
      JSON.stringify({ event: "command", func: next ? "mute" : "unMute", args: [] }),
      YOUTUBE_ORIGIN,
    );
  };

  const href = watchHref(title);
  const meta = [title.year, title.genres.join(" · ")].filter(Boolean);

  return (
    <div
      role="group"
      aria-label={`Preview: ${title.name}`}
      onPointerEnter={onEnter}
      onPointerLeave={onLeave}
      style={{ left: placement.left, top: placement.top, width: placement.width }}
      className="preview-in fixed z-50 overflow-hidden rounded-lg bg-surface shadow-2xl shadow-black/70 ring-1 ring-border"
    >
      <div className="relative aspect-video bg-background">
        {title.backdropPath ? (
          <Image src={title.backdropPath} alt="" fill sizes="420px" className="object-cover" />
        ) : null}
        {trailerKey ? (
          <iframe
            ref={iframeRef}
            src={`${YOUTUBE_ORIGIN}/embed/${trailerKey}?autoplay=1&mute=1&controls=0&disablekb=1&fs=0&loop=1&playlist=${trailerKey}&modestbranding=1&playsinline=1&rel=0&iv_load_policy=3&enablejsapi=1&origin=${encodeURIComponent(window.location.origin)}`}
            title=""
            aria-hidden
            tabIndex={-1}
            allow="autoplay; encrypted-media"
            onLoad={() => setTimeout(() => setPlaying(true), PLAYER_FADE_DELAY_MS)}
            className={cn(
              "pointer-events-none absolute inset-0 size-full border-0 transition-opacity duration-500",
              playing ? "opacity-100" : "opacity-0",
            )}
          />
        ) : null}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-surface to-transparent" />
        <Link href={href} className="absolute inset-0" aria-label={`Watch the trailer for ${title.name}`} />
        {trailerKey && playing ? (
          <button
            type="button"
            onClick={toggleMute}
            aria-label={muted ? "Unmute trailer" : "Mute trailer"}
            aria-pressed={!muted}
            className="absolute bottom-3 right-3 flex size-9 items-center justify-center rounded-full border border-foreground/40 bg-background/60 text-foreground backdrop-blur hover:border-foreground"
          >
            {muted ? <VolumeX className="size-4" aria-hidden /> : <Volume2 className="size-4" aria-hidden />}
          </button>
        ) : null}
      </div>

      <div className="flex flex-col gap-3 p-4">
        <div className="flex items-center gap-2">
          <Link href={href} aria-label={`Play ${title.name}`} className={buttonVariants({ variant: "light", size: "icon" })}>
            <Play className="translate-x-0.5 fill-current" aria-hidden />
          </Link>
          <MyListButton title={title} />
          <Link
            href={href}
            aria-label={`More about ${title.name}`}
            className={cn(buttonVariants({ variant: "secondary", size: "icon" }), "ml-auto size-9")}
          >
            <ChevronDown aria-hidden />
          </Link>
        </div>

        <div className="flex flex-col gap-1">
          <p className="line-clamp-1 font-semibold text-foreground">{title.name}</p>
          <p className="flex flex-wrap items-center gap-x-3 text-xs text-muted">
            {title.rating ? (
              <span className="inline-flex items-center gap-1 text-foreground/90">
                <Star className="size-3 fill-current text-amber-400" aria-hidden />
                {title.rating}
              </span>
            ) : null}
            {meta.map((part) => (
              <span key={part}>{part}</span>
            ))}
          </p>
        </div>
        {title.overview ? <p className="line-clamp-2 text-sm text-muted">{title.overview}</p> : null}
      </div>
    </div>
  );
}

/**
 * Netflix-style preview: rest the pointer on a card and an enlarged, floating version opens with a
 * muted trailer and quick actions. Mouse only; touch and keyboard users keep the normal card.
 */
export function HoverPreview({ title, children }: { title: Title; children: ReactNode }) {
  const anchorRef = useRef<HTMLDivElement>(null);
  const dwellTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const leaveTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const [placement, setPlacement] = useState<PreviewPlacement | null>(null);

  const cancelClose = useCallback(() => clearTimeout(leaveTimer.current), []);
  const scheduleClose = useCallback(() => {
    clearTimeout(leaveTimer.current);
    leaveTimer.current = setTimeout(() => setPlacement(null), LEAVE_GRACE_MS);
  }, []);

  const onPointerEnter = (event: PointerEvent) => {
    if (event.pointerType !== "mouse" || !canHover()) return;
    cancelClose();
    if (placement) return;
    clearTimeout(dwellTimer.current);
    dwellTimer.current = setTimeout(() => {
      const anchor = anchorRef.current;
      if (!anchor) return;
      setPlacement(previewPlacement(anchor.getBoundingClientRect(), { width: window.innerWidth, height: window.innerHeight }));
    }, DWELL_MS);
  };

  const onPointerLeave = () => {
    clearTimeout(dwellTimer.current);
    scheduleClose();
  };

  // While open, anything that moves the page out from under the preview dismisses it.
  useEffect(() => {
    if (!placement) return;
    const dismiss = () => setPlacement(null);
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") dismiss();
    };
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("scroll", dismiss, { capture: true, passive: true });
    window.addEventListener("resize", dismiss);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("scroll", dismiss, { capture: true });
      window.removeEventListener("resize", dismiss);
    };
  }, [placement]);

  useEffect(
    () => () => {
      clearTimeout(dwellTimer.current);
      clearTimeout(leaveTimer.current);
    },
    [],
  );

  return (
    <div ref={anchorRef} onPointerEnter={onPointerEnter} onPointerLeave={onPointerLeave}>
      {children}
      {placement
        ? createPortal(
            <PreviewCard title={title} placement={placement} onEnter={cancelClose} onLeave={scheduleClose} />,
            document.body,
          )
        : null}
    </div>
  );
}
