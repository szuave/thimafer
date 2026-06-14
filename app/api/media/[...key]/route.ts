import { getCloudflareContext } from "@opennextjs/cloudflare";

export const dynamic = "force-dynamic";

/** Serves media objects from the R2 MEDIA bucket at /api/media/<key>. */
export async function GET(
  _req: Request,
  { params }: { params: Promise<{ key: string[] }> },
) {
  const { key } = await params;
  const objectKey = key.map((k) => decodeURIComponent(k)).join("/");

  const { env } = getCloudflareContext();
  const obj = await env.MEDIA.get(objectKey);

  if (!obj || !obj.body) {
    return new Response("Niet gevonden", { status: 404 });
  }

  const headers = new Headers();
  obj.writeHttpMetadata(headers);
  headers.set("etag", obj.httpEtag);
  headers.set("Cache-Control", "public, max-age=31536000, immutable");

  return new Response(obj.body, { headers });
}
