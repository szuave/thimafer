import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { getProjectAdmin, listCategories } from "@/lib/admin";
import { ProjectForm } from "@/components/admin/project-form";

export const dynamic = "force-dynamic";

export default async function EditProjectPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const [project, categories] = await Promise.all([
    getProjectAdmin(Number(id)),
    listCategories(),
  ]);
  if (!project) notFound();

  return (
    <div>
      <div className="flex items-center justify-between gap-4">
        <Link
          href="/admin/realisaties"
          className="inline-flex items-center gap-2 text-sm text-steel-600 transition-colors hover:text-forge"
        >
          <ArrowLeft className="h-4 w-4" /> Terug naar realisaties
        </Link>
        {project.published && (
          <Link
            href={`/realisaties/${project.category.slug}/${project.slug}`}
            target="_blank"
            className="inline-flex items-center gap-2 text-sm text-steel-600 transition-colors hover:text-forge"
          >
            Bekijk op site <ExternalLink className="h-4 w-4" />
          </Link>
        )}
      </div>
      <h1 className="mt-4 font-display text-4xl uppercase text-ink">
        {project.title}
      </h1>
      <p className="mt-1 mb-8 text-steel-600">Realisatie bewerken</p>

      <ProjectForm categories={categories} project={project} />
    </div>
  );
}
