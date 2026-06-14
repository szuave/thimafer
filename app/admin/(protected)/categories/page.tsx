import Link from "next/link";
import Image from "next/image";
import { Plus, Pencil, ImageIcon } from "lucide-react";
import { listCategoriesAdmin } from "@/lib/admin";
import { deleteCategory } from "./actions";
import { DeleteButton } from "@/components/admin/delete-button";

export const dynamic = "force-dynamic";

export default async function AdminCategoriesPage() {
  const cats = await listCategoriesAdmin();

  return (
    <div>
      <div className="flex items-end justify-between gap-4">
        <div>
          <h1 className="font-display text-4xl uppercase text-ink">Rubrieken</h1>
          <p className="mt-1 text-steel-600">
            {cats.length} rubriek(en) — de categorieën van uw realisaties.
          </p>
        </div>
        <Link
          href="/admin/categories/new"
          className="inline-flex items-center gap-2 bg-forge px-5 py-3 font-mono text-[11px] uppercase tracking-[0.16em] text-white transition-colors hover:bg-forge-deep"
        >
          <Plus className="h-4 w-4" /> Nieuwe rubriek
        </Link>
      </div>

      <div className="mt-8 overflow-x-auto border border-ink/10 bg-paper">
        <table className="w-full min-w-[560px] text-left text-sm">
          <thead className="border-b border-ink/10 bg-paper-2/40">
            <tr className="label-mono text-steel-500">
              <th className="px-4 py-3 font-normal">Rubriek</th>
              <th className="px-4 py-3 font-normal">Volgorde</th>
              <th className="px-4 py-3 font-normal">Realisaties</th>
              <th className="px-4 py-3 text-right font-normal">Acties</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-ink/8">
            {cats.map((c) => (
              <tr key={c.id} className="transition-colors hover:bg-paper-2/40">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <div className="relative h-12 w-16 shrink-0 overflow-hidden bg-ink">
                      {c.coverImage ? (
                        <Image src={c.coverImage} alt="" fill className="object-cover" sizes="64px" />
                      ) : (
                        <span className="grid h-full place-items-center text-steel-600">
                          <ImageIcon className="h-4 w-4" />
                        </span>
                      )}
                    </div>
                    <div>
                      <p className="font-medium text-ink">{c.name}</p>
                      <p className="text-xs text-steel-500">/{c.slug}</p>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3 text-steel-600">{c.sortOrder}</td>
                <td className="px-4 py-3 text-steel-600">{c.projects.length}</td>
                <td className="px-4 py-3">
                  <div className="flex items-center justify-end gap-4">
                    <Link
                      href={`/admin/categories/${c.id}`}
                      className="inline-flex items-center gap-1.5 text-steel-600 transition-colors hover:text-forge"
                    >
                      <Pencil className="h-4 w-4" /> Bewerk
                    </Link>
                    <DeleteButton
                      action={deleteCategory}
                      hidden={{ id: c.id }}
                      confirmText={`Rubriek "${c.name}" verwijderen? Let op: ook de ${c.projects.length} realisatie(s) erin worden verwijderd.`}
                    />
                  </div>
                </td>
              </tr>
            ))}
            {cats.length === 0 && (
              <tr>
                <td colSpan={4} className="px-4 py-16 text-center text-steel-500">
                  Nog geen rubrieken.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
