import Link from "next/link";
import Image from "next/image";
import { Plus, Pencil, Star, ImageIcon } from "lucide-react";
import { listProjectsAdmin } from "@/lib/admin";
import { deleteProject } from "./actions";
import { DeleteButton } from "@/components/admin/delete-button";

export const dynamic = "force-dynamic";

export default async function AdminRealisatiesPage() {
  const projects = await listProjectsAdmin();

  return (
    <div>
      <div className="flex items-end justify-between gap-4">
        <div>
          <h1 className="font-display text-4xl uppercase text-ink">Realisaties</h1>
          <p className="mt-1 text-steel-600">{projects.length} project(en)</p>
        </div>
        <Link
          href="/admin/realisaties/new"
          className="inline-flex items-center gap-2 bg-forge px-5 py-3 font-mono text-[11px] uppercase tracking-[0.16em] text-white transition-colors hover:bg-forge-deep"
        >
          <Plus className="h-4 w-4" /> Nieuwe realisatie
        </Link>
      </div>

      <div className="mt-8 overflow-x-auto border border-ink/10 bg-paper">
        <table className="w-full min-w-[640px] text-left text-sm">
          <thead className="border-b border-ink/10 bg-paper-2/40">
            <tr className="label-mono text-steel-500">
              <th className="px-4 py-3 font-normal">Project</th>
              <th className="px-4 py-3 font-normal">Categorie</th>
              <th className="px-4 py-3 font-normal">Foto's</th>
              <th className="px-4 py-3 font-normal">Status</th>
              <th className="px-4 py-3 text-right font-normal">Acties</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-ink/8">
            {projects.map((p) => (
              <tr key={p.id} className="transition-colors hover:bg-paper-2/40">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <div className="relative h-12 w-16 shrink-0 overflow-hidden bg-ink">
                      {p.coverImage ? (
                        <Image src={p.coverImage} alt="" fill className="object-cover" sizes="64px" />
                      ) : (
                        <span className="grid h-full place-items-center text-steel-600">
                          <ImageIcon className="h-4 w-4" />
                        </span>
                      )}
                    </div>
                    <div className="min-w-0">
                      <p className="flex items-center gap-1.5 font-medium text-ink">
                        {p.featured && <Star className="h-3.5 w-3.5 fill-forge text-forge" />}
                        {p.title}
                      </p>
                      <p className="text-xs text-steel-500">/{p.slug}</p>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3 text-steel-600">{p.category.name}</td>
                <td className="px-4 py-3 text-steel-600">{p.images.length}</td>
                <td className="px-4 py-3">
                  {p.published ? (
                    <span className="inline-flex items-center gap-1.5 text-xs text-emerald-700">
                      <span className="h-2 w-2 rounded-full bg-emerald-500" /> Online
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 text-xs text-steel-500">
                      <span className="h-2 w-2 rounded-full bg-steel-400" /> Verborgen
                    </span>
                  )}
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center justify-end gap-4">
                    <Link
                      href={`/admin/realisaties/${p.id}`}
                      className="inline-flex items-center gap-1.5 text-steel-600 transition-colors hover:text-forge"
                    >
                      <Pencil className="h-4 w-4" /> Bewerk
                    </Link>
                    <DeleteButton
                      action={deleteProject}
                      hidden={{ id: p.id }}
                      confirmText={`"${p.title}" en alle foto's verwijderen?`}
                    />
                  </div>
                </td>
              </tr>
            ))}
            {projects.length === 0 && (
              <tr>
                <td colSpan={5} className="px-4 py-16 text-center text-steel-500">
                  Nog geen realisaties. Voeg uw eerste project toe.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
