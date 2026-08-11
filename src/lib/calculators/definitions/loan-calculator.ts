import { Landmark } from "lucide-react";
import type { CalculatorDefinition } from "../types";

const loanCalculator: CalculatorDefinition = {
  name: "Loan Calculator",
  slug: "loan-calculator",
  description:
    "Calculate your monthly loan payment, total interest, and total repayment amount for any fixed-rate loan.",
  shortDescription: "Estimate monthly payments on any fixed-rate loan.",
  category: "finance",
  icon: Landmark,
  keywords: ["loan calculator", "monthly payment calculator", "amortization", "loan interest"],
  isPopular: true,
  inputs: [
    {
      id: "loanAmount",
      label: "Loan amount",
      type: "number",
      unit: "$",
      required: true,
      min: 0,
      step: 100,
      placeholder: "20000",
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
      placeholder: "6.5",
    },
    {
      id: "loanTermYears",
      label: "Loan term",
      type: "number",
      unit: "years",
      required: true,
      min: 1,
      max: 50,
      step: 1,
      placeholder: "5",
    },
  ],
  resultFields: [
    { id: "monthlyPayment", label: "Monthly payment", format: "currency", highlight: true },
    { id: "totalPayment", label: "Total of payments", format: "currency" },
    { id: "totalInterest", label: "Total interest", format: "currency" },
  ],
  calculate: (inputs) => {
    const principal = Number(inputs.loanAmount);
    const annualRate = Number(inputs.interestRate);
    const years = Number(inputs.loanTermYears);

    if (!(principal > 0) || annualRate < 0 || !(years > 0)) {
      return { ok: false, error: "Enter a valid loan amount, rate, and term." };
    }

    const monthlyRate = annualRate / 100 / 12;
    const numPayments = years * 12;

    const monthlyPayment =
      monthlyRate === 0
        ? principal / numPayments
        : (principal * (monthlyRate * Math.pow(1 + monthlyRate, numPayments))) /
          (Math.pow(1 + monthlyRate, numPayments) - 1);

    const totalPayment = monthlyPayment * numPayments;
    const totalInterest = totalPayment - principal;

    return {
      ok: true,
      values: {
        monthlyPayment: Number(monthlyPayment.toFixed(2)),
        totalPayment: Number(totalPayment.toFixed(2)),
        totalInterest: Number(totalInterest.toFixed(2)),
      },
    };
  },
  formula: [
    {
      description: "Standard amortizing loan payment formula, where r is the monthly interest rate and n is the number of monthly payments.",
      expression: "M = P × [r(1+r)ⁿ] ÷ [(1+r)ⁿ − 1]",
    },
  ],
  steps: [
    { title: "Enter the loan amount", description: "The total amount you're borrowing." },
    { title: "Enter the annual interest rate", description: "The yearly rate as a percentage." },
    { title: "Enter the loan term", description: "How many years you'll take to repay it." },
    {
      title: "Read your monthly payment",
      description: "See your fixed monthly payment plus total interest paid over the life of the loan.",
    },
  ],
  examples: [
    {
      title: "$20,000 at 6.5% for 5 years",
      inputs: { loanAmount: 20000, interestRate: 6.5, loanTermYears: 5 },
      resultSummary: "≈ $391.32/month, $3,479 total interest",
    },
  ],
  faq: [
    {
      question: "Does this include taxes, fees, or insurance?",
      answer:
        "No — this calculates principal and interest only, using a standard fixed-rate amortization formula. For mortgages, add property tax, insurance, and any PMI separately.",
    },
    {
      question: "What if my interest rate is 0%?",
      answer: "The calculator falls back to a simple even split of the principal across all payments.",
    },
    {
      question: "How is total interest calculated?",
      answer: "Total interest is the total of all payments over the loan term minus the original loan amount.",
    },
  ],
  relatedSlugs: ["emi-calculator", "simple-interest-calculator", "compound-interest-calculator"],
};

export default loanCalculator;
