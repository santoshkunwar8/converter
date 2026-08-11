# CalcHub

A free, fast, and accurate calculators-and-unit-converters platform built with Next.js 16 (App Router), TypeScript, Tailwind CSS v4, and shadcn/ui. Every tool is statically generated and calculates entirely in the browser.

## Stack

- **Next.js 16** (App Router, Turbopack, React 19)
- **TypeScript** (strict)
- **Tailwind CSS v4** + **shadcn/ui** (Base UI primitives)
- **Prisma + Postgres** for anonymous, device-scoped favorites/recent/history (optional — the app is fully functional without it, via localStorage)
- **pnpm**

## Getting started

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

### Optional: enable cross-device sync

Favorites, recently-used tools, and converter history work out of the box via `localStorage`. To also sync them anonymously across devices:

1. Provision a free Postgres database (e.g. [Neon](https://neon.tech) or Vercel Postgres).
2. Copy `.env.example` to `.env` and set `DATABASE_URL`.
3. Run `pnpm db:migrate`.

No user accounts are involved — devices are identified by a random ID in a cookie (see `src/lib/device.ts`).

## Architecture: adding a new calculator or converter

This is the core design goal of the platform: **you never touch existing code to add a new tool.**

### Add a calculator

Create one file: `src/lib/calculators/definitions/your-slug.ts`, default-exporting a `CalculatorDefinition` (see `src/lib/calculators/types.ts`):

```ts
import { Calculator } from "lucide-react";
import type { CalculatorDefinition } from "../types";

const yourCalculator: CalculatorDefinition = {
  name: "Your Calculator",
  slug: "your-slug",
  description: "...",
  shortDescription: "...",
  category: "math", // one of CategorySlug in src/types/index.ts
  icon: Calculator, // any lucide-react icon
  keywords: ["..."],
  inputs: [{ id: "x", label: "X", type: "number", required: true }],
  resultFields: [{ id: "result", label: "Result", format: "number", highlight: true }],
  calculate: (inputs) => {
    const x = Number(inputs.x);
    if (Number.isNaN(x)) return { ok: false, error: "Enter a valid number." };
    return { ok: true, values: { result: x * 2 } };
  },
  formula: [{ description: "...", expression: "result = x × 2" }],
  steps: [{ title: "...", description: "..." }],
  examples: [{ title: "...", inputs: { x: 5 }, resultSummary: "result = 10" }],
  faq: [{ question: "...", answer: "..." }],
  relatedSlugs: ["another-calculator-slug"],
};

export default yourCalculator;
```

### Add a converter

Create one file: `src/lib/converters/definitions/your-slug.ts`, default-exporting a `ConverterDefinition` (see `src/lib/converters/types.ts`). Most converters are a fixed set of units on a shared linear scale — use the `createLinearConverter` helper:

```ts
import { Ruler } from "lucide-react";
import { createLinearConverter } from "../engine";
import type { ConverterDefinition } from "../types";

const BASE_UNIT_FACTORS: Record<string, number> = { unitA: 1, unitB: 2.5 };

const yourConverter: ConverterDefinition = {
  name: "Your Converter",
  slug: "your-slug",
  description: "...",
  shortDescription: "...",
  icon: Ruler,
  keywords: ["..."],
  kind: "numeric",
  units: [
    { id: "unitA", label: "Unit A", symbol: "a" },
    { id: "unitB", label: "Unit B", symbol: "b" },
  ],
  defaultFromUnit: "unitA",
  defaultToUnit: "unitB",
  convert: createLinearConverter(BASE_UNIT_FACTORS),
  faq: [{ question: "...", answer: "..." }],
  relatedSlugs: ["another-converter-slug"],
};

export default yourConverter;
```

For non-proportional relationships (e.g. temperature's offset math, or fuel economy's reciprocal mpg ↔ L/100km), write a custom `convert(value, from, to)` function instead of `createLinearConverter` — see `definitions/temperature.ts` and `definitions/fuel-economy.ts`.

For converters whose input/output isn't a single numeric scale at all (e.g. Color: hex/RGB/HSL), set `kind: "visual"` instead and render a dedicated component — see `definitions/color.ts` and `components/converters/color-converter-view.tsx`.

### That's it

Next steps happen automatically:

- `pnpm dev` / `pnpm build` run `scripts/generate-registry.ts` first (via `predev`/`prebuild`), which scans both `definitions/` folders and regenerates `registry.generated.ts` (full definitions, used server-side) and `loaders.generated.ts` (a per-slug `import()` map, used client-side so each tool's page only ships its own JS, not every tool's).
- The dynamic routes (`/calculators/[category]/[slug]`, `/converters/[slug]`), sitemap, robots.txt, RSS feed, search index, category counts, and command palette are all derived from the registries — nothing is hardcoded.
- Duplicate slugs fail the build loudly (`registry.ts` throws), so typos are caught immediately.

If you want the tool to show up in "Popular" or "Recently Added" sections, set `isPopular: true` and/or `isNew: true` on the definition.

## Project structure

```
src/
  app/                       # routes (pages, API routes, sitemap, robots, feed, OG images)
  components/
    ui/                      # shadcn primitives
    layout/                  # Navbar, Footer, ThemeSwitch
    home/                    # Hero, Section
    shared/                  # ToolCard, CategoryCard, Breadcrumbs, CommandPalette, etc.
    calculators/             # CalculatorShell + formula/steps/examples sections
    converters/               # ConverterShell, ColorConverterView
  lib/
    calculators/             # types, engine, registry, loaders, definitions/*.ts
    converters/               # types, engine, registry, loaders, definitions/*.ts
    categories.ts, seo.ts, schema.ts, search.ts, routes.ts, format.ts, db.ts, device.ts
  hooks/                     # use-favorites, use-recent, use-conversion-history, use-command-palette, ...
scripts/generate-registry.ts # the extensibility mechanism
prisma/schema.prisma         # anonymous device-scoped favorites/recent/history
```

## Scripts

| Command | Description |
| --- | --- |
| `pnpm dev` | Start the dev server (regenerates registries first) |
| `pnpm build` | Production build (regenerates registries first) |
| `pnpm generate:registry` | Manually regenerate the tool registries |
| `pnpm lint` | ESLint |
| `pnpm db:generate` / `db:migrate` / `db:studio` | Prisma commands |

## Deployment

Vercel-ready out of the box. Set `NEXT_PUBLIC_SITE_URL` to your production URL and (optionally) `DATABASE_URL` in your project's environment variables.
