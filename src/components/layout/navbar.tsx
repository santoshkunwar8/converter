import Link from "next/link";
import { Calculator } from "lucide-react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { ThemeSwitch } from "@/components/layout/theme-switch";
import { SearchTrigger } from "@/components/shared/search-trigger";
import { MobileNav } from "@/components/layout/mobile-nav";
import { CATEGORY_LIST } from "@/lib/categories";
import { getCategoryHref } from "@/lib/routes";
import { SITE_NAME } from "@/lib/constants";

export function Navbar() {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/60 bg-background/80 glass-panel">
      <div className="mx-auto flex h-16 max-w-7xl items-center gap-4 px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex shrink-0 items-center gap-2 font-semibold tracking-tight">
          <span className="flex size-8 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-soft">
            <Calculator className="size-4.5" />
          </span>
          <span className="hidden sm:inline">{SITE_NAME}</span>
        </Link>

        <NavigationMenu className="hidden md:flex">
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuLink render={<Link href="/calculators" />}>
                Calculators
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink render={<Link href="/converters" />}>
                Converters
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuTrigger>Categories</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[520px] grid-cols-2 gap-1 p-2">
                  {CATEGORY_LIST.map((category) => (
                    <li key={category.slug}>
                      <NavigationMenuLink
                        render={
                          <Link
                            href={getCategoryHref(category.slug)}
                            className="flex items-start gap-3 rounded-lg p-2.5 hover:bg-accent"
                          />
                        }
                      >
                        <span
                          className={`flex size-8 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br text-white ${category.gradient}`}
                        >
                          <category.icon className="size-4" />
                        </span>
                        <span>
                          <span className="block text-sm font-medium">{category.name}</span>
                          <span className="block text-xs text-muted-foreground line-clamp-1">
                            {category.description}
                          </span>
                        </span>
                      </NavigationMenuLink>
                    </li>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink render={<Link href="/about" />}>About</NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        <div className="ml-auto flex items-center gap-2">
          <SearchTrigger className="hidden sm:flex" />
          <ThemeSwitch />
          <MobileNav />
        </div>
      </div>
    </header>
  );
}
