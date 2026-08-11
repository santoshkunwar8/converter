import { Clock } from "lucide-react";
import { createLinearConverter } from "../engine";
import type { ConverterDefinition } from "../types";

const SECONDS: Record<string, number> = {
  millisecond: 0.001,
  second: 1,
  minute: 60,
  hour: 3600,
  day: 86400,
  week: 604800,
  month: 2629800,
  year: 31557600,
};

const time: ConverterDefinition = {
  name: "Time Converter",
  slug: "time",
  description:
    "Convert between time units — milliseconds, seconds, minutes, hours, days, weeks, months, and years.",
  shortDescription: "Convert seconds, minutes, hours, days, and years.",
  icon: Clock,
  keywords: ["time converter", "seconds to minutes", "days to hours", "time unit converter"],
  isPopular: true,
  kind: "numeric",
  units: [
    { id: "millisecond", label: "Millisecond", symbol: "ms" },
    { id: "second", label: "Second", symbol: "s" },
    { id: "minute", label: "Minute", symbol: "min" },
    { id: "hour", label: "Hour", symbol: "hr" },
    { id: "day", label: "Day", symbol: "day" },
    { id: "week", label: "Week", symbol: "wk" },
    { id: "month", label: "Month", symbol: "mo" },
    { id: "year", label: "Year", symbol: "yr" },
  ],
  defaultFromUnit: "hour",
  defaultToUnit: "minute",
  convert: createLinearConverter(SECONDS),
  faq: [
    { question: "How many minutes are in an hour?", answer: "1 hour = 60 minutes." },
    {
      question: "How is the conversion calculated?",
      answer:
        "Every unit is stored as a fixed multiple of seconds. To convert, we multiply your value by the source unit's factor to get seconds, then divide by the target unit's factor.",
    },
    {
      question: "Why are month and year approximate?",
      answer:
        "Calendar months vary from 28 to 31 days, so month and year use average lengths — 30.4375 days per month and 365.25 days per year — to account for leap years.",
    },
  ],
  relatedSlugs: ["digital-storage", "speed"],
};

export default time;
