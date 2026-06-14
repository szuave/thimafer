import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { Eyebrow } from "./section-heading";
import { JsonLd } from "@/components/json-ld";
import { breadcrumbList } from "@/lib/seo";

export type Crumb = { label: string; href?: string };

export function PageHero({
  eyebrow,
  title,
  intro,
  crumbs = [],
}: {
  eyebrow?: string;
  title: React.ReactNode;
  intro?: React.ReactNode;
  crumbs?: Crumb[];
}) {
  return (
    <section className="border-b border-line bg-white">
      {crumbs.length > 0 && (
        <JsonLd
          schema={breadcrumbList([
            { name: "Home", path: "/" },
            ...crumbs.map((c) => ({ name: c.label, path: c.href })),
          ])}
        />
      )}
      <div className="container-edge pb-14 pt-32 lg:pb-16 lg:pt-40">
        <nav aria-label="Kruimelpad" className="flex items-center gap-2 text-sm text-steel-400">
          <Link href="/" className="transition-colors hover:text-accent">
            Home
          </Link>
          {crumbs.map((c) => (
            <span key={c.label} className="flex items-center gap-2">
              <ChevronRight className="h-3.5 w-3.5 text-steel-300" />
              {c.href ? (
                <Link href={c.href} className="transition-colors hover:text-accent">
                  {c.label}
                </Link>
              ) : (
                <span className="text-steel-500">{c.label}</span>
              )}
            </span>
          ))}
        </nav>

        {eyebrow && (
          <div className="mt-7">
            <Eyebrow>{eyebrow}</Eyebrow>
          </div>
        )}

        <h1 className="mt-4 max-w-4xl text-4xl sm:text-5xl lg:text-6xl">
          {title}
        </h1>

        {intro && (
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-steel-500">
            {intro}
          </p>
        )}
      </div>
    </section>
  );
}
