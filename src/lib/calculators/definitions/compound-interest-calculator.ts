import { TrendingUp } from "lucide-react";
import type { CalculatorDefinition } from "../types";

const compoundInterestCalculator: CalculatorDefinition = {
  name: "Compound Interest Calculator",
  slug: "compound-interest-calculator",
  description:
    "Calculate how a principal amount grows over time with compound interest, based on your chosen compounding frequency.",
  shortDescription: "Find the future value of an investment with compound interest.",
  category: "finance",
  icon: TrendingUp,
  keywords: ["compound interest calculator", "CI formula", "future value calculator"],
  inputs: [
    { id: "principal", label: "Principal", type: "number", unit: "$", required: true, min: 0 },
    { id: "rate", label: "Annual interest rate", type: "number", unit: "%", required: true, min: 0 },
    { id: "time", label: "Time", type: "number", unit: "years", required: true, min: 0 },
    {
      id: "compoundsPerYear",
      label: "Compounding frequency",
      type: "select",
      required: true,
      defaultValue: "12",
      options: [
        { label: "Annually", value: "1" },
        { label: "Semi-annually", value: "2" },
        { label: "Quarterly", value: "4" },
        { label: "Monthly", value: "12" },
        { label: "Daily", value: "365" },
      ],
    },
  ],
  resultFields: [
    { id: "amount", label: "Future value", format: "currency", highlight: true },
    { id: "interest", label: "Total interest earned", format: "currency" },
  ],
  calculate: (inputs) => {
    const p = Number(inputs.principal);
    const r = Number(inputs.rate);
    const t = Number(inputs.time);
    const n = Number(inputs.compoundsPerYear);
    if (!(p >= 0) || r < 0 || !(t >= 0) || !(n > 0)) {
      return { ok: false, error: "Enter valid principal, rate, time, and compounding frequency." };
    }
    const amount = p * Math.pow(1 + (r / 100) / n, n * t);
    const interest = amount - p;
    return {
      ok: true,
      values: { amount: Number(amount.toFixed(2)), interest: Number(interest.toFixed(2)) },
    };
  },
  formula: [
    {
      description:
        "Compound interest reinvests interest earned in each compounding period, so growth accelerates over time compared to simple interest.",
      expression: "A = P(1 + r/n)^(nt)",
    },
  ],
  steps: [
    { title: "Enter the principal", description: "Type in the initial amount of money invested." },
    { title: "Enter the annual interest rate", description: "Type in the yearly interest rate as a percentage." },
    { title: "Enter the time period", description: "Type in the number of years the money will grow." },
    { title: "Choose a compounding frequency", description: "Select how often interest is added to the balance, from annually to daily." },
  ],
  examples: [
    {
      title: "$1,000 at 5% for 10 years, monthly compounding",
      inputs: { principal: 1000, rate: 5, time: 10, compoundsPerYear: "12" },
      resultSummary: "Future value $1,647.01, total interest earned $647.01",
    },
    {
      title: "$10,000 at 4% for 5 years, annual compounding",
      inputs: { principal: 10000, rate: 4, time: 5, compoundsPerYear: "1" },
      resultSummary: "Future value $12,166.53, total interest earned $2,166.53",
    },
  ],
  faq: [
    {
      question: "How does compounding frequency affect returns?",
      answer:
        "The more often interest compounds, the faster your balance grows, because interest starts earning interest sooner. Daily compounding yields slightly more than monthly, which yields more than annual compounding, for the same nominal rate.",
    },
    {
      question: "What's the difference between compound interest and simple interest?",
      answer:
        "Simple interest is calculated only on the original principal for the whole term. Compound interest is recalculated on the growing balance at each compounding period, so earlier interest also earns interest.",
    },
    {
      question: "Can I use this to model a savings account or investment?",
      answer:
        "Yes. This calculator gives the future value of a lump sum with no additional contributions. For accounts with regular deposits, results will differ since this tool doesn't include contribution amounts.",
    },
  ],
  relatedSlugs: ["simple-interest-calculator", "loan-calculator", "emi-calculator"],
};

export default compoundInterestCalculator;
