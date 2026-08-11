import type { Metadata } from "next";
import { Hero } from "@/components/home/hero";
import { Section } from "@/components/home/section";
import { ToolCard } from "@/components/shared/tool-card";
import { CategoryCard } from "@/components/shared/category-card";
import { FaqAccordion } from "@/components/shared/faq-accordion";
import { EmptyState } from "@/components/shared/empty-state";
import {
  getAllCalculators,
  getCalculatorsByCategory,
  getPopularCalculators,
  getRecentlyAddedCalculators,
  toToolSummary as calcSummary,
} from "@/lib/calculators/registry";
import {
  getAllConverters,
  getPopularConverters,
  getRecentlyAddedConverters,
  toToolSummary as convSummary,
} from "@/lib/converters/registry";
import { CATEGORY_LIST } from "@/lib/categories";
import { buildMetadata } from "@/lib/seo";
import { SITE_NAME } from "@/lib/constants";
import type { ToolSummary } from "@/types";

export const metadata: Metadata = buildMetadata({
  title: `${SITE_NAME} — Free Online Calculators & Unit Converters`,
  description:
    "Hundreds of free, fast, and accurate calculators and unit converters for finance, health, education, math, and everyday life.",
  path: "/",
});

const SITE_FAQ = [
  {
    question: `Is ${SITE_NAME} free to use?`,
    answer: "Yes — every calculator and converter is completely free, with no sign-up required.",
  },
  {
    question: "How accurate are the calculators?",
    answer:
      "Each tool uses standard, well-documented formulas (shown on every calculator page) and double-precision arithmetic. For financial, medical, or legal decisions, always confirm with a qualified professional.",
  },
  {
    question: "Can I use these tools on mobile?",
    answer: "Yes — every tool is fully responsive and works on phones, tablets, and desktops.",
  },
  {
    question: "Do you store my data?",
    answer:
      "Favorites, recently used tools, and conversion history are saved locally in your browser. Optionally, this can sync anonymously via a device ID with no account or personal information required.",
  },
];

export default function HomePage() {
  const allCalculators = getAllCalculators();
  const allConverters = getAllConverters();
  const toolCount = allCalculators.length + allConverters.length;

  const popularCalculators = getPopularCalculators(8).map(calcSummary);
  const popularConverters = getPopularConverters(8).map(convSummary);

  const recentlyAdded: ToolSummary[] = [
    ...getRecentlyAddedCalculators(4).map(calcSummary),
    ...getRecentlyAddedConverters(4).map(convSummary),
  ].slice(0, 8);

  const featured: ToolSummary[] = [...popularCalculators.slice(0, 2), ...popularConverters.slice(0, 2)];

  return (
    <>
      <Hero toolCount={toolCount} />

      <Section title="Popular Calculators" viewAllHref="/calculators">
        {popularCalculators.length > 0 ? (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {popularCalculators.map((tool) => (
              <ToolCard key={tool.slug} tool={tool} />
            ))}
          </div>
        ) : (
          <EmptyState title="More calculators coming soon" />
        )}
      </Section>

      <Section title="Popular Converters" viewAllHref="/converters">
        {popularConverters.length > 0 ? (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {popularConverters.map((tool) => (
              <ToolCard key={tool.slug} tool={tool} />
            ))}
          </div>
        ) : (
          <EmptyState title="More converters coming soon" />
        )}
      </Section>

      <Section title="Browse by Category" description="Find tools organized by what you're trying to do.">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {CATEGORY_LIST.map((category) => (
            <CategoryCard
              key={category.slug}
              category={category}
              count={
                category.slug === "converters"
                  ? allConverters.length
                  : getCalculatorsByCategory(category.slug).length
              }
            />
          ))}
        </div>
      </Section>

      {featured.length > 0 && (
        <Section title="Featured Tools" description="A few of our favorites, hand-picked.">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {featured.map((tool) => (
              <ToolCard key={`${tool.type}-${tool.slug}`} tool={tool} />
            ))}
          </div>
        </Section>
      )}

      {recentlyAdded.length > 0 && (
        <Section title="Recently Added">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {recentlyAdded.map((tool) => (
              <ToolCard key={`${tool.type}-${tool.slug}`} tool={tool} />
            ))}
          </div>
        </Section>
      )}

      <Section title="Frequently Asked Questions">
        <FaqAccordion faqs={SITE_FAQ} />
      </Section>
    </>
  );
}
