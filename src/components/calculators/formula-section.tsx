import type { FormulaEntry } from "@/lib/calculators/types";

export function FormulaSection({ formula }: { formula: FormulaEntry[] }) {
  if (formula.length === 0) return null;

  return (
    <div className="rounded-2xl border border-border bg-card p-6 shadow-soft sm:p-8">
      <h2 className="mb-4 text-lg font-semibold">Formula</h2>
      <div className="space-y-4">
        {formula.map((entry) => (
          <div key={entry.expression}>
            <p className="mb-1.5 text-sm text-muted-foreground">{entry.description}</p>
            <code className="block overflow-x-auto rounded-xl bg-muted px-4 py-3 font-mono text-sm">
              {entry.expression}
            </code>
          </div>
        ))}
      </div>
    </div>
  );
}
