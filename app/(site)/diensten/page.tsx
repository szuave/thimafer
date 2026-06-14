import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { PageHero } from "@/components/ui/page-hero";
import { Icon } from "@/components/icon";
import { services } from "@/lib/site";

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
          <div className="grid gap-px border border-ink/10 bg-ink/10 md:grid-cols-2">
            {services.map((s, i) => (
              <Link
                key={s.slug}
                href={`/diensten/${s.slug}`}
                data-reveal
                style={{ "--reveal-delay": `${(i % 2) * 80}ms` } as React.CSSProperties}
                className="group relative flex flex-col gap-5 bg-paper p-8 transition-colors duration-300 hover:bg-white lg:p-10"
              >
                <div className="flex items-start justify-between">
                  <Icon
                    name={s.icon}
                    className="h-10 w-10 text-forge"
                    strokeWidth={1.4}
                  />
                  <span className="font-mono text-xs tracking-[0.2em] text-ink/25">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <div>
                  <h2 className="text-3xl text-ink">{s.name}</h2>
                  <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.14em] text-forge">
                    {s.tagline}
                  </p>
                </div>
                <p className="text-base leading-relaxed text-steel-600">
                  {s.description}
                </p>
                <span className="mt-auto inline-flex items-center gap-2 pt-2 font-mono text-[11px] uppercase tracking-[0.16em] text-ink transition-colors group-hover:text-forge">
                  Meer over {s.name.toLowerCase()}
                  <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
