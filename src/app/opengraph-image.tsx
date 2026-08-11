import { ogImageContentType, ogImageSize, renderOgImage } from "@/lib/og";
import { SITE_NAME } from "@/lib/constants";

export const size = ogImageSize;
export const contentType = ogImageContentType;
export const alt = `${SITE_NAME} — Free Online Calculators & Unit Converters`;

export default function Image() {
  return renderOgImage({
    eyebrow: "Calculators & Converters",
    title: `${SITE_NAME} — Free tools for everyday math`,
    description: "Fast, accurate calculators and unit converters. No sign-up required.",
  });
}
