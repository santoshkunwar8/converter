import type { Metadata } from "next";
import { Hero } from "@/components/home/hero";
import { getAllCalculators } from "@/lib/calculators/registry";
import { getAllConverters } from "@/lib/converters/registry";
import { buildMetadata } from "@/lib/seo";
import { SITE_NAME } from "@/lib/constants";

export const metadata: Metadata = buildMetadata({
  title: `${SITE_NAME} — Free Online Calculators & Unit Converters`,
  description:
    "Hundreds of free, fast, and accurate calculators and unit converters for finance, health, education, math, and everyday life.",
  path: "/",
});

export default function HomePage() {
  const toolCount = getAllCalculators().length + getAllConverters().length;

  return <Hero toolCount={toolCount} />;
}
