import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Check, ArrowRight } from "lucide-react";
import { PageHero } from "@/components/ui/page-hero";
import { Button } from "@/components/ui/button";
import { Icon } from "@/components/icon";
import { services, serviceImages, serviceIntros } from "@/lib/site";
import { pageMeta, serviceSchema } from "@/lib/seo";
import { JsonLd } from "@/components/json-ld";

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = services.find((s) => s.slug === slug);
  if (!service) return {};
  return pageMeta({
    title: service.name,
    description: service.description,
    path: `/diensten/${slug}`,
    image: serviceImages[slug],
    imageAlt: `${service.name} — Thimafer`,
  });
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = services.find((s) => s.slug === slug);
  if (!service) notFound();

  const others = services.filter((s) => s.slug !== slug);

  return (
    <>
      <JsonLd schema={serviceSchema(service)} />
      <PageHero
        eyebrow={`Dienst — ${service.tagline}`}
        title={service.name}
        intro={service.description}
        crumbs={[{ label: "Diensten", href: "/diensten" }, { label: service.name }]}
      />

      <section className="bg-white py-20 lg:py-28">
        <div className="container-edge grid gap-14 lg:grid-cols-[1.1fr_0.9fr]">
          <div data-reveal>
            <div className="flex items-center gap-4">
              <span className="grid h-14 w-14 place-items-center rounded-[var(--radius)] bg-accent-soft text-accent">
                <Icon name={service.icon} className="h-7 w-7" strokeWidth={1.5} />
              </span>
              <p className="eyebrow text-steel-500">{service.tagline}</p>
            </div>

            <h2 className="mt-8 text-3xl text-ink sm:text-4xl">Wat we voor u doen</h2>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-steel-600">
              {service.description} Vraag vrijblijvend advies — we denken graag
              met u mee over de beste aanpak, materialen en afwerking.
            </p>
            {serviceIntros[slug] && (
              <p className="mt-4 max-w-xl text-base leading-relaxed text-steel-600">
                {serviceIntros[slug]}
              </p>
            )}

            <ul className="mt-8 grid gap-3 sm:grid-cols-2">
              {service.points.map((p) => (
                <li
                  key={p}
                  className="flex items-start gap-3 rounded-[var(--radius)] border border-line bg-white px-5 py-4"
                >
                  <Check className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
                  <span className="text-sm text-ink">{p}</span>
                </li>
              ))}
            </ul>

            <div className="mt-10 flex flex-wrap gap-3">
              <Button href="/offerte" variant="primary">
                Offerte aanvragen
              </Button>
              <Button href="/realisaties" variant="outline">
                Bekijk realisaties
              </Button>
            </div>
          </div>

          <div data-reveal>
            <div className="relative aspect-[4/3] overflow-hidden rounded-[var(--radius-lg)] bg-mist">
              <Image
                src={serviceImages[slug]}
                alt={`${service.name} door Thimafer`}
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover"
              />
            </div>

            <div className="mt-8 rounded-[var(--radius-lg)] border border-line bg-white p-6">
              <h3 className="eyebrow text-steel-500">Andere diensten</h3>
              <ul className="mt-4 divide-y divide-line">
                {others.map((o) => (
                  <li key={o.slug}>
                    <Link
                      href={`/diensten/${o.slug}`}
                      className="group flex items-center justify-between py-3 text-ink transition-colors hover:text-accent"
                    >
                      <span className="font-medium">{o.name}</span>
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
