import { Palette } from "lucide-react";
import type { ConverterDefinition } from "../types";

const color: ConverterDefinition = {
  name: "Color Converter",
  slug: "color",
  description: "Convert colors between HEX, RGB, and HSL formats, with a live color preview and picker.",
  shortDescription: "Convert HEX, RGB, and HSL colors with a live preview.",
  icon: Palette,
  keywords: ["color converter", "hex to rgb", "rgb to hsl", "hex color picker"],
  isNew: true,
  kind: "visual",
  faq: [
    {
      question: "How is HSL calculated from RGB?",
      answer:
        "Hue, saturation, and lightness are derived from the relative min/max of the red, green, and blue channels using the standard RGB-to-HSL formula used across CSS and design tools.",
    },
    {
      question: "Can I use 3-digit hex codes?",
      answer: "Yes — shorthand hex codes like #fff are automatically expanded to #ffffff.",
    },
  ],
  relatedSlugs: ["typography"],
};

export default color;
