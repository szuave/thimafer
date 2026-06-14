"use client";

import { useActionState } from "react";
import { ArrowUpRight, Check, AlertCircle } from "lucide-react";
import { submitContact, type ContactState } from "@/app/(site)/contact/actions";
import { cn } from "@/lib/utils";

const field =
  "w-full rounded-none border border-ink/15 bg-white px-4 py-3.5 text-ink outline-none transition-colors placeholder:text-steel-400 focus:border-forge";
const label = "label-mono mb-2 block text-steel-600";

function FieldError({ msg }: { msg?: string }) {
  if (!msg) return null;
  return (
    <p className="mt-1.5 flex items-center gap-1.5 text-xs text-forge-deep">
      <AlertCircle className="h-3.5 w-3.5" />
      {msg}
    </p>
  );
}

export function ContactForm() {
  const [state, action, pending] = useActionState<ContactState, FormData>(
    submitContact,
    null,
  );

  if (state?.ok) {
    return (
      <div className="flex flex-col items-start gap-4 border border-forge/30 bg-white p-8">
        <span className="grid h-14 w-14 place-items-center bg-forge text-white">
          <Check className="h-7 w-7" />
        </span>
        <h3 className="text-2xl text-ink">Bericht verstuurd</h3>
        <p className="text-steel-600">{state.message}</p>
      </div>
    );
  }

  return (
    <form action={action} className="space-y-5">
      {state && !state.ok && state.message && (
        <p className="flex items-center gap-2 border border-forge/30 bg-forge/5 px-4 py-3 text-sm text-forge-deep">
          <AlertCircle className="h-4 w-4 shrink-0" />
          {state.message}
        </p>
      )}

      {/* Honeypot */}
      <input
        type="text"
        name="company"
        tabIndex={-1}
        autoComplete="off"
        className="absolute left-[-9999px] h-0 w-0 opacity-0"
        aria-hidden="true"
      />

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className={label}>
            Naam *
          </label>
          <input id="name" name="name" className={cn(field)} placeholder="Uw naam" />
          <FieldError msg={state?.errors?.name} />
        </div>
        <div>
          <label htmlFor="email" className={label}>
            E-mail *
          </label>
          <input
            id="email"
            name="email"
            type="email"
            className={field}
            placeholder="naam@voorbeeld.be"
          />
          <FieldError msg={state?.errors?.email} />
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="phone" className={label}>
            Telefoon
          </label>
          <input id="phone" name="phone" className={field} placeholder="+32 ..." />
          <FieldError msg={state?.errors?.phone} />
        </div>
        <div>
          <label htmlFor="subject" className={label}>
            Onderwerp
          </label>
          <input
            id="subject"
            name="subject"
            className={field}
            placeholder="Waarover gaat het?"
          />
          <FieldError msg={state?.errors?.subject} />
        </div>
      </div>

      <div>
        <label htmlFor="message" className={label}>
          Bericht *
        </label>
        <textarea
          id="message"
          name="message"
          rows={6}
          className={cn(field, "resize-y")}
          placeholder="Vertel ons over uw project..."
        />
        <FieldError msg={state?.errors?.message} />
      </div>

      <button
        type="submit"
        disabled={pending}
        className="group/btn inline-flex items-center gap-2.5 bg-forge px-8 py-4 font-mono text-xs uppercase tracking-[0.18em] text-white transition-colors hover:bg-forge-deep disabled:cursor-not-allowed disabled:opacity-60"
      >
        {pending ? "Versturen..." : "Verstuur bericht"}
        <ArrowUpRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
      </button>

      <p className="text-xs text-steel-500">
        Door dit formulier te versturen gaat u akkoord met ons{" "}
        <a href="/privacy" className="underline hover:text-forge">
          privacybeleid
        </a>
        .
      </p>
    </form>
  );
}
