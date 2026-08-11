import { Flame } from "lucide-react";
import { createLinearConverter } from "../engine";
import type { ConverterDefinition } from "../types";

const WATTS: Record<string, number> = {
  watt: 1,
  kilowatt: 1000,
  megawatt: 1000000,
  horsepower: 745.699872,
  btuPerHour: 0.29307107,
};

const power: ConverterDefinition = {
  name: "Power Converter",
  slug: "power",
  description:
    "Convert between power units — watts, kilowatts, megawatts, horsepower, and BTU per hour — for engines, appliances, and electrical systems.",
  shortDescription: "Convert watts, kilowatts, horsepower, and BTU/h.",
  icon: Flame,
  keywords: ["power converter", "watts to horsepower", "kilowatts converter"],
  kind: "numeric",
  units: [
    { id: "watt", label: "Watt", symbol: "W" },
    { id: "kilowatt", label: "Kilowatt", symbol: "kW" },
    { id: "megawatt", label: "Megawatt", symbol: "MW" },
    { id: "horsepower", label: "Horsepower", symbol: "hp" },
    { id: "btuPerHour", label: "BTU per hour", symbol: "BTU/h" },
  ],
  defaultFromUnit: "kilowatt",
  defaultToUnit: "horsepower",
  convert: createLinearConverter(WATTS),
  faq: [
    { question: "How many horsepower are in a kilowatt?", answer: "1 kilowatt ≈ 1.34102 horsepower." },
    {
      question: "How is the conversion calculated?",
      answer:
        "Every unit is stored as a fixed multiple of watts. To convert, we multiply your value by the source unit's factor to get watts, then divide by the target unit's factor.",
    },
  ],
  relatedSlugs: ["energy", "pressure"],
};

export default power;
