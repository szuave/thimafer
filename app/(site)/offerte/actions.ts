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
  dienst: z.string().max(80).optional(),
  message: z.string().min(10, "Omschrijf kort uw project.").max(5000),
});

export type OfferteState = {
  ok: boolean;
  message?: string;
  errors?: Record<string, string>;
} | null;

export async function submitOfferte(
  _prev: OfferteState,
  formData: FormData,
): Promise<OfferteState> {
  if (String(formData.get("company") ?? "")) {
    return { ok: true, message: "Bedankt! Uw aanvraag is verstuurd." };
  }

  const raw = {
    name: String(formData.get("name") ?? "").trim(),
    email: String(formData.get("email") ?? "").trim(),
    phone: String(formData.get("phone") ?? "").trim() || undefined,
    dienst: String(formData.get("dienst") ?? "").trim() || undefined,
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
  const subject = `Offerteaanvraag${data.dienst ? ` — ${data.dienst}` : ""}`;

  try {
    const db = getDb();
    await db.insert(contactSubmissions).values({
      name: data.name,
      email: data.email,
      phone: data.phone ?? null,
      subject,
      message: data.message,
    });
  } catch (e) {
    console.error("offerte insert failed", e);
    return {
      ok: false,
      message: "Er ging iets mis bij het verzenden. Probeer het later opnieuw.",
    };
  }

  try {
    const { env } = getCloudflareContext();
    if (env.RESEND_API_KEY && env.CONTACT_NOTIFY_EMAIL) {
      const resend = new Resend(env.RESEND_API_KEY);
      await resend.emails.send({
        from: `${siteConfig.name} website <onboarding@resend.dev>`,
        to: env.CONTACT_NOTIFY_EMAIL,
        replyTo: data.email,
        subject: `Nieuwe offerteaanvraag — ${data.name}`,
        text: [
          `Naam: ${data.name}`,
          `E-mail: ${data.email}`,
          `Telefoon: ${data.phone ?? "—"}`,
          `Dienst: ${data.dienst ?? "—"}`,
          "",
          data.message,
        ].join("\n"),
      });
    }
  } catch (e) {
    console.error("offerte email failed (submission stored)", e);
  }

  return {
    ok: true,
    message: "Bedankt! Uw offerteaanvraag is verstuurd. We bezorgen u snel een voorstel.",
  };
}
