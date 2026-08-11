import { Clock } from "lucide-react";
import type { CalculatorDefinition } from "../types";

function parseTimeToMinutes(value: string): number | null {
  const match = /^([0-1]?\d|2[0-3]):([0-5]\d)$/.exec(value.trim());
  if (!match) return null;
  return Number(match[1]) * 60 + Number(match[2]);
}

const timeDifferenceCalculator: CalculatorDefinition = {
  name: "Time Difference Calculator",
  slug: "time-difference-calculator",
  description:
    "Calculate the duration between two times of day in hours and minutes, entered in simple 24-hour HH:MM format.",
  shortDescription: "Find the duration between two clock times.",
  category: "date-time",
  icon: Clock,
  keywords: ["time difference calculator", "hours between times", "time duration calculator"],
  inputs: [
    {
      id: "startTime",
      label: "Start time",
      type: "text",
      required: true,
      placeholder: "09:00",
      helpText: "24-hour format, HH:MM",
    },
    {
      id: "endTime",
      label: "End time",
      type: "text",
      required: true,
      placeholder: "17:30",
      helpText: "24-hour format, HH:MM",
    },
  ],
  resultFields: [
    { id: "duration", label: "Duration", format: "text", highlight: true },
    { id: "totalMinutes", label: "Total minutes", format: "number" },
  ],
  calculate: (inputs) => {
    const start = parseTimeToMinutes(String(inputs.startTime ?? ""));
    const end = parseTimeToMinutes(String(inputs.endTime ?? ""));
    if (start === null || end === null) {
      return { ok: false, error: "Enter times in HH:MM 24-hour format (e.g. 09:00)." };
    }
    let diff = end - start;
    if (diff < 0) diff += 24 * 60;
    const hours = Math.floor(diff / 60);
    const minutes = diff % 60;
    return { ok: true, values: { duration: `${hours}h ${minutes}m`, totalMinutes: diff } };
  },
  formula: [
    {
      description: "Both times are converted to minutes since midnight, then the start is subtracted from the end. If the result is negative, a full day (1440 minutes) is added to account for crossing midnight.",
      expression: "duration = (end_minutes − start_minutes + 1440) mod 1440",
    },
  ],
  steps: [
    { title: "Enter the start time", description: "Use 24-hour HH:MM format, such as 09:00." },
    { title: "Enter the end time", description: "Also in 24-hour HH:MM format, such as 17:30." },
    {
      title: "Read the duration",
      description: "The calculator shows the elapsed time in hours and minutes, plus the total minutes.",
    },
  ],
  examples: [
    {
      title: "Standard workday",
      inputs: { startTime: "09:00", endTime: "17:30" },
      resultSummary: "8h 30m (510 total minutes)",
    },
    {
      title: "Overnight shift",
      inputs: { startTime: "22:00", endTime: "06:00" },
      resultSummary: "8h 0m (480 total minutes), assuming the end time is the next day",
    },
  ],
  faq: [
    {
      question: "What format should I use for the times?",
      answer:
        "Enter times in 24-hour HH:MM format, such as 09:00 for 9 AM or 17:30 for 5:30 PM. Single-digit hours can be entered with or without a leading zero.",
    },
    {
      question: "What happens if the end time is earlier than the start time?",
      answer:
        "The calculator assumes the end time falls on the next day and adds 24 hours before computing the duration — useful for overnight shifts that cross midnight.",
    },
    {
      question: "Can I calculate a difference spanning more than 24 hours?",
      answer:
        "No, this calculator only compares two clock times within a single day-to-day span (up to 24 hours). For differences spanning multiple calendar days, use the Date Difference Calculator alongside this tool.",
    },
  ],
  relatedSlugs: ["date-difference-calculator", "age-calculator"],
};

export default timeDifferenceCalculator;
