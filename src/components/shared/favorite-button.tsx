"use client";

import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useFavorites } from "@/hooks/use-favorites";
import { cn } from "@/lib/utils";
import type { ToolType } from "@/types";

interface FavoriteButtonProps {
  toolSlug: string;
  toolType: ToolType;
  className?: string;
  variant?: "icon" | "full";
}

export function FavoriteButton({
  toolSlug,
  toolType,
  className,
  variant = "icon",
}: FavoriteButtonProps) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const active = isFavorite(toolSlug, toolType);

  if (variant === "full") {
    return (
      <Button
        variant="outline"
        size="sm"
        onClick={() => toggleFavorite(toolSlug, toolType)}
        className={cn("gap-1.5", className)}
        aria-pressed={active}
      >
        <Heart className={cn("size-3.5", active && "fill-current text-rose-500")} />
        {active ? "Saved" : "Save"}
      </Button>
    );
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={(event) => {
        event.preventDefault();
        event.stopPropagation();
        toggleFavorite(toolSlug, toolType);
      }}
      aria-pressed={active}
      aria-label={active ? "Remove from favorites" : "Add to favorites"}
      className={cn("size-8 shrink-0", className)}
    >
      <Heart className={cn("size-4", active && "fill-current text-rose-500")} />
    </Button>
  );
}
