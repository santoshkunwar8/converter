import { FlaskConical } from "lucide-react";
import { createLinearConverter } from "../engine";
import type { ConverterDefinition } from "../types";

const LITERS: Record<string, number> = {
  milliliter: 0.001,
  liter: 1,
  cubicMeter: 1000,
  usGallon: 3.785411784,
  usQuart: 0.946352946,
  usPint: 0.473176473,
  usCup: 0.2365882365,
  fluidOunce: 0.0295735295625,
  cubicFoot: 28.3168466,
  cubicInch: 0.016387064,
};

const volume: ConverterDefinition = {
  name: "Volume Converter",
  slug: "volume",
  description:
    "Convert between metric and US customary volume units — milliliters, liters, cubic meters, gallons, quarts, pints, cups, fluid ounces, cubic feet, and cubic inches.",
  shortDescription: "Convert liters, gallons, cups, and more.",
  icon: FlaskConical,
  keywords: ["volume converter", "liters to gallons", "cups to milliliters", "cubic converter"],
  kind: "numeric",
  units: [
    { id: "milliliter", label: "Milliliter", symbol: "mL" },
    { id: "liter", label: "Liter", symbol: "L" },
    { id: "cubicMeter", label: "Cubic Meter", symbol: "m³" },
    { id: "usGallon", label: "US Gallon", symbol: "gal" },
    { id: "usQuart", label: "US Quart", symbol: "qt" },
    { id: "usPint", label: "US Pint", symbol: "pt" },
    { id: "usCup", label: "US Cup", symbol: "cup" },
    { id: "fluidOunce", label: "Fluid Ounce", symbol: "fl oz" },
    { id: "cubicFoot", label: "Cubic Foot", symbol: "ft³" },
    { id: "cubicInch", label: "Cubic Inch", symbol: "in³" },
  ],
  defaultFromUnit: "liter",
  defaultToUnit: "usGallon",
  convert: createLinearConverter(LITERS),
  faq: [
    {
      question: "How many gallons are in a liter?",
      answer: "1 liter = 0.264172 US gallons.",
    },
    {
      question: "How is the conversion calculated?",
      answer:
        "Every unit is stored as a fixed multiple of liters. To convert, we multiply your value by the source unit's factor to get liters, then divide by the target unit's factor.",
    },
  ],
  relatedSlugs: ["weight", "area", "cooking"],
};

export default volume;
