import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { listCategories } from "@/lib/admin";
import { ProjectForm } from "@/components/admin/project-form";

export const dynamic = "force-dynamic";

export default async function NewProjectPage() {
  const categories = await listCategories();

  return (
    <div>
      <Link
        href="/admin/realisaties"
        className="inline-flex items-center gap-2 text-sm text-steel-600 transition-colors hover:text-forge"
      >
        <ArrowLeft className="h-4 w-4" /> Terug naar realisaties
      </Link>
      <h1 className="mt-4 font-display text-4xl uppercase text-ink">
        Nieuwe realisatie
      </h1>
      <p className="mt-1 mb-8 text-steel-600">
        Vul de gegevens in en upload foto's. Je kan dit later altijd aanpassen.
      </p>

      <ProjectForm categories={categories} />
    </div>
  );
}
