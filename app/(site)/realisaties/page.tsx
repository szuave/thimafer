import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { PageHero } from "@/components/ui/page-hero";
import { getCategoriesOverview } from "@/lib/queries";

export const dynamic = "force-dynamic";

export const metadata: Metadata = pageMeta({
  title: "Realisaties",
  description:
    "Een greep uit onze realisaties in staal: trappen, leuningen, poorten, fietsenstallingen, staal- en gevelconstructies en stalen schrijnwerk — uitgevoerd in Gent en Oost-Vlaanderen.",
  path: "/realisaties",
});

export default async function RealisatiesPage() {
  const cats = await getCategoriesOverview();

  return (
    <>
      <PageHero
        eyebrow="/ Realisaties"
        title={
          <>
            Ons werk in <span className="text-forge">staal</span>
          </>
        }
        intro="Ontdek een selectie van onze projecten, overzichtelijk gerangschikt per categorie. Elke realisatie is volledig op maat ontworpen, geproduceerd en gemonteerd."
        crumbs={[{ label: "Realisaties" }]}
      />

      <section className="bg-paper py-20 lg:py-28">
        <div className="container-edge grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {cats.map((c, i) => (
            <Link
              key={c.id}
              href={`/realisaties/${c.slug}`}
              data-reveal
              style={{ "--reveal-delay": `${(i % 3) * 80}ms` } as React.CSSProperties}
              className="group relative overflow-hidden bg-ink"
            >
              <div className="relative aspect-[4/3] w-full overflow-hidden">
                <Image
                  src={c.coverImage ?? `/images/categories/${c.slug}.webp`}
                  alt={c.name}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover opacity-80 transition-all duration-700 ease-steel group-hover:scale-105 group-hover:opacity-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/30 to-transparent" />
              </div>
              <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-6">
                <div>
                  <span className="label-mono text-forge">
                    {c.projects.length} {c.projects.length === 1 ? "project" : "projecten"}
                  </span>
                  <h2 className="mt-1 text-2xl text-paper">{c.name}</h2>
                </div>
                <span className="grid h-11 w-11 shrink-0 place-items-center border border-white/30 text-white transition-colors group-hover:border-forge group-hover:bg-forge">
                  <ArrowUpRight className="h-5 w-5" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
