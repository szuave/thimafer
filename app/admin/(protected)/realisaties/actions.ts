"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { eq, desc } from "drizzle-orm";
import { z } from "zod";
import { getDb } from "@/db";
import { projects, projectImages } from "@/db/schema";
import { uploadToR2, deleteFromR2 } from "@/lib/media";
import { slugify } from "@/lib/utils";

export type ProjectFormState = {
  ok: boolean;
  error?: string;
} | null;

const schema = z.object({
  title: z.string().min(2, "Titel is verplicht."),
  categoryId: z.coerce.number().int().positive("Kies een categorie."),
  location: z.string().max(120).optional(),
  year: z.coerce.number().int().min(1950).max(2100).optional(),
  description: z.string().max(2000).optional(),
});

async function appendImages(
  db: ReturnType<typeof getDb>,
  projectId: number,
  files: File[],
  slug: string,
) {
  if (files.length === 0) return;
  const last = await db
    .select({ sortOrder: projectImages.sortOrder })
    .from(projectImages)
    .where(eq(projectImages.projectId, projectId))
    .orderBy(desc(projectImages.sortOrder))
    .limit(1);
  let order = (last[0]?.sortOrder ?? -1) + 1;

  for (const file of files) {
    const url = await uploadToR2(file, `realisaties/${slug}`);
    if (!url) continue;
    await db.insert(projectImages).values({
      projectId,
      url,
      alt: slug,
      sortOrder: order++,
    });
  }
}

export async function saveProject(
  _prev: ProjectFormState,
  formData: FormData,
): Promise<ProjectFormState> {
  const idRaw = formData.get("id");
  const id = idRaw ? Number(idRaw) : null;

  const parsed = schema.safeParse({
    title: formData.get("title"),
    categoryId: formData.get("categoryId"),
    location: (formData.get("location") as string)?.trim() || undefined,
    year: (formData.get("year") as string)?.trim() || undefined,
    description: (formData.get("description") as string)?.trim() || undefined,
  });
  if (!parsed.success) {
    return { ok: false, error: parsed.error.issues[0]?.message ?? "Controleer de velden." };
  }
  const data = parsed.data;
  const published = formData.get("published") != null;
  const featured = formData.get("featured") != null;

  const db = getDb();
  const slug =
    (formData.get("slug") as string)?.trim().replace(/[^a-z0-9-]/gi, "") ||
    slugify(data.title);

  const coverFile = formData.get("cover") as File | null;
  const galleryFiles = formData
    .getAll("images")
    .filter((f): f is File => f instanceof File && f.size > 0);

  try {
    const newCover = await uploadToR2(coverFile, `realisaties/${slug}`);

    if (id) {
      const existing = await db.query.projects.findFirst({
        where: eq(projects.id, id),
      });
      if (!existing) return { ok: false, error: "Project niet gevonden." };

      if (newCover && existing.coverImage) await deleteFromR2(existing.coverImage);

      await db
        .update(projects)
        .set({
          title: data.title,
          slug,
          categoryId: data.categoryId,
          location: data.location ?? null,
          year: data.year ?? null,
          description: data.description ?? null,
          published,
          featured,
          coverImage: newCover ?? existing.coverImage,
          updatedAt: new Date(),
        })
        .where(eq(projects.id, id));

      await appendImages(db, id, galleryFiles, slug);
    } else {
      const inserted = await db
        .insert(projects)
        .values({
          title: data.title,
          slug,
          categoryId: data.categoryId,
          location: data.location ?? null,
          year: data.year ?? null,
          description: data.description ?? null,
          published,
          featured,
          coverImage: newCover ?? null,
        })
        .returning({ id: projects.id });

      const newId = inserted[0].id;
      await appendImages(db, newId, galleryFiles, slug);

      // Fall back to the first gallery image as cover if none uploaded.
      if (!newCover) {
        const first = await db.query.projectImages.findFirst({
          where: eq(projectImages.projectId, newId),
          orderBy: (im, { asc }) => asc(im.sortOrder),
        });
        if (first) {
          await db
            .update(projects)
            .set({ coverImage: first.url })
            .where(eq(projects.id, newId));
        }
      }
    }
  } catch (e) {
    console.error("saveProject failed", e);
    return { ok: false, error: "Opslaan mislukt. Probeer het opnieuw." };
  }

  revalidatePath("/admin/realisaties");
  revalidatePath("/realisaties");
  redirect("/admin/realisaties");
}

export async function deleteProject(formData: FormData) {
  const id = Number(formData.get("id"));
  if (!id) return;
  const db = getDb();

  const project = await db.query.projects.findFirst({
    where: eq(projects.id, id),
    with: { images: true },
  });
  if (!project) return;

  for (const img of project.images) await deleteFromR2(img.url);
  if (project.coverImage) await deleteFromR2(project.coverImage);

  await db.delete(projects).where(eq(projects.id, id)); // cascades images

  revalidatePath("/admin/realisaties");
  revalidatePath("/realisaties");
}

export async function deleteProjectImage(formData: FormData) {
  const imageId = Number(formData.get("imageId"));
  if (!imageId) return;
  const db = getDb();

  const img = await db.query.projectImages.findFirst({
    where: eq(projectImages.id, imageId),
  });
  if (!img) return;

  await deleteFromR2(img.url);
  await db.delete(projectImages).where(eq(projectImages.id, imageId));

  revalidatePath("/admin/realisaties");
}
