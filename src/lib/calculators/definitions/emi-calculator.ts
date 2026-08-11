import { Wallet } from "lucide-react";
import type { CalculatorDefinition } from "../types";

const emiCalculator: CalculatorDefinition = {
  name: "EMI Calculator",
  slug: "emi-calculator",
  description:
    "Calculate your Equated Monthly Installment (EMI) for a loan given the principal, annual interest rate, and tenure in months.",
  shortDescription: "Calculate your equated monthly installment (EMI).",
  category: "finance",
  icon: Wallet,
  keywords: ["emi calculator", "equated monthly installment", "loan emi", "monthly installment"],
  isPopular: true,
  inputs: [
    {
      id: "principal",
      label: "Loan principal",
      type: "number",
      unit: "$",
      required: true,
      min: 0,
      step: 100,
      placeholder: "15000",
    },
    {
      id: "interestRate",
      label: "Annual interest rate",
      type: "number",
      unit: "%",
      required: true,
      min: 0,
      max: 100,
      step: 0.01,
      placeholder: "9",
    },
    {
      id: "tenureMonths",
      label: "Tenure",
      type: "number",
      unit: "months",
      required: true,
      min: 1,
      max: 600,
      step: 1,
      placeholder: "36",
    },
  ],
  resultFields: [
    { id: "emi", label: "Monthly EMI", format: "currency", highlight: true },
    { id: "totalPayment", label: "Total payment", format: "currency" },
    { id: "totalInterest", label: "Total interest", format: "currency" },
  ],
  calculate: (inputs) => {
    const principal = Number(inputs.principal);
    const annualRate = Number(inputs.interestRate);
    const tenureMonths = Number(inputs.tenureMonths);

    if (!(principal > 0) || annualRate < 0 || !(tenureMonths > 0)) {
      return { ok: false, error: "Enter a valid principal, rate, and tenure." };
    }

    const monthlyRate = annualRate / 100 / 12;

    const emi =
      monthlyRate === 0
        ? principal / tenureMonths
        : (principal * monthlyRate * Math.pow(1 + monthlyRate, tenureMonths)) /
          (Math.pow(1 + monthlyRate, tenureMonths) - 1);

    const totalPayment = emi * tenureMonths;
    const totalInterest = totalPayment - principal;

    return {
      ok: true,
      values: {
        emi: Number(emi.toFixed(2)),
        totalPayment: Number(totalPayment.toFixed(2)),
        totalInterest: Number(totalInterest.toFixed(2)),
      },
    };
  },
  formula: [
    {
      description: "EMI formula, where P is principal, r is the monthly interest rate, and n is the tenure in months.",
      expression: "EMI = P × r × (1+r)ⁿ ÷ [(1+r)ⁿ − 1]",
    },
  ],
  steps: [
    { title: "Enter the loan principal", description: "The total amount borrowed." },
    { title: "Enter the annual interest rate", description: "The yearly rate as a percentage." },
    { title: "Enter the tenure in months", description: "How many months you'll repay over." },
    {
      title: "Read your EMI",
      description: "Your fixed monthly installment, plus total payment and total interest over the tenure.",
    },
  ],
  examples: [
    {
      title: "$15,000 at 9% for 36 months",
      inputs: { principal: 15000, interestRate: 9, tenureMonths: 36 },
      resultSummary: "≈ $477.03/month, $1,173 total interest",
    },
  ],
  faq: [
    {
      question: "What's the difference between EMI and a regular loan payment?",
      answer:
        "They use the same underlying amortization formula — EMI (Equated Monthly Installment) is just the term commonly used for the fixed monthly payment on a loan, especially outside the US. Use whichever calculator matches how you think about your loan's term (months here vs. years on the Loan Calculator).",
    },
    {
      question: "Does the EMI change over the loan tenure?",
      answer: "No — this calculates a fixed EMI. The proportion of each payment going to interest vs. principal changes over time, but the total EMI stays constant.",
    },
  ],
  relatedSlugs: ["loan-calculator", "simple-interest-calculator", "compound-interest-calculator"],
};

export default emiCalculator;
