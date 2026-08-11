import type { CalculatorResultField } from "@/lib/calculators/types";

export function formatNumber(value: number, decimals?: number): string {
  return new Intl.NumberFormat("en-US", {
    maximumFractionDigits: decimals ?? 2,
    minimumFractionDigits: 0,
  }).format(value);
}

export function formatCurrency(value: number, decimals = 2): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: decimals,
  }).format(value);
}

export function formatPercent(value: number, decimals = 1): string {
  return `${formatNumber(value, decimals)}%`;
}

/** Renders a calculator result field's raw value per its declared format. */
export function formatResultValue(
  value: string | number,
  field: Pick<CalculatorResultField, "format" | "unit" | "decimals">,
): string {
  if (typeof value === "string") return value;

  switch (field.format) {
    case "currency":
      return formatCurrency(value, field.decimals ?? 2);
    case "percent":
      return formatPercent(value, field.decimals ?? 1);
    case "date":
    case "duration":
    case "text":
      return String(value);
    case "number":
    default:
      return field.unit
        ? `${formatNumber(value, field.decimals)} ${field.unit}`
        : formatNumber(value, field.decimals);
  }
}

/** Format a raw numeric converter value with sensible precision (no trailing zero noise). */
export function formatConversionValue(value: number): string {
  if (!Number.isFinite(value)) return "—";
  const abs = Math.abs(value);
  const decimals = abs !== 0 && abs < 1 ? 6 : abs < 100 ? 4 : 2;
  const rounded = Number(value.toFixed(decimals));
  return new Intl.NumberFormat("en-US", { maximumFractionDigits: decimals }).format(rounded);
}
