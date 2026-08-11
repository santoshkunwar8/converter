"use client";

import { useEffect, useMemo, useState } from "react";
import { ArrowLeftRight, History as HistoryIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CopyButton } from "@/components/shared/copy-button";
import { ShareButton } from "@/components/shared/share-button";
import { PrintButton } from "@/components/shared/print-button";
import { FavoriteButton } from "@/components/shared/favorite-button";
import { formatConversionValue } from "@/lib/format";
import { useConversionHistory } from "@/hooks/use-conversion-history";
import { useRecent } from "@/hooks/use-recent";
import { SITE_URL } from "@/lib/constants";
import type { CurrencyRates, UnitDefinition } from "@/lib/converters/types";

interface CurrencyConverterShellProps {
  slug: string;
  units: UnitDefinition[];
  defaultFromUnit: string;
  defaultToUnit: string;
  rates: CurrencyRates;
}

function convertCurrency(value: number, from: string, to: string, rates: CurrencyRates): number | null {
  const fromRate = from === rates.base ? 1 : rates.rates[from];
  const toRate = to === rates.base ? 1 : rates.rates[to];
  if (fromRate === undefined || toRate === undefined) return null;
  const amountInBase = value / fromRate;
  return amountInBase * toRate;
}

export function CurrencyConverterShell({
  slug,
  units,
  defaultFromUnit,
  defaultToUnit,
  rates,
}: CurrencyConverterShellProps) {
  const [fromUnit, setFromUnit] = useState(defaultFromUnit);
  const [toUnit, setToUnit] = useState(defaultToUnit);
  const [inputValue, setInputValue] = useState("1");
  const { history, addEntry } = useConversionHistory(slug);
  const { addRecent } = useRecent();

  useEffect(() => {
    addRecent(slug, "converter");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug]);

  const numericInput = Number(inputValue);
  const result = useMemo(() => {
    if (inputValue === "" || Number.isNaN(numericInput)) return null;
    return convertCurrency(numericInput, fromUnit, toUnit, rates);
  }, [numericInput, inputValue, fromUnit, toUnit, rates]);

  const formattedResult = result !== null ? formatConversionValue(result) : null;
  const fromLabel = units.find((u) => u.id === fromUnit)?.symbol ?? "";
  const toLabel = units.find((u) => u.id === toUnit)?.symbol ?? "";
  const shareUrl = `${SITE_URL}/converters/${slug}`;

  function handleSwap() {
    setFromUnit(toUnit);
    setToUnit(fromUnit);
    if (formattedResult) setInputValue(String(result));
  }

  function recordHistory() {
    if (result === null) return;
    addEntry(fromUnit, toUnit, numericInput, result);
  }

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-border bg-card p-6 shadow-soft sm:p-8">
        <div className="grid items-end gap-4 sm:grid-cols-[1fr_auto_1fr]">
          <div className="space-y-1.5">
            <Label htmlFor="from-value">From</Label>
            <Input
              id="from-value"
              type="number"
              inputMode="decimal"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onBlur={recordHistory}
              className="h-12 text-lg"
            />
            <Select value={fromUnit} onValueChange={(v) => v && setFromUnit(v)}>
              <SelectTrigger className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {units.map((unit) => (
                  <SelectItem key={unit.id} value={unit.id}>
                    {unit.label} ({unit.symbol})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <Button
            variant="outline"
            size="icon"
            onClick={handleSwap}
            aria-label="Swap currencies"
            className="mb-[1px] shrink-0 self-center sm:mb-9"
          >
            <ArrowLeftRight className="size-4" />
          </Button>

          <div className="space-y-1.5">
            <Label htmlFor="to-value">To</Label>
            <div
              id="to-value"
              className="flex h-12 items-center rounded-lg border border-input bg-muted/40 px-3 text-lg font-semibold"
            >
              {formattedResult ?? "—"}
              {formattedResult && <span className="ml-1.5 text-sm font-normal text-muted-foreground">{toLabel}</span>}
            </div>
            <Select value={toUnit} onValueChange={(v) => v && setToUnit(v)}>
              <SelectTrigger className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {units.map((unit) => (
                  <SelectItem key={unit.id} value={unit.id}>
                    {unit.label} ({unit.symbol})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {formattedResult && (
          <p className="mt-5 text-sm text-muted-foreground">
            {inputValue} {fromLabel} = <span className="font-medium text-foreground">{formattedResult} {toLabel}</span>
          </p>
        )}
        <p className="mt-1 text-xs text-muted-foreground">
          Rates as of {rates.date}, relative to {rates.base}. Updated hourly.
        </p>

        <div className="mt-5 flex flex-wrap gap-2" data-no-print="true">
          {formattedResult && <CopyButton value={`${formattedResult} ${toLabel}`} label="Copy result" />}
          <ShareButton title="Currency conversion" url={shareUrl} />
          <PrintButton />
          <FavoriteButton toolSlug={slug} toolType="converter" variant="full" />
        </div>
      </div>

      {history.length > 0 && (
        <div className="rounded-2xl border border-border bg-card p-6 shadow-soft sm:p-8" data-no-print="true">
          <h2 className="mb-4 flex items-center gap-2 text-lg font-semibold">
            <HistoryIcon className="size-4.5" /> Recent conversions
          </h2>
          <ul className="space-y-2">
            {history.slice(0, 8).map((entry, i) => (
              <li key={i} className="flex justify-between text-sm text-muted-foreground">
                <span>
                  {formatConversionValue(entry.inputValue)} {entry.fromUnit} → {entry.toUnit}
                </span>
                <span className="font-medium text-foreground">{formatConversionValue(entry.outputValue)}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
