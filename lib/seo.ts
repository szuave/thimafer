import type { Metadata } from "next";
import { siteConfig } from "@/lib/site";
import type { Service, Application } from "@/lib/site";

/* ------------------------------------------------------------------ */
/*  URL helpers                                                       */
/* ------------------------------------------------------------------ */

const SITE = siteConfig.url.replace(/\/$/, "");

/** Turn a path (or already-absolute URL) into an absolute URL. */
export function abs(path = "/"): string {
  if (!path) return SITE;
  if (path.startsWith("http")) return path;
  return `${SITE}${path.startsWith("/") ? "" : "/"}${path}`;
}

/** Non-empty social profile URLs (for schema.org sameAs). */
function sameAs(): string[] {
  return Object.values(siteConfig.socials).filter(Boolean) as string[];
}

/* ------------------------------------------------------------------ */
/*  Metadata helper                                                   */
/* ------------------------------------------------------------------ */

type PageMetaInput = {
  title?: string;
  description?: string;
  /** Canonical path, e.g. "/diensten/lassen". */
  path?: string;
  /** Share image path; falls back to the site-wide OG image. */
  image?: string | null;
  imageAlt?: string;
  type?: "website" | "article" | "profile";
  publishedTime?: string;
  modifiedTime?: string;
  /** Set true for thin/utility pages we don't want in the index. */
  noIndex?: boolean;
};

/**
 * Build a complete Metadata object: canonical, Open Graph and Twitter
 * card, all with absolute URLs. Use for both static `metadata` exports
 * and dynamic `generateMetadata` returns so every page is consistent.
 */
export function pageMeta({
  title,
  description,
  path = "/",
  image,
  imageAlt,
  type = "website",
  publishedTime,
  modifiedTime,
  noIndex,
}: PageMetaInput): Metadata {
  const url = abs(path);
  const isDefaultImage = !image;
  const imageUrl = abs(image || siteConfig.ogImage);
  const ogTitle = title ? `${title} · ${siteConfig.name}` : `${siteConfig.name} — ${siteConfig.slogan}`;

  return {
    ...(title ? { title } : {}),
    ...(description ? { description } : {}),
    alternates: { canonical: url },
    ...(noIndex ? { robots: { index: false, follow: true } } : {}),
    openGraph: {
      type,
      url,
      siteName: siteConfig.name,
      locale: "nl_BE",
      title: ogTitle,
      ...(description ? { description } : {}),
      images: [
        {
          url: imageUrl,
          ...(isDefaultImage ? { width: 1200, height: 630 } : {}),
          alt: imageAlt || siteConfig.ogImageAlt,
        },
      ],
      ...(type === "article" && publishedTime ? { publishedTime } : {}),
      ...(type === "article" && modifiedTime ? { modifiedTime } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: ogTitle,
      ...(description ? { description } : {}),
      images: [imageUrl],
    },
  };
}

/* ------------------------------------------------------------------ */
/*  JSON-LD builders                                                  */
/* ------------------------------------------------------------------ */

const ORG_ID = abs("/#organization");
const SITE_ID = abs("/#website");
const BUSINESS_ID = abs("/#business");

/**
 * Organization + WebSite + LocalBusiness as a single @graph, with
 * cross-references by @id. Render once per page (in the public layout).
 * Only verified facts: name, region, phone, email, VAT, logo.
 */
export function siteGraph() {
  const b = siteConfig.business;
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": ORG_ID,
        name: siteConfig.name,
        legalName: siteConfig.legalName,
        url: SITE,
        email: siteConfig.contact.email,
        telephone: siteConfig.contact.phoneHref,
        vatID: b.vatId,
        logo: {
          "@type": "ImageObject",
          url: abs("/images/brand/logo-mark.png"),
        },
        image: abs(siteConfig.ogImage),
        ...(sameAs().length ? { sameAs: sameAs() } : {}),
      },
      {
        "@type": "WebSite",
        "@id": SITE_ID,
        url: SITE,
        name: siteConfig.name,
        inLanguage: "nl-BE",
        publisher: { "@id": ORG_ID },
      },
      {
        "@type": ["LocalBusiness", "HomeAndConstructionBusiness"],
        "@id": BUSINESS_ID,
        name: siteConfig.name,
        url: SITE,
        image: abs(siteConfig.ogImage),
        logo: abs("/images/brand/logo-mark.png"),
        email: siteConfig.contact.email,
        telephone: siteConfig.contact.phoneHref,
        vatID: b.vatId,
        priceRange: b.priceRange,
        parentOrganization: { "@id": ORG_ID },
        address: {
          "@type": "PostalAddress",
          addressLocality: b.city,
          addressRegion: b.region,
          addressCountry: b.countryCode,
        },
        geo: {
          "@type": "GeoCoordinates",
          latitude: b.geo.latitude,
          longitude: b.geo.longitude,
        },
        areaServed: b.areaServed.map((name) => ({
          "@type": "AdministrativeArea",
          name,
        })),
        openingHoursSpecification: [
          {
            "@type": "OpeningHoursSpecification",
            dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
            opens: "07:00",
            closes: "17:00",
          },
        ],
        ...(sameAs().length ? { sameAs: sameAs() } : {}),
      },
    ],
  };
}

/** BreadcrumbList from an ordered list of crumbs (name + optional url). */
export function breadcrumbList(items: { name: string; path?: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      ...(item.path ? { item: abs(item.path) } : {}),
    })),
  };
}

/** Service offered by the business (for /diensten/[slug]). */
export function serviceSchema(service: Service) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.name,
    serviceType: service.name,
    description: service.description,
    url: abs(`/diensten/${service.slug}`),
    provider: { "@id": ORG_ID },
    areaServed: siteConfig.business.areaServed.map((name) => ({
      "@type": "AdministrativeArea",
      name,
    })),
  };
}

/** Application / audience segment (for /toepassingen/[slug]). */
export function applicationServiceSchema(app: Application) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: `Maatwerk in staal voor ${app.name.toLowerCase()}`,
    description: app.description,
    url: abs(`/toepassingen/${app.slug}`),
    provider: { "@id": ORG_ID },
    areaServed: siteConfig.business.areaServed.map((name) => ({
      "@type": "AdministrativeArea",
      name,
    })),
  };
}

/** BlogPosting for a blog article. */
export function blogPostingSchema(post: {
  title: string;
  slug: string;
  excerpt?: string | null;
  coverImage?: string | null;
  publishedAt?: Date | null;
  updatedAt?: Date | null;
}) {
  const url = abs(`/blog/${post.slug}`);
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    ...(post.excerpt ? { description: post.excerpt } : {}),
    image: abs(post.coverImage || siteConfig.ogImage),
    ...(post.publishedAt ? { datePublished: post.publishedAt.toISOString() } : {}),
    dateModified: (post.updatedAt || post.publishedAt || undefined)?.toISOString(),
    inLanguage: "nl-BE",
    author: { "@id": ORG_ID },
    publisher: { "@id": ORG_ID },
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
  };
}

/** FAQPage from verified question/answer pairs. */
export function faqPage(items: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((it) => ({
      "@type": "Question",
      name: it.q,
      acceptedAnswer: { "@type": "Answer", text: it.a },
    })),
  };
}
