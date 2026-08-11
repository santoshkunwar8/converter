"use client";

import { useEffect, useMemo, useState } from "react";
import { RotateCcw, TriangleAlert } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { CopyButton } from "@/components/shared/copy-button";
import { ShareButton } from "@/components/shared/share-button";
import { PrintButton } from "@/components/shared/print-button";
import { FavoriteButton } from "@/components/shared/favorite-button";
import { getDefaultRawInputs, runCalculator, type CalculatorRunResult } from "@/lib/calculators/engine";
import { loadCalculator } from "@/lib/calculators/loaders";
import { formatResultValue } from "@/lib/format";
import { useRecent } from "@/hooks/use-recent";
import { SITE_URL } from "@/lib/constants";
import type { CalculatorDefinition, CalculatorInput, CalculatorResultField } from "@/lib/calculators/types";

interface CalculatorShellProps {
  slug: string;
  category: string;
  inputs: CalculatorInput[];
  resultFields: CalculatorResultField[];
}

export function CalculatorShell({ slug, category, inputs, resultFields }: CalculatorShellProps) {
  const [calculate, setCalculate] = useState<CalculatorDefinition["calculate"] | null>(null);
  const [rawInputs, setRawInputs] = useState<Record<string, string>>(() =>
    getDefaultRawInputs(inputs),
  );
  const { addRecent } = useRecent();

  useEffect(() => {
    let cancelled = false;
    loadCalculator(slug).then((def) => {
      if (!cancelled) setCalculate(() => def.calculate);
    });
    addRecent(slug, "calculator");
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug]);

  const run: CalculatorRunResult | null = useMemo(() => {
    if (!calculate) return null;
    return runCalculator({ inputs, calculate }, rawInputs);
  }, [calculate, inputs, rawInputs]);

  function setValue(id: string, value: string) {
    setRawInputs((prev) => ({ ...prev, [id]: value }));
  }

  function handleReset() {
    setRawInputs(getDefaultRawInputs(inputs));
  }

  const primaryField = resultFields.find((f) => f.highlight) ?? resultFields[0];
  const primaryValue =
    run?.success && primaryField ? formatResultValue(run.result[primaryField.id], primaryField) : null;

  const shareUrl = `${SITE_URL}/calculators/${category}/${slug}`;

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <div className="rounded-2xl border border-border bg-card p-6 shadow-soft sm:p-8">
        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-lg font-semibold">Inputs</h2>
          <Button variant="ghost" size="sm" onClick={handleReset} className="gap-1.5 text-muted-foreground">
            <RotateCcw className="size-3.5" />
            Reset
          </Button>
        </div>

        <div className="space-y-5">
          {inputs.map((input) => {
            const error = !run?.success ? run?.errors[input.id] : undefined;
            return (
              <div key={input.id} className="space-y-1.5">
                <Label htmlFor={input.id}>
                  {input.label}
                  {input.unit && <span className="text-muted-foreground"> ({input.unit})</span>}
                </Label>

                {input.type === "select" ? (
                  <Select
                    value={rawInputs[input.id] ?? ""}
                    onValueChange={(value) => setValue(input.id, value ?? "")}
                  >
                    <SelectTrigger id={input.id} className="w-full">
                      <SelectValue placeholder={input.placeholder ?? "Select…"} />
                    </SelectTrigger>
                    <SelectContent>
                      {input.options?.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                ) : input.type === "radio" ? (
                  <RadioGroup
                    value={rawInputs[input.id] ?? ""}
                    onValueChange={(value) => setValue(input.id, value)}
                    className="flex flex-wrap gap-4"
                  >
                    {input.options?.map((option) => (
                      <div key={option.value} className="flex items-center gap-2">
                        <RadioGroupItem value={option.value} id={`${input.id}-${option.value}`} />
                        <Label htmlFor={`${input.id}-${option.value}`} className="font-normal">
                          {option.label}
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                ) : (
                  <Input
                    id={input.id}
                    type={input.type === "number" ? "number" : input.type === "date" ? "date" : "text"}
                    inputMode={input.type === "number" ? "decimal" : undefined}
                    placeholder={input.placeholder}
                    min={input.min}
                    max={input.max}
                    step={input.step}
                    value={rawInputs[input.id] ?? ""}
                    onChange={(e) => setValue(input.id, e.target.value)}
                    aria-invalid={Boolean(error)}
                    className="h-11 text-base"
                  />
                )}

                {input.helpText && !error && (
                  <p className="text-xs text-muted-foreground">{input.helpText}</p>
                )}
                {error && <p className="text-xs font-medium text-destructive">{error}</p>}
              </div>
            );
          })}
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <div className="rounded-2xl border border-border bg-gradient-to-br from-primary/5 via-card to-card p-6 shadow-soft sm:p-8">
          <h2 className="mb-5 text-lg font-semibold">Result</h2>

          {run && !run.success && run.formError ? (
            <div className="flex items-start gap-2 rounded-xl bg-destructive/10 p-4 text-sm text-destructive">
              <TriangleAlert className="mt-0.5 size-4 shrink-0" />
              {run.formError}
            </div>
          ) : run?.success ? (
            <div className="space-y-4">
              {resultFields.map((field) => {
                const isPrimary = field === primaryField;
                const value = formatResultValue(run.result[field.id], field);
                return (
                  <div
                    key={field.id}
                    className={isPrimary ? "border-b border-border pb-4" : "flex items-center justify-between"}
                  >
                    <p className="text-sm text-muted-foreground">{field.label}</p>
                    <p className={isPrimary ? "mt-1 text-4xl font-bold tracking-tight text-primary" : "font-medium"}>
                      {value}
                    </p>
                  </div>
                );
              })}
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">Fill in the fields to see your result.</p>
          )}
        </div>

        <div className="flex flex-wrap gap-2" data-no-print="true">
          {primaryValue && <CopyButton value={primaryValue} label="Copy result" />}
          <ShareButton title="Calculator result" url={shareUrl} />
          <PrintButton />
          <FavoriteButton toolSlug={slug} toolType="calculator" variant="full" />
        </div>
      </div>
    </div>
  );
}
