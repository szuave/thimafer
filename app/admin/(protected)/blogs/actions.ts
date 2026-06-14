"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { eq } from "drizzle-orm";
import { z } from "zod";
import { getDb } from "@/db";
import { posts } from "@/db/schema";
import { uploadToR2, deleteFromR2 } from "@/lib/media";
import { slugify } from "@/lib/utils";

export type PostFormState = { ok: boolean; error?: string } | null;

const schema = z.object({
  title: z.string().min(2, "Titel is verplicht."),
  excerpt: z.string().max(400).optional(),
  content: z.string().min(1, "Schrijf eerst wat inhoud."),
});

/** Plain text → simple HTML; leaves real HTML untouched. */
function toHtml(input: string) {
  const trimmed = input.trim();
  if (/<[a-z][\s\S]*>/i.test(trimmed)) return trimmed;
  return trimmed
    .split(/\n\s*\n/)
    .map((p) => {
      const safe = p
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/\n/g, "<br/>");
      return `<p>${safe}</p>`;
    })
    .join("\n");
}

export async function savePost(
  _prev: PostFormState,
  formData: FormData,
): Promise<PostFormState> {
  const idRaw = formData.get("id");
  const id = idRaw ? Number(idRaw) : null;

  const parsed = schema.safeParse({
    title: formData.get("title"),
    excerpt: (formData.get("excerpt") as string)?.trim() || undefined,
    content: formData.get("content"),
  });
  if (!parsed.success) {
    return { ok: false, error: parsed.error.issues[0]?.message ?? "Controleer de velden." };
  }
  const data = parsed.data;
  const published = formData.get("published") != null;
  const db = getDb();
  const slug =
    (formData.get("slug") as string)?.trim().replace(/[^a-z0-9-]/gi, "") ||
    slugify(data.title);
  const content = toHtml(data.content);
  const coverFile = formData.get("cover") as File | null;

  try {
    const newCover = await uploadToR2(coverFile, `blog/${slug}`);

    if (id) {
      const existing = await db.query.posts.findFirst({ where: eq(posts.id, id) });
      if (!existing) return { ok: false, error: "Artikel niet gevonden." };
      if (newCover && existing.coverImage) await deleteFromR2(existing.coverImage);

      let publishedAt = existing.publishedAt;
      if (published && !publishedAt) publishedAt = new Date();

      await db
        .update(posts)
        .set({
          title: data.title,
          slug,
          excerpt: data.excerpt ?? null,
          content,
          coverImage: newCover ?? existing.coverImage,
          published,
          publishedAt,
          updatedAt: new Date(),
        })
        .where(eq(posts.id, id));
    } else {
      await db.insert(posts).values({
        title: data.title,
        slug,
        excerpt: data.excerpt ?? null,
        content,
        coverImage: newCover ?? null,
        published,
        publishedAt: published ? new Date() : null,
      });
    }
  } catch (e) {
    console.error("savePost failed", e);
    return { ok: false, error: "Opslaan mislukt. Probeer het opnieuw." };
  }

  revalidatePath("/admin/blogs");
  revalidatePath("/blog");
  redirect("/admin/blogs");
}

export async function deletePost(formData: FormData) {
  const id = Number(formData.get("id"));
  if (!id) return;
  const db = getDb();
  const post = await db.query.posts.findFirst({ where: eq(posts.id, id) });
  if (!post) return;
  if (post.coverImage) await deleteFromR2(post.coverImage);
  await db.delete(posts).where(eq(posts.id, id));
  revalidatePath("/admin/blogs");
  revalidatePath("/blog");
}
