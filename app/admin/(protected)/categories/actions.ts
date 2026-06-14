"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { eq } from "drizzle-orm";
import { z } from "zod";
import { getDb } from "@/db";
import { categories } from "@/db/schema";
import { uploadToR2, deleteFromR2 } from "@/lib/media";
import { slugify } from "@/lib/utils";

export type CategoryFormState = { ok: boolean; error?: string } | null;

const schema = z.object({
  name: z.string().min(2, "Naam is verplicht."),
  description: z.string().max(600).optional(),
});

export async function saveCategory(
  _prev: CategoryFormState,
  formData: FormData,
): Promise<CategoryFormState> {
  const idRaw = formData.get("id");
  const id = idRaw ? Number(idRaw) : null;

  const parsed = schema.safeParse({
    name: formData.get("name"),
    description: (formData.get("description") as string)?.trim() || undefined,
  });
  if (!parsed.success) {
    return { ok: false, error: parsed.error.issues[0]?.message ?? "Controleer de velden." };
  }
  const data = parsed.data;
  const sortOrder = Number(formData.get("sortOrder")) || 0;
  const db = getDb();
  const slug =
    (formData.get("slug") as string)?.trim().replace(/[^a-z0-9-]/gi, "").toLowerCase() ||
    slugify(data.name);

  const coverFile = formData.get("cover") as File | null;

  try {
    const newCover = await uploadToR2(coverFile, `categories/${slug}`);

    if (id) {
      const existing = await db.query.categories.findFirst({ where: eq(categories.id, id) });
      if (!existing) return { ok: false, error: "Rubriek niet gevonden." };
      if (newCover && existing.coverImage) await deleteFromR2(existing.coverImage);
      await db
        .update(categories)
        .set({
          name: data.name,
          slug,
          description: data.description ?? null,
          sortOrder,
          coverImage: newCover ?? existing.coverImage,
        })
        .where(eq(categories.id, id));
    } else {
      await db.insert(categories).values({
        name: data.name,
        slug,
        description: data.description ?? null,
        sortOrder,
        coverImage: newCover ?? null,
      });
    }
  } catch (e) {
    console.error("saveCategory failed", e);
    return { ok: false, error: "Opslaan mislukt — bestaat de slug misschien al?" };
  }

  revalidatePath("/admin/categories");
  revalidatePath("/realisaties");
  redirect("/admin/categories");
}

export async function deleteCategory(formData: FormData) {
  const id = Number(formData.get("id"));
  if (!id) return;
  const db = getDb();

  const cat = await db.query.categories.findFirst({
    where: eq(categories.id, id),
    with: { projects: { with: { images: true } } },
  });
  if (!cat) return;

  // Clean up R2 media for the category and all its projects.
  await deleteFromR2(cat.coverImage);
  for (const p of cat.projects) {
    await deleteFromR2(p.coverImage);
    for (const img of p.images) await deleteFromR2(img.url);
  }

  await db.delete(categories).where(eq(categories.id, id)); // cascades projects + images

  revalidatePath("/admin/categories");
  revalidatePath("/realisaties");
}
