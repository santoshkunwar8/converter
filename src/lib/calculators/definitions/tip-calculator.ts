import { HandCoins } from "lucide-react";
import type { CalculatorDefinition } from "../types";

const tipCalculator: CalculatorDefinition = {
  name: "Tip Calculator",
  slug: "tip-calculator",
  description:
    "Calculate the tip amount, total bill, and per-person share for any bill amount, tip percentage, and group size.",
  shortDescription: "Calculate tip amount and per-person totals for a bill.",
  category: "general",
  icon: HandCoins,
  keywords: ["tip calculator", "gratuity calculator", "restaurant tip calculator"],
  isPopular: true,
  inputs: [
    {
      id: "billAmount",
      label: "Bill amount",
      type: "number",
      unit: "$",
      required: true,
      min: 0,
    },
    {
      id: "tipPercent",
      label: "Tip",
      type: "number",
      unit: "%",
      defaultValue: 15,
      min: 0,
    },
    {
      id: "splitBetween",
      label: "Split between",
      type: "number",
      unit: "people",
      defaultValue: 1,
      min: 1,
      step: 1,
    },
  ],
  resultFields: [
    { id: "perPerson", label: "Per person", format: "currency", highlight: true },
    { id: "tipAmount", label: "Tip amount", format: "currency" },
    { id: "total", label: "Total bill", format: "currency" },
  ],
  calculate: (inputs) => {
    const bill = Number(inputs.billAmount);
    const tipPct = Number(inputs.tipPercent);
    const people = Number(inputs.splitBetween ?? 1);

    if (!(bill >= 0) || tipPct < 0 || !(people >= 1)) {
      return { ok: false, error: "Enter a valid bill amount, tip percentage, and number of people." };
    }

    const tipAmount = bill * (tipPct / 100);
    const total = bill + tipAmount;
    const perPerson = total / people;

    return {
      ok: true,
      values: {
        perPerson: Number(perPerson.toFixed(2)),
        tipAmount: Number(tipAmount.toFixed(2)),
        total: Number(total.toFixed(2)),
      },
    };
  },
  formula: [
    {
      description: "The tip amount is the bill multiplied by the tip percentage.",
      expression: "tipAmount = billAmount × (tipPercent / 100)",
    },
    {
      description: "The total is split evenly across everyone in the group.",
      expression: "perPerson = (billAmount + tipAmount) / splitBetween",
    },
  ],
  steps: [
    {
      title: "Enter the bill amount",
      description: "Enter the pre-tip subtotal shown on your receipt.",
    },
    {
      title: "Choose a tip percentage",
      description: "Defaults to 15% — adjust up or down based on service.",
    },
    {
      title: "Enter how many people are splitting it",
      description: "Leave at 1 if you're not splitting the bill.",
    },
    {
      title: "Read your totals",
      description: "See the tip amount, total bill, and what each person owes.",
    },
  ],
  examples: [
    {
      title: "Dinner for four with a 20% tip",
      inputs: { billAmount: 80, tipPercent: 20, splitBetween: 4 },
      resultSummary: "$16.00 tip, $96.00 total, $24.00 per person",
    },
    {
      title: "Solo lunch split with a friend at the default 15%",
      inputs: { billAmount: 50, tipPercent: 15, splitBetween: 2 },
      resultSummary: "$7.50 tip, $57.50 total, $28.75 per person",
    },
  ],
  faq: [
    {
      question: "What's a standard tip percentage?",
      answer:
        "In the US, 15–20% is typical for sit-down restaurant service, with 20% common for excellent service. Other countries and service types (delivery, bars, salons) often have different norms — adjust the tip field to whatever fits your situation.",
    },
    {
      question: "Should I tip on the pre-tax or post-tax amount?",
      answer:
        "Tipping conventions vary, but most guides suggest tipping on the subtotal before tax. Enter your bill's pre-tax subtotal for the most standard result, though the calculator works fine either way if your local custom differs.",
    },
    {
      question: "How does splitting the bill work with the tip included?",
      answer:
        "The calculator adds the tip to the bill first, then divides that total evenly across everyone entered in 'Split between,' so each person's share already includes their portion of the tip.",
    },
  ],
  relatedSlugs: ["split-bill-calculator", "discount-calculator"],
};

export default tipCalculator;
