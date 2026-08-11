import { notFound } from "next/navigation";
import type { Metadata } from "next";
import {
  getAllConverters,
  getConverterBySlug,
  getRelatedConverters,
  toToolSummary,
} from "@/lib/converters/registry";
import { CATEGORIES } from "@/lib/categories";
import { buildMetadata } from "@/lib/seo";
import { getToolHref } from "@/lib/routes";
import { softwareApplicationJsonLd } from "@/lib/schema";
import { JsonLd } from "@/components/shared/json-ld";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { ConverterShell } from "@/components/converters/converter-shell";
import { ColorConverterView } from "@/components/converters/color-converter-view";
import { CurrencyConverterShell } from "@/components/converters/currency-converter-shell";
import { FaqAccordion } from "@/components/shared/faq-accordion";
import { RelatedTools } from "@/components/shared/related-tools";
import { EmptyState } from "@/components/shared/empty-state";
import { CloudOff } from "lucide-react";
import type { CurrencyRates } from "@/lib/converters/types";

interface PageParams {
  slug: string;
}

export function generateStaticParams(): PageParams[] {
  return getAllConverters().map((conv) => ({ slug: conv.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<PageParams>;
}): Promise<Metadata> {
  const { slug } = await params;
  const conv = getConverterBySlug(slug);
  if (!conv) return {};

  return buildMetadata({
    title: conv.seo?.title ?? conv.name,
    description: conv.seo?.description ?? conv.description,
    keywords: conv.seo?.keywords ?? conv.keywords,
    path: getToolHref({ type: "converter", slug: conv.slug, category: "converters" }),
  });
}

export default async function ConverterPage({ params }: { params: Promise<PageParams> }) {
  const { slug } = await params;
  const conv = getConverterBySlug(slug);
  if (!conv) notFound();

  const categoryDef = CATEGORIES.converters;
  const related = getRelatedConverters(conv).map(toToolSummary);
  const path = getToolHref({ type: "converter", slug: conv.slug, category: "converters" });

  let rates: CurrencyRates | null = null;
  let ratesUnavailable = false;
  if (conv.kind === "currency") {
    try {
      rates = await conv.fetchRates();
    } catch {
      ratesUnavailable = true;
    }
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
      <JsonLd
        data={softwareApplicationJsonLd({
          name: conv.name,
          description: conv.description,
          path,
          category: "converter",
        })}
      />

      <Breadcrumbs
        items={[
          { name: "Converters", path: "/converters" },
          { name: conv.name, path },
        ]}
      />

      <div className="mt-4 flex items-start gap-4">
        <span
          className={`flex size-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br text-white ${categoryDef.gradient}`}
        >
          <conv.icon className="size-6" />
        </span>
        <div>
          <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">{conv.name}</h1>
          <p className="mt-1.5 max-w-2xl text-muted-foreground">{conv.description}</p>
        </div>
      </div>

      <div className="mt-8">
        {conv.kind === "numeric" ? (
          <ConverterShell
            slug={conv.slug}
            units={conv.units}
            defaultFromUnit={conv.defaultFromUnit}
            defaultToUnit={conv.defaultToUnit}
          />
        ) : conv.kind === "currency" ? (
          ratesUnavailable || !rates ? (
            <EmptyState
              icon={CloudOff}
              title="Exchange rates are temporarily unavailable"
              description="Our rate provider isn't responding right now. Please try again in a few minutes."
            />
          ) : (
            <CurrencyConverterShell
              slug={conv.slug}
              units={conv.units}
              defaultFromUnit={conv.defaultFromUnit}
              defaultToUnit={conv.defaultToUnit}
              rates={rates}
            />
          )
        ) : (
          <ColorConverterView slug={conv.slug} />
        )}
      </div>

      <div className="mt-10 space-y-6">
        <FaqAccordion faqs={conv.faq} />
        <RelatedTools tools={related} title="Related converters" />
      </div>
    </div>
  );
}
