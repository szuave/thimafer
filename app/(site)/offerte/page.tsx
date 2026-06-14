import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import { Phone, Mail, FileText, Ruler, Send } from "lucide-react";
import { PageHero } from "@/components/ui/page-hero";
import { OfferteForm } from "@/components/offerte-form";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = pageMeta({
  title: "Offerte aanvragen",
  description:
    "Vraag vrijblijvend een offerte aan voor uw project in staal. Vertel ons wat u wenst en u ontvangt snel een duidelijk voorstel.",
  path: "/offerte",
});

const steps = [
  { icon: Send, title: "1. Uw aanvraag", text: "U beschrijft uw project via het formulier. Hoe meer details, hoe gerichter ons voorstel." },
  { icon: Ruler, title: "2. Opmeting & advies", text: "Indien nodig komen we ter plaatse opmeten en denken we mee over de beste aanpak." },
  { icon: FileText, title: "3. Uw offerte", text: "U ontvangt een duidelijke, vrijblijvende offerte — zonder verrassingen." },
];

export default function OffertePage() {
  return (
    <>
      <PageHero
        eyebrow="Offerte aanvragen"
        title={
          <>
            Vraag vrijblijvend <span className="text-accent">uw offerte</span> aan
          </>
        }
        intro="Vertel ons over uw project in staal — trap, leuning, poort, constructie of schrijnwerk — en u ontvangt snel een duidelijk voorstel op maat."
        crumbs={[{ label: "Offerte aanvragen" }]}
      />

      <section className="bg-white py-20 lg:py-28">
        <div className="container-edge grid gap-14 lg:grid-cols-[0.85fr_1.15fr]">
          {/* Info */}
          <div data-reveal>
            <h2 className="text-3xl text-ink sm:text-4xl">Zo werkt het</h2>
            <ul className="mt-8 space-y-7">
              {steps.map((s) => (
                <li key={s.title} className="flex gap-4">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-[var(--radius)] bg-accent-soft text-accent">
                    <s.icon className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="font-semibold text-ink">{s.title}</p>
                    <p className="mt-1 text-sm leading-relaxed text-steel-500">{s.text}</p>
                  </div>
                </li>
              ))}
            </ul>

            <div className="mt-10 rounded-[var(--radius-lg)] border border-line bg-mist/40 p-6">
              <p className="text-sm text-steel-600">Liever rechtstreeks contact?</p>
              <a href={`tel:${siteConfig.contact.phoneHref}`} className="mt-2 flex items-center gap-2 font-semibold text-ink transition-colors hover:text-accent">
                <Phone className="h-4 w-4 text-accent" />
                {siteConfig.contact.phone}
              </a>
              <a href={`mailto:${siteConfig.contact.email}`} className="mt-1 flex items-center gap-2 text-sm text-steel-600 transition-colors hover:text-accent">
                <Mail className="h-4 w-4 text-accent" />
                {siteConfig.contact.email}
              </a>
            </div>
          </div>

          {/* Form */}
          <div data-reveal style={{ "--reveal-delay": "120ms" } as React.CSSProperties}>
            <div className="rounded-[var(--radius-lg)] border border-line p-8 lg:p-10">
              <h2 className="text-3xl text-ink sm:text-4xl">Uw projectgegevens</h2>
              <p className="mt-2 mb-8 text-steel-600">Vul in en we nemen snel contact op.</p>
              <OfferteForm />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
