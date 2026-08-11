import { GraduationCap } from "lucide-react";
import type { CalculatorDefinition } from "../types";

function parseScorePair(token: string): { score: number; max: number } | null {
  const match = /^\s*(\d+(?:\.\d+)?)\s*\/\s*(\d+(?:\.\d+)?)\s*$/.exec(token);
  if (!match) return null;
  return { score: Number(match[1]), max: Number(match[2]) };
}

const gradeCalculator: CalculatorDefinition = {
  name: "Grade Calculator",
  slug: "grade-calculator",
  description:
    "Calculate your overall percentage and letter grade from a list of assignment scores, each entered as points earned out of points possible.",
  shortDescription: "Find your overall percentage and letter grade from a list of scores.",
  category: "education",
  icon: GraduationCap,
  keywords: ["grade calculator", "weighted grade calculator", "letter grade calculator"],
  inputs: [
    {
      id: "scores",
      label: "Scores",
      type: "text",
      required: true,
      placeholder: "85/100, 90/100, 78/100",
      helpText: "Enter each assignment as score/max, separated by commas",
    },
  ],
  resultFields: [
    { id: "percentage", label: "Overall percentage", format: "percent", decimals: 2, highlight: true },
    { id: "letterGrade", label: "Letter grade", format: "text" },
    { id: "totalScore", label: "Total points earned", format: "number" },
    { id: "totalMax", label: "Total points possible", format: "number" },
  ],
  calculate: (inputs) => {
    const raw = String(inputs.scores ?? "");
    const tokens = raw.split(",").map((t) => t.trim()).filter(Boolean);
    if (tokens.length === 0) return { ok: false, error: "Enter at least one score as score/max, e.g. 85/100." };
    const pairs = tokens.map(parseScorePair);
    if (pairs.some((p) => !p || p.max <= 0)) {
      return { ok: false, error: "Each entry must be formatted as score/max, e.g. 85/100." };
    }
    const validPairs = pairs as { score: number; max: number }[];
    const totalScore = validPairs.reduce((sum, p) => sum + p.score, 0);
    const totalMax = validPairs.reduce((sum, p) => sum + p.max, 0);
    const percentage = (totalScore / totalMax) * 100;
    let letterGrade: string;
    if (percentage >= 90) letterGrade = "A";
    else if (percentage >= 80) letterGrade = "B";
    else if (percentage >= 70) letterGrade = "C";
    else if (percentage >= 60) letterGrade = "D";
    else letterGrade = "F";
    return { ok: true, values: { percentage: Number(percentage.toFixed(2)), letterGrade, totalScore, totalMax } };
  },
  formula: [
    {
      description: "Each assignment's earned points and possible points are summed across the whole list, then the overall percentage is the total points earned divided by the total points possible. The letter grade is assigned from a standard 90/80/70/60 scale.",
      expression: "percentage = Σscore / Σmax × 100",
    },
  ],
  steps: [
    {
      title: "List your scores",
      description: "Enter each assignment as score/max (e.g. 85/100), separated by commas.",
    },
    {
      title: "Include every graded item",
      description: "Add quizzes, tests, homework, or any other assignment you want counted toward the total.",
    },
    {
      title: "Read your overall grade",
      description: "See your overall percentage, letter grade, and total points earned out of total points possible.",
    },
  ],
  examples: [
    {
      title: "Three assignments",
      inputs: { scores: "85/100, 90/100, 78/100" },
      resultSummary: "84.33% overall (253/300 points), letter grade B",
    },
    {
      title: "Mixed-scale assignments",
      inputs: { scores: "45/50, 18/20, 95/100" },
      resultSummary: "92.94% overall (158/170 points), letter grade A",
    },
  ],
  faq: [
    {
      question: "Can assignments have different point totals?",
      answer:
        "Yes. Each entry has its own score/max, so you can mix a 20-point quiz with a 100-point test — the calculator sums all points earned and all points possible before computing the overall percentage.",
    },
    {
      question: "Does this weight assignments by category, like tests vs. homework?",
      answer:
        "No, every point counts equally regardless of which assignment it came from. A 100-point test naturally carries more weight than a 10-point quiz simply because it's worth more points, but there's no separate category weighting.",
    },
    {
      question: "What letter grade scale does this use?",
      answer:
        "The standard scale: 90% and above is an A, 80–89% is a B, 70–79% is a C, 60–69% is a D, and below 60% is an F. This may differ from your school's specific grading scale.",
    },
    {
      question: "What format should I use for entering scores?",
      answer:
        "Enter each score as points earned followed by a slash and points possible, like 85/100, with multiple entries separated by commas, like 85/100, 90/100, 78/100.",
    },
  ],
  relatedSlugs: ["attendance-calculator", "average-calculator"],
};

export default gradeCalculator;
