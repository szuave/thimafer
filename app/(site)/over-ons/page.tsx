import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import Image from "next/image";
import { Target, Eye, Handshake, Recycle, Check } from "lucide-react";
import { PageHero } from "@/components/ui/page-hero";
import { SectionHeading } from "@/components/ui/section-heading";
import { Button } from "@/components/ui/button";
import { certifications } from "@/lib/site";

export const metadata: Metadata = pageMeta({
  title: "Over ons",
  description:
    "Thimafer is uw partner in maatwerk staal in Gent en Oost-Vlaanderen. Ontdek wie we zijn, waar we voor staan en hoe we elk project van tekening tot montage in eigen hand nemen.",
  path: "/over-ons",
});

const values = [
  {
    icon: Target,
    title: "Vakmanschap",
    text: "Elk lasnaad, elke plooi en elke verbinding wordt met zorg en precisie uitgevoerd.",
  },
  {
    icon: Eye,
    title: "Transparantie",
    text: "Duidelijke afspraken en eerlijke offertes — u weet altijd waar u aan toe bent.",
  },
  {
    icon: Handshake,
    title: "Betrouwbaar",
    text: "We komen onze afspraken na, respecteren de planning en blijven beschikbaar na oplevering.",
  },
  {
    icon: Recycle,
    title: "Duurzaam",
    text: "Staal is 100% recycleerbaar. We bouwen constructies die generaties lang meegaan.",
  },
];

export default function OverOnsPage() {
  return (
    <>
      <PageHero
        eyebrow="/ Over Thimafer"
        title={
          <>
            Belgisch vakmanschap <span className="text-forge">in staal</span>
          </>
        }
        intro="Van een idee op papier tot een afgewerkte constructie op de werf — bij Thimafer houden we het volledige traject in eigen hand."
        crumbs={[{ label: "Over ons" }]}
      />

      {/* Story */}
      <section className="bg-paper py-24 lg:py-32">
        <div className="container-edge grid items-center gap-14 lg:grid-cols-2">
          <div data-reveal className="relative order-2 lg:order-1">
            <div className="relative aspect-[4/3] overflow-hidden rounded-[var(--radius-lg)] bg-mist">
              <Image
                src="/images/feature/over-ons.webp"
                alt="Stalen trap door Thimafer"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-contain"
              />
            </div>
          </div>
          <div data-reveal className="order-1 lg:order-2">
            <SectionHeading
              eyebrow="/ Wie we zijn"
              title="Staal met karakter, gemaakt om te blijven"
            />
            <div className="mt-6 space-y-4 text-base leading-relaxed text-steel-600">
              <p>
                Thimafer is gespecialiseerd in maatwerk in staal. We combineren
                vakkennis van metaalbewerking met modern tekenwerk en een eigen
                montageteam. Zo leveren we projecten af die kloppen — technisch
                én esthetisch.
              </p>
              <p>
                Of het nu gaat om een strakke binnentrap voor een particulier,
                een robuuste staalconstructie voor de industrie of een
                gevelconstructie voor de publieke ruimte: we benaderen elk
                project met dezelfde toewijding en oog voor detail.
              </p>
              <p>
                Door alles in eigen beheer te doen — van engineering tot
                afwerking en plaatsing — houden we de kwaliteit, de planning en
                de communicatie volledig in eigen hand.
              </p>
            </div>
            <div className="mt-8">
              <Button href="/realisaties" variant="outline">
                Bekijk onze realisaties
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-white py-20 lg:py-28">
        <div className="container-edge">
          <SectionHeading
            align="center"
            eyebrow="Waar we voor staan"
            title="Onze waarden"
            className="mx-auto items-center"
          />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((v) => (
              <div
                key={v.title}
                data-reveal
                className="rounded-[var(--radius-lg)] border border-line bg-white p-7"
              >
                <v.icon className="h-8 w-8 text-accent" strokeWidth={1.5} />
                <h3 className="mt-5 text-xl text-ink">{v.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-steel-500">
                  {v.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications band */}
      <section className="bg-white py-16">
        <div className="container-edge grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {certifications.map((c) => (
            <div key={c} className="flex items-center gap-3">
              <Check className="h-5 w-5 shrink-0 text-accent" />
              <p className="text-base font-medium text-ink">{c}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
