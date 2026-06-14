import { getCloudflareContext } from "@opennextjs/cloudflare";
import { slugify } from "@/lib/utils";

/**
 * Uploads a File to the R2 MEDIA bucket and returns the public URL
 * (served by /api/media/[...key]). Returns null for empty uploads.
 */
export async function uploadToR2(
  file: File | null,
  prefix: string,
): Promise<string | null> {
  if (!file || file.size === 0) return null;

  const { env } = getCloudflareContext();
  const ext = (file.name.split(".").pop() || "bin")
    .toLowerCase()
    .replace(/[^a-z0-9]/g, "")
    .slice(0, 5);
  const base = slugify(file.name.replace(/\.[^.]+$/, "")) || "bestand";
  const key = `${prefix}/${Date.now()}-${crypto.randomUUID().slice(0, 8)}-${base}.${ext}`;

  await env.MEDIA.put(key, await file.arrayBuffer(), {
    httpMetadata: { contentType: file.type || "application/octet-stream" },
  });

  return `/api/media/${key}`;
}

/** Removes an object from R2 if the URL is R2-hosted (skips /public assets). */
export async function deleteFromR2(url: string | null | undefined) {
  if (!url || !url.startsWith("/api/media/")) return;
  const { env } = getCloudflareContext();
  await env.MEDIA.delete(url.slice("/api/media/".length));
}
