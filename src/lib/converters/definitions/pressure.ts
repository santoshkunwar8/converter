import { Activity } from "lucide-react";
import { createLinearConverter } from "../engine";
import type { ConverterDefinition } from "../types";

const PASCALS: Record<string, number> = {
  pascal: 1,
  kilopascal: 1000,
  bar: 100000,
  psi: 6894.75729,
  atmosphere: 101325,
  torr: 133.322368,
  mmHg: 133.322387415,
};

const pressure: ConverterDefinition = {
  name: "Pressure Converter",
  slug: "pressure",
  description:
    "Convert between common pressure units — pascals, kilopascals, bar, PSI, atmospheres, torr, and millimeters of mercury.",
  shortDescription: "Convert PSI, bar, pascals, and more.",
  icon: Activity,
  keywords: ["pressure converter", "psi to bar", "pascal converter", "atm to psi"],
  kind: "numeric",
  units: [
    { id: "pascal", label: "Pascal", symbol: "Pa" },
    { id: "kilopascal", label: "Kilopascal", symbol: "kPa" },
    { id: "bar", label: "Bar", symbol: "bar" },
    { id: "psi", label: "PSI", symbol: "psi" },
    { id: "atmosphere", label: "Atmosphere", symbol: "atm" },
    { id: "torr", label: "Torr", symbol: "Torr" },
    { id: "mmHg", label: "mmHg", symbol: "mmHg" },
  ],
  defaultFromUnit: "bar",
  defaultToUnit: "psi",
  convert: createLinearConverter(PASCALS),
  faq: [
    {
      question: "How many PSI are in a bar?",
      answer: "1 bar = 14.5038 PSI.",
    },
    {
      question: "How is the conversion calculated?",
      answer:
        "Every unit is stored as a fixed multiple of pascals. To convert, we multiply your value by the source unit's factor to get pascals, then divide by the target unit's factor.",
    },
  ],
  relatedSlugs: ["temperature", "power"],
};

export default pressure;
