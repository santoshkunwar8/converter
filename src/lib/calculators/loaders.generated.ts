// AUTO-GENERATED FILE — do not edit by hand.
// Regenerate with `pnpm generate:registry` (also runs automatically before dev/build).
// Per-slug dynamic import() map — lets Client Components lazy-load a single
// tool's logic (code-split into its own chunk) instead of bundling every
// tool's code into every page.

import type { CalculatorDefinition } from "./types";

export const loaders: Record<string, () => Promise<{ default: CalculatorDefinition }>> = {
  "age-calculator": () => import("./definitions/age-calculator"),
  "attendance-calculator": () => import("./definitions/attendance-calculator"),
  "average-calculator": () => import("./definitions/average-calculator"),
  "bmi-calculator": () => import("./definitions/bmi-calculator"),
  "compound-interest-calculator": () => import("./definitions/compound-interest-calculator"),
  "date-difference-calculator": () => import("./definitions/date-difference-calculator"),
  "discount-calculator": () => import("./definitions/discount-calculator"),
  "emi-calculator": () => import("./definitions/emi-calculator"),
  "fuel-cost-calculator": () => import("./definitions/fuel-cost-calculator"),
  "grade-calculator": () => import("./definitions/grade-calculator"),
  "loan-calculator": () => import("./definitions/loan-calculator"),
  "percentage-calculator": () => import("./definitions/percentage-calculator"),
  "percentage-decrease-calculator": () => import("./definitions/percentage-decrease-calculator"),
  "percentage-increase-calculator": () => import("./definitions/percentage-increase-calculator"),
  "profit-margin-calculator": () => import("./definitions/profit-margin-calculator"),
  "scientific-calculator": () => import("./definitions/scientific-calculator"),
  "simple-interest-calculator": () => import("./definitions/simple-interest-calculator"),
  "split-bill-calculator": () => import("./definitions/split-bill-calculator"),
  "time-difference-calculator": () => import("./definitions/time-difference-calculator"),
  "tip-calculator": () => import("./definitions/tip-calculator"),
};
