import { Type } from "lucide-react";
import { createLinearConverter } from "../engine";
import type { ConverterDefinition } from "../types";

const PIXELS: Record<string, number> = {
  pixel: 1,
  point: 1.33333333,
  em: 16,
  rem: 16,
  inch: 96,
  centimeter: 37.7952756,
  millimeter: 3.77952756,
};

const typography: ConverterDefinition = {
  name: "Typography Converter",
  slug: "typography",
  description:
    "Convert between typography units — pixels, points, em, rem, inches, centimeters, and millimeters — for CSS and print design.",
  shortDescription: "Convert px, pt, em, rem, and more.",
  icon: Type,
  keywords: ["typography converter", "px to pt", "em to px", "font size converter"],
  kind: "numeric",
  units: [
    { id: "pixel", label: "Pixel", symbol: "px" },
    { id: "point", label: "Point", symbol: "pt" },
    { id: "em", label: "Em", symbol: "em" },
    { id: "rem", label: "Rem", symbol: "rem" },
    { id: "inch", label: "Inch", symbol: "in" },
    { id: "centimeter", label: "Centimeter", symbol: "cm" },
    { id: "millimeter", label: "Millimeter", symbol: "mm" },
  ],
  defaultFromUnit: "pixel",
  defaultToUnit: "rem",
  convert: createLinearConverter(PIXELS),
  faq: [
    {
      question: "How many pixels are in a rem?",
      answer: "1 rem = 16 pixels, based on the standard 16px browser default root font size.",
    },
    {
      question: "How is the conversion calculated?",
      answer:
        "Every unit is stored as a fixed multiple of pixels, assuming a 16px root font size and 96 DPI. To convert, we multiply your value by the source unit's factor to get pixels, then divide by the target unit's factor.",
    },
    {
      question: "Does em always equal 16px?",
      answer:
        "Only under this converter's assumption. Em/rem conversions here assume a 16px base font size, the common browser default — but an element's actual em size depends on its parent's font size in real CSS.",
    },
  ],
  relatedSlugs: ["color", "digital-storage"],
};

export default typography;
