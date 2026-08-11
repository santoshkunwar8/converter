import { HeartPulse } from "lucide-react";
import type { CalculatorDefinition } from "../types";

const bmiCalculator: CalculatorDefinition = {
  name: "BMI Calculator",
  slug: "bmi-calculator",
  description:
    "Calculate your Body Mass Index (BMI) from height and weight, see your weight category, and find your healthy weight range.",
  shortDescription: "Find your Body Mass Index and healthy weight range.",
  category: "health",
  icon: HeartPulse,
  keywords: ["bmi calculator", "body mass index", "healthy weight", "obesity calculator"],
  isPopular: true,
  inputs: [
    {
      id: "height",
      label: "Height",
      type: "number",
      unit: "cm",
      required: true,
      min: 50,
      max: 250,
      step: 0.1,
      placeholder: "170",
      helpText: "In centimeters. Need feet/inches? Use the Length converter first.",
    },
    {
      id: "weight",
      label: "Weight",
      type: "number",
      unit: "kg",
      required: true,
      min: 10,
      max: 300,
      step: 0.1,
      placeholder: "65",
      helpText: "In kilograms. Need pounds? Use the Weight converter first.",
    },
  ],
  resultFields: [
    { id: "bmi", label: "Your BMI", format: "number", decimals: 1, highlight: true },
    { id: "category", label: "Category", format: "text" },
    { id: "healthyRange", label: "Healthy weight range", format: "text" },
  ],
  calculate: (inputs) => {
    const height = Number(inputs.height);
    const weight = Number(inputs.weight);
    if (!height || !weight || height <= 0 || weight <= 0) {
      return { ok: false, error: "Enter a valid height and weight." };
    }

    const heightM = height / 100;
    const bmi = weight / (heightM * heightM);

    let category: string;
    if (bmi < 18.5) category = "Underweight";
    else if (bmi < 25) category = "Normal weight";
    else if (bmi < 30) category = "Overweight";
    else category = "Obese";

    const minHealthy = 18.5 * heightM * heightM;
    const maxHealthy = 24.9 * heightM * heightM;

    return {
      ok: true,
      values: {
        bmi: Number(bmi.toFixed(1)),
        category,
        healthyRange: `${minHealthy.toFixed(1)} kg – ${maxHealthy.toFixed(1)} kg`,
      },
    };
  },
  formula: [
    {
      description: "BMI is weight in kilograms divided by height in meters squared.",
      expression: "BMI = weight (kg) ÷ height (m)²",
    },
  ],
  steps: [
    { title: "Enter your height", description: "In centimeters." },
    { title: "Enter your weight", description: "In kilograms." },
    {
      title: "Read your BMI and category",
      description:
        "Your BMI updates instantly, along with the standard WHO weight category and a healthy weight range for your height.",
    },
  ],
  examples: [
    {
      title: "170 cm, 65 kg",
      inputs: { height: 170, weight: 65 },
      resultSummary: "BMI 22.5 — Normal weight",
    },
  ],
  faq: [
    {
      question: "What do the BMI categories mean?",
      answer:
        "Under 18.5 is classified as underweight, 18.5–24.9 as normal weight, 25–29.9 as overweight, and 30+ as obese, per World Health Organization guidelines.",
    },
    {
      question: "Is BMI accurate for everyone?",
      answer:
        "BMI is a simple screening tool based on height and weight only. It doesn't account for muscle mass, bone density, or body composition, so athletes and very muscular individuals may show a higher BMI without excess body fat. Consult a healthcare professional for a full assessment.",
    },
    {
      question: "How is the healthy weight range calculated?",
      answer:
        "It's the weight range that would put you at the low (18.5) and high (24.9) ends of the normal BMI category, given your height.",
    },
  ],
  relatedSlugs: ["age-calculator", "average-calculator"],
};

export default bmiCalculator;
