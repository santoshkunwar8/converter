import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { buildMetadata } from "@/lib/seo";
import { SITE_NAME } from "@/lib/constants";

export const metadata: Metadata = buildMetadata({
  title: "Privacy Policy",
  description: `How ${SITE_NAME} handles your data.`,
  path: "/privacy",
});

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:px-8">
      <Breadcrumbs items={[{ name: "Privacy Policy", path: "/privacy" }]} />

      <h1 className="mt-4 text-3xl font-bold tracking-tight">Privacy Policy</h1>
      <p className="mt-2 text-sm text-muted-foreground">Last updated: {new Date().getFullYear()}</p>

      <div className="prose-content mt-8 space-y-6 text-muted-foreground [&_h2]:mt-8 [&_h2]:mb-2 [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:text-foreground [&_p]:leading-relaxed">
        <p>
          {SITE_NAME} is designed to work without collecting personal information. This page
          explains exactly what data we store and why.
        </p>

        <h2>Calculations happen in your browser</h2>
        <p>
          All calculator and converter results are computed locally in your browser using
          JavaScript. Your inputs (loan amounts, dates of birth, measurements, etc.) are never
          transmitted to our servers.
        </p>

        <h2>Local storage</h2>
        <p>
          Favorites, recently used tools, and unit-converter history are saved in your browser&apos;s
          local storage so they persist between visits on the same device and browser.
        </p>

        <h2>Anonymous device sync (optional)</h2>
        <p>
          If a database is configured, your favorites, recent tools, and history may also sync via
          an anonymous, randomly generated device ID stored in a cookie — never linked to your
          name, email, or any other personal information. No account or sign-up is required or
          available.
        </p>

        <h2>Cookies</h2>
        <p>
          We use a single functional cookie to store the anonymous device ID described above. We
          do not use tracking or advertising cookies.
        </p>

        <h2>Third parties</h2>
        <p>
          We do not sell or share any data with third parties. If analytics are added in the
          future, they will be privacy-respecting and aggregate only.
        </p>

        <h2>Contact</h2>
        <p>
          Questions about this policy? Reach out via the{" "}
          <a href="/contact" className="text-primary underline underline-offset-2">
            contact page
          </a>
          .
        </p>
      </div>
    </div>
  );
}
