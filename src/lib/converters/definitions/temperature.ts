import { Thermometer } from "lucide-react";
import type { ConverterDefinition } from "../types";

function toCelsius(value: number, from: string): number {
  switch (from) {
    case "celsius":
      return value;
    case "fahrenheit":
      return ((value - 32) * 5) / 9;
    case "kelvin":
      return value - 273.15;
    default:
      throw new Error(`Unknown unit: ${from}`);
  }
}

function fromCelsius(celsius: number, to: string): number {
  switch (to) {
    case "celsius":
      return celsius;
    case "fahrenheit":
      return (celsius * 9) / 5 + 32;
    case "kelvin":
      return celsius + 273.15;
    default:
      throw new Error(`Unknown unit: ${to}`);
  }
}

const temperature: ConverterDefinition = {
  name: "Temperature Converter",
  slug: "temperature",
  description: "Convert between Celsius, Fahrenheit, and Kelvin.",
  shortDescription: "Convert Celsius, Fahrenheit, and Kelvin.",
  icon: Thermometer,
  keywords: ["temperature converter", "celsius to fahrenheit", "fahrenheit to celsius", "kelvin converter"],
  kind: "numeric",
  isPopular: true,
  units: [
    { id: "celsius", label: "Celsius", symbol: "°C" },
    { id: "fahrenheit", label: "Fahrenheit", symbol: "°F" },
    { id: "kelvin", label: "Kelvin", symbol: "K" },
  ],
  defaultFromUnit: "celsius",
  defaultToUnit: "fahrenheit",
  convert: (value, from, to) => fromCelsius(toCelsius(value, from), to),
  faq: [
    {
      question: "What is the formula to convert Celsius to Fahrenheit?",
      answer: "°F = (°C × 9/5) + 32",
    },
    {
      question: "What is absolute zero?",
      answer: "Absolute zero is 0 Kelvin, equal to −273.15°C or −459.67°F — the theoretical lowest possible temperature.",
    },
  ],
  relatedSlugs: ["length", "weight", "pressure"],
};

export default temperature;
