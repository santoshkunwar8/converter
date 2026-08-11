import { Square } from "lucide-react";
import { createLinearConverter } from "../engine";
import type { ConverterDefinition } from "../types";

const SQUARE_METERS: Record<string, number> = {
  squareCentimeter: 0.0001,
  squareMeter: 1,
  squareKilometer: 1000000,
  squareFoot: 0.092903,
  squareYard: 0.836127,
  squareMile: 2589988.11,
  acre: 4046.8564224,
  hectare: 10000,
};

const area: ConverterDefinition = {
  name: "Area Converter",
  slug: "area",
  description:
    "Convert between metric and imperial area units — square centimeters, square meters, square kilometers, square feet, square yards, square miles, acres, and hectares.",
  shortDescription: "Convert square meters, acres, hectares, and more.",
  icon: Square,
  keywords: ["area converter", "square feet to square meters", "acres to hectares", "land area converter"],
  kind: "numeric",
  units: [
    { id: "squareCentimeter", label: "Square Centimeter", symbol: "cm²" },
    { id: "squareMeter", label: "Square Meter", symbol: "m²" },
    { id: "squareKilometer", label: "Square Kilometer", symbol: "km²" },
    { id: "squareFoot", label: "Square Foot", symbol: "ft²" },
    { id: "squareYard", label: "Square Yard", symbol: "yd²" },
    { id: "squareMile", label: "Square Mile", symbol: "mi²" },
    { id: "acre", label: "Acre", symbol: "ac" },
    { id: "hectare", label: "Hectare", symbol: "ha" },
  ],
  defaultFromUnit: "squareMeter",
  defaultToUnit: "squareFoot",
  convert: createLinearConverter(SQUARE_METERS),
  faq: [
    {
      question: "How many square feet are in a square meter?",
      answer: "1 square meter = 10.7639 square feet.",
    },
    {
      question: "How is the conversion calculated?",
      answer:
        "Every unit is stored as a fixed multiple of square meters. To convert, we multiply your value by the source unit's factor to get square meters, then divide by the target unit's factor.",
    },
  ],
  relatedSlugs: ["length", "volume"],
};

export default area;
