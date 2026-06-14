import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { PageHero } from "@/components/ui/page-hero";
import { Icon } from "@/components/icon";
import { applications, applicationImages } from "@/lib/site";

export const metadata: Metadata = pageMeta({
  title: "Toepassingen",
  description:
    "Maatwerk in staal voor particulieren, industrie en infrastructuur in Gent en Oost-Vlaanderen. Ontdek wat Thimafer voor uw sector kan betekenen.",
  path: "/toepassingen",
});

export default function ToepassingenPage() {
  return (
    <>
      <PageHero
        eyebrow="Toepassingen"
        title="Voor elke opdrachtgever"
        intro="Van particuliere woning tot industriële site en publieke ruimte — Thimafer levert maatwerk in staal voor elke context."
        crumbs={[{ label: "Toepassingen" }]}
      />

      <section className="bg-white py-20 lg:py-28">
        <div className="container-edge grid gap-6 lg:grid-cols-3">
          {applications.map((a, i) => (
            <Link
              key={a.slug}
              href={`/toepassingen/${a.slug}`}
              data-reveal
              style={{ "--reveal-delay": `${i * 70}ms` } as React.CSSProperties}
              className="group flex flex-col overflow-hidden rounded-[var(--radius-lg)] border border-line transition-colors hover:border-accent"
            >
              <div className="relative aspect-[16/10] overflow-hidden bg-mist">
                <Image
                  src={applicationImages[a.slug]}
                  alt={a.name}
                  fill
                  sizes="(max-width: 1024px) 100vw, 33vw"
                  className="object-cover transition-transform duration-500 ease-steel group-hover:scale-105"
                />
              </div>
              <div className="flex flex-1 flex-col p-7">
                <Icon name={a.icon} className="h-9 w-9 text-accent" strokeWidth={1.5} />
                <h2 className="mt-4 text-2xl text-ink">{a.name}</h2>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-steel-500">
                  {a.description}
                </p>
                <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-accent">
                  Ontdek meer
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
