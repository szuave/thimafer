"use client";

import { useActionState } from "react";
import Image from "next/image";
import { Loader2, Save, AlertCircle } from "lucide-react";
import {
  saveCategory,
  type CategoryFormState,
} from "@/app/admin/(protected)/categories/actions";
import { cn } from "@/lib/utils";

type Category = {
  id: number;
  name: string;
  slug: string;
  description: string | null;
  coverImage: string | null;
  sortOrder: number;
};

const label = "label-mono mb-2 block text-steel-600";
const field =
  "w-full rounded-none border border-ink/15 bg-white px-4 py-3 text-ink outline-none transition-colors focus:border-forge";

export function CategoryForm({ category }: { category?: Category }) {
  const [state, action, pending] = useActionState<CategoryFormState, FormData>(
    saveCategory,
    null,
  );

  return (
    <form action={action} className="max-w-2xl space-y-6">
      {category && <input type="hidden" name="id" value={category.id} />}

      {state?.error && (
        <p className="flex items-center gap-2 border border-forge/30 bg-forge/5 px-4 py-3 text-sm text-forge-deep">
          <AlertCircle className="h-4 w-4 shrink-0" />
          {state.error}
        </p>
      )}

      <div>
        <label className={label}>Naam *</label>
        <input name="name" required defaultValue={category?.name} className={field} placeholder="bv. Balustrades" />
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label className={label}>Slug (optioneel)</label>
          <input name="slug" defaultValue={category?.slug} className={field} placeholder="automatisch uit naam" />
        </div>
        <div>
          <label className={label}>Volgorde</label>
          <input name="sortOrder" type="number" defaultValue={category?.sortOrder ?? 0} className={field} />
        </div>
      </div>

      <div>
        <label className={label}>Omschrijving</label>
        <textarea
          name="description"
          rows={3}
          defaultValue={category?.description ?? ""}
          className={cn(field, "resize-y")}
          placeholder="Korte omschrijving van de rubriek (zichtbaar op de realisatiepagina)."
        />
      </div>

      <div>
        <label className={label}>Coverfoto {category ? "(vervangen)" : ""}</label>
        {category?.coverImage && (
          <div className="relative mb-3 h-36 w-56 overflow-hidden border border-ink/10">
            <Image src={category.coverImage} alt="" fill className="object-cover" sizes="224px" />
          </div>
        )}
        <input type="file" name="cover" accept="image/*" className={cn(field, "py-2.5")} />
        <p className="mt-1 text-xs text-steel-500">
          Wordt getoond in het menu en op de realisatiepagina. Aanbevolen: liggend, min. 1000px breed.
        </p>
      </div>

      <button
        type="submit"
        disabled={pending}
        className="inline-flex items-center gap-2 bg-forge px-7 py-3.5 font-mono text-xs uppercase tracking-[0.18em] text-white transition-colors hover:bg-forge-deep disabled:opacity-60"
      >
        {pending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
        {category ? "Wijzigingen opslaan" : "Rubriek aanmaken"}
      </button>
    </form>
  );
}
