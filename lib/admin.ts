import { getDb } from "@/db";

/** Server-side read helpers for the admin area. */

export async function listCategories() {
  const db = getDb();
  return db.query.categories.findMany({
    orderBy: (c, { asc }) => asc(c.sortOrder),
  });
}

export async function listCategoriesAdmin() {
  const db = getDb();
  return db.query.categories.findMany({
    orderBy: (c, { asc }) => asc(c.sortOrder),
    with: { projects: { columns: { id: true } } },
  });
}

export async function getCategoryAdmin(id: number) {
  const db = getDb();
  return db.query.categories.findFirst({ where: (c, { eq }) => eq(c.id, id) });
}

export async function listProjectsAdmin() {
  const db = getDb();
  return db.query.projects.findMany({
    orderBy: (p, { asc }) => asc(p.sortOrder),
    with: { category: true, images: { columns: { id: true } } },
  });
}

export async function getProjectAdmin(id: number) {
  const db = getDb();
  return db.query.projects.findFirst({
    where: (p, { eq }) => eq(p.id, id),
    with: {
      category: true,
      images: { orderBy: (im, { asc }) => asc(im.sortOrder) },
    },
  });
}

export async function listPostsAdmin() {
  const db = getDb();
  return db.query.posts.findMany({
    orderBy: (p, { desc }) => desc(p.createdAt),
  });
}

export async function getPostAdmin(id: number) {
  const db = getDb();
  return db.query.posts.findFirst({ where: (p, { eq }) => eq(p.id, id) });
}

export async function listContacts() {
  const db = getDb();
  return db.query.contactSubmissions.findMany({
    orderBy: (c, { desc }) => desc(c.createdAt),
  });
}

export async function adminStats() {
  const db = getDb();
  const [projects, posts, contacts] = await Promise.all([
    db.query.projects.findMany({ columns: { id: true } }),
    db.query.posts.findMany({ columns: { id: true, published: true } }),
    db.query.contactSubmissions.findMany({ columns: { id: true, isRead: true } }),
  ]);
  return {
    projects: projects.length,
    posts: posts.length,
    postsPublished: posts.filter((p) => p.published).length,
    contacts: contacts.length,
    unread: contacts.filter((c) => !c.isRead).length,
  };
}
