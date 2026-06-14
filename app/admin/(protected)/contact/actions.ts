"use server";

import { revalidatePath } from "next/cache";
import { eq } from "drizzle-orm";
import { getDb } from "@/db";
import { contactSubmissions } from "@/db/schema";

export async function setRead(formData: FormData) {
  const id = Number(formData.get("id"));
  const read = formData.get("read") === "true";
  if (!id) return;
  const db = getDb();
  await db
    .update(contactSubmissions)
    .set({ isRead: read })
    .where(eq(contactSubmissions.id, id));
  revalidatePath("/admin/contact");
  revalidatePath("/admin");
}

export async function deleteContact(formData: FormData) {
  const id = Number(formData.get("id"));
  if (!id) return;
  const db = getDb();
  await db.delete(contactSubmissions).where(eq(contactSubmissions.id, id));
  revalidatePath("/admin/contact");
  revalidatePath("/admin");
}
