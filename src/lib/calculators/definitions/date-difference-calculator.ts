import { CalendarDays } from "lucide-react";
import type { CalculatorDefinition } from "../types";

const dateDifferenceCalculator: CalculatorDefinition = {
  name: "Date Difference Calculator",
  slug: "date-difference-calculator",
  description:
    "Calculate the exact number of days, weeks, and calendar years/months/days between two dates.",
  shortDescription: "Find how many days, weeks, and years lie between two dates.",
  category: "date-time",
  icon: CalendarDays,
  keywords: ["date difference calculator", "days between dates", "date duration calculator"],
  inputs: [
    { id: "startDate", label: "Start date", type: "date", required: true },
    { id: "endDate", label: "End date", type: "date", required: true },
  ],
  resultFields: [
    { id: "breakdown", label: "Difference", format: "text", highlight: true },
    { id: "totalDays", label: "Total days", format: "number" },
    { id: "totalWeeks", label: "Total weeks", format: "number" },
  ],
  calculate: (inputs) => {
    const sRaw = inputs.startDate;
    const eRaw = inputs.endDate;
    if (typeof sRaw !== "string" || typeof eRaw !== "string" || !sRaw || !eRaw) {
      return { ok: false, error: "Enter both a start and end date." };
    }
    const sDate = new Date(sRaw);
    const eDate = new Date(eRaw);
    if (Number.isNaN(sDate.getTime()) || Number.isNaN(eDate.getTime())) {
      return { ok: false, error: "Enter two valid dates." };
    }
    const msPerDay = 86400000;
    const totalDays = Math.round(Math.abs(eDate.getTime() - sDate.getTime()) / msPerDay);
    const totalWeeks = Math.floor(totalDays / 7);
    const start = sDate.getTime() <= eDate.getTime() ? sDate : eDate;
    const end = sDate.getTime() <= eDate.getTime() ? eDate : sDate;
    let years = end.getFullYear() - start.getFullYear();
    let months = end.getMonth() - start.getMonth();
    let days = end.getDate() - start.getDate();
    if (days < 0) {
      months -= 1;
      days += new Date(end.getFullYear(), end.getMonth(), 0).getDate();
    }
    if (months < 0) {
      years -= 1;
      months += 12;
    }
    return {
      ok: true,
      values: { breakdown: `${years} years, ${months} months, ${days} days`, totalDays, totalWeeks },
    };
  },
  formula: [
    {
      description: "The total day count is the absolute difference between the two dates in milliseconds, divided by the number of milliseconds in a day. The calendar breakdown borrows days from the previous month and months from the previous year, the same way you'd count by hand on a calendar.",
      expression: "totalDays = |end − start| / 86,400,000 ms",
    },
  ],
  steps: [
    { title: "Enter the start date", description: "Pick the earlier or later of the two dates — order doesn't matter." },
    { title: "Enter the end date", description: "Pick the other date you want to compare against." },
    {
      title: "Read the difference",
      description: "See the calendar breakdown (years, months, days) plus the total days and weeks between the two dates.",
    },
  ],
  examples: [
    {
      title: "First quarter span",
      inputs: { startDate: "2024-01-01", endDate: "2024-03-15" },
      resultSummary: "74 total days, 10 weeks (0 years, 2 months, 14 days)",
    },
  ],
  faq: [
    {
      question: "Does it matter which date I enter first?",
      answer:
        "No. The calculator automatically compares the two dates chronologically, so you can enter the start and end dates in either order and get the same result.",
    },
    {
      question: "Does the calculation account for leap years?",
      answer:
        "Yes. Because it works with real calendar dates via JavaScript's Date object rather than a fixed 365-day year, leap years (like February 29) are handled automatically.",
    },
    {
      question: "Why do total days and the years/months/days breakdown look different?",
      answer:
        "Total days is a straight count of every day between the two dates. The years/months/days breakdown instead expresses that same span the way a calendar would — for example, 74 total days between January 1 and March 15, 2024 breaks down to 2 months and 14 days.",
    },
  ],
  relatedSlugs: ["time-difference-calculator", "age-calculator"],
};

export default dateDifferenceCalculator;
