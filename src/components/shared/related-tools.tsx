import { ToolCard } from "@/components/shared/tool-card";
import type { ToolSummary } from "@/types";

export function RelatedTools({ tools, title = "Related tools" }: { tools: ToolSummary[]; title?: string }) {
  if (tools.length === 0) return null;

  return (
    <div>
      <h2 className="mb-4 text-lg font-semibold">{title}</h2>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {tools.map((tool) => (
          <ToolCard key={`${tool.type}-${tool.slug}`} tool={tool} />
        ))}
      </div>
    </div>
  );
}
