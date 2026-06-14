import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Check, ArrowUpRight } from "lucide-react";
import { PageHero } from "@/components/ui/page-hero";
import { Button } from "@/components/ui/button";
import { Icon } from "@/components/icon";
import {
  applications,
  applicationImages,
  applicationCategories,
  categories,
} from "@/lib/site";
import { pageMeta, applicationServiceSchema } from "@/lib/seo";
import { JsonLd } from "@/components/json-ld";

export function generateStaticParams() {
  return applications.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const app = applications.find((a) => a.slug === slug);
  if (!app) return {};
  return pageMeta({
    title: `Staal voor ${app.name.toLowerCase()}`,
    description: app.description,
    path: `/toepassingen/${slug}`,
    image: applicationImages[slug],
    imageAlt: `${app.name} — maatwerk in staal door Thimafer`,
  });
}

export default async function ApplicationDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const app = applications.find((a) => a.slug === slug);
  if (!app) notFound();

  const related = (applicationCategories[slug] ?? [])
    .map((cs) => categories.find((c) => c.slug === cs))
    .filter((c): c is (typeof categories)[number] => Boolean(c));

  return (
    <>
      <JsonLd schema={applicationServiceSchema(app)} />
      <PageHero
        eyebrow="/ Toepassing"
        title={app.name}
        intro={app.description}
        crumbs={[
          { label: "Toepassingen", href: "/toepassingen" },
          { label: app.name },
        ]}
      />

      <section className="bg-paper py-20 lg:py-28">
        <div className="container-edge grid items-start gap-14 lg:grid-cols-2">
          <div data-reveal className="relative">
            <div className="ticks relative aspect-[4/3] overflow-hidden">
              <Image
                src={applicationImages[slug]}
                alt={app.name}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
            <div className="absolute -bottom-5 -left-2 hidden bg-forge p-5 sm:block">
              <Icon name={app.icon} className="h-8 w-8 text-white" strokeWidth={1.5} />
            </div>
          </div>

          <div data-reveal style={{ "--reveal-delay": "120ms" } as React.CSSProperties}>
            <h2 className="text-3xl text-ink sm:text-4xl">Wat we leveren</h2>
            <p className="mt-4 text-base leading-relaxed text-steel-600">
              {app.description}
            </p>
            <ul className="mt-7 space-y-3">
              {app.points.map((p) => (
                <li key={p} className="flex items-start gap-3">
                  <Check className="mt-0.5 h-5 w-5 shrink-0 text-forge" />
                  <span className="text-ink">{p}</span>
                </li>
              ))}
            </ul>
            <div className="mt-9">
              <Button href="/offerte" variant="primary">
                Bespreek uw project
              </Button>
            </div>
          </div>
        </div>

        {/* Related categories */}
        {related.length > 0 && (
          <div className="container-edge mt-24">
            <h3 className="label-mono text-steel-500">Relevante realisaties</h3>
            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {related.map((c) => (
                <Link
                  key={c.slug}
                  href={`/realisaties/${c.slug}`}
                  className="group relative aspect-[4/3] overflow-hidden bg-ink"
                >
                  <Image
                    src={`/images/categories/${c.slug}.webp`}
                    alt={c.name}
                    fill
                    sizes="(max-width: 640px) 100vw, 25vw"
                    className="object-cover opacity-75 transition-all duration-500 group-hover:scale-105 group-hover:opacity-100"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 flex items-center justify-between p-4">
                    <span className="font-display text-lg uppercase text-paper">
                      {c.name}
                    </span>
                    <ArrowUpRight className="h-4 w-4 text-forge" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </section>
    </>
  );
}
