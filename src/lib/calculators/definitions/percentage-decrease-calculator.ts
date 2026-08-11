import { TrendingDown } from "lucide-react";
import type { CalculatorDefinition } from "../types";

const percentageDecreaseCalculator: CalculatorDefinition = {
  name: "Percentage Decrease Calculator",
  slug: "percentage-decrease-calculator",
  description:
    "Calculate the percentage decrease between an original value and a new value, along with the absolute change.",
  shortDescription: "Find the percentage decrease between two values.",
  category: "math",
  icon: TrendingDown,
  keywords: ["percentage decrease calculator", "percent decrease", "percent off calculator"],
  inputs: [
    { id: "originalValue", label: "Original value", type: "number", required: true },
    { id: "newValue", label: "New value", type: "number", required: true },
  ],
  resultFields: [
    { id: "percentageDecrease", label: "Percentage decrease", format: "percent", decimals: 2, highlight: true },
    { id: "difference", label: "Absolute decrease", format: "number" },
  ],
  calculate: (inputs) => {
    const o = Number(inputs.originalValue);
    const n = Number(inputs.newValue);
    if (Number.isNaN(o) || Number.isNaN(n)) return { ok: false, error: "Enter two valid numbers." };
    if (o === 0) return { ok: false, error: "Original value cannot be zero." };
    const change = ((o - n) / Math.abs(o)) * 100;
    return { ok: true, values: { percentageDecrease: Number(change.toFixed(2)), difference: Number((o - n).toFixed(4)) } };
  },
  formula: [
    {
      description: "The percentage decrease is the drop from the original value to the new value, expressed as a percentage of the original value's magnitude.",
      expression: "% decrease = (original − new) / |original| × 100",
    },
  ],
  steps: [
    { title: "Enter the original value", description: "The starting number before the change." },
    { title: "Enter the new value", description: "The number after the change occurred." },
    {
      title: "Read the percentage decrease",
      description: "See the percentage drop and the absolute decrease between the two values.",
    },
  ],
  examples: [
    {
      title: "Price dropping from 80 to 60",
      inputs: { originalValue: 80, newValue: 60 },
      resultSummary: "25.00% decrease (absolute decrease of 20)",
    },
    {
      title: "Value rising from 50 to 65",
      inputs: { originalValue: 50, newValue: 65 },
      resultSummary: "-30.00% (the value actually increased by 15)",
    },
  ],
  faq: [
    {
      question: "What does a negative result mean?",
      answer:
        "A negative percentage means the value actually increased rather than decreased. If you're tracking growth, the Percentage Increase Calculator presents the same math framed around how much a value has risen.",
    },
    {
      question: "Is this the same as a discount or 'percent off' calculation?",
      answer:
        "Yes — entering the pre-discount price as the original value and the sale price as the new value gives you the percent off.",
    },
    {
      question: "Can the original value be zero?",
      answer:
        "No. A percentage decrease is undefined when starting from zero, since you can't express a change relative to nothing. Enter a non-zero original value.",
    },
  ],
  relatedSlugs: ["percentage-increase-calculator", "percentage-calculator"],
};

export default percentageDecreaseCalculator;
