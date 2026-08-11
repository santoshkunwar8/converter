import type { Metadata } from "next";
import { Search } from "lucide-react";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { ToolCard } from "@/components/shared/tool-card";
import { EmptyState } from "@/components/shared/empty-state";
import { searchTools } from "@/lib/search";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Search",
  description: "Search calculators and unit converters.",
  path: "/search",
  noIndex: true,
});

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q = "" } = await searchParams;
  const results = q ? searchTools(q, 40) : [];

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
      <Breadcrumbs items={[{ name: "Search", path: "/search" }]} />

      <h1 className="mt-4 text-3xl font-bold tracking-tight">Search</h1>

      <form action="/search" method="GET" className="relative mt-6 max-w-xl">
        <Search className="pointer-events-none absolute left-3.5 top-1/2 size-4.5 -translate-y-1/2 text-muted-foreground" />
        <input
          type="text"
          name="q"
          defaultValue={q}
          placeholder="Search calculators, converters..."
          autoFocus
          className="h-12 w-full rounded-xl border border-input bg-card pl-11 pr-4 text-base outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
        />
      </form>

      <div className="mt-8">
        {!q ? (
          <EmptyState
            icon={Search}
            title="Start typing to search"
            description="Try “loan”, “bmi”, or “length”."
          />
        ) : results.length > 0 ? (
          <>
            <p className="mb-4 text-sm text-muted-foreground">
              {results.length} result{results.length === 1 ? "" : "s"} for &ldquo;{q}&rdquo;
            </p>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {results.map((tool) => (
                <ToolCard key={`${tool.type}-${tool.slug}`} tool={tool} />
              ))}
            </div>
          </>
        ) : (
          <EmptyState
            icon={Search}
            title={`No results for "${q}"`}
            description="Try a different search term, or browse by category."
          />
        )}
      </div>
    </div>
  );
}
