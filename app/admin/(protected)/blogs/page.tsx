import Link from "next/link";
import Image from "next/image";
import { Plus, Pencil, ImageIcon } from "lucide-react";
import { listPostsAdmin } from "@/lib/admin";
import { formatDateNL } from "@/lib/utils";
import { deletePost } from "./actions";
import { DeleteButton } from "@/components/admin/delete-button";

export const dynamic = "force-dynamic";

export default async function AdminBlogsPage() {
  const posts = await listPostsAdmin();

  return (
    <div>
      <div className="flex items-end justify-between gap-4">
        <div>
          <h1 className="font-display text-4xl uppercase text-ink">Blog</h1>
          <p className="mt-1 text-steel-600">{posts.length} artikel(s)</p>
        </div>
        <Link
          href="/admin/blogs/new"
          className="inline-flex items-center gap-2 bg-forge px-5 py-3 font-mono text-[11px] uppercase tracking-[0.16em] text-white transition-colors hover:bg-forge-deep"
        >
          <Plus className="h-4 w-4" /> Nieuw artikel
        </Link>
      </div>

      <div className="mt-8 overflow-x-auto border border-ink/10 bg-paper">
        <table className="w-full min-w-[640px] text-left text-sm">
          <thead className="border-b border-ink/10 bg-paper-2/40">
            <tr className="label-mono text-steel-500">
              <th className="px-4 py-3 font-normal">Artikel</th>
              <th className="px-4 py-3 font-normal">Status</th>
              <th className="px-4 py-3 font-normal">Datum</th>
              <th className="px-4 py-3 text-right font-normal">Acties</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-ink/8">
            {posts.map((p) => (
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
                      <p className="font-medium text-ink">{p.title}</p>
                      <p className="text-xs text-steel-500">/{p.slug}</p>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3">
                  {p.published ? (
                    <span className="inline-flex items-center gap-1.5 text-xs text-emerald-700">
                      <span className="h-2 w-2 rounded-full bg-emerald-500" /> Gepubliceerd
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 text-xs text-steel-500">
                      <span className="h-2 w-2 rounded-full bg-steel-400" /> Concept
                    </span>
                  )}
                </td>
                <td className="px-4 py-3 text-steel-600">
                  {p.publishedAt ? formatDateNL(p.publishedAt) : "—"}
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center justify-end gap-4">
                    <Link
                      href={`/admin/blogs/${p.id}`}
                      className="inline-flex items-center gap-1.5 text-steel-600 transition-colors hover:text-forge"
                    >
                      <Pencil className="h-4 w-4" /> Bewerk
                    </Link>
                    <DeleteButton
                      action={deletePost}
                      hidden={{ id: p.id }}
                      confirmText={`"${p.title}" verwijderen?`}
                    />
                  </div>
                </td>
              </tr>
            ))}
            {posts.length === 0 && (
              <tr>
                <td colSpan={4} className="px-4 py-16 text-center text-steel-500">
                  Nog geen artikels. Schrijf uw eerste blogpost.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
