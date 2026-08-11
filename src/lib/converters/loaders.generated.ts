// AUTO-GENERATED FILE — do not edit by hand.
// Regenerate with `pnpm generate:registry` (also runs automatically before dev/build).
// Per-slug dynamic import() map — lets Client Components lazy-load a single
// tool's logic (code-split into its own chunk) instead of bundling every
// tool's code into every page.

import type { ConverterDefinition } from "./types";

export const loaders: Record<string, () => Promise<{ default: ConverterDefinition }>> = {
  "angle": () => import("./definitions/angle"),
  "area": () => import("./definitions/area"),
  "cooking": () => import("./definitions/cooking"),
  "digital-storage": () => import("./definitions/digital-storage"),
  "energy": () => import("./definitions/energy"),
  "fuel-economy": () => import("./definitions/fuel-economy"),
  "length": () => import("./definitions/length"),
  "power": () => import("./definitions/power"),
  "pressure": () => import("./definitions/pressure"),
  "speed": () => import("./definitions/speed"),
  "temperature": () => import("./definitions/temperature"),
  "time": () => import("./definitions/time"),
  "typography": () => import("./definitions/typography"),
  "volume": () => import("./definitions/volume"),
  "weight": () => import("./definitions/weight"),
};
