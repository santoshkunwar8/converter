import { getAllCalculators } from "@/lib/calculators/registry";
import { getAllConverters } from "@/lib/converters/registry";
import { getToolHref } from "@/lib/routes";
import { SITE_NAME, SITE_URL } from "@/lib/constants";

export const dynamic = "force-static";

function escapeXml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export function GET() {
  const calculators = getAllCalculators()
    .filter((c) => c.isNew)
    .map((c) => ({
      title: c.name,
      description: c.description,
      url: getToolHref({ type: "calculator", slug: c.slug, category: c.category }),
    }));

  const converters = getAllConverters()
    .filter((c) => c.isNew)
    .map((c) => ({
      title: c.name,
      description: c.description,
      url: getToolHref({ type: "converter", slug: c.slug, category: "converters" }),
    }));

  const items = [...calculators, ...converters]
    .map(
      (item) => `    <item>
      <title>${escapeXml(item.title)}</title>
      <link>${SITE_URL}${item.url}</link>
      <guid>${SITE_URL}${item.url}</guid>
      <description>${escapeXml(item.description)}</description>
    </item>`,
    )
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>${escapeXml(SITE_NAME)} — Recently Added Tools</title>
    <link>${SITE_URL}</link>
    <description>Newest calculators and converters on ${escapeXml(SITE_NAME)}</description>
${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: { "Content-Type": "application/rss+xml; charset=utf-8" },
  });
}
