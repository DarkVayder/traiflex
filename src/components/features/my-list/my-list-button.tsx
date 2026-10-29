"use client";

import { Check, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { myListKey } from "@/lib/my-list/schema";
import type { Title } from "@/lib/tmdb/types";
import { cn } from "@/lib/utils";
import { useMyList, useToggleMyList } from "./use-my-list";

interface MyListButtonProps {
  title: Title;
  /** "icon" for cards, "full" for the hero. */
  variant?: "icon" | "full";
  className?: string;
}

export function MyListButton({ title, variant = "icon", className }: MyListButtonProps) {
  const { data: items, isPending } = useMyList();
  const toggle = useToggleMyList();
  const saved = items?.some((item) => myListKey(item) === myListKey(title)) ?? false;
  const label = saved ? `Remove ${title.name} from My List` : `Add ${title.name} to My List`;
  const Icon = saved ? Check : Plus;

  const onClick = () => toggle.mutate({ title, saved });

  if (variant === "full") {
    return (
      <Button
        variant="secondary"
        size="lg"
        onClick={onClick}
        disabled={isPending}
        aria-pressed={saved}
        aria-label={label}
        className={className}
      >
        <Icon aria-hidden />
        My List
      </Button>
    );
  }

  return (
    <Button
      variant="secondary"
      size="icon"
      onClick={onClick}
      disabled={isPending}
      aria-pressed={saved}
      aria-label={label}
      title={label}
      className={cn("size-9 bg-background/80 backdrop-blur", className)}
    >
      <Icon aria-hidden />
    </Button>
  );
}
