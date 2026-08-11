import { Fuel } from "lucide-react";
import type { ConverterDefinition } from "../types";

function toKmPerLiter(value: number, unit: string): number {
  switch (unit) {
    case "kmPerLiter":
      return value;
    case "mpgUS":
      return value * 0.4251437075;
    case "mpgImperial":
      return value * 0.3540060577;
    case "litersPer100km":
      return value === 0 ? Infinity : 100 / value;
    default:
      throw new Error(`Unknown unit: ${unit}`);
  }
}

function fromKmPerLiter(kmPerLiter: number, unit: string): number {
  switch (unit) {
    case "kmPerLiter":
      return kmPerLiter;
    case "mpgUS":
      return kmPerLiter / 0.4251437075;
    case "mpgImperial":
      return kmPerLiter / 0.3540060577;
    case "litersPer100km":
      return kmPerLiter === 0 ? Infinity : 100 / kmPerLiter;
    default:
      throw new Error(`Unknown unit: ${unit}`);
  }
}

const fuelEconomy: ConverterDefinition = {
  name: "Fuel Economy Converter",
  slug: "fuel-economy",
  description:
    "Convert between fuel economy units — miles per US gallon, miles per Imperial gallon, kilometers per liter, and liters per 100 km.",
  shortDescription: "Convert mpg, km/L, and L/100km.",
  icon: Fuel,
  keywords: ["fuel economy converter", "mpg to l/100km", "km per liter converter", "fuel efficiency converter"],
  isNew: true,
  kind: "numeric",
  units: [
    { id: "mpgUS", label: "Miles per US gallon", symbol: "mpg (US)" },
    { id: "mpgImperial", label: "Miles per Imperial gallon", symbol: "mpg (UK)" },
    { id: "kmPerLiter", label: "Kilometers per liter", symbol: "km/L" },
    { id: "litersPer100km", label: "Liters per 100 km", symbol: "L/100km" },
  ],
  defaultFromUnit: "mpgUS",
  defaultToUnit: "litersPer100km",
  convert: (value, from, to) => fromKmPerLiter(toKmPerLiter(value, from), to),
  faq: [
    {
      question: "Why can't this converter use simple multiplication factors?",
      answer:
        "Liters per 100 km is an inverse relationship to the other units — lower L/100km means better efficiency, while higher mpg or km/L means better efficiency. Because it's a reciprocal rather than a proportional relationship, this converter can't use simple proportional factors like most other converters on this site.",
    },
    {
      question: "How many liters per 100 km is 30 mpg (US)?",
      answer: "30 mpg (US) ≈ 7.84 liters per 100 km.",
    },
    {
      question: "How is mpg (US) different from mpg (Imperial)?",
      answer:
        "A US gallon (3.785 liters) is smaller than an Imperial gallon (4.546 liters), so the same fuel efficiency expressed in miles per Imperial gallon is a larger number than in miles per US gallon.",
    },
  ],
  relatedSlugs: ["speed", "volume"],
};

export default fuelEconomy;
