/**
 * Builds a `convert` function for the common case: every unit is a fixed
 * multiple of a shared base unit (e.g. meters for length, grams for weight).
 * `factors[unitId]` = how many base units one of that unit equals.
 */
export function createLinearConverter(
  factors: Record<string, number>,
): (value: number, from: string, to: string) => number {
  return (value: number, from: string, to: string) => {
    const fromFactor = factors[from];
    const toFactor = factors[to];
    if (fromFactor === undefined) throw new Error(`Unknown unit: ${from}`);
    if (toFactor === undefined) throw new Error(`Unknown unit: ${to}`);
    const base = value * fromFactor;
    return base / toFactor;
  };
}
