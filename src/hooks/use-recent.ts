"use client";

import { useCallback, useRef } from "react";
import { useLocalStorage } from "./use-local-storage";
import { MAX_RECENT_TOOLS, RECENT_STORAGE_KEY } from "@/lib/constants";
import type { ToolType } from "@/types";

export interface RecentEntry {
  toolSlug: string;
  toolType: ToolType;
  visitedAt: number;
}

/** Local-first "recently used" list, capped and most-recent-first. */
export function useRecent() {
  const [recent, setRecent, hydrated] = useLocalStorage<RecentEntry[]>(RECENT_STORAGE_KEY, []);
  const recordedThisSession = useRef(new Set<string>());

  const addRecent = useCallback(
    (toolSlug: string, toolType: ToolType) => {
      const key = `${toolType}:${toolSlug}`;
      if (recordedThisSession.current.has(key)) return;
      recordedThisSession.current.add(key);

      setRecent((prev) => {
        const withoutTool = prev.filter(
          (r) => !(r.toolSlug === toolSlug && r.toolType === toolType),
        );
        return [{ toolSlug, toolType, visitedAt: Date.now() }, ...withoutTool].slice(
          0,
          MAX_RECENT_TOOLS,
        );
      });

      fetch("/api/recent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ toolSlug, toolType }),
      }).catch(() => null);
    },
    [setRecent],
  );

  return { recent, addRecent, hydrated };
}
