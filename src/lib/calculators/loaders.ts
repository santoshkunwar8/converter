import { loaders } from "./loaders.generated";
import type { CalculatorDefinition } from "./types";

/**
 * Lazy-loads a single calculator's definition (including `calculate`) by
 * slug. Import this directly in Client Components — never import from
 * `./registry`, which statically pulls in every calculator's code.
 */
export async function loadCalculator(slug: string): Promise<CalculatorDefinition> {
  const loader = loaders[slug];
  if (!loader) throw new Error(`Unknown calculator slug: "${slug}"`);
  const mod = await loader();
  return mod.default;
}
