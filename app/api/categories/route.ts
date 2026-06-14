import { getDb } from "@/db";

export const dynamic = "force-dynamic";

// Public list of realisatie categories (rubrieken) for the nav mega-menu.
export async function GET() {
  try {
    const db = getDb();
    const cats = await db.query.categories.findMany({
      orderBy: (c, { asc }) => asc(c.sortOrder),
      columns: { slug: true, name: true, coverImage: true },
    });
    return Response.json(cats, {
      headers: { "Cache-Control": "public, max-age=60" },
    });
  } catch {
    return Response.json([]);
  }
}
