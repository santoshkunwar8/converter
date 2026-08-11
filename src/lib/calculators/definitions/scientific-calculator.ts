import { Calculator } from "lucide-react";
import { evaluateExpression } from "../expression-parser";
import type { CalculatorDefinition } from "../types";

const scientificCalculator: CalculatorDefinition = {
  name: "Scientific Calculator",
  slug: "scientific-calculator",
  description:
    "A full scientific calculator supporting trigonometry, logarithms, roots, exponents, and standard order of operations.",
  shortDescription: "Trig, logs, roots, and exponents — all in one expression.",
  category: "math",
  icon: Calculator,
  keywords: ["scientific calculator", "trig calculator", "log calculator", "math expression evaluator"],
  isPopular: true,
  inputs: [
    {
      id: "expression",
      label: "Expression",
      type: "text",
      required: true,
      placeholder: "sin(45) + sqrt(16) * 2",
      helpText:
        "Supports + − × ÷ ^ %, parentheses, sin/cos/tan/asin/acos/atan (degrees), sqrt, log (base 10), ln, abs, exp, round, floor, ceil, min, max, and the constants pi and e.",
    },
  ],
  resultFields: [{ id: "result", label: "Result", format: "number", decimals: 8, highlight: true }],
  calculate: (inputs) => {
    const expression = String(inputs.expression ?? "").trim();
    if (!expression) return { ok: false, error: "Enter a math expression." };

    try {
      const result = evaluateExpression(expression);
      return { ok: true, values: { result: Number(result.toFixed(10)) } };
    } catch (err) {
      return { ok: false, error: err instanceof Error ? err.message : "Invalid expression." };
    }
  },
  formula: [
    {
      description: "Expressions are parsed and evaluated with standard mathematical order of operations (parentheses, then exponents, then multiplication/division, then addition/subtraction).",
      expression: "e.g. sin(45) + sqrt(16) * 2 → 0.707 + 4 × 2 = 8.707",
    },
  ],
  steps: [
    { title: "Type an expression", description: "Use +, −, *, /, ^ (power), % (modulo), and parentheses." },
    {
      title: "Use functions if needed",
      description: "sin, cos, tan, asin, acos, atan (all in degrees), sqrt, log, ln, abs, exp, round, floor, ceil, min, max.",
    },
    { title: "Read the result", description: "Your expression evaluates live as you type." },
  ],
  examples: [
    { title: "Basic arithmetic", inputs: { expression: "(4 + 6) * 3 / 2" }, resultSummary: "= 15" },
    { title: "Trigonometry", inputs: { expression: "sin(30) + cos(60)" }, resultSummary: "= 1" },
    { title: "Roots and exponents", inputs: { expression: "sqrt(144) + 2^5" }, resultSummary: "= 44" },
  ],
  faq: [
    {
      question: "Are trigonometric functions in degrees or radians?",
      answer:
        "Degrees. sin(90) returns 1, for example. Use radians manually by converting first (radians = degrees × pi / 180) if you need radian input.",
    },
    {
      question: "What does log vs ln mean?",
      answer: "log() is base-10 logarithm; ln() is the natural logarithm (base e).",
    },
    {
      question: "Is this safe from malicious input?",
      answer:
        "Yes — expressions are parsed by a dedicated evaluator that only understands numbers, operators, and a fixed list of math functions. No arbitrary code can be executed.",
    },
  ],
  relatedSlugs: ["percentage-calculator", "average-calculator"],
};

export default scientificCalculator;
