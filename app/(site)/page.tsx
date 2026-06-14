import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Check, Phone, Mail, ChevronRight } from "lucide-react";
import { ImageSlideshow } from "@/components/image-slideshow";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/ui/section-heading";
import { Icon } from "@/components/icon";
import {
  siteConfig,
  services,
  categories,
  applications,
  applicationImages,
  serviceImages,
  processSteps,
  certifications,
  faqs,
} from "@/lib/site";
import { Faq } from "@/components/faq";

const slides = [
  { src: "/images/banners/banner-01.webp", alt: "Stalen hekwerk op maat" },
  { src: "/images/banners/banner-02.webp", alt: "Staalconstructie" },
  { src: "/images/banners/banner-03.webp", alt: "Stalen leuning" },
  { src: "/images/banners/banner-04.webp", alt: "Lassen en metaalbewerking" },
  { src: "/images/banners/banner-05.webp", alt: "Tekenwerk en engineering" },
];

export default function HomePage() {
  return (
    <>
      {/* ───────── Hero ───────── */}
      <section className="bg-white">
        <div className="container-edge grid items-center gap-10 py-14 lg:grid-cols-2 lg:gap-16 lg:py-20">
          <div data-reveal>
            <span className="inline-flex items-center gap-2.5 text-sm font-semibold uppercase tracking-[0.12em] text-accent">
              <span className="h-px w-7 bg-accent" />
              Maatwerk in staal · Regio Gent
            </span>
            <h1 className="mt-5 text-4xl leading-[1.04] text-ink sm:text-5xl lg:text-6xl">
              Where Steel Takes Shape
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-steel-600">
              {siteConfig.tagline}
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Button href="/realisaties" variant="primary">
                Bekijk realisaties
              </Button>
              <a
                href={`tel:${siteConfig.contact.phoneHref}`}
                className="inline-flex items-center gap-2.5 rounded-[var(--radius)] border border-line px-6 py-3 text-sm font-medium text-ink transition-colors hover:border-accent hover:text-accent"
              >
                <Phone className="h-4 w-4 text-accent" />
                {siteConfig.contact.phone}
              </a>
            </div>
          </div>
          <div data-reveal className="relative">
            <ImageSlideshow
              images={slides}
              className="aspect-[4/3] w-full rounded-[var(--radius-lg)]"
            />
          </div>
        </div>
      </section>

      {/* ───────── Diensten ───────── */}
      <section className="bg-white py-24 lg:py-32">
        <div className="container-edge">
          <SectionHeading
            eyebrow="Onze diensten"
            title="Van plaat tot plaatsing"
            intro="Zeven specialisaties onder één dak — zo houden we de volledige kwaliteit en planning in eigen hand."
          />

          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {services.map((s) => (
              <Link
                key={s.slug}
                href={`/diensten/${s.slug}`}
                data-reveal
                className="group relative block aspect-[4/3] overflow-hidden rounded-[var(--radius)] bg-ink"
              >
                <Image
                  src={serviceImages[s.slug]}
                  alt={s.name}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover opacity-90 transition-transform duration-700 ease-steel group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 flex items-center justify-between p-5">
                  <h3 className="text-lg font-bold text-white">{s.name}</h3>
                  <span className="grid h-9 w-9 place-items-center rounded-full bg-white/15 text-white transition-colors group-hover:bg-accent">
                    <ChevronRight className="h-5 w-5" />
                  </span>
                </div>
              </Link>
            ))}

            {/* Alle diensten CTA tile */}
            <Link
              href="/diensten"
              className="group flex flex-col justify-between rounded-[var(--radius)] bg-accent p-6 text-white"
            >
              <span className="text-xl font-bold leading-snug">
                Alle diensten
                <br />
                in één oogopslag
              </span>
              <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold">
                Bekijk het overzicht
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* ───────── Over ons ───────── */}
      <section className="bg-white py-24 lg:py-32">
        <div className="container-edge grid items-center gap-16 lg:grid-cols-2">
          <div data-reveal className="relative aspect-[4/3] overflow-hidden rounded-[var(--radius-lg)] bg-mist">
            <Image
              src="/images/feature/over-ons.webp"
              alt="Stalen trap door Thimafer"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-contain"
            />
          </div>
          <div data-reveal>
            <SectionHeading
              eyebrow="Over Thimafer"
              title="Vakmanschap dat vorm krijgt in staal"
              intro="Van het eerste tekenwerk tot de montage op de werf nemen we elk project volledig in eigen hand — nauwkeurig, betrouwbaar en strak afgewerkt."
            />
            <ul className="mt-8 grid gap-3.5 sm:grid-cols-2">
              {certifications.map((c) => (
                <li key={c} className="flex items-center gap-2.5 text-[15px] text-steel-600">
                  <Check className="h-4 w-4 shrink-0 text-accent" />
                  {c}
                </li>
              ))}
            </ul>
            <div className="mt-9">
              <Button href="/over-ons" variant="outline">
                Meer over ons
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* ───────── Realisaties ───────── */}
      <section className="bg-white py-24 lg:py-32">
        <div className="container-edge">
          <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
            <SectionHeading eyebrow="Realisaties" title="Ons werk, per categorie" />
            <Button href="/realisaties" variant="outline">
              Alle realisaties
            </Button>
          </div>

          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {categories.map((c) => (
              <Link
                key={c.slug}
                href={`/realisaties/${c.slug}`}
                data-reveal
                className="group relative block aspect-[4/3] overflow-hidden rounded-[var(--radius)] bg-ink"
              >
                <Image
                  src={`/images/categories/${c.slug}.webp`}
                  alt={c.name}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover opacity-90 transition-transform duration-700 ease-steel group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 flex items-center justify-between p-5">
                  <h3 className="text-lg font-bold text-white">{c.name}</h3>
                  <span className="grid h-9 w-9 place-items-center rounded-full bg-white/15 text-white transition-colors group-hover:bg-accent">
                    <ChevronRight className="h-5 w-5" />
                  </span>
                </div>
              </Link>
            ))}

            {/* Dark contact card */}
            <div className="flex flex-col justify-between rounded-[var(--radius)] bg-ink p-6 text-white">
              <div>
                <h3 className="text-xl font-bold">Vragen over uw project?</h3>
                <p className="mt-2 text-sm leading-relaxed text-steel-300">
                  Bel of mail ons — we denken graag met u mee en maken
                  vrijblijvend een offerte.
                </p>
              </div>
              <div className="mt-6 space-y-2 text-sm">
                <a href={`tel:${siteConfig.contact.phoneHref}`} className="flex items-center gap-2.5 font-semibold transition-colors hover:text-accent">
                  <Phone className="h-4 w-4 text-accent" />
                  {siteConfig.contact.phone}
                </a>
                <a href={`mailto:${siteConfig.contact.email}`} className="flex items-center gap-2.5 text-steel-300 transition-colors hover:text-white">
                  <Mail className="h-4 w-4 text-accent" />
                  {siteConfig.contact.email}
                </a>
              </div>
              <Link
                href="/offerte"
                className="mt-6 inline-flex items-center justify-center gap-2 rounded-[var(--radius)] bg-accent px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-[var(--color-accent-dark)]"
              >
                Offerte aanvragen
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ───────── Belofte (anthracite) ───────── */}
      <section className="bg-ink py-24 text-white lg:py-32">
        <div className="container-edge grid gap-12 lg:grid-cols-2 lg:items-center">
          <div data-reveal>
            <span className="inline-flex items-center gap-2.5 text-sm font-semibold uppercase tracking-[0.12em] text-accent">
              <span className="h-px w-7 bg-accent" />
              Onze belofte
            </span>
            <h2 className="mt-5 max-w-xl text-3xl leading-tight text-white sm:text-4xl lg:text-5xl">
              Eén partner, van eerste tekening tot montage op de werf.
            </h2>
          </div>
          <div data-reveal>
            <p className="text-lg leading-relaxed text-steel-300">
              We doen alles in eigen beheer — engineering, productie, afwerking
              en plaatsing. Zo blijft de kwaliteit hoog, de planning strak en de
              communicatie kort. U heeft één aanspreekpunt voor het hele project.
            </p>
            <ul className="mt-7 grid gap-3 sm:grid-cols-2">
              {certifications.map((c) => (
                <li key={c} className="flex items-center gap-2.5 text-[15px] text-white">
                  <Check className="h-4 w-4 shrink-0 text-accent" />
                  {c}
                </li>
              ))}
            </ul>
            <div className="mt-9">
              <Button href="/werkwijze" variant="light">
                Onze werkwijze
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* ───────── Werkwijze ───────── */}
      <section className="bg-white py-24 lg:py-32">
        <div className="container-edge">
          <SectionHeading
            eyebrow="Werkwijze"
            title="Van eerste contact tot oplevering"
            intro="Een transparant traject in zeven stappen — zo weet u altijd waar u aan toe bent."
          />
          <div className="mt-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
            {processSteps.slice(0, 4).map((step) => (
              <div key={step.n} data-reveal className="border-t-2 border-accent pt-5">
                <span className="font-display text-4xl font-bold text-ink">{step.n}</span>
                <h3 className="mt-3 text-lg text-ink">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-steel-500">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
          <div className="mt-12">
            <Button href="/werkwijze" variant="outline">
              Bekijk de volledige werkwijze
            </Button>
          </div>
        </div>
      </section>

      {/* ───────── Toepassingen ───────── */}
      <section className="bg-white py-24 lg:py-32">
        <div className="container-edge">
          <SectionHeading
            eyebrow="Toepassingen"
            title="Voor wie we bouwen"
            align="center"
            className="mx-auto items-center"
          />
          <div className="mt-14 grid gap-7 md:grid-cols-3">
            {applications.map((a) => (
              <Link
                key={a.slug}
                href={`/toepassingen/${a.slug}`}
                data-reveal
                className="group flex flex-col overflow-hidden rounded-[var(--radius-lg)] border border-line bg-white transition-colors hover:border-accent"
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image
                    src={applicationImages[a.slug]}
                    alt={a.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transition-transform duration-700 ease-steel group-hover:scale-105"
                  />
                </div>
                <div className="flex flex-1 flex-col p-7">
                  <h3 className="text-xl text-ink">{a.name}</h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-steel-500">
                    {a.description}
                  </p>
                  <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-accent">
                    Ontdek meer
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ───────── FAQ ───────── */}
      <section className="bg-white pb-24 lg:pb-32">
        <div className="container-edge grid gap-10 lg:grid-cols-12">
          <div data-reveal className="lg:col-span-4">
            <SectionHeading
              eyebrow="Veelgestelde vragen"
              title="Goed om te weten"
            />
            <p className="mt-5 text-steel-600">
              Staat uw vraag er niet bij?{" "}
              <Link href="/contact" className="font-medium text-accent hover:underline">
                Neem gerust contact op
              </Link>{" "}
              — we helpen u graag verder.
            </p>
          </div>
          <div data-reveal className="lg:col-span-8">
            <Faq items={faqs} />
          </div>
        </div>
      </section>
    </>
  );
}
