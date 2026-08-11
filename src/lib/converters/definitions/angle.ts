import { Compass } from "lucide-react";
import { createLinearConverter } from "../engine";
import type { ConverterDefinition } from "../types";

const DEGREES: Record<string, number> = {
  degree: 1,
  radian: 57.29577951308232,
  gradian: 0.9,
  arcminute: 0.0166667,
  arcsecond: 0.000277778,
  turn: 360,
};

const angle: ConverterDefinition = {
  name: "Angle Converter",
  slug: "angle",
  description:
    "Convert between angle units — degrees, radians, gradians, arcminutes, arcseconds, and turns.",
  shortDescription: "Convert degrees, radians, gradians, and turns.",
  icon: Compass,
  keywords: ["angle converter", "degrees to radians", "radians to degrees", "gradians converter"],
  kind: "numeric",
  units: [
    { id: "degree", label: "Degree", symbol: "°" },
    { id: "radian", label: "Radian", symbol: "rad" },
    { id: "gradian", label: "Gradian", symbol: "grad" },
    { id: "arcminute", label: "Arcminute", symbol: "'" },
    { id: "arcsecond", label: "Arcsecond", symbol: "\"" },
    { id: "turn", label: "Turn", symbol: "turn" },
  ],
  defaultFromUnit: "degree",
  defaultToUnit: "radian",
  convert: createLinearConverter(DEGREES),
  faq: [
    {
      question: "How many radians are in a degree?",
      answer: "1 degree ≈ 0.0174533 radians, since 1 radian ≈ 57.29578 degrees.",
    },
    {
      question: "How is the conversion calculated?",
      answer:
        "Every unit is stored as a fixed multiple of degrees. To convert, we multiply your value by the source unit's factor to get degrees, then divide by the target unit's factor.",
    },
  ],
  relatedSlugs: ["speed", "area"],
};

export default angle;
