import { TrendingUp } from "lucide-react";
import type { CalculatorDefinition } from "../types";

const profitMarginCalculator: CalculatorDefinition = {
  name: "Profit Margin Calculator",
  slug: "profit-margin-calculator",
  description:
    "Calculate profit, profit margin, and markup from a product's revenue and cost to understand your true profitability.",
  shortDescription: "Calculate profit margin and markup from revenue and cost.",
  category: "business",
  icon: TrendingUp,
  keywords: ["profit margin calculator", "markup calculator", "gross margin calculator"],
  inputs: [
    {
      id: "revenue",
      label: "Revenue (selling price)",
      type: "number",
      unit: "$",
      required: true,
      min: 0,
    },
    {
      id: "cost",
      label: "Cost",
      type: "number",
      unit: "$",
      required: true,
      min: 0,
    },
  ],
  resultFields: [
    { id: "margin", label: "Profit margin", format: "percent", decimals: 2, highlight: true },
    { id: "profit", label: "Profit", format: "currency" },
    { id: "markup", label: "Markup", format: "percent", decimals: 2 },
  ],
  calculate: (inputs) => {
    const revenue = Number(inputs.revenue);
    const cost = Number(inputs.cost);

    if (!(revenue >= 0) || !(cost >= 0)) {
      return { ok: false, error: "Enter a valid revenue and cost." };
    }

    const profit = revenue - cost;
    const margin = revenue === 0 ? 0 : (profit / revenue) * 100;
    const markup = cost === 0 ? 0 : (profit / cost) * 100;

    return {
      ok: true,
      values: {
        profit: Number(profit.toFixed(2)),
        margin: Number(margin.toFixed(2)),
        markup: Number(markup.toFixed(2)),
      },
    };
  },
  formula: [
    {
      description: "Profit is simply revenue minus cost.",
      expression: "profit = revenue − cost",
    },
    {
      description: "Margin expresses profit as a share of the selling price; markup expresses it as a share of the cost.",
      expression: "margin = (profit / revenue) × 100, markup = (profit / cost) × 100",
    },
  ],
  steps: [
    {
      title: "Enter the revenue",
      description: "Enter the price you sell the product or service for.",
    },
    {
      title: "Enter the cost",
      description: "Enter what it costs you to produce or acquire it.",
    },
    {
      title: "Read your margin and markup",
      description: "See the profit in dollars, along with margin and markup as percentages.",
    },
  ],
  examples: [
    {
      title: "Product sold at a healthy margin",
      inputs: { revenue: 150, cost: 100 },
      resultSummary: "$50.00 profit, 33.33% margin, 50.00% markup",
    },
    {
      title: "Product sold at a loss",
      inputs: { revenue: 200, cost: 250 },
      resultSummary: "-$50.00 profit, -25.00% margin, -20.00% markup",
    },
  ],
  faq: [
    {
      question: "What's the difference between margin and markup?",
      answer:
        "Margin is profit divided by the selling price (revenue), showing what share of each sales dollar is profit. Markup is profit divided by cost, showing how much you added on top of what it cost you. The two are commonly confused but always differ for the same sale — for example, a 50% markup on a $100 cost item ($150 revenue) works out to only a 33.33% margin, because margin is measured against the higher revenue figure, not the lower cost figure.",
    },
    {
      question: "Why is margin always lower than markup at the same profit level?",
      answer:
        "Because margin divides profit by revenue (the larger number, since revenue = cost + profit) while markup divides the same profit by cost (the smaller number). Dividing by a larger denominator always produces a smaller percentage.",
    },
    {
      question: "What counts as a good profit margin?",
      answer:
        "It varies widely by industry — retail businesses often run on margins of 20–50%, while software or services businesses can see 70%+ margins due to low marginal costs. Compare your margin against others in your specific industry rather than a universal benchmark.",
    },
    {
      question: "Can profit margin be negative?",
      answer:
        "Yes — if your cost exceeds your revenue, both profit and margin will be negative, indicating you're selling at a loss on that item.",
    },
  ],
  relatedSlugs: ["discount-calculator", "compound-interest-calculator"],
};

export default profitMarginCalculator;
