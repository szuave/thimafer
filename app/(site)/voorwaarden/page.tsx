import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import { PageHero } from "@/components/ui/page-hero";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = pageMeta({
  title: "Algemene voorwaarden",
  description: "De algemene voorwaarden van Thimafer.",
  path: "/voorwaarden",
});

export default function VoorwaardenPage() {
  return (
    <>
      <PageHero
        eyebrow="/ Juridisch"
        title="Algemene voorwaarden"
        intro="De voorwaarden die van toepassing zijn op onze offertes, overeenkomsten en leveringen."
        crumbs={[{ label: "Algemene voorwaarden" }]}
      />
      <section className="bg-paper py-20">
        <div className="container-edge max-w-3xl space-y-8 text-steel-700">
          <p className="border-l-2 border-forge bg-white px-5 py-4 text-sm text-steel-600">
            <strong className="text-ink">Let op:</strong> dit is een sjabloon.
            Laat de definitieve voorwaarden opstellen of nakijken door een
            jurist vóór publicatie.
          </p>

          <Block title="1. Toepassing">
            Deze algemene voorwaarden zijn van toepassing op alle offertes,
            overeenkomsten en leveringen van {siteConfig.legalName}, tenzij
            schriftelijk anders overeengekomen.
          </Block>
          <Block title="2. Offertes">
            Offertes zijn vrijblijvend en geldig gedurende dertig dagen, tenzij
            anders vermeld. Prijzen zijn exclusief btw, tenzij uitdrukkelijk
            anders aangegeven.
          </Block>
          <Block title="3. Uitvoering">
            We voeren de werken uit naar best vermogen en volgens de regels van
            de kunst. Leveringstermijnen worden zo nauwkeurig mogelijk
            opgegeven, maar zijn indicatief.
          </Block>
          <Block title="4. Betaling">
            Facturen zijn betaalbaar binnen de op de factuur vermelde termijn.
            Bij laattijdige betaling kunnen van rechtswege interesten en een
            forfaitaire schadevergoeding worden aangerekend.
          </Block>
          <Block title="5. Aansprakelijkheid">
            Onze aansprakelijkheid is beperkt tot de waarde van de geleverde
            werken. We zijn niet aansprakelijk voor onrechtstreekse schade.
          </Block>
          <Block title="6. Geschillen">
            Op alle overeenkomsten is het Belgische recht van toepassing.
            Geschillen behoren tot de bevoegdheid van de rechtbanken van het
            arrondissement waar {siteConfig.legalName} gevestigd is.
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
