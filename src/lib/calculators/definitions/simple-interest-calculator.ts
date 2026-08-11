import { PiggyBank } from "lucide-react";
import type { CalculatorDefinition } from "../types";

const simpleInterestCalculator: CalculatorDefinition = {
  name: "Simple Interest Calculator",
  slug: "simple-interest-calculator",
  description:
    "Calculate simple interest earned or owed on a principal amount over time, plus the total amount at the end of the term.",
  shortDescription: "Find the interest earned on a principal at a fixed annual rate.",
  category: "finance",
  icon: PiggyBank,
  keywords: ["simple interest calculator", "interest calculator", "SI formula"],
  inputs: [
    { id: "principal", label: "Principal", type: "number", unit: "$", required: true, min: 0 },
    { id: "rate", label: "Annual interest rate", type: "number", unit: "%", required: true, min: 0 },
    { id: "time", label: "Time", type: "number", unit: "years", required: true, min: 0 },
  ],
  resultFields: [
    { id: "interest", label: "Interest earned", format: "currency", highlight: true },
    { id: "total", label: "Total amount", format: "currency" },
  ],
  calculate: (inputs) => {
    const p = Number(inputs.principal);
    const r = Number(inputs.rate);
    const t = Number(inputs.time);
    if (!(p >= 0) || r < 0 || !(t >= 0)) {
      return { ok: false, error: "Enter a valid principal, rate, and time." };
    }
    const interest = (p * r * t) / 100;
    const total = p + interest;
    return {
      ok: true,
      values: { interest: Number(interest.toFixed(2)), total: Number(total.toFixed(2)) },
    };
  },
  formula: [
    {
      description:
        "Simple interest grows linearly: it is calculated only on the original principal, not on any interest already earned.",
      expression: "SI = P × R × T ÷ 100",
    },
  ],
  steps: [
    { title: "Enter the principal", description: "Type in the initial amount of money invested or borrowed." },
    { title: "Enter the annual interest rate", description: "Type in the yearly interest rate as a percentage." },
    { title: "Enter the time period", description: "Type in the length of time in years the money is invested or borrowed for." },
    { title: "Read the results", description: "See the total interest earned and the final amount, principal plus interest." },
  ],
  examples: [
    {
      title: "$1,000 at 5% for 3 years",
      inputs: { principal: 1000, rate: 5, time: 3 },
      resultSummary: "Interest earned $150.00, total amount $1,150.00",
    },
    {
      title: "$5,000 at 3.5% for 6 months",
      inputs: { principal: 5000, rate: 3.5, time: 0.5 },
      resultSummary: "Interest earned $87.50, total amount $5,087.50",
    },
  ],
  faq: [
    {
      question: "What is simple interest?",
      answer:
        "Simple interest is interest calculated only on the original principal amount, at a fixed rate, for the entire time period — unlike compound interest, it does not add previously earned interest back into the base for future calculations.",
    },
    {
      question: "How do I enter a time period of less than a year?",
      answer:
        "Enter time as a fraction of a year. For example, 6 months is 0.5, and 3 months is 0.25.",
    },
    {
      question: "When is simple interest used instead of compound interest?",
      answer:
        "Simple interest is common for short-term loans, car loans, and some bonds, where interest doesn't compound. Most savings accounts, credit cards, and long-term investments use compound interest instead.",
    },
  ],
  relatedSlugs: ["compound-interest-calculator", "loan-calculator", "emi-calculator"],
};

export default simpleInterestCalculator;
