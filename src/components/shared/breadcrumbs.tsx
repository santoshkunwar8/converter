import Link from "next/link";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { JsonLd } from "@/components/shared/json-ld";
import { breadcrumbJsonLd, type BreadcrumbEntry } from "@/lib/schema";

export function Breadcrumbs({ items }: { items: BreadcrumbEntry[] }) {
  const withHome: BreadcrumbEntry[] = [{ name: "Home", path: "/" }, ...items];

  return (
    <>
      <JsonLd data={breadcrumbJsonLd(withHome)} />
      <Breadcrumb>
        <BreadcrumbList>
          {withHome.map((item, index) => {
            const isLast = index === withHome.length - 1;
            return (
              <span key={item.path} className="flex items-center gap-1.5">
                <BreadcrumbItem>
                  {isLast ? (
                    <BreadcrumbPage>{item.name}</BreadcrumbPage>
                  ) : (
                    <BreadcrumbLink render={<Link href={item.path} />}>{item.name}</BreadcrumbLink>
                  )}
                </BreadcrumbItem>
                {!isLast && <BreadcrumbSeparator />}
              </span>
            );
          })}
        </BreadcrumbList>
      </Breadcrumb>
    </>
  );
}
