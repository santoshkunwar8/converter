import type { LucideIcon } from "lucide-react";
import type { CategorySlug, FaqItem, SeoOverrides } from "@/types";

export type CalculatorInputType = "number" | "select" | "radio" | "date" | "text";

export interface CalculatorSelectOption {
  label: string;
  value: string;
}

export interface CalculatorInput {
  id: string;
  label: string;
  type: CalculatorInputType;
  unit?: string;
  placeholder?: string;
  defaultValue?: string | number;
  min?: number;
  max?: number;
  step?: number;
  options?: CalculatorSelectOption[];
  required?: boolean;
  helpText?: string;
}

export type ResultFormat = "number" | "currency" | "percent" | "date" | "duration" | "text";

export interface CalculatorResultField {
  id: string;
  label: string;
  format?: ResultFormat;
  unit?: string;
  decimals?: number;
  /** Renders larger/emphasized as the primary answer. */
  highlight?: boolean;
}

export type CalculatorInputValues = Record<string, string | number>;
export type CalculatorResultValues = Record<string, string | number>;

export interface CalculatorExample {
  title: string;
  inputs: CalculatorInputValues;
  resultSummary: string;
}

export interface FormulaEntry {
  description: string;
  expression: string;
}

export interface CalculatorStep {
  title: string;
  description: string;
}

export interface CalculatorDefinition {
  name: string;
  /** URL segment, unique within calculators. */
  slug: string;
  description: string;
  shortDescription: string;
  category: CategorySlug;
  icon: LucideIcon;
  keywords: string[];
  inputs: CalculatorInput[];
  resultFields: CalculatorResultField[];
  calculate: (
    inputs: CalculatorInputValues,
  ) => { ok: true; values: CalculatorResultValues } | { ok: false; error: string };
  formula: FormulaEntry[];
  steps: CalculatorStep[];
  examples: CalculatorExample[];
  faq: FaqItem[];
  /** Slugs of other calculators to surface as "related". */
  relatedSlugs: string[];
  seo?: SeoOverrides;
  isPopular?: boolean;
  isNew?: boolean;
}
