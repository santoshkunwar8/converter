"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useCommandPalette } from "@/hooks/use-command-palette";
import { CATEGORY_LIST } from "@/lib/categories";
import { getCategoryHref } from "@/lib/routes";

export function MobileNav() {
  const [open, setOpen] = useState(false);
  const { setOpen: setPaletteOpen } = useCommandPalette();

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger
        render={<Button variant="ghost" size="icon" className="md:hidden" aria-label="Open menu" />}
      >
        <Menu className="size-5" />
      </SheetTrigger>
      <SheetContent side="right" className="w-72">
        <SheetHeader>
          <SheetTitle>Menu</SheetTitle>
        </SheetHeader>
        <div className="flex flex-col gap-1 px-4">
          <Button
            variant="outline"
            className="mb-2 justify-start gap-2"
            onClick={() => {
              setOpen(false);
              setPaletteOpen(true);
            }}
          >
            <Search className="size-4" /> Search tools
          </Button>
          <Link
            href="/calculators"
            onClick={() => setOpen(false)}
            className="rounded-lg px-3 py-2 text-sm font-medium hover:bg-accent"
          >
            Calculators
          </Link>
          <Link
            href="/converters"
            onClick={() => setOpen(false)}
            className="rounded-lg px-3 py-2 text-sm font-medium hover:bg-accent"
          >
            Converters
          </Link>
          <Link
            href="/about"
            onClick={() => setOpen(false)}
            className="rounded-lg px-3 py-2 text-sm font-medium hover:bg-accent"
          >
            About
          </Link>
          <div className="mt-3 border-t border-border pt-3">
            <p className="px-3 pb-1 text-xs font-medium text-muted-foreground">Categories</p>
            {CATEGORY_LIST.map((category) => (
              <Link
                key={category.slug}
                href={getCategoryHref(category.slug)}
                onClick={() => setOpen(false)}
                className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm hover:bg-accent"
              >
                <category.icon className="size-4 text-muted-foreground" />
                {category.name}
              </Link>
            ))}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
