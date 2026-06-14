"use client";

import { useActionState } from "react";
import Image from "next/image";
import { Loader2, Save, Upload, AlertCircle, X } from "lucide-react";
import {
  saveProject,
  deleteProjectImage,
  type ProjectFormState,
} from "@/app/admin/(protected)/realisaties/actions";
import { DeleteButton } from "./delete-button";
import { cn } from "@/lib/utils";

type Cat = { id: number; name: string };
type Img = { id: number; url: string };
type Project = {
  id: number;
  title: string;
  slug: string;
  categoryId: number;
  location: string | null;
  year: number | null;
  description: string | null;
  published: boolean;
  featured: boolean;
  coverImage: string | null;
  images: Img[];
};

const label = "label-mono mb-2 block text-steel-600";
const field =
  "w-full rounded-none border border-ink/15 bg-white px-4 py-3 text-ink outline-none transition-colors focus:border-forge";

export function ProjectForm({
  categories,
  project,
}: {
  categories: Cat[];
  project?: Project;
}) {
  const [state, action, pending] = useActionState<ProjectFormState, FormData>(
    saveProject,
    null,
  );

  return (
    <form action={action} className="max-w-3xl space-y-6">
      {project && <input type="hidden" name="id" value={project.id} />}

      {state?.error && (
        <p className="flex items-center gap-2 border border-forge/30 bg-forge/5 px-4 py-3 text-sm text-forge-deep">
          <AlertCircle className="h-4 w-4 shrink-0" />
          {state.error}
        </p>
      )}

      <div>
        <label className={label}>Titel *</label>
        <input
          name="title"
          required
          defaultValue={project?.title}
          className={field}
          placeholder="bv. Binnentrap Cortoos"
        />
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label className={label}>Categorie *</label>
          <select
            name="categoryId"
            required
            defaultValue={project?.categoryId ?? ""}
            className={field}
          >
            <option value="" disabled>
              Kies een categorie
            </option>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className={label}>Slug (optioneel)</label>
          <input
            name="slug"
            defaultValue={project?.slug}
            className={field}
            placeholder="automatisch uit titel"
          />
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label className={label}>Locatie</label>
          <input
            name="location"
            defaultValue={project?.location ?? ""}
            className={field}
            placeholder="bv. Gent"
          />
        </div>
        <div>
          <label className={label}>Jaar</label>
          <input
            name="year"
            type="number"
            min={1950}
            max={2100}
            defaultValue={project?.year ?? ""}
            className={field}
            placeholder="bv. 2024"
          />
        </div>
      </div>

      <div>
        <label className={label}>Omschrijving</label>
        <textarea
          name="description"
          rows={4}
          defaultValue={project?.description ?? ""}
          className={cn(field, "resize-y")}
          placeholder="Korte omschrijving van het project..."
        />
      </div>

      {/* Cover */}
      <div>
        <label className={label}>Coverfoto {project ? "(vervangen)" : ""}</label>
        {project?.coverImage && (
          <div className="relative mb-3 h-40 w-60 overflow-hidden border border-ink/10">
            <Image src={project.coverImage} alt="" fill className="object-cover" sizes="240px" />
          </div>
        )}
        <input type="file" name="cover" accept="image/*" className={cn(field, "py-2.5")} />
        {!project && (
          <p className="mt-1 text-xs text-steel-500">
            Geen cover? Dan gebruiken we automatisch de eerste galerijfoto.
          </p>
        )}
      </div>

      {/* Existing gallery (edit only) */}
      {project && project.images.length > 0 && (
        <div>
          <label className={label}>Huidige galerij</label>
          <div className="grid grid-cols-3 gap-3 sm:grid-cols-4">
            {project.images.map((img) => (
              <div key={img.id} className="group relative aspect-square overflow-hidden border border-ink/10">
                <Image src={img.url} alt="" fill className="object-cover" sizes="120px" />
                <div className="absolute right-1 top-1">
                  <DeleteButton
                    action={deleteProjectImage}
                    hidden={{ imageId: img.id }}
                    confirmText="Deze foto verwijderen?"
                    className="grid h-7 w-7 place-items-center bg-ink/80 text-white hover:bg-forge"
                  >
                    <X className="h-4 w-4" />
                  </DeleteButton>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Add gallery images */}
      <div>
        <label className={label}>
          {project ? "Foto's toevoegen" : "Galerijfoto's"}
        </label>
        <input type="file" name="images" accept="image/*" multiple className={cn(field, "py-2.5")} />
      </div>

      {/* Flags */}
      <div className="flex flex-wrap gap-6 border-y border-ink/10 py-5">
        <label className="flex items-center gap-3 text-sm text-ink">
          <input
            type="checkbox"
            name="published"
            defaultChecked={project ? project.published : true}
            className="h-4 w-4 accent-[var(--color-forge)]"
          />
          Gepubliceerd (zichtbaar op de website)
        </label>
        <label className="flex items-center gap-3 text-sm text-ink">
          <input
            type="checkbox"
            name="featured"
            defaultChecked={project?.featured ?? false}
            className="h-4 w-4 accent-[var(--color-forge)]"
          />
          Uitgelicht
        </label>
      </div>

      <button
        type="submit"
        disabled={pending}
        className="inline-flex items-center gap-2 bg-forge px-7 py-3.5 font-mono text-xs uppercase tracking-[0.18em] text-white transition-colors hover:bg-forge-deep disabled:opacity-60"
      >
        {pending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
        {project ? "Wijzigingen opslaan" : "Realisatie aanmaken"}
      </button>
    </form>
  );
}
