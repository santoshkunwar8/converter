import { getAllCalculators, toToolSummary as calculatorSummary } from "@/lib/calculators/registry";
import { getAllConverters, toToolSummary as converterSummary } from "@/lib/converters/registry";
import type { SearchableTool, ToolSummary } from "@/types";

/** Flat, build-time index of every calculator + converter for search/command palette. */
export function getSearchIndex(): ToolSummary[] {
  return [
    ...getAllCalculators().map(calculatorSummary),
    ...getAllConverters().map(converterSummary),
  ];
}

/** Plain-data index (no icon component refs) — safe to pass into Client Components. */
export function getSearchableIndex(): SearchableTool[] {
  return getSearchIndex().map((tool) => ({
    type: tool.type,
    slug: tool.slug,
    name: tool.name,
    shortDescription: tool.shortDescription,
    category: tool.category,
    keywords: tool.keywords,
    isNew: tool.isNew,
    isPopular: tool.isPopular,
  }));
}

function scoreTool(tool: ToolSummary, query: string): number {
  const name = tool.name.toLowerCase();
  if (name === query) return 100;
  if (name.startsWith(query)) return 80;
  if (name.includes(query)) return 60;
  if (tool.keywords.some((k) => k.toLowerCase().includes(query))) return 40;
  if (tool.shortDescription.toLowerCase().includes(query)) return 20;
  return 0;
}

export function searchTools(query: string, limit = 20): ToolSummary[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];

  return getSearchIndex()
    .map((tool) => ({ tool, score: scoreTool(tool, q) }))
    .filter((entry) => entry.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((entry) => entry.tool);
}
