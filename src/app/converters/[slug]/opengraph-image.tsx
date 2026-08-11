import { getConverterBySlug } from "@/lib/converters/registry";
import { ogImageContentType, ogImageSize, renderOgImage } from "@/lib/og";

export const size = ogImageSize;
export const contentType = ogImageContentType;
export const alt = "Converter preview image";

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const conv = getConverterBySlug(slug);

  return renderOgImage({
    eyebrow: "Converter",
    title: conv?.name ?? "Unit Converter",
    description: conv?.shortDescription,
  });
}
