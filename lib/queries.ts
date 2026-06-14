import { getDb } from "@/db";

/** All categories with their published projects (for counts + covers). */
export async function getCategoriesOverview() {
  const db = getDb();
  return db.query.categories.findMany({
    orderBy: (c, { asc }) => asc(c.sortOrder),
    with: {
      projects: {
        where: (p, { eq }) => eq(p.published, true),
        columns: { id: true },
      },
    },
  });
}

/** Featured published projects for the realisaties landing strip. */
export async function getFeaturedProjects(limit = 6) {
  const db = getDb();
  return db.query.projects.findMany({
    where: (p, { eq, and }) => and(eq(p.published, true), eq(p.featured, true)),
    orderBy: (p, { asc }) => asc(p.sortOrder),
    limit,
    with: { category: true },
  });
}

/** One category with all its published projects (category page). */
export async function getCategoryWithProjects(slug: string) {
  const db = getDb();
  return db.query.categories.findFirst({
    where: (c, { eq }) => eq(c.slug, slug),
    with: {
      projects: {
        where: (p, { eq }) => eq(p.published, true),
        orderBy: (p, { asc }) => asc(p.sortOrder),
      },
    },
  });
}

/** One project with its images + category (project detail page). */
export async function getProjectBySlug(slug: string) {
  const db = getDb();
  return db.query.projects.findFirst({
    where: (p, { eq, and }) => and(eq(p.slug, slug), eq(p.published, true)),
    with: {
      category: true,
      images: { orderBy: (im, { asc }) => asc(im.sortOrder) },
    },
  });
}

/** Other published projects in the same category (excluding current). */
export async function getRelatedProjects(categoryId: number, excludeId: number, limit = 3) {
  const db = getDb();
  return db.query.projects.findMany({
    where: (p, { eq, and, ne }) =>
      and(eq(p.categoryId, categoryId), eq(p.published, true), ne(p.id, excludeId)),
    orderBy: (p, { asc }) => asc(p.sortOrder),
    limit,
  });
}

/** Published blog posts, newest first. */
export async function getPublishedPosts() {
  const db = getDb();
  return db.query.posts.findMany({
    where: (p, { eq }) => eq(p.published, true),
    orderBy: (p, { desc }) => desc(p.publishedAt),
  });
}

/** One published post by slug. */
export async function getPostBySlug(slug: string) {
  const db = getDb();
  return db.query.posts.findFirst({
    where: (p, { eq, and }) => and(eq(p.slug, slug), eq(p.published, true)),
  });
}
