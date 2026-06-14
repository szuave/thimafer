import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { getCategoryAdmin } from "@/lib/admin";
import { CategoryForm } from "@/components/admin/category-form";

export const dynamic = "force-dynamic";

export default async function EditCategoryPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const category = await getCategoryAdmin(Number(id));
  if (!category) notFound();

  return (
    <div>
      <div className="flex items-center justify-between gap-4">
        <Link
          href="/admin/categories"
          className="inline-flex items-center gap-2 text-sm text-steel-600 transition-colors hover:text-forge"
        >
          <ArrowLeft className="h-4 w-4" /> Terug naar rubrieken
        </Link>
        <Link
          href={`/realisaties/${category.slug}`}
          target="_blank"
          className="inline-flex items-center gap-2 text-sm text-steel-600 transition-colors hover:text-forge"
        >
          Bekijk op site <ExternalLink className="h-4 w-4" />
        </Link>
      </div>
      <h1 className="mt-4 font-display text-4xl uppercase text-ink">{category.name}</h1>
      <p className="mt-1 mb-8 text-steel-600">Rubriek bewerken</p>

      <CategoryForm category={category} />
    </div>
  );
}
