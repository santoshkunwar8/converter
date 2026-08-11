import type { CalculatorExample } from "@/lib/calculators/types";

export function ExamplesSection({ examples }: { examples: CalculatorExample[] }) {
  if (examples.length === 0) return null;

  return (
    <div className="rounded-2xl border border-border bg-card p-6 shadow-soft sm:p-8">
      <h2 className="mb-5 text-lg font-semibold">Examples</h2>
      <div className="grid gap-4 sm:grid-cols-2">
        {examples.map((example) => (
          <div key={example.title} className="rounded-xl border border-border bg-muted/30 p-4">
            <p className="font-medium">{example.title}</p>
            <dl className="mt-2 space-y-1">
              {Object.entries(example.inputs).map(([key, value]) => (
                <div key={key} className="flex justify-between text-sm text-muted-foreground">
                  <dt className="capitalize">{key.replace(/([A-Z])/g, " $1")}</dt>
                  <dd>{value}</dd>
                </div>
              ))}
            </dl>
            <p className="mt-3 text-sm font-medium text-primary">{example.resultSummary}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
