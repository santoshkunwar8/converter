"use client";

import { Printer } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

/** Prints the current page. Doubles as "download as PDF" via the browser's Print > Save as PDF. */
export function PrintButton({ className }: { className?: string }) {
  return (
    <Button
      variant="outline"
      size="sm"
      onClick={() => window.print()}
      className={cn("gap-1.5", className)}
    >
      <Printer className="size-3.5" />
      Print / Save PDF
    </Button>
  );
}
