import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getCategoryHref } from "@/lib/routes";
import { cn } from "@/lib/utils";
import type { CategoryDefinition } from "@/types";

export function CategoryCard({
  category,
  count,
  className,
}: {
  category: CategoryDefinition;
  count: number;
  className?: string;
}) {
  return (
    <Link
      href={getCategoryHref(category.slug)}
      className={cn(
        "group relative flex flex-col gap-4 overflow-hidden rounded-2xl border border-border bg-card p-6 shadow-soft transition-all duration-200 hover:-translate-y-0.5 hover:shadow-soft-lg",
        className,
      )}
    >
      <span
        className={cn(
          "flex size-12 items-center justify-center rounded-2xl bg-gradient-to-br text-white",
          category.gradient,
        )}
      >
        <category.icon className="size-6" />
      </span>
      <div>
        <h3 className="font-semibold tracking-tight">{category.name}</h3>
        <p className="mt-1 text-sm text-muted-foreground">{category.description}</p>
      </div>
      <div className="mt-auto flex items-center justify-between pt-2 text-sm">
        <span className="text-muted-foreground">
          {count} {count === 1 ? "tool" : "tools"}
        </span>
        <ArrowRight className="size-4 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-primary" />
      </div>
    </Link>
  );
}
