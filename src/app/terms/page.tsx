import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { buildMetadata } from "@/lib/seo";
import { SITE_NAME } from "@/lib/constants";

export const metadata: Metadata = buildMetadata({
  title: "Terms of Service",
  description: `Terms of service for ${SITE_NAME}.`,
  path: "/terms",
});

export default function TermsPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:px-8">
      <Breadcrumbs items={[{ name: "Terms", path: "/terms" }]} />

      <h1 className="mt-4 text-3xl font-bold tracking-tight">Terms of Service</h1>
      <p className="mt-2 text-sm text-muted-foreground">Last updated: {new Date().getFullYear()}</p>

      <div className="mt-8 space-y-6 text-muted-foreground [&_h2]:mt-8 [&_h2]:mb-2 [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:text-foreground [&_p]:leading-relaxed">
        <p>By using {SITE_NAME}, you agree to the following terms.</p>

        <h2>No warranty</h2>
        <p>
          {SITE_NAME} provides calculators and converters &ldquo;as is&rdquo;, without warranty of
          any kind. While we aim for accuracy and show the formula behind every result, we cannot
          guarantee that every result is error-free or suitable for your specific situation.
        </p>

        <h2>Not professional advice</h2>
        <p>
          Nothing on this site constitutes financial, medical, legal, or other professional
          advice. Always consult a qualified professional before making decisions based on any
          calculation, especially involving loans, health, or taxes.
        </p>

        <h2>Acceptable use</h2>
        <p>
          You may use {SITE_NAME} for personal or commercial purposes. You may not attempt to
          disrupt the service, scrape it at abusive volume, or use it to violate any applicable
          law.
        </p>

        <h2>Changes</h2>
        <p>
          We may update these terms or add new tools at any time. Continued use of the site after
          changes constitutes acceptance of the updated terms.
        </p>

        <h2>Contact</h2>
        <p>
          Questions? Reach out via the{" "}
          <a href="/contact" className="text-primary underline underline-offset-2">
            contact page
          </a>
          .
        </p>
      </div>
    </div>
  );
}
