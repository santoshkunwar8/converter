import { notFound } from "next/navigation";
import type { Metadata } from "next";
import {
  getAllCalculators,
  getCalculatorBySlug,
  getRelatedCalculators,
  toToolSummary,
} from "@/lib/calculators/registry";
import { CATEGORIES } from "@/lib/categories";
import { buildMetadata } from "@/lib/seo";
import { getToolHref } from "@/lib/routes";
import { softwareApplicationJsonLd } from "@/lib/schema";
import { JsonLd } from "@/components/shared/json-ld";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { CalculatorShell } from "@/components/calculators/calculator-shell";
import { FormulaSection } from "@/components/calculators/formula-section";
import { StepByStep } from "@/components/calculators/step-by-step";
import { ExamplesSection } from "@/components/calculators/examples-section";
import { FaqAccordion } from "@/components/shared/faq-accordion";
import { RelatedTools } from "@/components/shared/related-tools";

interface PageParams {
  category: string;
  slug: string;
}

export function generateStaticParams(): PageParams[] {
  return getAllCalculators().map((calc) => ({ category: calc.category, slug: calc.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<PageParams>;
}): Promise<Metadata> {
  const { category, slug } = await params;
  const calc = getCalculatorBySlug(slug);
  if (!calc || calc.category !== category) return {};

  return buildMetadata({
    title: calc.seo?.title ?? calc.name,
    description: calc.seo?.description ?? calc.description,
    keywords: calc.seo?.keywords ?? calc.keywords,
    path: getToolHref({ type: "calculator", slug: calc.slug, category: calc.category }),
  });
}

export default async function CalculatorPage({ params }: { params: Promise<PageParams> }) {
  const { category, slug } = await params;
  const calc = getCalculatorBySlug(slug);
  if (!calc || calc.category !== category) notFound();

  const categoryDef = CATEGORIES[calc.category];
  const related = getRelatedCalculators(calc).map(toToolSummary);
  const path = getToolHref({ type: "calculator", slug: calc.slug, category: calc.category });

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
      <JsonLd
        data={softwareApplicationJsonLd({
          name: calc.name,
          description: calc.description,
          path,
          category: "calculator",
        })}
      />

      <Breadcrumbs
        items={[
          { name: "Calculators", path: "/calculators" },
          { name: categoryDef.name, path: `/calculators/${categoryDef.slug}` },
          { name: calc.name, path },
        ]}
      />

      <div className="mt-4 flex items-start gap-4">
        <span
          className={`flex size-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br text-white ${categoryDef.gradient}`}
        >
          <calc.icon className="size-6" />
        </span>
        <div>
          <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">{calc.name}</h1>
          <p className="mt-1.5 max-w-2xl text-muted-foreground">{calc.description}</p>
        </div>
      </div>

      <div className="mt-8">
        <CalculatorShell
          slug={calc.slug}
          category={calc.category}
          inputs={calc.inputs}
          resultFields={calc.resultFields}
        />
      </div>

      <div className="mt-10 space-y-6">
        <FormulaSection formula={calc.formula} />
        <StepByStep steps={calc.steps} />
        <ExamplesSection examples={calc.examples} />
        <FaqAccordion faqs={calc.faq} />
        <RelatedTools tools={related} />
      </div>
    </div>
  );
}
