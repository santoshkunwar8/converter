import { Sigma } from "lucide-react";
import type { CalculatorDefinition } from "../types";

const averageCalculator: CalculatorDefinition = {
  name: "Average Calculator",
  slug: "average-calculator",
  description:
    "Calculate the average (mean), median, sum, and count for a list of numbers separated by commas or spaces.",
  shortDescription: "Find the mean, median, sum, and count of a list of numbers.",
  category: "math",
  icon: Sigma,
  keywords: ["average calculator", "mean calculator", "median calculator"],
  inputs: [
    {
      id: "numbers",
      label: "Numbers",
      type: "text",
      required: true,
      placeholder: "4, 8, 15, 16, 23, 42",
      helpText: "Comma or space separated numbers",
    },
  ],
  resultFields: [
    { id: "average", label: "Average (mean)", format: "number", decimals: 4, highlight: true },
    { id: "median", label: "Median", format: "number", decimals: 4 },
    { id: "sum", label: "Sum", format: "number" },
    { id: "count", label: "Count of numbers", format: "number" },
  ],
  calculate: (inputs) => {
    const raw = String(inputs.numbers ?? "");
    const parts = raw
      .split(/[,\s]+/)
      .map((s) => s.trim())
      .filter(Boolean)
      .map(Number);
    if (parts.length === 0 || parts.some((n) => Number.isNaN(n))) {
      return { ok: false, error: "Enter a list of valid numbers separated by commas or spaces." };
    }
    const sum = parts.reduce((a, b) => a + b, 0);
    const average = sum / parts.length;
    const sorted = [...parts].sort((a, b) => a - b);
    const mid = Math.floor(sorted.length / 2);
    const median = sorted.length % 2 !== 0 ? sorted[mid] : (sorted[mid - 1] + sorted[mid]) / 2;
    return {
      ok: true,
      values: {
        average: Number(average.toFixed(4)),
        median: Number(median.toFixed(4)),
        sum,
        count: parts.length,
      },
    };
  },
  formula: [
    {
      description: "The average (mean) is the sum of all values divided by how many values there are.",
      expression: "average = (Σ values) ÷ count",
    },
    {
      description:
        "The median is the middle value when the numbers are sorted; for an even count, it's the mean of the two middle values.",
      expression: "median = sorted[n/2] or average of sorted[n/2 − 1] and sorted[n/2]",
    },
  ],
  steps: [
    { title: "Enter your numbers", description: "Type or paste a list of numbers, separated by commas or spaces." },
    { title: "Review the results", description: "Instantly see the mean, median, sum, and how many numbers were counted." },
  ],
  examples: [
    {
      title: "Six numbers",
      inputs: { numbers: "4, 8, 15, 16, 23, 42" },
      resultSummary: "Average 18.0000, median 15.5000, sum 108, count 6",
    },
    {
      title: "Five test scores",
      inputs: { numbers: "72 85 90 88 95" },
      resultSummary: "Average 86.0000, median 88.0000, sum 430, count 5",
    },
  ],
  faq: [
    {
      question: "What's the difference between the average and the median?",
      answer:
        "The average (mean) sums all the numbers and divides by the count, so it's sensitive to very high or low outliers. The median is the middle value when sorted, which better represents a \"typical\" value when the data has outliers.",
    },
    {
      question: "Can I mix commas and spaces when entering numbers?",
      answer:
        "Yes. The calculator splits your input on any combination of commas, spaces, or line breaks, so \"4, 8 15\" and \"4,8,15\" both work the same way.",
    },
    {
      question: "Does the calculator accept negative numbers or decimals?",
      answer:
        "Yes, negative numbers and decimals are fully supported and included in the average, median, and sum calculations.",
    },
  ],
  relatedSlugs: ["percentage-calculator", "bmi-calculator", "scientific-calculator"],
};

export default averageCalculator;
