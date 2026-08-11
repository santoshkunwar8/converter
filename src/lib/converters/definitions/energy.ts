import { Zap } from "lucide-react";
import { createLinearConverter } from "../engine";
import type { ConverterDefinition } from "../types";

const JOULES: Record<string, number> = {
  joule: 1,
  kilojoule: 1000,
  calorie: 4.184,
  kilocalorie: 4184,
  wattHour: 3600,
  kilowattHour: 3600000,
  btu: 1055.05585262,
};

const energy: ConverterDefinition = {
  name: "Energy Converter",
  slug: "energy",
  description:
    "Convert between common energy units — joules, kilojoules, calories, kilocalories, watt-hours, kilowatt-hours, and BTU.",
  shortDescription: "Convert joules, calories, kWh, BTU, and more.",
  icon: Zap,
  keywords: ["energy converter", "joules to calories", "kwh converter", "btu converter"],
  kind: "numeric",
  units: [
    { id: "joule", label: "Joule", symbol: "J" },
    { id: "kilojoule", label: "Kilojoule", symbol: "kJ" },
    { id: "calorie", label: "Calorie", symbol: "cal" },
    { id: "kilocalorie", label: "Kilocalorie", symbol: "kcal" },
    { id: "wattHour", label: "Watt-hour", symbol: "Wh" },
    { id: "kilowattHour", label: "Kilowatt-hour", symbol: "kWh" },
    { id: "btu", label: "BTU", symbol: "BTU" },
  ],
  defaultFromUnit: "kilocalorie",
  defaultToUnit: "kilojoule",
  convert: createLinearConverter(JOULES),
  faq: [
    {
      question: "How many kilojoules are in a kilocalorie?",
      answer: "1 kilocalorie = 4.184 kilojoules.",
    },
    {
      question: "How is the conversion calculated?",
      answer:
        "Every unit is stored as a fixed multiple of joules. To convert, we multiply your value by the source unit's factor to get joules, then divide by the target unit's factor.",
    },
  ],
  relatedSlugs: ["power", "pressure"],
};

export default energy;
