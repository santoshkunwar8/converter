"use client";

import { useEffect, useState } from "react";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCommandPalette } from "@/hooks/use-command-palette";

export function SearchTrigger({ className }: { className?: string }) {
  const { setOpen } = useCommandPalette();
  const [isMac, setIsMac] = useState(true);

  useEffect(() => {
    // navigator is unavailable during SSR; default to Mac styling for the first
    // paint, then correct it post-mount (matches the hydration-safe pattern above).
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsMac(/mac/i.test(navigator.platform));
  }, []);

  return (
    <Button
      variant="outline"
      onClick={() => setOpen(true)}
      className={`h-9 w-full max-w-xs justify-between gap-2 rounded-lg px-3 text-sm text-muted-foreground font-normal sm:flex ${className ?? ""}`}
    >
      <span className="flex items-center gap-2">
        <Search className="size-4" />
        Search tools...
      </span>
      <kbd className="pointer-events-none hidden select-none items-center gap-0.5 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium sm:inline-flex">
        {isMac ? "⌘" : "Ctrl"}K
      </kbd>
    </Button>
  );
}
