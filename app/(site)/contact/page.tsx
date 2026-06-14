import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import { PageHero } from "@/components/ui/page-hero";
import { ContactForm } from "@/components/contact-form";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = pageMeta({
  title: "Contact",
  description:
    "Vraag vrijblijvend een offerte aan of stel uw vraag. Thimafer staat klaar voor uw project in staal in Gent en Oost-Vlaanderen.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="/ Contact"
        title={
          <>
            Laten we <span className="text-forge">samenwerken</span>
          </>
        }
        intro="Een idee, een plan of een vraag? Vul het formulier in of bel ons rechtstreeks. We helpen u graag verder."
        crumbs={[{ label: "Contact" }]}
      />

      <section className="bg-paper py-20 lg:py-28">
        <div className="container-edge grid gap-14 lg:grid-cols-[0.85fr_1.15fr]">
          {/* Info */}
          <div data-reveal>
            <h2 className="text-3xl text-ink sm:text-4xl">Contactgegevens</h2>
            <p className="mt-3 max-w-sm text-steel-600">
              Bereikbaar op werkdagen. Voor offertes vermeldt u best zoveel
              mogelijk details over uw project.
            </p>

            <ul className="mt-8 space-y-5">
              <li className="flex gap-4">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-[var(--radius)] bg-accent-soft text-accent">
                  <MapPin className="h-5 w-5" />
                </span>
                <div>
                  <p className="label-mono text-steel-500">Regio</p>
                  <p className="mt-1 text-ink">
                    {siteConfig.contact.addressLine}
                    <br />
                    {siteConfig.contact.postalCity}
                  </p>
                </div>
              </li>
              <li className="flex gap-4">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-[var(--radius)] bg-accent-soft text-accent">
                  <Phone className="h-5 w-5" />
                </span>
                <div>
                  <p className="label-mono text-steel-500">Telefoon</p>
                  <a
                    href={`tel:${siteConfig.contact.phoneHref}`}
                    className="mt-1 block text-ink transition-colors hover:text-forge"
                  >
                    {siteConfig.contact.phone}
                  </a>
                </div>
              </li>
              <li className="flex gap-4">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-[var(--radius)] bg-accent-soft text-accent">
                  <Mail className="h-5 w-5" />
                </span>
                <div>
                  <p className="label-mono text-steel-500">E-mail</p>
                  <a
                    href={`mailto:${siteConfig.contact.email}`}
                    className="mt-1 block text-ink transition-colors hover:text-forge"
                  >
                    {siteConfig.contact.email}
                  </a>
                </div>
              </li>
              <li className="flex gap-4">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-[var(--radius)] bg-accent-soft text-accent">
                  <Clock className="h-5 w-5" />
                </span>
                <div>
                  <p className="label-mono text-steel-500">Openingsuren</p>
                  <p className="mt-1 text-ink">{siteConfig.contact.hours}</p>
                </div>
              </li>
            </ul>

            <div className="ticks relative mt-10 aspect-[4/3] overflow-hidden border border-ink/10">
              <iframe
                title="Locatie Thimafer"
                src="https://www.openstreetmap.org/export/embed.html?bbox=3.66%2C51.02%2C3.78%2C51.08&layer=mapnik&marker=51.0543%2C3.7257"
                className="h-full w-full grayscale"
                loading="lazy"
              />
            </div>
          </div>

          {/* Form */}
          <div data-reveal style={{ "--reveal-delay": "120ms" } as React.CSSProperties}>
            <div className="border border-ink/10 bg-paper-2/40 p-8 lg:p-10">
              <h2 className="text-3xl text-ink sm:text-4xl">Stuur een bericht</h2>
              <p className="mt-2 mb-8 text-steel-600">
                We antwoorden meestal binnen één werkdag.
              </p>
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
