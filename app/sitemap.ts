import type { MetadataRoute } from "next";
import { siteConfig, services, applications, categories } from "@/lib/site";
import { getDb } from "@/db";

// Generated per request so admin-added rubrieken, realisaties and blog
// posts always appear in the sitemap.
export const dynamic = "force-dynamic";

type Entry = MetadataRoute.Sitemap[number];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = siteConfig.url.replace(/\/$/, "");

  const staticRoutes: Entry[] = [
    "",
    "/over-ons",
    "/diensten",
    "/werkwijze",
    "/toepassingen",
    "/realisaties",
    "/blog",
    "/offerte",
    "/contact",
    "/privacy",
    "/voorwaarden",
  ].map((r) => ({
    url: `${base}${r}`,
    changeFrequency: "monthly",
    priority: r === "" ? 1 : 0.7,
  }));

  const serviceRoutes: Entry[] = services.map((s) => ({
    url: `${base}/diensten/${s.slug}`,
    changeFrequency: "yearly",
    priority: 0.6,
  }));

  const applicationRoutes: Entry[] = applications.map((a) => ({
    url: `${base}/toepassingen/${a.slug}`,
    changeFrequency: "yearly",
    priority: 0.6,
  }));

  let categoryRoutes: Entry[] = [];
  let projectRoutes: Entry[] = [];
  let postRoutes: Entry[] = [];

  try {
    const db = getDb();

    const cats = await db.query.categories.findMany({
      columns: { slug: true, createdAt: true },
    });
    categoryRoutes = cats.map((c) => ({
      url: `${base}/realisaties/${c.slug}`,
      lastModified: c.createdAt ?? undefined,
      changeFrequency: "monthly",
      priority: 0.6,
    }));

    const projects = await db.query.projects.findMany({
      where: (p, { eq }) => eq(p.published, true),
      columns: { slug: true, updatedAt: true },
      with: { category: { columns: { slug: true } } },
    });
    projectRoutes = projects.map((p) => ({
      url: `${base}/realisaties/${p.category.slug}/${p.slug}`,
      lastModified: p.updatedAt ?? undefined,
      changeFrequency: "yearly",
      priority: 0.5,
    }));

    const posts = await db.query.posts.findMany({
      where: (p, { eq }) => eq(p.published, true),
      columns: { slug: true, updatedAt: true, publishedAt: true },
    });
    postRoutes = posts.map((p) => ({
      url: `${base}/blog/${p.slug}`,
      lastModified: p.updatedAt ?? p.publishedAt ?? undefined,
      changeFrequency: "monthly",
      priority: 0.5,
    }));
  } catch {
    // Database not reachable (e.g. during build) — fall back to the
    // static category list so the sitemap is never empty.
    categoryRoutes = categories.map((c) => ({
      url: `${base}/realisaties/${c.slug}`,
      changeFrequency: "monthly",
      priority: 0.6,
    }));
  }

  return [
    ...staticRoutes,
    ...serviceRoutes,
    ...applicationRoutes,
    ...categoryRoutes,
    ...projectRoutes,
    ...postRoutes,
  ];
}
