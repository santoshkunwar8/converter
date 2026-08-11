import type { LucideIcon } from "lucide-react";
import type { FaqItem, SeoOverrides } from "@/types";

export interface UnitDefinition {
  id: string;
  label: string;
  symbol: string;
}

interface ConverterBase {
  name: string;
  /** URL segment, unique within converters. */
  slug: string;
  description: string;
  shortDescription: string;
  icon: LucideIcon;
  keywords: string[];
  faq: FaqItem[];
  /** Slugs of other converters to surface as "related". */
  relatedSlugs: string[];
  seo?: SeoOverrides;
  isPopular?: boolean;
  isNew?: boolean;
}

/** The common case: a fixed set of units on a shared numeric scale, rendered by ConverterShell. */
export interface NumericConverterDefinition extends ConverterBase {
  kind: "numeric";
  units: UnitDefinition[];
  defaultFromUnit: string;
  defaultToUnit: string;
  convert: (value: number, from: string, to: string) => number;
}

/**
 * For converters whose input/output isn't a single numeric base (e.g. Color:
 * hex/RGB/HSL). Rendered by a dedicated component instead of ConverterShell.
 */
export interface VisualConverterDefinition extends ConverterBase {
  kind: "visual";
}

export interface CurrencyRates {
  /** The currency every rate in `rates` is expressed against (1 unit of base). */
  base: string;
  /** Currency code -> how many of that currency equal 1 unit of `base`. */
  rates: Record<string, number>;
  /** ISO date the rates were last updated, as reported by the data source. */
  date: string;
}

/**
 * For Currency: rates come from a live, periodically-revalidated external
 * source rather than a fixed table, so there's no static `convert` function —
 * only a server-side `fetchRates`. Rendered by CurrencyConverterShell, which
 * receives the fetched rates as a prop and does the arithmetic client-side.
 */
export interface CurrencyConverterDefinition extends ConverterBase {
  kind: "currency";
  units: UnitDefinition[];
  defaultFromUnit: string;
  defaultToUnit: string;
  /** Server-only. Call from a Server Component/page, never from client code. */
  fetchRates: () => Promise<CurrencyRates>;
}

export type ConverterDefinition =
  | NumericConverterDefinition
  | VisualConverterDefinition
  | CurrencyConverterDefinition;
