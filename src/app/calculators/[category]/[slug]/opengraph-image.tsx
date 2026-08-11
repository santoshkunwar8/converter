import { getCalculatorBySlug } from "@/lib/calculators/registry";
import { CATEGORIES } from "@/lib/categories";
import { ogImageContentType, ogImageSize, renderOgImage } from "@/lib/og";

export const size = ogImageSize;
export const contentType = ogImageContentType;
export const alt = "Calculator preview image";

export default async function Image({ params }: { params: Promise<{ category: string; slug: string }> }) {
  const { slug } = await params;
  const calc = getCalculatorBySlug(slug);

  return renderOgImage({
    eyebrow: calc ? CATEGORIES[calc.category].name : "Calculator",
    title: calc?.name ?? "Calculator",
    description: calc?.shortDescription,
  });
}
