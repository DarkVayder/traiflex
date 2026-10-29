"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { apiFetch } from "@/lib/api/client";
import { myListKey, type MyListEntry, type MyListResponse } from "@/lib/my-list/schema";
import type { Title } from "@/lib/tmdb/types";
import { useAuth } from "../auth/auth-provider";

const MY_LIST_QUERY_KEY = ["my-list"] as const;

export function useMyList() {
  const { status, user } = useAuth();
  return useQuery({
    queryKey: [...MY_LIST_QUERY_KEY, user?.uid],
    queryFn: () => apiFetch<MyListResponse>("/api/my-list").then((response) => response.items),
    enabled: status === "signed-in",
  });
}

/** Add/remove with optimistic updates; rolls back and toasts on failure. */
export function useToggleMyList() {
  const queryClient = useQueryClient();
  const { user } = useAuth();
  const queryKey = [...MY_LIST_QUERY_KEY, user?.uid];

  return useMutation({
    mutationFn: async ({ title, saved }: { title: Title; saved: boolean }) => {
      if (saved) {
        await apiFetch<void>(`/api/my-list/${title.mediaType}/${title.id}`, { method: "DELETE" });
      } else {
        await apiFetch<MyListEntry>("/api/my-list", {
          method: "POST",
          body: JSON.stringify({ mediaType: title.mediaType, tmdbId: title.id }),
        });
      }
    },
    onMutate: async ({ title, saved }) => {
      await queryClient.cancelQueries({ queryKey });
      const previous = queryClient.getQueryData<MyListEntry[]>(queryKey);
      queryClient.setQueryData<MyListEntry[]>(queryKey, (items = []) =>
        saved
          ? items.filter((item) => myListKey(item) !== myListKey(title))
          : [{ ...title, addedAt: new Date().toISOString() }, ...items],
      );
      return { previous };
    },
    onError: (error, { saved }, context) => {
      queryClient.setQueryData(queryKey, context?.previous);
      toast.error(saved ? "Couldn't remove that from My List." : "Couldn't add that to My List.", {
        description: error.message,
      });
    },
    onSuccess: (_data, { title, saved }) => {
      toast.success(saved ? `Removed ${title.name} from My List` : `Added ${title.name} to My List`);
    },
    onSettled: () => queryClient.invalidateQueries({ queryKey }),
  });
}
