import type { Metadata } from "next";
import { Zap, ShieldCheck, Code2, Heart } from "lucide-react";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { buildMetadata } from "@/lib/seo";
import { getAllCalculators } from "@/lib/calculators/registry";
import { getAllConverters } from "@/lib/converters/registry";
import { SITE_NAME } from "@/lib/constants";

export const metadata: Metadata = buildMetadata({
  title: "About",
  description: `About ${SITE_NAME} — free, fast, and accurate calculators and unit converters.`,
  path: "/about",
});

const VALUES = [
  {
    icon: Zap,
    title: "Fast by default",
    description: "Every tool is statically generated and calculates instantly in your browser — no server round-trip.",
  },
  {
    icon: ShieldCheck,
    title: "No sign-up, no clutter",
    description: "Every calculator and converter is free to use, with no account required.",
  },
  {
    icon: Code2,
    title: "Transparent formulas",
    description: "Every calculator shows its formula and a step-by-step explanation, not just a black-box result.",
  },
  {
    icon: Heart,
    title: "Built to grow",
    description: "Our architecture is designed to scale to thousands of tools without sacrificing quality.",
  },
];

export default function AboutPage() {
  const toolCount = getAllCalculators().length + getAllConverters().length;

  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:px-8">
      <Breadcrumbs items={[{ name: "About", path: "/about" }]} />

      <h1 className="mt-4 text-3xl font-bold tracking-tight">About {SITE_NAME}</h1>
      <p className="mt-4 text-lg text-muted-foreground">
        {SITE_NAME} is a free collection of {toolCount}+ calculators and unit converters for
        everyday life — finance, health, education, math, and more. No sign-up, no paywalls, just
        fast, accurate tools.
      </p>

      <div className="mt-10 grid gap-5 sm:grid-cols-2">
        {VALUES.map((value) => (
          <div key={value.title} className="rounded-2xl border border-border bg-card p-6 shadow-soft">
            <span className="flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <value.icon className="size-5" />
            </span>
            <h2 className="mt-3 font-semibold">{value.title}</h2>
            <p className="mt-1 text-sm text-muted-foreground">{value.description}</p>
          </div>
        ))}
      </div>

      <div className="mt-10 space-y-4 text-muted-foreground">
        <h2 className="text-xl font-semibold text-foreground">Our approach</h2>
        <p>
          Every calculator and converter is built from a single, self-contained definition —
          inputs, formula, and explanation live together, which lets us add new tools quickly
          without touching existing ones or risking regressions elsewhere on the site.
        </p>
        <p>
          Results are computed entirely in your browser. We don&apos;t send your inputs to a
          server to calculate a result — the only optional server interaction is anonymously
          syncing your favorites and recent tools across visits, via a device ID with no personal
          information attached.
        </p>
      </div>
    </div>
  );
}
