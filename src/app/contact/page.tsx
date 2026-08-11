import type { Metadata } from "next";
import { Mail } from "lucide-react";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { buildMetadata } from "@/lib/seo";
import { SITE_NAME } from "@/lib/constants";

export const metadata: Metadata = buildMetadata({
  title: "Contact",
  description: `Get in touch with the ${SITE_NAME} team.`,
  path: "/contact",
});

// Replace with a real inbox before launch.
const CONTACT_EMAIL = "hello@calchub.example";

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-8 sm:px-6 lg:px-8">
      <Breadcrumbs items={[{ name: "Contact", path: "/contact" }]} />

      <h1 className="mt-4 text-3xl font-bold tracking-tight">Contact us</h1>
      <p className="mt-3 text-muted-foreground">
        Found a bug, have a calculator or converter you&apos;d like to see, or just want to say hi?
        We&apos;d love to hear from you.
      </p>

      <div className="mt-8 rounded-2xl border border-border bg-card p-6 shadow-soft sm:p-8">
        <div className="flex items-center gap-3">
          <span className="flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <Mail className="size-5" />
          </span>
          <div>
            <p className="text-sm text-muted-foreground">Email us</p>
            <a href={`mailto:${CONTACT_EMAIL}`} className="font-medium hover:underline">
              {CONTACT_EMAIL}
            </a>
          </div>
        </div>
      </div>

      <p className="mt-6 text-sm text-muted-foreground">
        Requesting a new calculator or converter? Let us know what it should calculate and any
        formula details — most requests can be added quickly thanks to our tool architecture.
      </p>
    </div>
  );
}
