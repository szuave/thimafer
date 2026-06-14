import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import { PageHero } from "@/components/ui/page-hero";
import { Button } from "@/components/ui/button";
import { processSteps } from "@/lib/site";

export const metadata: Metadata = pageMeta({
  title: "Werkwijze",
  description:
    "Van eerste contact tot oplevering: ontdek hoe Thimafer uw project in staal aanpakt — in zeven duidelijke stappen, volledig in eigen beheer.",
  path: "/werkwijze",
});

export default function WerkwijzePage() {
  return (
    <>
      <PageHero
        eyebrow="/ Werkwijze"
        title={
          <>
            Van eerste contact <br className="hidden sm:block" />
            tot <span className="text-forge">oplevering</span>
          </>
        }
        intro="Een transparant traject in zeven stappen. Zo weet u altijd precies waar uw project staat."
        crumbs={[{ label: "Werkwijze" }]}
      />

      <section className="bg-paper py-24 lg:py-32">
        <div className="container-edge">
          <div className="mx-auto max-w-4xl">
            {processSteps.map((step, i) => (
              <div
                key={step.n}
                data-reveal
                className="group relative grid grid-cols-[auto_1fr] gap-6 sm:gap-10"
              >
                {/* Number + line */}
                <div className="flex flex-col items-center">
                  <div className="grid h-16 w-16 shrink-0 place-items-center border border-ink/15 bg-white font-display text-2xl text-ink transition-colors duration-300 group-hover:border-forge group-hover:bg-forge group-hover:text-white">
                    {step.n}
                  </div>
                  {i < processSteps.length - 1 && (
                    <div className="my-2 w-px flex-1 bg-ink/12" />
                  )}
                </div>

                {/* Content */}
                <div className="pb-12">
                  <h2 className="text-3xl text-ink sm:text-4xl">{step.title}</h2>
                  <p className="mt-3 max-w-xl text-base leading-relaxed text-steel-600">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="mx-auto mt-8 flex max-w-4xl flex-col items-start gap-6 border-t border-ink/10 pt-10 sm:flex-row sm:items-center sm:justify-between">
            <p className="max-w-md font-display text-2xl uppercase leading-tight text-ink">
              Klaar voor de eerste stap?
            </p>
            <Button href="/offerte" variant="primary">
              Start uw project
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
