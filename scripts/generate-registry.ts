/**
 * Scans src/lib/{calculators,converters}/definitions/*.ts and (re)writes:
 *   - registry.generated.ts — static imports + an array of every definition
 *     (used server-side for pages, sitemap, search index, etc.)
 *   - loaders.generated.ts — a slug -> dynamic-import() map, so a Client
 *     Component can lazy-load a single tool's `calculate`/`convert` logic
 *     without bundling all 1000+ tools' code into every page's JS chunk.
 *
 * This is the whole extensibility mechanism: adding a new calculator or
 * converter is "drop a file in definitions/, run `pnpm dev` or `pnpm build`"
 * — nothing else needs to change. Runs automatically via predev/prebuild.
 */
import { existsSync, mkdirSync, readdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const ROOT = join(__dirname, "..");

interface RegistryTarget {
  label: string;
  definitionsDir: string;
  registryOutputFile: string;
  loadersOutputFile: string;
  typeName: string;
  exportName: string;
  /**
   * Only files whose source passes this get a client-side loader entry.
   * Definitions that pull in server-only code (e.g. Currency's live-rate
   * fetcher) must be excluded — otherwise the client bundler tries to build
   * a chunk for them just because they're a dynamic-import() target, even
   * though no Client Component ever actually calls that loader at runtime.
   */
  isClientLoadable: (source: string) => boolean;
}

const targets: RegistryTarget[] = [
  {
    label: "calculators",
    definitionsDir: join(ROOT, "src/lib/calculators/definitions"),
    registryOutputFile: join(ROOT, "src/lib/calculators/registry.generated.ts"),
    loadersOutputFile: join(ROOT, "src/lib/calculators/loaders.generated.ts"),
    typeName: "CalculatorDefinition",
    exportName: "calculators",
    // Every calculator's `calculate` runs client-side.
    isClientLoadable: () => true,
  },
  {
    label: "converters",
    definitionsDir: join(ROOT, "src/lib/converters/definitions"),
    registryOutputFile: join(ROOT, "src/lib/converters/registry.generated.ts"),
    loadersOutputFile: join(ROOT, "src/lib/converters/loaders.generated.ts"),
    typeName: "ConverterDefinition",
    exportName: "converters",
    // Only "numeric" converters are lazy-loaded client-side (by ConverterShell).
    // "visual" (Color) and "currency" (server-fetched rates) never call
    // loadConverter(), and "currency" specifically imports server-only code
    // that must never reach a client bundle.
    isClientLoadable: (source) => /kind:\s*"numeric"/.test(source),
  },
];

function toCamelCase(fileBase: string): string {
  return fileBase
    .split("-")
    .map((part, i) => (i === 0 ? part : part.charAt(0).toUpperCase() + part.slice(1)))
    .join("");
}

for (const target of targets) {
  if (!existsSync(target.definitionsDir)) {
    mkdirSync(target.definitionsDir, { recursive: true });
  }

  const files = readdirSync(target.definitionsDir)
    .filter((f) => /\.tsx?$/.test(f) && !f.endsWith(".d.ts"))
    .sort((a, b) => a.localeCompare(b));

  const entries = files.map((file) => {
    const base = file.replace(/\.tsx?$/, "");
    const source = readFileSync(join(target.definitionsDir, file), "utf-8");
    return {
      slug: base,
      varName: toCamelCase(base),
      importPath: `./definitions/${base}`,
      clientLoadable: target.isClientLoadable(source),
    };
  });

  const seen = new Map<string, string>();
  for (const { varName, importPath } of entries) {
    if (seen.has(varName)) {
      throw new Error(
        `Duplicate ${target.label} registry identifier "${varName}" from ${importPath} and ${seen.get(varName)}. Rename one of the definition files.`,
      );
    }
    seen.set(varName, importPath);
  }

  const registryLines: string[] = [
    "// AUTO-GENERATED FILE — do not edit by hand.",
    "// Regenerate with `pnpm generate:registry` (also runs automatically before dev/build).",
    `// Source: every file in ./definitions/*.ts`,
    "",
    `import type { ${target.typeName} } from "./types";`,
    ...entries.map(({ varName, importPath }) => `import ${varName} from "${importPath}";`),
    "",
    `export const ${target.exportName}: ${target.typeName}[] = [`,
    ...entries.map(({ varName }) => `  ${varName},`),
    "];",
    "",
  ];

  writeFileSync(target.registryOutputFile, registryLines.join("\n"), "utf-8");

  const loaderLines: string[] = [
    "// AUTO-GENERATED FILE — do not edit by hand.",
    "// Regenerate with `pnpm generate:registry` (also runs automatically before dev/build).",
    "// Per-slug dynamic import() map — lets Client Components lazy-load a single",
    "// tool's logic (code-split into its own chunk) instead of bundling every",
    "// tool's code into every page.",
    "",
    `import type { ${target.typeName} } from "./types";`,
    "",
    `export const loaders: Record<string, () => Promise<{ default: ${target.typeName} }>> = {`,
    ...entries
      .filter((e) => e.clientLoadable)
      .map(({ slug, importPath }) => `  "${slug}": () => import("${importPath}"),`),
    "};",
    "",
  ];

  writeFileSync(target.loadersOutputFile, loaderLines.join("\n"), "utf-8");

  const loadableCount = entries.filter((e) => e.clientLoadable).length;
  console.log(
    `[generate-registry] ${target.label}: wrote ${entries.length} definitions (${loadableCount} client-loadable) to ${target.registryOutputFile.replace(ROOT + "/", "")} + ${target.loadersOutputFile.replace(ROOT + "/", "")}`,
  );
}
