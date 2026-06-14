import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { getCloudflareContext } from "@opennextjs/cloudflare";
import { drizzle } from "drizzle-orm/d1";
import * as schema from "@/db/schema";

/**
 * Better Auth instance, built per-request because Cloudflare bindings
 * (D1) are only available inside a request context.
 *
 * Sign-up is locked to a single account: the first user that registers
 * becomes the administrator; any further registration is rejected.
 */
export function getAuth() {
  const { env } = getCloudflareContext();
  const db = drizzle(env.DB, { schema });

  return betterAuth({
    secret: env.BETTER_AUTH_SECRET,
    baseURL: env.BETTER_AUTH_URL || undefined,
    database: drizzleAdapter(db, { provider: "sqlite", schema }),
    emailAndPassword: {
      enabled: true,
      minPasswordLength: 8,
    },
    session: {
      expiresIn: 60 * 60 * 24 * 7, // 7 days
      updateAge: 60 * 60 * 24, // refresh daily
    },
    databaseHooks: {
      user: {
        create: {
          before: async (user) => {
            const existing = await db
              .select({ id: schema.user.id })
              .from(schema.user)
              .limit(1);
            if (existing.length > 0) {
              throw new Error(
                "Registratie is uitgeschakeld — er bestaat al een beheerder.",
              );
            }
            return { data: user };
          },
        },
      },
    },
  });
}

/** Helper: how many users exist (used to bootstrap the first admin). */
export async function getUserCount() {
  const { env } = getCloudflareContext();
  const db = drizzle(env.DB, { schema });
  const rows = await db.select({ id: schema.user.id }).from(schema.user);
  return rows.length;
}
