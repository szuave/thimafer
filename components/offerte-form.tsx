"use client";

import { useActionState } from "react";
import { ArrowUpRight, Check, AlertCircle } from "lucide-react";
import { submitOfferte, type OfferteState } from "@/app/(site)/offerte/actions";
import { services } from "@/lib/site";
import { cn } from "@/lib/utils";

const field =
  "w-full rounded-[var(--radius)] border border-line bg-white px-4 py-3.5 text-ink outline-none transition-colors placeholder:text-steel-400 focus:border-accent";
const label = "eyebrow mb-2 block text-steel-600";

function FieldError({ msg }: { msg?: string }) {
  if (!msg) return null;
  return (
    <p className="mt-1.5 flex items-center gap-1.5 text-xs text-accent-dark">
      <AlertCircle className="h-3.5 w-3.5" />
      {msg}
    </p>
  );
}

export function OfferteForm() {
  const [state, action, pending] = useActionState<OfferteState, FormData>(
    submitOfferte,
    null,
  );

  if (state?.ok) {
    return (
      <div className="flex flex-col items-start gap-4 rounded-[var(--radius-lg)] border border-accent/30 bg-white p-8">
        <span className="grid h-14 w-14 place-items-center rounded-[var(--radius)] bg-accent text-white">
          <Check className="h-7 w-7" />
        </span>
        <h3 className="text-2xl text-ink">Aanvraag verstuurd</h3>
        <p className="text-steel-600">{state.message}</p>
      </div>
    );
  }

  return (
    <form action={action} className="space-y-5">
      {state && !state.ok && state.message && (
        <p className="flex items-center gap-2 rounded-[var(--radius)] border border-accent/30 bg-accent-soft px-4 py-3 text-sm text-accent-dark">
          <AlertCircle className="h-4 w-4 shrink-0" />
          {state.message}
        </p>
      )}

      <input type="text" name="company" tabIndex={-1} autoComplete="off" className="absolute left-[-9999px] h-0 w-0 opacity-0" aria-hidden="true" />

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className={label}>Naam *</label>
          <input id="name" name="name" className={field} placeholder="Uw naam" />
          <FieldError msg={state?.errors?.name} />
        </div>
        <div>
          <label htmlFor="email" className={label}>E-mail *</label>
          <input id="email" name="email" type="email" className={field} placeholder="naam@voorbeeld.be" />
          <FieldError msg={state?.errors?.email} />
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="phone" className={label}>Telefoon</label>
          <input id="phone" name="phone" className={field} placeholder="+32 ..." />
          <FieldError msg={state?.errors?.phone} />
        </div>
        <div>
          <label htmlFor="dienst" className={label}>Voor welke dienst?</label>
          <select id="dienst" name="dienst" className={field} defaultValue="">
            <option value="">Maak een keuze...</option>
            {services.map((s) => (
              <option key={s.slug} value={s.name}>{s.name}</option>
            ))}
            <option value="Andere / meerdere">Andere / meerdere</option>
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="message" className={label}>Omschrijf uw project *</label>
        <textarea
          id="message"
          name="message"
          rows={6}
          className={cn(field, "resize-y")}
          placeholder="Wat wilt u laten maken? Geef zoveel mogelijk details: type, afmetingen, materiaal, locatie, timing..."
        />
        <FieldError msg={state?.errors?.message} />
      </div>

      <button
        type="submit"
        disabled={pending}
        className="group/btn inline-flex items-center gap-2.5 rounded-[var(--radius)] bg-accent px-8 py-4 text-sm font-semibold text-white transition-colors hover:bg-[var(--color-accent-dark)] disabled:cursor-not-allowed disabled:opacity-60"
      >
        {pending ? "Versturen..." : "Offerte aanvragen"}
        <ArrowUpRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
      </button>

      <p className="text-xs text-steel-500">
        Door dit formulier te versturen gaat u akkoord met ons{" "}
        <a href="/privacy" className="underline hover:text-accent">privacybeleid</a>.
      </p>
    </form>
  );
}
