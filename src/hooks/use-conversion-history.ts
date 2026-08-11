"use client";

import { useCallback } from "react";
import { useLocalStorage } from "./use-local-storage";
import { HISTORY_STORAGE_KEY_PREFIX, MAX_HISTORY_ENTRIES } from "@/lib/constants";

export interface HistoryEntry {
  fromUnit: string;
  toUnit: string;
  inputValue: number;
  outputValue: number;
  createdAt: number;
}

/** Local-first per-converter conversion history. */
export function useConversionHistory(converterSlug: string) {
  const [history, setHistory, hydrated] = useLocalStorage<HistoryEntry[]>(
    `${HISTORY_STORAGE_KEY_PREFIX}${converterSlug}`,
    [],
  );

  const addEntry = useCallback(
    (fromUnit: string, toUnit: string, inputValue: number, outputValue: number) => {
      setHistory((prev) =>
        [{ fromUnit, toUnit, inputValue, outputValue, createdAt: Date.now() }, ...prev].slice(
          0,
          MAX_HISTORY_ENTRIES,
        ),
      );

      fetch("/api/history", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ converterSlug, fromUnit, toUnit, inputValue, outputValue }),
      }).catch(() => null);
    },
    [converterSlug, setHistory],
  );

  const clearHistory = useCallback(() => setHistory([]), [setHistory]);

  return { history, addEntry, clearHistory, hydrated };
}
