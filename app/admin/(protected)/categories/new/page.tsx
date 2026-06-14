import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { CategoryForm } from "@/components/admin/category-form";

export const dynamic = "force-dynamic";

export default function NewCategoryPage() {
  return (
    <div>
      <Link
        href="/admin/categories"
        className="inline-flex items-center gap-2 text-sm text-steel-600 transition-colors hover:text-forge"
      >
        <ArrowLeft className="h-4 w-4" /> Terug naar rubrieken
      </Link>
      <h1 className="mt-4 font-display text-4xl uppercase text-ink">Nieuwe rubriek</h1>
      <p className="mt-1 mb-8 text-steel-600">
        Maak een nieuwe categorie aan. Ze verschijnt automatisch in het menu en op de realisatiepagina.
      </p>

      <CategoryForm />
    </div>
  );
}
