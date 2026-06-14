import Link from "next/link";
import { Phone, Mail, MapPin, Clock, ArrowRight } from "lucide-react";
import { siteConfig, services, categories } from "@/lib/site";
import { Logo } from "@/components/logo";
import { FacebookIcon, InstagramIcon, LinkedinIcon } from "@/components/social-icons";

export function SiteFooter() {
  const year = 2026;

  return (
    <footer>
      {/* Red CTA band */}
      <div className="bg-accent">
        <div className="container-edge flex flex-col items-start justify-between gap-6 py-14 md:flex-row md:items-center">
          <div>
            <p className="eyebrow text-white/75">Klaar om te starten?</p>
            <h2 className="mt-3 max-w-xl text-3xl text-white sm:text-4xl">
              Vertel ons over uw project in staal.
            </h2>
          </div>
          <Link
            href="/offerte"
            className="group inline-flex items-center gap-2 rounded-[var(--radius)] bg-white px-7 py-3.5 text-sm font-semibold text-accent transition-colors hover:bg-white/90"
          >
            Offerte aanvragen
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>
      </div>

      {/* Dark anthracite footer */}
      <div className="bg-ink text-steel-300">
        <div className="container-edge grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Logo light />
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-steel-400">
              {siteConfig.tagline}
            </p>
            <div className="mt-6 flex items-center gap-2.5">
              {siteConfig.socials.facebook && (
                <a href={siteConfig.socials.facebook} aria-label="Facebook" className="grid h-9 w-9 place-items-center rounded-[var(--radius)] border border-white/15 text-steel-300 transition-colors hover:border-accent hover:bg-accent hover:text-white">
                  <FacebookIcon className="h-4 w-4" />
                </a>
              )}
              {siteConfig.socials.instagram && (
                <a href={siteConfig.socials.instagram} aria-label="Instagram" className="grid h-9 w-9 place-items-center rounded-[var(--radius)] border border-white/15 text-steel-300 transition-colors hover:border-accent hover:bg-accent hover:text-white">
                  <InstagramIcon className="h-4 w-4" />
                </a>
              )}
              {siteConfig.socials.linkedin && (
                <a href={siteConfig.socials.linkedin} aria-label="LinkedIn" className="grid h-9 w-9 place-items-center rounded-[var(--radius)] border border-white/15 text-steel-300 transition-colors hover:border-accent hover:bg-accent hover:text-white">
                  <LinkedinIcon className="h-4 w-4" />
                </a>
              )}
            </div>
          </div>

          <div className="lg:col-span-2">
            <h3 className="eyebrow text-white">Diensten</h3>
            <ul className="mt-5 space-y-2.5">
              {services.map((s) => (
                <li key={s.slug}>
                  <Link href={`/diensten/${s.slug}`} className="text-sm text-steel-400 transition-colors hover:text-white">
                    {s.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3">
            <h3 className="eyebrow text-white">Realisaties</h3>
            <ul className="mt-5 space-y-2.5">
              {categories.map((c) => (
                <li key={c.slug}>
                  <Link href={`/realisaties/${c.slug}`} className="text-sm text-steel-400 transition-colors hover:text-white">
                    {c.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3">
            <h3 className="eyebrow text-white">Contact</h3>
            <ul className="mt-5 space-y-3.5 text-sm text-steel-400">
              <li className="flex gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                <span>
                  {siteConfig.contact.addressLine}
                  <br />
                  {siteConfig.contact.postalCity}
                </span>
              </li>
              <li>
                <a href={`tel:${siteConfig.contact.phoneHref}`} className="flex gap-3 transition-colors hover:text-white">
                  <Phone className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                  {siteConfig.contact.phone}
                </a>
              </li>
              <li>
                <a href={`mailto:${siteConfig.contact.email}`} className="flex gap-3 transition-colors hover:text-white">
                  <Mail className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                  {siteConfig.contact.email}
                </a>
              </li>
              <li className="flex gap-3">
                <Clock className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                {siteConfig.contact.hours}
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10">
          <div className="container-edge flex flex-col items-center gap-3 py-6 text-center text-xs text-steel-500 sm:grid sm:grid-cols-3 sm:items-center sm:text-left">
            <p>© {year} {siteConfig.legalName} · BTW {siteConfig.contact.vat}</p>
            <p className="sm:text-center">
              Gemaakt door{" "}
              <a
                href="https://nebula-agency.be"
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-steel-300 transition-colors hover:text-white"
              >
                nebula
              </a>
            </p>
            <div className="flex items-center gap-5 sm:justify-end">
              <Link href="/privacy" className="transition-colors hover:text-white">Privacybeleid</Link>
              <Link href="/voorwaarden" className="transition-colors hover:text-white">Algemene voorwaarden</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
