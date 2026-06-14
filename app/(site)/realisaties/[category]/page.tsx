import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowRight, MapPin } from "lucide-react";
import { PageHero } from "@/components/ui/page-hero";
import { getCategoryWithProjects } from "@/lib/queries";
import { pageMeta } from "@/lib/seo";
import { categoryCopy } from "@/lib/site";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string }>;
}): Promise<Metadata> {
  const { category } = await params;
  const cat = await getCategoryWithProjects(category);
  if (!cat) return {};
  return pageMeta({
    title: `${cat.name} — Realisaties`,
    description:
      cat.description ??
      `Realisaties in de categorie ${cat.name.toLowerCase()} — maatwerk in staal door Thimafer in Gent en Oost-Vlaanderen.`,
    path: `/realisaties/${cat.slug}`,
    image: cat.coverImage,
    imageAlt: `${cat.name} — realisaties van Thimafer`,
  });
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;
  const cat = await getCategoryWithProjects(category);
  if (!cat) notFound();

  return (
    <>
      <PageHero
        eyebrow="Realisaties"
        title={cat.name}
        intro={cat.description ?? undefined}
        crumbs={[
          { label: "Realisaties", href: "/realisaties" },
          { label: cat.name },
        ]}
      />

      <section className="bg-white py-20 lg:py-28">
        <div className="container-edge">
          {categoryCopy[cat.slug] && (
            <p className="mb-12 max-w-3xl text-lg leading-relaxed text-steel-600">
              {categoryCopy[cat.slug]}
            </p>
          )}
          {cat.projects.length === 0 ? (
            <p className="text-steel-500">
              Binnenkort tonen we hier onze realisaties in deze categorie.
            </p>
          ) : (
            <div className="grid gap-x-7 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
              {cat.projects.map((p) => (
                <Link
                  key={p.id}
                  href={`/realisaties/${cat.slug}/${p.slug}`}
                  data-reveal
                  className="group"
                >
                  <div className="relative aspect-[4/3] overflow-hidden rounded-[var(--radius-lg)] bg-mist">
                    <Image
                      src={p.coverImage ?? `/images/categories/${cat.slug}.webp`}
                      alt={p.title}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover transition-transform duration-700 ease-steel group-hover:scale-105"
                    />
                  </div>
                  <div className="mt-5 flex items-start justify-between gap-3">
                    <div>
                      <h2 className="text-lg text-ink transition-colors group-hover:text-accent">
                        {p.title}
                      </h2>
                      {p.location && (
                        <span className="mt-1 flex items-center gap-1.5 text-sm text-steel-500">
                          <MapPin className="h-3.5 w-3.5 text-accent" />
                          {p.location}
                        </span>
                      )}
                    </div>
                    <span className="mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-full border border-line text-steel-400 transition-colors group-hover:border-accent group-hover:bg-accent group-hover:text-white">
                      <ArrowRight className="h-4 w-4" />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
