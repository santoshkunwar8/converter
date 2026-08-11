import { loaders } from "./loaders.generated";
import type { ConverterDefinition } from "./types";

/**
 * Lazy-loads a single converter's definition (including `convert`) by slug.
 * Import this directly in Client Components — never import from
 * `./registry`, which statically pulls in every converter's code.
 */
export async function loadConverter(slug: string): Promise<ConverterDefinition> {
  const loader = loaders[slug];
  if (!loader) throw new Error(`Unknown converter slug: "${slug}"`);
  const mod = await loader();
  return mod.default;
}
