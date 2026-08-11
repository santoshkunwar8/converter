import { Cake } from "lucide-react";
import type { CalculatorDefinition } from "../types";

const ageCalculator: CalculatorDefinition = {
  name: "Age Calculator",
  slug: "age-calculator",
  description:
    "Calculate your exact age in years, months, and days between two dates, plus total days, weeks, and months lived.",
  shortDescription: "Find your exact age in years, months, and days.",
  category: "date-time",
  icon: Cake,
  keywords: ["age calculator", "how old am i", "date of birth calculator", "years months days"],
  isPopular: true,
  inputs: [
    {
      id: "birthDate",
      label: "Date of birth",
      type: "date",
      required: true,
    },
    {
      id: "asOfDate",
      label: "Age as of",
      type: "date",
      helpText: "Leave blank to use today's date.",
    },
  ],
  resultFields: [
    { id: "age", label: "Your age", format: "text", highlight: true },
    { id: "totalMonths", label: "Total months lived", format: "number" },
    { id: "totalWeeks", label: "Total weeks lived", format: "number" },
    { id: "totalDays", label: "Total days lived", format: "number" },
    { id: "nextBirthday", label: "Days until next birthday", format: "number" },
  ],
  calculate: (inputs) => {
    const birthRaw = inputs.birthDate;
    if (typeof birthRaw !== "string" || !birthRaw) {
      return { ok: false, error: "Enter a valid date of birth." };
    }
    const birth = new Date(birthRaw);
    if (Number.isNaN(birth.getTime())) {
      return { ok: false, error: "Enter a valid date of birth." };
    }

    const asOfRaw = inputs.asOfDate;
    const asOf = typeof asOfRaw === "string" && asOfRaw ? new Date(asOfRaw) : new Date();
    if (Number.isNaN(asOf.getTime())) {
      return { ok: false, error: "Enter a valid comparison date." };
    }
    if (birth.getTime() > asOf.getTime()) {
      return { ok: false, error: "Date of birth must be before the comparison date." };
    }

    let years = asOf.getFullYear() - birth.getFullYear();
    let months = asOf.getMonth() - birth.getMonth();
    let days = asOf.getDate() - birth.getDate();

    if (days < 0) {
      months -= 1;
      const daysInPrevMonth = new Date(asOf.getFullYear(), asOf.getMonth(), 0).getDate();
      days += daysInPrevMonth;
    }
    if (months < 0) {
      years -= 1;
      months += 12;
    }

    const msPerDay = 1000 * 60 * 60 * 24;
    const totalDays = Math.floor((asOf.getTime() - birth.getTime()) / msPerDay);
    const totalWeeks = Math.floor(totalDays / 7);
    const totalMonths = years * 12 + months;

    const nextBirthday = new Date(asOf.getFullYear(), birth.getMonth(), birth.getDate());
    if (nextBirthday.getTime() < asOf.getTime()) {
      nextBirthday.setFullYear(nextBirthday.getFullYear() + 1);
    }
    const daysUntilNextBirthday = Math.round((nextBirthday.getTime() - asOf.getTime()) / msPerDay);

    return {
      ok: true,
      values: {
        age: `${years} years, ${months} months, ${days} days`,
        totalMonths,
        totalWeeks,
        totalDays,
        nextBirthday: daysUntilNextBirthday,
      },
    };
  },
  formula: [
    {
      description: "Age is computed by subtracting the birth date from the comparison date, then normalizing negative days/months by borrowing from the next larger unit.",
      expression: "years = asOf.year − birth.year (adjusted for month/day borrow)",
    },
  ],
  steps: [
    { title: "Enter your date of birth", description: "Pick the exact date you were born." },
    {
      title: "Optionally set a comparison date",
      description: "Leave blank to calculate your age as of today.",
    },
    {
      title: "Read your exact age",
      description: "Years, months, and days update instantly, along with total days, weeks, and months lived.",
    },
  ],
  examples: [
    {
      title: "Born Jan 15, 2000",
      inputs: { birthDate: "2000-01-15", asOfDate: "2024-06-01" },
      resultSummary: "24 years, 4 months, 17 days old",
    },
  ],
  faq: [
    {
      question: "How is age calculated down to the day?",
      answer:
        "We take the full calendar difference between your birth date and the comparison date, borrowing days from the previous month and months from the previous year whenever the day or month component would otherwise be negative — the same way you'd count age by hand on a calendar.",
    },
    {
      question: "Does this account for leap years?",
      answer:
        "Yes. Because the calculation works with actual calendar dates (via JavaScript's Date object) rather than a fixed 365-day year, leap years are handled automatically.",
    },
    {
      question: "Can I calculate age as of a past or future date?",
      answer:
        "Yes — set the \"Age as of\" field to any date to see how old someone was, or will be, on that date.",
    },
  ],
  relatedSlugs: ["date-difference-calculator", "time-difference-calculator", "bmi-calculator"],
};

export default ageCalculator;
