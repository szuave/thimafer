"use server";

import { z } from "zod";
import { Resend } from "resend";
import { getCloudflareContext } from "@opennextjs/cloudflare";
import { getDb } from "@/db";
import { contactSubmissions } from "@/db/schema";
import { siteConfig } from "@/lib/site";

const schema = z.object({
  name: z.string().min(2, "Vul uw naam in."),
  email: z.string().email("Vul een geldig e-mailadres in."),
  phone: z.string().max(40).optional(),
  subject: z.string().max(160).optional(),
  message: z.string().min(10, "Uw bericht is wat kort.").max(5000),
});

export type ContactState = {
  ok: boolean;
  message?: string;
  errors?: Record<string, string>;
} | null;

export async function submitContact(
  _prev: ContactState,
  formData: FormData,
): Promise<ContactState> {
  // Honeypot — bots fill hidden fields.
  if (String(formData.get("company") ?? "")) {
    return { ok: true, message: "Bedankt! Uw bericht is verstuurd." };
  }

  const raw = {
    name: String(formData.get("name") ?? "").trim(),
    email: String(formData.get("email") ?? "").trim(),
    phone: String(formData.get("phone") ?? "").trim() || undefined,
    subject: String(formData.get("subject") ?? "").trim() || undefined,
    message: String(formData.get("message") ?? "").trim(),
  };

  const parsed = schema.safeParse(raw);
  if (!parsed.success) {
    const errors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const key = issue.path[0];
      if (typeof key === "string" && !errors[key]) errors[key] = issue.message;
    }
    return { ok: false, message: "Controleer de gemarkeerde velden.", errors };
  }

  const data = parsed.data;

  // 1) Persist the submission.
  try {
    const db = getDb();
    await db.insert(contactSubmissions).values({
      name: data.name,
      email: data.email,
      phone: data.phone ?? null,
      subject: data.subject ?? null,
      message: data.message,
    });
  } catch (e) {
    console.error("contact insert failed", e);
    return {
      ok: false,
      message: "Er ging iets mis bij het verzenden. Probeer het later opnieuw.",
    };
  }

  // 2) Notify by email (best-effort — never block the user on this).
  try {
    const { env } = getCloudflareContext();
    if (env.RESEND_API_KEY && env.CONTACT_NOTIFY_EMAIL) {
      const resend = new Resend(env.RESEND_API_KEY);
      await resend.emails.send({
        from: `${siteConfig.name} website <onboarding@resend.dev>`,
        to: env.CONTACT_NOTIFY_EMAIL,
        replyTo: data.email,
        subject: `Nieuwe contactaanvraag — ${data.name}`,
        text: [
          `Naam: ${data.name}`,
          `E-mail: ${data.email}`,
          `Telefoon: ${data.phone ?? "—"}`,
          `Onderwerp: ${data.subject ?? "—"}`,
          "",
          data.message,
        ].join("\n"),
      });
    }
  } catch (e) {
    console.error("contact email failed (submission still stored)", e);
  }

  return {
    ok: true,
    message: "Bedankt! Uw bericht is verstuurd. We nemen snel contact met u op.",
  };
}
