import { Percent } from "lucide-react";
import type { CalculatorDefinition } from "../types";

const percentageCalculator: CalculatorDefinition = {
  name: "Percentage Calculator",
  slug: "percentage-calculator",
  description:
    "Find what X% of a number is, or figure out what percentage one number is of another, with an instant plain-English explanation.",
  shortDescription: "Calculate percentages both ways: X% of Y, or X as a percent of Y.",
  category: "math",
  icon: Percent,
  keywords: ["percentage calculator", "percent of", "what percent"],
  isPopular: true,
  inputs: [
    {
      id: "mode",
      label: "Calculation type",
      type: "select",
      required: true,
      defaultValue: "of",
      options: [
        { label: "What is X% of Y?", value: "of" },
        { label: "X is what percent of Y?", value: "reverse" },
      ],
    },
    { id: "x", label: "X", type: "number", required: true },
    { id: "y", label: "Y", type: "number", required: true },
  ],
  resultFields: [
    { id: "result", label: "Result", format: "number", decimals: 4, highlight: true },
    { id: "summary", label: "Explanation", format: "text" },
  ],
  calculate: (inputs) => {
    const mode = inputs.mode;
    const x = Number(inputs.x);
    const y = Number(inputs.y);
    if (Number.isNaN(x) || Number.isNaN(y)) {
      return { ok: false, error: "Enter valid numbers for X and Y." };
    }
    if (mode === "reverse") {
      if (y === 0) {
        return { ok: false, error: "Y cannot be zero." };
      }
      const result = (x / y) * 100;
      return {
        ok: true,
        values: { result: Number(result.toFixed(4)), summary: `${x} is ${result.toFixed(2)}% of ${y}` },
      };
    }
    const result = (x / 100) * y;
    return {
      ok: true,
      values: { result: Number(result.toFixed(4)), summary: `${x}% of ${y} is ${result.toFixed(2)}` },
    };
  },
  formula: [
    {
      description: "To find X% of Y, convert the percentage to a decimal fraction and multiply it by Y.",
      expression: "result = (X ÷ 100) × Y",
    },
    {
      description: "To find what percent X is of Y, divide X by Y and convert the result to a percentage.",
      expression: "result = (X ÷ Y) × 100",
    },
  ],
  steps: [
    { title: "Choose a calculation type", description: "Pick whether you want X% of Y, or X as a percent of Y." },
    { title: "Enter X and Y", description: "Type in the two numbers involved in your calculation." },
    { title: "Read the result", description: "The answer and a plain-English explanation appear instantly." },
  ],
  examples: [
    {
      title: "What is 20% of 150?",
      inputs: { mode: "of", x: 20, y: 150 },
      resultSummary: "20% of 150 is 30.00",
    },
    {
      title: "45 is what percent of 180?",
      inputs: { mode: "reverse", x: 45, y: 180 },
      resultSummary: "45 is 25.00% of 180",
    },
  ],
  faq: [
    {
      question: "What's the difference between the two calculation modes?",
      answer:
        "\"What is X% of Y?\" finds a portion of a number (for example, 20% of 150). \"X is what percent of Y?\" finds the ratio between two numbers expressed as a percentage (for example, what percent 45 is of 180).",
    },
    {
      question: "Can X or Y be a decimal or negative number?",
      answer:
        "Yes. The calculator accepts decimals and negative values and applies the same formula, which is useful for calculating percentage changes involving losses or fractional amounts.",
    },
    {
      question: "Why does the result show more decimal places than I expected?",
      answer:
        "The result is rounded to four decimal places for precision, while the explanation summary rounds to two decimal places for readability, matching how percentages are typically presented.",
    },
  ],
  relatedSlugs: ["percentage-increase-calculator", "percentage-decrease-calculator", "average-calculator"],
};

export default percentageCalculator;
