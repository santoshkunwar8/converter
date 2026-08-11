import Link from "next/link";
import { Sparkles, TrendingUp } from "lucide-react";
import { FavoriteButton } from "@/components/shared/favorite-button";
import { CATEGORIES } from "@/lib/categories";
import { getToolHref } from "@/lib/routes";
import { cn } from "@/lib/utils";
import type { ToolSummary } from "@/types";

export function ToolCard({ tool, className }: { tool: ToolSummary; className?: string }) {
  const category = CATEGORIES[tool.category];
  const Icon = tool.icon;

  return (
    <Link
      href={getToolHref(tool)}
      className={cn(
        "group relative flex flex-col gap-3 rounded-2xl border border-border bg-card p-5 shadow-soft transition-all duration-200 hover:-translate-y-0.5 hover:shadow-soft-lg",
        className,
      )}
    >
      <div className="flex items-start justify-between gap-2">
        <span
          className={cn(
            "flex size-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br text-white",
            category.gradient,
          )}
        >
          <Icon className="size-5" />
        </span>
        <FavoriteButton toolSlug={tool.slug} toolType={tool.type} />
      </div>

      <div>
        <h3 className="font-semibold leading-tight tracking-tight group-hover:text-primary">
          {tool.name}
        </h3>
        <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">{tool.shortDescription}</p>
      </div>

      {(tool.isNew || tool.isPopular) && (
        <div className="mt-auto flex gap-2 pt-1">
          {tool.isPopular && (
            <span className="inline-flex items-center gap-1 rounded-full bg-amber-500/10 px-2 py-0.5 text-xs font-medium text-amber-600 dark:text-amber-400">
              <TrendingUp className="size-3" /> Popular
            </span>
          )}
          {tool.isNew && (
            <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 px-2 py-0.5 text-xs font-medium text-emerald-600 dark:text-emerald-400">
              <Sparkles className="size-3" /> New
            </span>
          )}
        </div>
      )}
    </Link>
  );
}
