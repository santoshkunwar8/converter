import {
  Sparkles,
  Landmark,
  HeartPulse,
  GraduationCap,
  Sigma,
  CalendarClock,
  HardHat,
  Briefcase,
  Code2,
  ArrowLeftRight,
} from "lucide-react";
import type { CategoryDefinition, CategorySlug } from "@/types";

export const CATEGORIES: Record<CategorySlug, CategoryDefinition> = {
  general: {
    slug: "general",
    name: "General",
    description: "Everyday tools for quick, practical calculations.",
    icon: Sparkles,
    gradient: "from-slate-500 to-slate-700",
  },
  finance: {
    slug: "finance",
    name: "Finance",
    description: "Loans, interest, EMIs, and other money math.",
    icon: Landmark,
    gradient: "from-emerald-500 to-teal-600",
  },
  health: {
    slug: "health",
    name: "Health",
    description: "Body metrics and wellness calculators.",
    icon: HeartPulse,
    gradient: "from-rose-500 to-pink-600",
  },
  education: {
    slug: "education",
    name: "Education",
    description: "Grades, attendance, and academic planning tools.",
    icon: GraduationCap,
    gradient: "from-amber-500 to-orange-600",
  },
  math: {
    slug: "math",
    name: "Math",
    description: "Percentages, averages, and general-purpose math.",
    icon: Sigma,
    gradient: "from-indigo-500 to-violet-600",
  },
  "date-time": {
    slug: "date-time",
    name: "Date & Time",
    description: "Ages, durations, and calendar math.",
    icon: CalendarClock,
    gradient: "from-sky-500 to-blue-600",
  },
  construction: {
    slug: "construction",
    name: "Construction",
    description: "Materials, area, and project estimation tools.",
    icon: HardHat,
    gradient: "from-yellow-500 to-amber-600",
  },
  business: {
    slug: "business",
    name: "Business",
    description: "Margins, pricing, and operations calculators.",
    icon: Briefcase,
    gradient: "from-cyan-500 to-sky-600",
  },
  developer: {
    slug: "developer",
    name: "Developer",
    description: "Tools for programmers and technical work.",
    icon: Code2,
    gradient: "from-fuchsia-500 to-purple-600",
  },
  converters: {
    slug: "converters",
    name: "Converters",
    description: "Convert between units of length, weight, time, and more.",
    icon: ArrowLeftRight,
    gradient: "from-teal-500 to-emerald-600",
  },
};

export const CATEGORY_LIST = Object.values(CATEGORIES);
