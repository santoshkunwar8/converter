import type { CategorySlug, ToolType } from "@/types";

interface ToolLike {
  type: ToolType;
  slug: string;
  category: CategorySlug;
}

export function getToolHref(tool: ToolLike): string {
  return tool.type === "calculator"
    ? `/calculators/${tool.category}/${tool.slug}`
    : `/converters/${tool.slug}`;
}

export function getCategoryHref(category: CategorySlug): string {
  return category === "converters" ? "/converters" : `/calculators/${category}`;
}
