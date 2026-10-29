"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Horizontal, scroll-snapping row. Native scrolling handles touch and trackpads;
 * the arrow buttons page by one viewport width for mouse and keyboard users.
 */
export function RowScroller({ label, children }: { label: string; children: ReactNode }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [canScroll, setCanScroll] = useState({ left: false, right: false });

  const update = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    setCanScroll({
      left: track.scrollLeft > 4,
      right: track.scrollLeft + track.clientWidth < track.scrollWidth - 4,
    });
  }, []);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    update();
    const observer = new ResizeObserver(update);
    observer.observe(track);
    track.addEventListener("scroll", update, { passive: true });
    return () => {
      observer.disconnect();
      track.removeEventListener("scroll", update);
    };
  }, [update]);

  const page = (direction: -1 | 1) => {
    const track = trackRef.current;
    if (track) track.scrollBy({ left: direction * track.clientWidth * 0.9, behavior: "smooth" });
  };

  const arrow =
    "absolute inset-y-0 z-20 hidden w-12 items-center justify-center bg-background/70 text-foreground transition-opacity hover:bg-background/90 md:flex [&_svg]:size-8";

  return (
    <div className="group/row relative">
      <button
        type="button"
        aria-label={`Scroll ${label} left`}
        onClick={() => page(-1)}
        className={cn(arrow, "left-0", canScroll.left ? "opacity-0 group-hover/row:opacity-100 focus-visible:opacity-100" : "pointer-events-none opacity-0")}
        tabIndex={canScroll.left ? 0 : -1}
      >
        <ChevronLeft aria-hidden />
      </button>
      <div
        ref={trackRef}
        role="list"
        aria-label={label}
        className="no-scrollbar flex snap-x snap-mandatory scroll-px-4 gap-3 overflow-x-auto px-4 py-4 sm:scroll-px-8 sm:px-8 lg:scroll-px-12 lg:px-12"
      >
        {children}
      </div>
      <button
        type="button"
        aria-label={`Scroll ${label} right`}
        onClick={() => page(1)}
        className={cn(arrow, "right-0", canScroll.right ? "opacity-0 group-hover/row:opacity-100 focus-visible:opacity-100" : "pointer-events-none opacity-0")}
        tabIndex={canScroll.right ? 0 : -1}
      >
        <ChevronRight aria-hidden />
      </button>
    </div>
  );
}
