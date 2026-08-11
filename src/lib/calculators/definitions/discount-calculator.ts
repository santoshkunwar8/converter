import { Tag } from "lucide-react";
import type { CalculatorDefinition } from "../types";

const discountCalculator: CalculatorDefinition = {
  name: "Discount Calculator",
  slug: "discount-calculator",
  description:
    "Calculate the final sale price and total savings after applying a percentage discount to an original price.",
  shortDescription: "Find the final price and savings after a percentage discount.",
  category: "finance",
  icon: Tag,
  keywords: ["discount calculator", "sale price calculator", "percent off"],
  isPopular: true,
  inputs: [
    { id: "originalPrice", label: "Original price", type: "number", unit: "$", required: true, min: 0 },
    { id: "discountPercent", label: "Discount", type: "number", unit: "%", required: true, min: 0, max: 100 },
  ],
  resultFields: [
    { id: "finalPrice", label: "Final price", format: "currency", highlight: true },
    { id: "savedAmount", label: "You save", format: "currency" },
  ],
  calculate: (inputs) => {
    const price = Number(inputs.originalPrice);
    const discount = Number(inputs.discountPercent);
    if (!(price >= 0) || discount < 0 || discount > 100) {
      return { ok: false, error: "Enter a valid price and a discount percentage between 0 and 100." };
    }
    const savedAmount = price * (discount / 100);
    const finalPrice = price - savedAmount;
    return {
      ok: true,
      values: { finalPrice: Number(finalPrice.toFixed(2)), savedAmount: Number(savedAmount.toFixed(2)) },
    };
  },
  formula: [
    {
      description:
        "The amount saved is the original price multiplied by the discount rate; the final price is what's left after subtracting the savings.",
      expression: "finalPrice = originalPrice − (originalPrice × discountPercent ÷ 100)",
    },
  ],
  steps: [
    { title: "Enter the original price", description: "Type in the pre-discount, listed price of the item." },
    { title: "Enter the discount percentage", description: "Type in the percentage off being offered, from 0 to 100." },
    { title: "Read your final price", description: "See the discounted price and exactly how much you save." },
  ],
  examples: [
    {
      title: "25% off a $80 jacket",
      inputs: { originalPrice: 80, discountPercent: 25 },
      resultSummary: "Final price $60.00, you save $20.00",
    },
    {
      title: "10% off a $249.99 item",
      inputs: { originalPrice: 249.99, discountPercent: 10 },
      resultSummary: "Final price $224.99, you save $25.00",
    },
  ],
  faq: [
    {
      question: "How do I calculate the final price after a discount?",
      answer:
        "Multiply the original price by the discount percentage (divided by 100) to get the amount saved, then subtract that from the original price to get the final price.",
    },
    {
      question: "Can I use this for stacked or multiple discounts?",
      answer:
        "This calculator applies a single discount at a time. For stacked discounts, apply the first discount, take the resulting final price, and run it through the calculator again as the new original price.",
    },
    {
      question: "Does the result include sales tax?",
      answer:
        "No, the final price shown reflects only the discount. Any applicable sales tax should be calculated separately and added after the discount is applied.",
    },
  ],
  relatedSlugs: ["tip-calculator", "profit-margin-calculator", "percentage-calculator"],
};

export default discountCalculator;
