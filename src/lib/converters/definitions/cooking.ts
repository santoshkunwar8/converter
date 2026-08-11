import { ChefHat } from "lucide-react";
import { createLinearConverter } from "../engine";
import type { ConverterDefinition } from "../types";

const MILLILITERS: Record<string, number> = {
  teaspoon: 4.92892,
  tablespoon: 14.7868,
  fluidOunce: 29.5735,
  cup: 236.588,
  pint: 473.176,
  quart: 946.353,
  gallon: 3785.41,
  milliliter: 1,
  liter: 1000,
};

const cooking: ConverterDefinition = {
  name: "Cooking Converter",
  slug: "cooking",
  description:
    "Convert common cooking and recipe volume units — teaspoons, tablespoons, cups, pints, quarts, gallons, milliliters, and liters.",
  shortDescription: "Convert cups, tablespoons, milliliters, and more.",
  icon: ChefHat,
  keywords: ["cooking converter", "cups to ml", "tablespoons to teaspoons", "recipe conversion"],
  isNew: true,
  kind: "numeric",
  units: [
    { id: "teaspoon", label: "Teaspoon", symbol: "tsp" },
    { id: "tablespoon", label: "Tablespoon", symbol: "tbsp" },
    { id: "fluidOunce", label: "Fluid Ounce", symbol: "fl oz" },
    { id: "cup", label: "Cup", symbol: "cup" },
    { id: "pint", label: "Pint", symbol: "pt" },
    { id: "quart", label: "Quart", symbol: "qt" },
    { id: "gallon", label: "Gallon", symbol: "gal" },
    { id: "milliliter", label: "Milliliter", symbol: "mL" },
    { id: "liter", label: "Liter", symbol: "L" },
  ],
  defaultFromUnit: "cup",
  defaultToUnit: "milliliter",
  convert: createLinearConverter(MILLILITERS),
  faq: [
    { question: "How many milliliters are in a cup?", answer: "1 cup = 236.588 milliliters (US customary cup)." },
    {
      question: "How is the conversion calculated?",
      answer:
        "Every unit is stored as a fixed multiple of milliliters. To convert, we multiply your value by the source unit's factor to get milliliters, then divide by the target unit's factor.",
    },
    {
      question: "Can I convert cups of flour to grams?",
      answer:
        "No — these are volume conversions only. Converting to a weight, like cups of flour to grams, depends on the ingredient's density and isn't included here.",
    },
  ],
  relatedSlugs: ["volume", "typography"],
};

export default cooking;
