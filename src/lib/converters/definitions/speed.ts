import { Gauge } from "lucide-react";
import { createLinearConverter } from "../engine";
import type { ConverterDefinition } from "../types";

const METERS_PER_SECOND: Record<string, number> = {
  meterPerSecond: 1,
  kilometerPerHour: 0.277778,
  milePerHour: 0.44704,
  knot: 0.514444,
  footPerSecond: 0.3048,
};

const speed: ConverterDefinition = {
  name: "Speed Converter",
  slug: "speed",
  description:
    "Convert between common speed units — meters per second, kilometers per hour, miles per hour, knots, and feet per second.",
  shortDescription: "Convert km/h, mph, knots, and more.",
  icon: Gauge,
  keywords: ["speed converter", "km/h to mph", "mph to km/h", "knots converter"],
  isPopular: true,
  kind: "numeric",
  units: [
    { id: "meterPerSecond", label: "Meter/second", symbol: "m/s" },
    { id: "kilometerPerHour", label: "Kilometer/hour", symbol: "km/h" },
    { id: "milePerHour", label: "Mile/hour", symbol: "mph" },
    { id: "knot", label: "Knot", symbol: "kn" },
    { id: "footPerSecond", label: "Foot/second", symbol: "ft/s" },
  ],
  defaultFromUnit: "kilometerPerHour",
  defaultToUnit: "milePerHour",
  convert: createLinearConverter(METERS_PER_SECOND),
  faq: [
    {
      question: "How many miles per hour are in a kilometer per hour?",
      answer: "1 kilometer per hour = 0.621371 miles per hour.",
    },
    {
      question: "How is the conversion calculated?",
      answer:
        "Every unit is stored as a fixed multiple of meters per second. To convert, we multiply your value by the source unit's factor to get meters per second, then divide by the target unit's factor.",
    },
  ],
  relatedSlugs: ["length", "time", "fuel-economy"],
};

export default speed;
