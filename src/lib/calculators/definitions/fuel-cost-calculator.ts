import { Fuel } from "lucide-react";
import type { CalculatorDefinition } from "../types";

const fuelCostCalculator: CalculatorDefinition = {
  name: "Fuel Cost Calculator",
  slug: "fuel-cost-calculator",
  description:
    "Estimate how much fuel a trip will cost based on the distance you're driving, your vehicle's fuel efficiency, and the price of fuel.",
  shortDescription: "Estimate trip fuel cost from distance, efficiency, and fuel price.",
  category: "general",
  icon: Fuel,
  keywords: ["fuel cost calculator", "gas cost calculator", "trip fuel cost"],
  isNew: true,
  inputs: [
    {
      id: "distance",
      label: "Distance",
      type: "number",
      unit: "mi or km",
      required: true,
      min: 0,
      helpText: "Works with any distance unit, as long as it matches the fuel efficiency unit below.",
    },
    {
      id: "fuelEfficiency",
      label: "Fuel efficiency",
      type: "number",
      unit: "distance per fuel unit, e.g. mpg",
      required: true,
      min: 0.01,
      helpText: "Use a consistent pair, such as miles per gallon or kilometers per liter.",
    },
    {
      id: "fuelPrice",
      label: "Fuel price",
      type: "number",
      unit: "$ per fuel unit",
      required: true,
      min: 0,
      helpText: "The price for one unit of fuel — one gallon or one liter, matching your efficiency unit.",
    },
  ],
  resultFields: [
    { id: "totalCost", label: "Total fuel cost", format: "currency", highlight: true },
    { id: "fuelNeeded", label: "Fuel needed", format: "number", decimals: 2 },
  ],
  calculate: (inputs) => {
    const distance = Number(inputs.distance);
    const efficiency = Number(inputs.fuelEfficiency);
    const price = Number(inputs.fuelPrice);

    if (!(distance >= 0) || !(efficiency > 0) || !(price >= 0)) {
      return { ok: false, error: "Enter a valid distance, fuel efficiency, and fuel price." };
    }

    const fuelNeeded = distance / efficiency;
    const totalCost = fuelNeeded * price;

    return {
      ok: true,
      values: {
        totalCost: Number(totalCost.toFixed(2)),
        fuelNeeded: Number(fuelNeeded.toFixed(2)),
      },
    };
  },
  formula: [
    {
      description: "Fuel needed is the trip distance divided by your vehicle's fuel efficiency.",
      expression: "fuelNeeded = distance / fuelEfficiency",
    },
    {
      description: "Total cost is the fuel needed multiplied by the price per fuel unit.",
      expression: "totalCost = fuelNeeded × fuelPrice",
    },
  ],
  steps: [
    {
      title: "Enter your trip distance",
      description: "Use miles or kilometers — whichever matches your fuel efficiency figure.",
    },
    {
      title: "Enter your fuel efficiency",
      description: "Use your vehicle's rated mpg, km/l, or similar distance-per-fuel-unit figure.",
    },
    {
      title: "Enter the fuel price",
      description: "Enter the current price for one gallon or one liter of fuel.",
    },
    {
      title: "Read your estimated cost",
      description: "See the total fuel needed and what the trip will cost at current prices.",
    },
  ],
  examples: [
    {
      title: "Highway road trip in miles and gallons",
      inputs: { distance: 300, fuelEfficiency: 25, fuelPrice: 3.5 },
      resultSummary: "12.00 gallons needed, costing $42.00 total",
    },
    {
      title: "Commute in kilometers and liters",
      inputs: { distance: 500, fuelEfficiency: 15, fuelPrice: 1.6 },
      resultSummary: "33.33 liters needed, costing $53.33 total",
    },
  ],
  faq: [
    {
      question: "Does this work with metric units like liters and kilometers?",
      answer:
        "Yes. The calculator doesn't assume any specific unit system — as long as your distance and fuel efficiency use the same underlying units (both miles/gallons or both kilometers/liters), the math works out correctly. If you need to convert between unit systems first, a length converter can help with the distance side.",
    },
    {
      question: "How do I find my vehicle's fuel efficiency?",
      answer:
        "Check your vehicle's manual or window sticker for its official mpg (or L/100km, which you'll need to convert to a distance-per-fuel-unit figure first) rating, or calculate it yourself from a fuel economy converter using a recent fill-up: divide the distance driven by the fuel used to refill the tank.",
    },
    {
      question: "Why is my actual fuel cost different from the estimate?",
      answer:
        "Real-world fuel efficiency varies with driving style, terrain, traffic, cargo weight, and vehicle condition, so it's often lower than the rated figure. Fuel prices also fluctuate by station and location. Treat this as a planning estimate rather than an exact quote.",
    },
    {
      question: "Can I use this to compare costs across different vehicles?",
      answer:
        "Yes — run the same distance and fuel price through the calculator with each vehicle's efficiency rating to see which one costs less to drive for a given trip.",
    },
  ],
  relatedSlugs: ["split-bill-calculator", "tip-calculator"],
};

export default fuelCostCalculator;
