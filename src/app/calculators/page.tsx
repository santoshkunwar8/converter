import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { ToolCard } from "@/components/shared/tool-card";
import { EmptyState } from "@/components/shared/empty-state";
import { getCalculatorsByCategory, toToolSummary } from "@/lib/calculators/registry";
import { CATEGORY_LIST } from "@/lib/categories";
import { buildMetadata } from "@/lib/seo";
import { itemListJsonLd } from "@/lib/schema";
import { JsonLd } from "@/components/shared/json-ld";
import { getCategoryHref, getToolHref } from "@/lib/routes";
import { SITE_NAME } from "@/lib/constants";

export const metadata: Metadata = buildMetadata({
  title: "All Calculators",
  description: "Browse every calculator, organized by category — finance, health, education, math, and more.",
  path: "/calculators",
});

export default function CalculatorsListPage() {
  const categories = CATEGORY_LIST.filter((c) => c.slug !== "converters");
  const sections = categories
    .map((category) => ({
      category,
      tools: getCalculatorsByCategory(category.slug).map(toToolSummary),
    }))
    .filter((section) => section.tools.length > 0);

  const allTools = sections.flatMap((s) => s.tools);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <JsonLd
        data={itemListJsonLd(allTools.map((tool) => ({ name: tool.name, path: getToolHref(tool) })))}
      />
      <Breadcrumbs items={[{ name: "Calculators", path: "/calculators" }]} />

      <h1 className="mt-4 text-3xl font-bold tracking-tight">All Calculators</h1>
      <p className="mt-2 max-w-2xl text-muted-foreground">
        Every calculator on {SITE_NAME}, organized by category.
      </p>

      <div className="mt-6 flex flex-wrap gap-2">
        {categories.map((category) => (
          <Link
            key={category.slug}
            href={getCategoryHref(category.slug)}
            className="rounded-full border border-border bg-card px-3.5 py-1.5 text-sm font-medium hover:bg-accent"
          >
            {category.name}
          </Link>
        ))}
      </div>

      {sections.length === 0 ? (
        <div className="mt-10">
          <EmptyState title="No calculators yet" description="Check back soon." />
        </div>
      ) : (
        <div className="mt-12 space-y-14">
          {sections.map(({ category, tools }) => (
            <section key={category.slug} id={category.slug}>
              <div className="mb-5 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span
                    className={`flex size-9 items-center justify-center rounded-xl bg-gradient-to-br text-white ${category.gradient}`}
                  >
                    <category.icon className="size-4.5" />
                  </span>
                  <h2 className="text-xl font-semibold">{category.name}</h2>
                </div>
                <Link
                  href={getCategoryHref(category.slug)}
                  className="text-sm font-medium text-primary hover:underline"
                >
                  View all
                </Link>
              </div>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {tools.map((tool) => (
                  <ToolCard key={tool.slug} tool={tool} />
                ))}
              </div>
            </section>
          ))}
        </div>
      )}
    </div>
  );
}
