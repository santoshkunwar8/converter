import Link from "next/link";
import { Calculator, Mail } from "lucide-react";
import { CATEGORY_LIST } from "@/lib/categories";
import { getCategoryHref } from "@/lib/routes";
import { SITE_NAME } from "@/lib/constants";
import { getPopularCalculators } from "@/lib/calculators/registry";
import { getPopularConverters } from "@/lib/converters/registry";
import { getToolHref } from "@/lib/routes";
import { toToolSummary as calcSummary } from "@/lib/calculators/registry";
import { toToolSummary as convSummary } from "@/lib/converters/registry";

export function Footer() {
  const popularCalculators = getPopularCalculators(5).map(calcSummary);
  const popularConverters = getPopularConverters(5).map(convSummary);

  return (
    <footer className="border-t border-border bg-muted/30" data-no-print="true">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-5">
          <div className="col-span-2">
            <Link href="/" className="flex items-center gap-2 font-semibold tracking-tight">
              <span className="flex size-8 items-center justify-center rounded-xl bg-primary text-primary-foreground">
                <Calculator className="size-4.5" />
              </span>
              {SITE_NAME}
            </Link>
            <p className="mt-3 max-w-xs text-sm text-muted-foreground">
              Free, fast, and accurate calculators and unit converters for everyday life, finance,
              health, school, and work.
            </p>
            <Link
              href="/contact"
              className="mt-4 inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground"
            >
              <Mail className="size-3.5" /> Contact us
            </Link>
          </div>

          <div>
            <h3 className="text-sm font-semibold">Popular Calculators</h3>
            <ul className="mt-3 space-y-2">
              {popularCalculators.map((tool) => (
                <li key={tool.slug}>
                  <Link
                    href={getToolHref(tool)}
                    className="text-sm text-muted-foreground hover:text-foreground"
                  >
                    {tool.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold">Popular Converters</h3>
            <ul className="mt-3 space-y-2">
              {popularConverters.map((tool) => (
                <li key={tool.slug}>
                  <Link
                    href={getToolHref(tool)}
                    className="text-sm text-muted-foreground hover:text-foreground"
                  >
                    {tool.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold">Categories</h3>
            <ul className="mt-3 space-y-2">
              {CATEGORY_LIST.slice(0, 5).map((category) => (
                <li key={category.slug}>
                  <Link
                    href={getCategoryHref(category.slug)}
                    className="text-sm text-muted-foreground hover:text-foreground"
                  >
                    {category.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-border pt-6 sm:flex-row">
          <p className="text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} {SITE_NAME}. All rights reserved.
          </p>
          <div className="flex gap-5 text-xs text-muted-foreground">
            <Link href="/about" className="hover:text-foreground">
              About
            </Link>
            <Link href="/privacy" className="hover:text-foreground">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-foreground">
              Terms
            </Link>
            <Link href="/contact" className="hover:text-foreground">
              Contact
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
