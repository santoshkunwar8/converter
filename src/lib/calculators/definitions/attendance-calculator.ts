import { ClipboardCheck } from "lucide-react";
import type { CalculatorDefinition } from "../types";

const attendanceCalculator: CalculatorDefinition = {
  name: "Attendance Calculator",
  slug: "attendance-calculator",
  description:
    "Calculate your current class attendance percentage and find out how many more classes you can miss — or must attend in a row — to hit your target attendance requirement.",
  shortDescription: "Find your attendance percentage and what it takes to hit your target.",
  category: "education",
  icon: ClipboardCheck,
  keywords: ["attendance calculator", "class attendance percentage", "minimum attendance calculator"],
  isNew: true,
  inputs: [
    {
      id: "classesAttended",
      label: "Classes attended",
      type: "number",
      required: true,
      min: 0,
    },
    {
      id: "totalClasses",
      label: "Total classes held",
      type: "number",
      required: true,
      min: 1,
    },
    {
      id: "targetPercent",
      label: "Target attendance",
      type: "number",
      unit: "%",
      defaultValue: 75,
      min: 1,
      max: 100,
    },
  ],
  resultFields: [
    { id: "currentPercent", label: "Current attendance", format: "percent", decimals: 2, highlight: true },
    { id: "status", label: "What this means", format: "text" },
  ],
  calculate: (inputs) => {
    const attended = Number(inputs.classesAttended);
    const total = Number(inputs.totalClasses);
    const target = Number(inputs.targetPercent ?? 75);

    if (!(total > 0) || attended < 0 || attended > total) {
      return { ok: false, error: "Classes attended must be between 0 and the total classes held." };
    }
    if (target <= 0 || target > 100) {
      return { ok: false, error: "Target attendance must be between 1 and 100." };
    }

    const currentPercent = (attended / total) * 100;

    let status: string;
    if (target >= 100) {
      status = currentPercent >= 100 ? "You're at 100% attendance." : "You must attend every remaining class to reach 100%.";
    } else if (currentPercent >= target) {
      const maxMissable = Math.floor((attended * 100) / target - total);
      status =
        maxMissable > 0
          ? `You can miss ${maxMissable} more class${maxMissable === 1 ? "" : "es"} and stay at ${target}%.`
          : `You're right at the edge — missing any more classes will drop you below ${target}%.`;
    } else {
      const needed = Math.ceil((target * total - 100 * attended) / (100 - target));
      status = `Attend the next ${needed} class${needed === 1 ? "" : "es"} in a row to reach ${target}%.`;
    }

    return {
      ok: true,
      values: {
        currentPercent: Number(currentPercent.toFixed(2)),
        status,
      },
    };
  },
  formula: [
    {
      description: "Current attendance is the share of held classes you attended, expressed as a percentage.",
      expression: "currentPercent = (classesAttended / totalClasses) × 100",
    },
    {
      description:
        "When you're above target, the maximum number of additional classes you can miss and stay at the target is found by solving for how many more total classes could be held before your percentage drops to the target.",
      expression: "maxMissable = floor(classesAttended × 100 / target − totalClasses)",
    },
    {
      description:
        "When you're below target, the number of classes you must attend in a row is found by solving for the smallest count that brings your percentage back up to the target.",
      expression: "needed = ceil((target × totalClasses − 100 × classesAttended) / (100 − target))",
    },
  ],
  steps: [
    {
      title: "Enter classes attended",
      description: "Count how many class sessions you've actually attended so far.",
    },
    {
      title: "Enter total classes held",
      description: "Enter the total number of sessions held to date, not the total for the whole term.",
    },
    {
      title: "Set your target attendance",
      description: "Enter the minimum percentage your school or employer requires — defaults to 75%.",
    },
    {
      title: "Read your result",
      description: "See your current percentage and exactly how many classes you can miss or must attend to meet your target.",
    },
  ],
  examples: [
    {
      title: "Above target with room to spare",
      inputs: { classesAttended: 27, totalClasses: 30, targetPercent: 75 },
      resultSummary: "90.00% attendance — you can miss 6 more classes and stay at 75%.",
    },
    {
      title: "Below target, catching up",
      inputs: { classesAttended: 20, totalClasses: 30, targetPercent: 75 },
      resultSummary: "66.67% attendance — attend the next 10 classes in a row to reach 75%.",
    },
  ],
  faq: [
    {
      question: "How is the minimum attendance requirement calculated?",
      answer:
        "We work backward from your target percentage: if you're below target, we find the smallest number of consecutive classes you'd need to attend (with total classes also growing) so that attended ÷ total reaches your target exactly.",
    },
    {
      question: "Why does 'classes you can miss' assume future classes are also held?",
      answer:
        "Because missing a future class increases the total class count as well as leaving your attended count unchanged, both numbers move together. The calculator accounts for that so the percentage after each missed class is accurate, not just a snapshot of today's ratio.",
    },
    {
      question: "What if my total classes held includes classes I haven't had yet?",
      answer:
        "Only count classes that have actually occurred. If you include future sessions, both your current percentage and the 'classes you can miss' figure will be inaccurate.",
    },
    {
      question: "What's a typical minimum attendance requirement?",
      answer:
        "Many schools and universities set the bar at 75%, but it varies — some require 80% or 90%, and some employers or certification courses have their own thresholds. Adjust the target field to match your institution's policy.",
    },
  ],
  relatedSlugs: ["grade-calculator", "average-calculator"],
};

export default attendanceCalculator;
