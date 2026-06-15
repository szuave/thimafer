import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, ArrowRight } from "lucide-react";
import { PageHero } from "@/components/ui/page-hero";
import { Icon } from "@/components/icon";
import { services, serviceImages } from "@/lib/site";

export const metadata: Metadata = pageMeta({
  title: "Diensten",
  description:
    "Lassen, lasersnijden, plooien, montage, herstellingen, onderhoud en tekenwerk — alle metaalbewerking onder één dak bij Thimafer in Gent en Oost-Vlaanderen.",
  path: "/diensten",
});

export default function DienstenPage() {
  return (
    <>
      <PageHero
        eyebrow="/ Onze diensten"
        title={
          <>
            Van plaat <span className="text-forge">tot plaatsing</span>
          </>
        }
        intro="Zeven specialisaties onder één dak. Zo houden we de volledige kwaliteit, planning en afwerking in eigen hand."
        crumbs={[{ label: "Diensten" }]}
      />

      <section className="bg-paper py-20 lg:py-28">
        <div className="container-edge">
          <div className="grid gap-6 md:grid-cols-2 lg:gap-7">
            {services.map((s, i) => (
              <Link
                key={s.slug}
                href={`/diensten/${s.slug}`}
                data-reveal
                style={{ "--reveal-delay": `${(i % 2) * 80}ms` } as React.CSSProperties}
                className="group flex flex-col overflow-hidden rounded-[var(--radius-lg)] border border-line bg-white transition-colors duration-300 hover:border-accent"
              >
                <div className="relative aspect-[16/10] overflow-hidden bg-ink">
                  <Image
                    src={serviceImages[s.slug]}
                    alt={`${s.name} door Thimafer`}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover transition-transform duration-700 ease-steel group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-transparent" />
                  <h2 className="absolute inset-x-6 bottom-5 text-2xl font-bold text-white">
                    {s.name}
                  </h2>
                </div>
                <div className="flex flex-1 flex-col p-7">
                  <p className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-accent">
                    <Icon name={s.icon} className="h-4 w-4" strokeWidth={1.6} />
                    {s.tagline}
                  </p>
                  <p className="mt-3 flex-1 text-[15px] leading-relaxed text-steel-600">
                    {s.description}
                  </p>
                  <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-ink transition-colors group-hover:text-accent">
                    Meer over {s.name.toLowerCase()}
                    <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </span>
                </div>
              </Link>
            ))}

            {/* Offerte-CTA sluit het raster af (8e tegel) */}
            <Link
              href="/offerte"
              data-reveal
              className="group flex flex-col justify-center gap-4 rounded-[var(--radius-lg)] bg-accent p-8 text-white lg:p-10"
            >
              <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-white/70">
                Vrijblijvend
              </span>
              <h2 className="text-3xl font-bold leading-snug">
                Klaar om uw project in staal te starten?
              </h2>
              <p className="text-white/85">
                Vertel ons wat u wilt laten maken — u ontvangt snel een duidelijke
                offerte, zonder verrassingen.
              </p>
              <span className="mt-2 inline-flex items-center gap-2 font-semibold">
                Offerte aanvragen
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </span>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
