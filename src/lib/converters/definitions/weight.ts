import { Weight } from "lucide-react";
import { createLinearConverter } from "../engine";
import type { ConverterDefinition } from "../types";

const KILOGRAMS: Record<string, number> = {
  milligram: 0.000001,
  gram: 0.001,
  kilogram: 1,
  metricTon: 1000,
  ounce: 0.0283495,
  pound: 0.453592,
  stone: 6.35029,
  usTon: 907.185,
};

const weight: ConverterDefinition = {
  name: "Weight Converter",
  slug: "weight",
  description:
    "Convert between metric and imperial weight units — milligrams, grams, kilograms, metric tons, ounces, pounds, stone, and US tons.",
  shortDescription: "Convert kilograms, pounds, ounces, stone, and more.",
  icon: Weight,
  keywords: ["weight converter", "kg to lbs", "pounds to kilograms", "mass converter"],
  isPopular: true,
  kind: "numeric",
  units: [
    { id: "milligram", label: "Milligram", symbol: "mg" },
    { id: "gram", label: "Gram", symbol: "g" },
    { id: "kilogram", label: "Kilogram", symbol: "kg" },
    { id: "metricTon", label: "Metric Ton", symbol: "t" },
    { id: "ounce", label: "Ounce", symbol: "oz" },
    { id: "pound", label: "Pound", symbol: "lb" },
    { id: "stone", label: "Stone", symbol: "st" },
    { id: "usTon", label: "US Ton", symbol: "ton" },
  ],
  defaultFromUnit: "kilogram",
  defaultToUnit: "pound",
  convert: createLinearConverter(KILOGRAMS),
  faq: [
    {
      question: "How many pounds are in a kilogram?",
      answer: "1 kilogram = 2.20462 pounds.",
    },
    {
      question: "How is the conversion calculated?",
      answer:
        "Every unit is stored as a fixed multiple of kilograms. To convert, we multiply your value by the source unit's factor to get kilograms, then divide by the target unit's factor.",
    },
  ],
  relatedSlugs: ["length", "volume", "temperature"],
};

export default weight;
