import Link from "next/link";
import { Calculator, Home, Search } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[70vh] max-w-lg flex-col items-center justify-center px-4 text-center">
      <span className="flex size-16 items-center justify-center rounded-2xl bg-primary/10 text-primary">
        <Calculator className="size-8" />
      </span>
      <h1 className="mt-6 text-4xl font-bold tracking-tight">404</h1>
      <p className="mt-2 text-lg font-medium">This tool doesn&apos;t add up.</p>
      <p className="mt-2 text-muted-foreground">
        The page you&apos;re looking for doesn&apos;t exist or may have moved.
      </p>
      <div className="mt-6 flex gap-3">
        <Button render={<Link href="/" />}>
          <Home className="size-4" /> Go home
        </Button>
        <Button variant="outline" render={<Link href="/search" />}>
          <Search className="size-4" /> Search tools
        </Button>
      </div>
    </div>
  );
}
