import type { CategorySlug, ToolSummary } from "@/types";
import { calculators } from "./registry.generated";
import type { CalculatorDefinition } from "./types";

const bySlug = new Map<string, CalculatorDefinition>();
for (const def of calculators) {
  if (bySlug.has(def.slug)) {
    throw new Error(`Duplicate calculator slug: "${def.slug}"`);
  }
  bySlug.set(def.slug, def);
}

export function getAllCalculators(): CalculatorDefinition[] {
  return calculators;
}

export function getCalculatorBySlug(slug: string): CalculatorDefinition | undefined {
  return bySlug.get(slug);
}

export function getCalculatorsByCategory(category: CategorySlug): CalculatorDefinition[] {
  return calculators.filter((c) => c.category === category);
}

export function getPopularCalculators(limit = 8): CalculatorDefinition[] {
  return calculators.filter((c) => c.isPopular).slice(0, limit);
}

export function getRecentlyAddedCalculators(limit = 8): CalculatorDefinition[] {
  return calculators.filter((c) => c.isNew).slice(0, limit);
}

export function getRelatedCalculators(def: CalculatorDefinition, limit = 4): CalculatorDefinition[] {
  const related = def.relatedSlugs
    .map((slug) => bySlug.get(slug))
    .filter((c): c is CalculatorDefinition => Boolean(c));
  return related.slice(0, limit);
}

export function toToolSummary(def: CalculatorDefinition): ToolSummary {
  return {
    type: "calculator",
    slug: def.slug,
    name: def.name,
    shortDescription: def.shortDescription,
    category: def.category,
    icon: def.icon,
    keywords: def.keywords,
    isNew: def.isNew,
    isPopular: def.isPopular,
  };
}
