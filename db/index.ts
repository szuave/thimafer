import { drizzle } from "drizzle-orm/d1";
import { getCloudflareContext } from "@opennextjs/cloudflare";
import * as schema from "./schema";

/**
 * Drizzle client bound to the request-scoped Cloudflare D1 binding.
 * Must be called inside a request (route handler, server component,
 * server action) — never at module top-level.
 */
export function getDb() {
  const { env } = getCloudflareContext();
  return drizzle(env.DB, { schema });
}

/** Async variant for static generation / `generateStaticParams`. */
export async function getDbAsync() {
  const { env } = await getCloudflareContext({ async: true });
  return drizzle(env.DB, { schema });
}

export { schema };
