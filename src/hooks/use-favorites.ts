"use client";

import { useCallback, useEffect } from "react";
import { useLocalStorage } from "./use-local-storage";
import { FAVORITES_STORAGE_KEY } from "@/lib/constants";
import type { ToolType } from "@/types";

export interface FavoriteEntry {
  toolSlug: string;
  toolType: ToolType;
}

function sameTool(a: FavoriteEntry, b: FavoriteEntry) {
  return a.toolSlug === b.toolSlug && a.toolType === b.toolType;
}

/** Local-first favorites: instant localStorage updates, best-effort server sync. */
export function useFavorites() {
  const [favorites, setFavorites, hydrated] = useLocalStorage<FavoriteEntry[]>(
    FAVORITES_STORAGE_KEY,
    [],
  );

  useEffect(() => {
    if (!hydrated) return;
    fetch("/api/favorites")
      .then((res) => (res.ok ? res.json() : null))
      .then((data: { favorites?: FavoriteEntry[] } | null) => {
        if (!data?.favorites?.length) return;
        setFavorites((prev) => {
          const merged = [...prev];
          for (const entry of data.favorites!) {
            if (!merged.some((f) => sameTool(f, entry))) merged.push(entry);
          }
          return merged;
        });
      })
      .catch(() => null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hydrated]);

  const isFavorite = useCallback(
    (toolSlug: string, toolType: ToolType) =>
      favorites.some((f) => f.toolSlug === toolSlug && f.toolType === toolType),
    [favorites],
  );

  const toggleFavorite = useCallback(
    (toolSlug: string, toolType: ToolType) => {
      const entry: FavoriteEntry = { toolSlug, toolType };
      const currentlyFavorite = favorites.some((f) => sameTool(f, entry));

      setFavorites((prev) =>
        currentlyFavorite ? prev.filter((f) => !sameTool(f, entry)) : [...prev, entry],
      );

      if (currentlyFavorite) {
        fetch(`/api/favorites?toolSlug=${encodeURIComponent(toolSlug)}&toolType=${toolType}`, {
          method: "DELETE",
        }).catch(() => null);
      } else {
        fetch("/api/favorites", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(entry),
        }).catch(() => null);
      }
    },
    [favorites, setFavorites],
  );

  return { favorites, isFavorite, toggleFavorite, hydrated };
}
