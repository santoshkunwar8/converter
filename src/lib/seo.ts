import type { Metadata } from "next";
import { SITE_NAME, SITE_URL } from "./constants";

interface BuildMetadataOptions {
  title: string;
  description: string;
  /** Path relative to the site root, e.g. "/calculators/finance/loan-calculator". */
  path: string;
  keywords?: string[];
  noIndex?: boolean;
}

/** Builds page metadata (title/description/canonical/OG/Twitter) for `generateMetadata`. */
export function buildMetadata(options: BuildMetadataOptions): Metadata {
  const { title, description, path, keywords, noIndex } = options;
  const url = new URL(path, SITE_URL).toString();

  return {
    title,
    description,
    keywords,
    alternates: { canonical: url },
    robots: noIndex
      ? { index: false, follow: false }
      : { index: true, follow: true },
    openGraph: {
      title,
      description,
      url,
      siteName: SITE_NAME,
      type: "website",
      locale: "en_US",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}
