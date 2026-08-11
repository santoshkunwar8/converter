import { Sparkles } from "lucide-react";
import { SearchTrigger } from "@/components/shared/search-trigger";

export function Hero({ toolCount }: { toolCount: number }) {
  return (
    <section className="relative overflow-hidden border-b border-border/60">
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_60%_50%_at_50%_-10%,theme(colors.primary/18%),transparent)]"
      />
      <div className="bg-grid-fade absolute inset-0 -z-20" aria-hidden="true" />

      <div className="mx-auto max-w-4xl px-4 py-20 text-center sm:px-6 sm:py-28 lg:px-8">
        <div className="animate-in fade-in slide-in-from-bottom-3 duration-700 inline-flex items-center gap-1.5 rounded-full border border-border bg-card/80 px-3 py-1 text-xs font-medium text-muted-foreground shadow-soft">
          <Sparkles className="size-3.5 text-primary" />
          {toolCount}+ free calculators &amp; converters
        </div>

        <h1 className="animate-in fade-in slide-in-from-bottom-4 duration-700 mt-6 text-4xl font-bold tracking-tight text-balance sm:text-5xl lg:text-6xl">
          Every calculation, <span className="text-primary">instantly.</span>
        </h1>

        <p className="animate-in fade-in slide-in-from-bottom-5 duration-700 mx-auto mt-5 max-w-xl text-balance text-lg text-muted-foreground">
          Fast, accurate calculators and unit converters for finance, health, school, and everyday
          life. No sign-up, no ads in your way.
        </p>

        <div className="animate-in fade-in slide-in-from-bottom-6 duration-700 mx-auto mt-8 flex max-w-md justify-center">
          <SearchTrigger className="flex h-12 max-w-md text-base shadow-soft" />
        </div>
      </div>
    </section>
  );
}
