import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import { PageHero } from "@/components/ui/page-hero";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = pageMeta({
  title: "Privacybeleid",
  description: "Hoe Thimafer omgaat met uw persoonsgegevens (GDPR).",
  path: "/privacy",
});

export default function PrivacyPage() {
  return (
    <>
      <PageHero
        eyebrow="/ Juridisch"
        title="Privacybeleid"
        intro="Thimafer hecht belang aan uw privacy. Hieronder leest u hoe we omgaan met uw persoonsgegevens."
        crumbs={[{ label: "Privacybeleid" }]}
      />
      <section className="bg-paper py-20">
        <div className="container-edge max-w-3xl space-y-8 text-steel-700">
          <p className="rounded-none border-l-2 border-forge bg-white px-5 py-4 text-sm text-steel-600">
            <strong className="text-ink">Let op:</strong> dit is een sjabloon.
            Laat het nakijken en aanvullen door {siteConfig.legalName} vóór
            publicatie.
          </p>

          <Block title="1. Verwerkingsverantwoordelijke">
            {siteConfig.legalName}, {siteConfig.contact.addressLine},{" "}
            {siteConfig.contact.postalCity}, is verantwoordelijk voor de
            verwerking van persoonsgegevens zoals beschreven in dit beleid. U
            kan ons bereiken via {siteConfig.contact.email}.
          </Block>

          <Block title="2. Welke gegevens we verzamelen">
            We verzamelen de gegevens die u zelf meedeelt via het
            contactformulier (naam, e-mailadres, telefoonnummer en de inhoud van
            uw bericht), alsook technische gegevens via onze hosting voor
            beveiliging en statistieken.
          </Block>

          <Block title="3. Waarvoor we uw gegevens gebruiken">
            Uw gegevens worden uitsluitend gebruikt om uw aanvraag te
            behandelen, u een offerte te bezorgen en met u te communiceren over
            uw project. We verkopen uw gegevens nooit aan derden.
          </Block>

          <Block title="4. Bewaartermijn">
            We bewaren uw gegevens niet langer dan nodig voor de doeleinden
            waarvoor ze werden verzameld, of zolang als wettelijk vereist.
          </Block>

          <Block title="5. Uw rechten">
            U heeft het recht om uw gegevens in te kijken, te laten verbeteren of
            te laten verwijderen. Stuur hiervoor een e-mail naar{" "}
            {siteConfig.contact.email}.
          </Block>

          <Block title="6. Cookies">
            Deze website gebruikt enkel functionele cookies die noodzakelijk zijn
            voor de werking van de site. Er worden geen tracking-cookies geplaatst
            zonder uw toestemming.
          </Block>
        </div>
      </section>
    </>
  );
}

function Block({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h2 className="font-display text-2xl uppercase text-ink">{title}</h2>
      <p className="mt-3 leading-relaxed">{children}</p>
    </div>
  );
}
