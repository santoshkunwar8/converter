import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { ToolCard } from "@/components/shared/tool-card";
import { EmptyState } from "@/components/shared/empty-state";
import { getCalculatorsByCategory, toToolSummary } from "@/lib/calculators/registry";
import { CATEGORIES, CATEGORY_LIST } from "@/lib/categories";
import { buildMetadata } from "@/lib/seo";
import { itemListJsonLd } from "@/lib/schema";
import { JsonLd } from "@/components/shared/json-ld";
import { getToolHref } from "@/lib/routes";
import type { CategorySlug } from "@/types";

interface PageParams {
  category: string;
}

const CALCULATOR_CATEGORY_SLUGS = CATEGORY_LIST.filter((c) => c.slug !== "converters").map(
  (c) => c.slug,
);

export function generateStaticParams(): PageParams[] {
  return CALCULATOR_CATEGORY_SLUGS.map((category) => ({ category }));
}

function isCalculatorCategory(slug: string): slug is Exclude<CategorySlug, "converters"> {
  return (CALCULATOR_CATEGORY_SLUGS as string[]).includes(slug);
}

export async function generateMetadata({
  params,
}: {
  params: Promise<PageParams>;
}): Promise<Metadata> {
  const { category } = await params;
  if (!isCalculatorCategory(category)) return {};
  const def = CATEGORIES[category];

  return buildMetadata({
    title: `${def.name} Calculators`,
    description: def.description,
    path: `/calculators/${category}`,
  });
}

export default async function CalculatorCategoryPage({ params }: { params: Promise<PageParams> }) {
  const { category } = await params;
  if (!isCalculatorCategory(category)) notFound();

  const def = CATEGORIES[category];
  const tools = getCalculatorsByCategory(category).map(toToolSummary);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <JsonLd data={itemListJsonLd(tools.map((tool) => ({ name: tool.name, path: getToolHref(tool) })))} />
      <Breadcrumbs
        items={[
          { name: "Calculators", path: "/calculators" },
          { name: def.name, path: `/calculators/${category}` },
        ]}
      />

      <div className="mt-4 flex items-center gap-4">
        <span
          className={`flex size-12 items-center justify-center rounded-2xl bg-gradient-to-br text-white ${def.gradient}`}
        >
          <def.icon className="size-6" />
        </span>
        <div>
          <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">{def.name} Calculators</h1>
          <p className="mt-1 text-muted-foreground">{def.description}</p>
        </div>
      </div>

      <div className="mt-8">
        {tools.length > 0 ? (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {tools.map((tool) => (
              <ToolCard key={tool.slug} tool={tool} />
            ))}
          </div>
        ) : (
          <EmptyState title={`No ${def.name.toLowerCase()} calculators yet`} description="Check back soon." />
        )}
      </div>
    </div>
  );
}
