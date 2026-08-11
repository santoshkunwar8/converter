"use client";

import { useCallback, useEffect, useState } from "react";

/** SSR-safe localStorage-backed state. Reads lazily on mount to avoid hydration mismatches. */
export function useLocalStorage<T>(key: string, initialValue: T) {
  const [value, setValue] = useState<T>(initialValue);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    // Deliberately reads localStorage post-mount (not in the useState initializer) so the
    // first client render matches SSR markup exactly, then syncs real state right after —
    // the standard hydration-safe pattern for browser-only storage.
    try {
      const raw = window.localStorage.getItem(key);
      // eslint-disable-next-line react-hooks/set-state-in-effect
      if (raw !== null) setValue(JSON.parse(raw) as T);
    } catch {
      // ignore malformed storage
    } finally {
      setHydrated(true);
    }
  }, [key]);

  const update = useCallback(
    (next: T | ((prev: T) => T)) => {
      setValue((prev) => {
        const resolved = next instanceof Function ? next(prev) : next;
        try {
          window.localStorage.setItem(key, JSON.stringify(resolved));
        } catch {
          // storage full or unavailable; keep in-memory state only
        }
        return resolved;
      });
    },
    [key],
  );

  return [value, update, hydrated] as const;
}
