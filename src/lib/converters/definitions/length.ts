import { Ruler } from "lucide-react";
import { createLinearConverter } from "../engine";
import type { ConverterDefinition } from "../types";

const METERS: Record<string, number> = {
  millimeter: 0.001,
  centimeter: 0.01,
  meter: 1,
  kilometer: 1000,
  inch: 0.0254,
  foot: 0.3048,
  yard: 0.9144,
  mile: 1609.344,
};

const length: ConverterDefinition = {
  name: "Length Converter",
  slug: "length",
  description:
    "Convert between metric and imperial length units — millimeters, centimeters, meters, kilometers, inches, feet, yards, and miles.",
  shortDescription: "Convert millimeters, meters, feet, miles, and more.",
  icon: Ruler,
  keywords: ["length converter", "meters to feet", "cm to inches", "km to miles", "distance converter"],
  kind: "numeric",
  isPopular: true,
  units: [
    { id: "millimeter", label: "Millimeter", symbol: "mm" },
    { id: "centimeter", label: "Centimeter", symbol: "cm" },
    { id: "meter", label: "Meter", symbol: "m" },
    { id: "kilometer", label: "Kilometer", symbol: "km" },
    { id: "inch", label: "Inch", symbol: "in" },
    { id: "foot", label: "Foot", symbol: "ft" },
    { id: "yard", label: "Yard", symbol: "yd" },
    { id: "mile", label: "Mile", symbol: "mi" },
  ],
  defaultFromUnit: "meter",
  defaultToUnit: "foot",
  convert: createLinearConverter(METERS),
  faq: [
    {
      question: "How many feet are in a meter?",
      answer: "1 meter = 3.28084 feet.",
    },
    {
      question: "How is the conversion calculated?",
      answer:
        "Every unit is stored as a fixed multiple of meters. To convert, we multiply your value by the source unit's factor to get meters, then divide by the target unit's factor.",
    },
  ],
  relatedSlugs: ["weight", "area", "speed"],
};

export default length;
