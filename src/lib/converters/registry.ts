import type { ToolSummary } from "@/types";
import { converters } from "./registry.generated";
import type { ConverterDefinition } from "./types";

const bySlug = new Map<string, ConverterDefinition>();
for (const def of converters) {
  if (bySlug.has(def.slug)) {
    throw new Error(`Duplicate converter slug: "${def.slug}"`);
  }
  bySlug.set(def.slug, def);
}

export function getAllConverters(): ConverterDefinition[] {
  return converters;
}

export function getConverterBySlug(slug: string): ConverterDefinition | undefined {
  return bySlug.get(slug);
}

export function getPopularConverters(limit = 8): ConverterDefinition[] {
  return converters.filter((c) => c.isPopular).slice(0, limit);
}

export function getRecentlyAddedConverters(limit = 8): ConverterDefinition[] {
  return converters.filter((c) => c.isNew).slice(0, limit);
}

export function getRelatedConverters(def: ConverterDefinition, limit = 4): ConverterDefinition[] {
  const related = def.relatedSlugs
    .map((slug) => bySlug.get(slug))
    .filter((c): c is ConverterDefinition => Boolean(c));
  return related.slice(0, limit);
}

export function toToolSummary(def: ConverterDefinition): ToolSummary {
  return {
    type: "converter",
    slug: def.slug,
    name: def.name,
    shortDescription: def.shortDescription,
    category: "converters",
    icon: def.icon,
    keywords: def.keywords,
    isNew: def.isNew,
    isPopular: def.isPopular,
  };
}
