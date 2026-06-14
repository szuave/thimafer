"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronDown, ChevronRight, ChevronLeft, Plus, Minus, ArrowRight, Phone, Mail } from "lucide-react";
import { mainNav, siteConfig, services, categories as fallbackCategories, applications, serviceImages } from "@/lib/site";
import { Icon } from "@/components/icon";
import { cn } from "@/lib/utils";
import { Logo } from "@/components/logo";

type Category = { slug: string; name: string; coverImage?: string | null };

function ImageCard({ href, img, title }: { href: string; img: string; title: string }) {
  return (
    <Link href={href} className="group/c relative block aspect-[16/10] overflow-hidden rounded-[3px] bg-ink">
      <Image
        src={img}
        alt={title}
        fill
        sizes="(max-width: 1024px) 50vw, 22vw"
        className="object-cover opacity-90 transition-transform duration-500 ease-steel group-hover/c:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 flex items-center justify-between p-4">
        <span className="font-bold text-white">{title}</span>
        <ChevronRight className="h-5 w-5 text-white/80 transition-transform group-hover/c:translate-x-0.5" />
      </div>
    </Link>
  );
}

const AllTile = ({ href, title }: { href: string; title: string }) => (
  <Link
    href={href}
    className="group/all flex flex-col justify-between rounded-[var(--radius)] bg-accent p-5 text-white transition-colors hover:bg-[var(--color-accent-dark)]"
  >
    <span className="text-lg font-bold leading-snug">
      {title}
      <br />
      in één oogopslag
    </span>
    <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold">
      Bekijk het overzicht
      <ArrowRight className="h-4 w-4 transition-transform group-hover/all:translate-x-0.5" />
    </span>
  </Link>
);

// Diensten + Toepassingen (static).
function Mega({ type }: { type: "diensten" | "toepassingen" }) {
  if (type === "toepassingen") {
    return (
      <div className="space-y-4">
        <div className="grid gap-2 md:grid-cols-3">
          {applications.map((a) => (
            <Link
              key={a.slug}
              href={`/toepassingen/${a.slug}`}
              className="group/c flex items-start gap-4 rounded-[var(--radius)] p-5 transition-colors hover:bg-mist"
            >
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-[var(--radius)] bg-accent-soft text-accent">
                <Icon name={a.icon} className="h-6 w-6" strokeWidth={1.6} />
              </span>
              <span>
                <span className="block font-bold text-ink transition-colors group-hover/c:text-accent">{a.name}</span>
                <span className="mt-1 block text-sm leading-relaxed text-steel-500">{a.description}</span>
              </span>
            </Link>
          ))}
        </div>
        <Link
          href="/toepassingen"
          className="group/all flex items-center justify-between rounded-[var(--radius)] bg-accent px-6 py-5 text-white transition-colors hover:bg-[var(--color-accent-dark)]"
        >
          <span className="text-lg font-bold">Alle toepassingen in één oogopslag</span>
          <span className="inline-flex items-center gap-2 text-sm font-semibold">
            Bekijk het overzicht
            <ArrowRight className="h-4 w-4 transition-transform group-hover/all:translate-x-0.5" />
          </span>
        </Link>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
      {services.map((s) => (
        <ImageCard key={s.slug} href={`/diensten/${s.slug}`} img={serviceImages[s.slug]} title={s.name} />
      ))}
      <AllTile href="/diensten" title="Alle diensten" />
    </div>
  );
}

// Realisaties — dynamic rubrieken, paginated 7 per page, "alle" tile always shown.
function RealisatiesMega({ cats }: { cats: Category[] }) {
  const [page, setPage] = useState(0);
  const perPage = 7;
  const pages = Math.max(1, Math.ceil(cats.length / perPage));
  const p = Math.min(page, pages - 1);
  const shown = cats.slice(p * perPage, p * perPage + perPage);

  return (
    <div>
      <div className="mb-5 flex items-center justify-between">
        <span className="eyebrow text-steel-500">Realisaties per rubriek</span>
        {pages > 1 && (
          <div className="flex items-center gap-2">
            <span className="text-xs font-medium text-steel-400">
              {p + 1} / {pages}
            </span>
            <button
              type="button"
              onClick={() => setPage(Math.max(0, p - 1))}
              disabled={p === 0}
              aria-label="Vorige"
              className="grid h-8 w-8 place-items-center rounded-[var(--radius)] border border-line text-ink transition-colors hover:border-accent hover:text-accent disabled:opacity-30"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={() => setPage(Math.min(pages - 1, p + 1))}
              disabled={p === pages - 1}
              aria-label="Volgende"
              className="grid h-8 w-8 place-items-center rounded-[var(--radius)] border border-line text-ink transition-colors hover:border-accent hover:text-accent disabled:opacity-30"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        )}
      </div>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
        {shown.map((c) => (
          <ImageCard
            key={c.slug}
            href={`/realisaties/${c.slug}`}
            img={c.coverImage || `/images/categories/${c.slug}.webp`}
            title={c.name}
          />
        ))}
        <AllTile href="/realisaties" title="Alle realisaties" />
      </div>
    </div>
  );
}

const DESKTOP_NAV: { label: string; href: string; mega?: "diensten" | "toepassingen" | "realisaties" }[] = [
  { label: "Diensten", href: "/diensten", mega: "diensten" },
  { label: "Toepassingen", href: "/toepassingen", mega: "toepassingen" },
  { label: "Realisaties", href: "/realisaties", mega: "realisaties" },
  { label: "Werkwijze", href: "/werkwijze" },
  { label: "Blog", href: "/blog" },
];

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [expanded, setExpanded] = useState<string | null>(null);
  const [atTop, setAtTop] = useState(true);
  const [cats, setCats] = useState<Category[]>(
    fallbackCategories.map((c) => ({ slug: c.slug, name: c.name })),
  );

  useEffect(() => {
    let active = true;
    fetch("/api/categories")
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        if (active && Array.isArray(data) && data.length > 0) setCats(data);
      })
      .catch(() => {});
    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    const onScroll = () => setAtTop(window.scrollY < 30);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  return (
    <header className="sticky top-0 z-50">
      {/* Top utility bar */}
      <div
        className={cn(
          "hidden overflow-hidden bg-ink text-steel-300 transition-all duration-300 ease-steel lg:block",
          atTop ? "max-h-11 opacity-100" : "max-h-0 opacity-0",
        )}
      >
        <div className="container-edge flex h-10 items-center justify-end gap-7 text-[13px]">
          <a href={`tel:${siteConfig.contact.phoneHref}`} className="flex items-center gap-2 transition-colors hover:text-white">
            <Phone className="h-3.5 w-3.5 text-accent" />
            {siteConfig.contact.phone}
          </a>
          <a href={`mailto:${siteConfig.contact.email}`} className="flex items-center gap-2 transition-colors hover:text-white">
            <Mail className="h-3.5 w-3.5 text-accent" />
            {siteConfig.contact.email}
          </a>
          <Link href="/over-ons" className="font-medium transition-colors hover:text-white">
            Over ons
          </Link>
        </div>
      </div>

      {/* Main bar */}
      <div className="relative border-b border-line bg-white">
        <div className="container-edge grid h-[4.75rem] grid-cols-[1fr_auto_1fr] items-center gap-6">
          <Link href="/" aria-label={`${siteConfig.name} — home`} className="shrink-0 justify-self-start">
            <Logo />
          </Link>

          <nav className="hidden items-center justify-center xl:flex">
            {DESKTOP_NAV.map((item) => (
              <div key={item.href} className="group static flex items-stretch">
                <Link
                  href={item.href}
                  className={cn(
                    "relative flex items-center gap-1 whitespace-nowrap px-3.5 py-7 text-[15px] font-semibold transition-colors",
                    isActive(item.href) ? "text-accent" : "text-ink hover:text-accent",
                  )}
                >
                  {item.label}
                  {item.mega && (
                    <ChevronDown className="h-4 w-4 text-steel-400 transition-transform duration-200 group-hover:rotate-180" />
                  )}
                  <span className="pointer-events-none absolute inset-x-3.5 bottom-4 h-0.5 origin-left scale-x-0 bg-accent transition-transform duration-200 group-hover:scale-x-100" />
                </Link>

                {item.mega && (
                  <div className="invisible absolute left-0 right-0 top-full z-40 border-t border-line bg-white opacity-0 shadow-[0_16px_30px_-12px_rgba(0,0,0,0.22)] transition-all duration-200 group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
                    <div className="container-edge py-8">
                      {item.mega === "realisaties" ? (
                        <RealisatiesMega cats={cats} />
                      ) : (
                        <Mega type={item.mega} />
                      )}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </nav>

          <div className="flex shrink-0 items-center justify-self-end gap-2.5">
            <Link
              href="/contact"
              className="hidden rounded-[var(--radius)] border border-line px-5 py-2.5 text-sm font-semibold text-ink transition-colors hover:border-accent hover:text-accent md:inline-flex"
            >
              Contact
            </Link>
            <Link
              href="/offerte"
              className="hidden rounded-[var(--radius)] bg-accent px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[var(--color-accent-dark)] md:inline-flex"
            >
              Offerte aanvragen
            </Link>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-label="Menu"
              aria-expanded={open}
              className="grid h-11 w-11 place-items-center rounded-[var(--radius)] border border-line text-ink xl:hidden"
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile drawer */}
      <div
        className={cn(
          "fixed inset-0 top-0 z-40 bg-white transition-transform duration-300 ease-steel xl:hidden",
          open ? "translate-x-0" : "translate-x-full",
        )}
      >
        <div className="flex h-[4.75rem] items-center justify-between border-b border-line px-5">
          <Link href="/" onClick={() => setOpen(false)}>
            <Logo />
          </Link>
          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Sluiten"
            className="grid h-11 w-11 place-items-center rounded-[var(--radius)] border border-line text-ink"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <nav className="h-[calc(100dvh-4.75rem)] overflow-y-auto px-5 pb-32 pt-2">
          {mainNav.map((item) => (
            <div key={item.href} className="border-b border-line">
              <div className="flex items-center justify-between">
                <Link
                  href={item.href}
                  className={cn(
                    "flex-1 py-4 text-lg font-semibold",
                    isActive(item.href) ? "text-accent" : "text-ink",
                  )}
                >
                  {item.label}
                </Link>
                {item.children && (
                  <button
                    type="button"
                    aria-label="Submenu"
                    onClick={() => setExpanded((cur) => (cur === item.href ? null : item.href))}
                    className="grid h-10 w-10 place-items-center text-steel-400"
                  >
                    {expanded === item.href ? <Minus className="h-5 w-5" /> : <Plus className="h-5 w-5" />}
                  </button>
                )}
              </div>
              {item.children && expanded === item.href && (
                <div className="grid grid-cols-2 gap-x-4 pb-3">
                  {item.children.map((child) => (
                    <Link
                      key={child.href}
                      href={child.href}
                      className="py-2 text-sm text-steel-500 transition-colors hover:text-accent"
                    >
                      {child.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}

          <div className="mt-8 space-y-3">
            <Link
              href="/offerte"
              className="flex w-full items-center justify-center gap-2 rounded-[var(--radius)] bg-accent py-3.5 text-sm font-semibold text-white"
            >
              Offerte aanvragen
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/contact"
              className="flex w-full items-center justify-center gap-2 rounded-[var(--radius)] border border-line py-3.5 text-sm font-semibold text-ink"
            >
              Contact
            </Link>
            <a href={`tel:${siteConfig.contact.phoneHref}`} className="flex items-center justify-center gap-2 pt-1 text-sm font-semibold text-ink">
              <Phone className="h-4 w-4 text-accent" />
              {siteConfig.contact.phone}
            </a>
          </div>
        </nav>
      </div>
    </header>
  );
}
