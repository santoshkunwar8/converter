import type { LucideIcon } from "lucide-react";

/** Every tool (calculator or converter) belongs to exactly one of these. */
export type CategorySlug =
  | "general"
  | "finance"
  | "health"
  | "education"
  | "math"
  | "date-time"
  | "construction"
  | "business"
  | "developer"
  | "converters";

export interface CategoryDefinition {
  slug: CategorySlug;
  name: string;
  description: string;
  icon: LucideIcon;
  /** Tailwind gradient stops used for category cards / hero accents. */
  gradient: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

/** Optional per-tool overrides layered on top of generated defaults. */
export interface SeoOverrides {
  title?: string;
  description?: string;
  keywords?: string[];
}

export type ToolType = "calculator" | "converter";

export interface ToolSummary {
  type: ToolType;
  slug: string;
  name: string;
  shortDescription: string;
  category: CategorySlug;
  icon: LucideIcon;
  keywords: string[];
  isNew?: boolean;
  isPopular?: boolean;
}

/**
 * Plain-data variant of ToolSummary (no component reference) — safe to pass
 * as a prop from Server Components into Client Components (e.g. the command
 * palette), which resolve the icon themselves via `CATEGORIES[category]`.
 */
export type SearchableTool = Omit<ToolSummary, "icon">;
