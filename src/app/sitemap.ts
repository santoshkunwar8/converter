import type { MetadataRoute } from "next";
import { getAllCalculators } from "@/lib/calculators/registry";
import { getAllConverters } from "@/lib/converters/registry";
import { CATEGORY_LIST } from "@/lib/categories";
import { getCategoryHref, getToolHref } from "@/lib/routes";
import { SITE_URL } from "@/lib/constants";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const staticPages: MetadataRoute.Sitemap = [
    { url: SITE_URL, lastModified, changeFrequency: "daily", priority: 1 },
    { url: `${SITE_URL}/calculators`, lastModified, changeFrequency: "daily", priority: 0.9 },
    { url: `${SITE_URL}/converters`, lastModified, changeFrequency: "daily", priority: 0.9 },
    { url: `${SITE_URL}/search`, lastModified, changeFrequency: "weekly", priority: 0.4 },
    { url: `${SITE_URL}/about`, lastModified, changeFrequency: "monthly", priority: 0.3 },
    { url: `${SITE_URL}/privacy`, lastModified, changeFrequency: "yearly", priority: 0.2 },
    { url: `${SITE_URL}/terms`, lastModified, changeFrequency: "yearly", priority: 0.2 },
    { url: `${SITE_URL}/contact`, lastModified, changeFrequency: "yearly", priority: 0.3 },
  ];

  const categoryPages: MetadataRoute.Sitemap = CATEGORY_LIST.filter(
    (c) => c.slug !== "converters",
  ).map((category) => ({
    url: `${SITE_URL}${getCategoryHref(category.slug)}`,
    lastModified,
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  const calculatorPages: MetadataRoute.Sitemap = getAllCalculators().map((calc) => ({
    url: `${SITE_URL}${getToolHref({ type: "calculator", slug: calc.slug, category: calc.category })}`,
    lastModified,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  const converterPages: MetadataRoute.Sitemap = getAllConverters().map((conv) => ({
    url: `${SITE_URL}${getToolHref({ type: "converter", slug: conv.slug, category: "converters" })}`,
    lastModified,
    // Currency's content (exchange rates) genuinely changes daily; every other
    // converter's math is fixed, so "monthly" better reflects real edit frequency.
    changeFrequency: conv.kind === "currency" ? "daily" : "monthly",
    priority: 0.8,
  }));

  return [...staticPages, ...categoryPages, ...calculatorPages, ...converterPages];
}
