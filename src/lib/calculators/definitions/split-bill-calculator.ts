import { Users } from "lucide-react";
import type { CalculatorDefinition } from "../types";

const splitBillCalculator: CalculatorDefinition = {
  name: "Split Bill Calculator",
  slug: "split-bill-calculator",
  description:
    "Split a restaurant or group bill evenly across everyone at the table, including tip and tax, to find exactly what each person owes.",
  shortDescription: "Split a bill with tip and tax evenly across a group.",
  category: "general",
  icon: Users,
  keywords: ["split bill calculator", "bill splitter", "divide bill calculator"],
  isNew: true,
  inputs: [
    {
      id: "totalBill",
      label: "Total bill",
      type: "number",
      unit: "$",
      required: true,
      min: 0,
    },
    {
      id: "numPeople",
      label: "Number of people",
      type: "number",
      required: true,
      min: 1,
      step: 1,
    },
    {
      id: "tipPercent",
      label: "Tip",
      type: "number",
      unit: "%",
      defaultValue: 0,
      min: 0,
    },
    {
      id: "taxPercent",
      label: "Tax",
      type: "number",
      unit: "%",
      defaultValue: 0,
      min: 0,
    },
  ],
  resultFields: [
    { id: "perPerson", label: "Per person", format: "currency", highlight: true },
    { id: "grandTotal", label: "Grand total", format: "currency" },
  ],
  calculate: (inputs) => {
    const total = Number(inputs.totalBill);
    const people = Number(inputs.numPeople);
    const tip = Number(inputs.tipPercent ?? 0);
    const tax = Number(inputs.taxPercent ?? 0);

    if (!(total >= 0) || !(people >= 1) || tip < 0 || tax < 0) {
      return { ok: false, error: "Enter a valid bill total, number of people, tip, and tax." };
    }

    const grandTotal = total * (1 + (tip + tax) / 100);
    const perPerson = grandTotal / people;

    return {
      ok: true,
      values: {
        perPerson: Number(perPerson.toFixed(2)),
        grandTotal: Number(grandTotal.toFixed(2)),
      },
    };
  },
  formula: [
    {
      description: "The grand total adds both tip and tax percentages on top of the bill.",
      expression: "grandTotal = totalBill × (1 + (tipPercent + taxPercent) / 100)",
    },
    {
      description: "The grand total is then divided evenly across the group.",
      expression: "perPerson = grandTotal / numPeople",
    },
  ],
  steps: [
    {
      title: "Enter the total bill",
      description: "Enter the subtotal before tip and tax, as shown on the receipt.",
    },
    {
      title: "Enter the number of people",
      description: "Count everyone who's splitting the bill evenly.",
    },
    {
      title: "Add tip and tax percentages",
      description: "Leave either at 0% if it doesn't apply.",
    },
    {
      title: "Read the per-person total",
      description: "See the grand total and exactly what each person owes.",
    },
  ],
  examples: [
    {
      title: "Group dinner with tip and tax",
      inputs: { totalBill: 100, numPeople: 4, tipPercent: 15, taxPercent: 8 },
      resultSummary: "$123.00 grand total, $30.75 per person",
    },
    {
      title: "Simple split with no tip or tax",
      inputs: { totalBill: 60, numPeople: 3, tipPercent: 0, taxPercent: 0 },
      resultSummary: "$60.00 grand total, $20.00 per person",
    },
  ],
  faq: [
    {
      question: "Does this split the bill evenly, or by what each person ordered?",
      answer:
        "This calculator splits the total evenly across everyone entered. If people ordered different amounts and want to pay their own share, you'd need to total each person's items individually rather than dividing the whole bill.",
    },
    {
      question: "Can I add both tip and tax at once?",
      answer:
        "Yes — enter both percentages and they're combined before being applied to the bill total, so you get one grand total that includes everything.",
    },
    {
      question: "What if tax is already included in the total bill?",
      answer:
        "If your bill total already includes tax, leave the tax field at 0% and only enter a tip percentage, otherwise tax will be applied twice.",
    },
  ],
  relatedSlugs: ["tip-calculator", "discount-calculator"],
};

export default splitBillCalculator;
