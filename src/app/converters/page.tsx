import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { ToolCard } from "@/components/shared/tool-card";
import { EmptyState } from "@/components/shared/empty-state";
import { getAllConverters, toToolSummary } from "@/lib/converters/registry";
import { buildMetadata } from "@/lib/seo";
import { itemListJsonLd } from "@/lib/schema";
import { JsonLd } from "@/components/shared/json-ld";
import { getToolHref } from "@/lib/routes";

export const metadata: Metadata = buildMetadata({
  title: "All Converters",
  description: "Browse every unit converter — length, weight, temperature, area, volume, speed, and more.",
  path: "/converters",
});

export default function ConvertersListPage() {
  const tools = getAllConverters().map(toToolSummary);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <JsonLd data={itemListJsonLd(tools.map((tool) => ({ name: tool.name, path: getToolHref(tool) })))} />
      <Breadcrumbs items={[{ name: "Converters", path: "/converters" }]} />

      <h1 className="mt-4 text-3xl font-bold tracking-tight">All Converters</h1>
      <p className="mt-2 max-w-2xl text-muted-foreground">
        Convert between units of length, weight, temperature, area, volume, and more.
      </p>

      <div className="mt-8">
        {tools.length > 0 ? (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {tools.map((tool) => (
              <ToolCard key={tool.slug} tool={tool} />
            ))}
          </div>
        ) : (
          <EmptyState title="No converters yet" description="Check back soon." />
        )}
      </div>
    </div>
  );
}
