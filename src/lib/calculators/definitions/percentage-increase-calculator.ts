import { TrendingUp } from "lucide-react";
import type { CalculatorDefinition } from "../types";

const percentageIncreaseCalculator: CalculatorDefinition = {
  name: "Percentage Increase Calculator",
  slug: "percentage-increase-calculator",
  description:
    "Calculate the percentage increase between an original value and a new value, along with the absolute change.",
  shortDescription: "Find the percentage increase between two values.",
  category: "math",
  icon: TrendingUp,
  keywords: ["percentage increase calculator", "percent increase", "growth rate calculator"],
  inputs: [
    { id: "originalValue", label: "Original value", type: "number", required: true },
    { id: "newValue", label: "New value", type: "number", required: true },
  ],
  resultFields: [
    { id: "percentageIncrease", label: "Percentage increase", format: "percent", decimals: 2, highlight: true },
    { id: "difference", label: "Absolute change", format: "number" },
  ],
  calculate: (inputs) => {
    const o = Number(inputs.originalValue);
    const n = Number(inputs.newValue);
    if (Number.isNaN(o) || Number.isNaN(n)) return { ok: false, error: "Enter two valid numbers." };
    if (o === 0) return { ok: false, error: "Original value cannot be zero." };
    const change = ((n - o) / Math.abs(o)) * 100;
    return { ok: true, values: { percentageIncrease: Number(change.toFixed(2)), difference: Number((n - o).toFixed(4)) } };
  },
  formula: [
    {
      description: "The percentage increase is the change from the original value to the new value, expressed as a percentage of the original value's magnitude.",
      expression: "% increase = (new − original) / |original| × 100",
    },
  ],
  steps: [
    { title: "Enter the original value", description: "The starting number before the change." },
    { title: "Enter the new value", description: "The number after the change occurred." },
    {
      title: "Read the percentage increase",
      description: "See the percentage change and the absolute difference between the two values.",
    },
  ],
  examples: [
    {
      title: "Price rising from 50 to 75",
      inputs: { originalValue: 50, newValue: 75 },
      resultSummary: "50.00% increase (absolute change of 25)",
    },
    {
      title: "Value falling from 200 to 150",
      inputs: { originalValue: 200, newValue: 150 },
      resultSummary: "-25.00% (a decrease of 50)",
    },
  ],
  faq: [
    {
      question: "What does a negative result mean?",
      answer:
        "A negative percentage means the value actually decreased rather than increased. If you're specifically working with a decrease, the Percentage Decrease Calculator presents the same math framed around how much a value has dropped.",
    },
    {
      question: "Why is the original value's absolute value used in the formula?",
      answer:
        "Using the absolute value of the original number keeps the percentage sign meaningful (positive for growth, negative for decline) even when the original value itself is negative.",
    },
    {
      question: "Can the original value be zero?",
      answer:
        "No. A percentage increase is undefined when starting from zero, since you can't express a change relative to nothing. Enter a non-zero original value.",
    },
  ],
  relatedSlugs: ["percentage-decrease-calculator", "percentage-calculator"],
};

export default percentageIncreaseCalculator;
