import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { MapPin, ArrowLeft, ArrowRight } from "lucide-react";
import { PageHero } from "@/components/ui/page-hero";
import { Button } from "@/components/ui/button";
import { ProjectGallery } from "@/components/project-gallery";
import { getProjectBySlug, getRelatedProjects } from "@/lib/queries";
import { pageMeta } from "@/lib/seo";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string; slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  if (!project) return {};
  const place = project.location ? ` in ${project.location}` : "";
  return pageMeta({
    title: project.title,
    description:
      project.description ??
      `${project.title} — een realisatie in ${project.category.name.toLowerCase()} door Thimafer${place}.`,
    path: `/realisaties/${project.category.slug}/${project.slug}`,
    image: project.coverImage,
    imageAlt: project.title,
  });
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ category: string; slug: string }>;
}) {
  const { category, slug } = await params;
  const project = await getProjectBySlug(slug);
  if (!project || project.category.slug !== category) notFound();

  const related = await getRelatedProjects(project.categoryId, project.id, 3);

  return (
    <>
      <PageHero
        eyebrow={project.category.name}
        title={project.title}
        intro={project.description ?? undefined}
        crumbs={[
          { label: "Realisaties", href: "/realisaties" },
          { label: project.category.name, href: `/realisaties/${project.category.slug}` },
          { label: project.title },
        ]}
      />

      <section className="bg-white py-16 lg:py-24">
        <div className="container-edge">
          <div className="mb-10 flex flex-wrap items-center gap-x-8 gap-y-3 border-b border-line pb-6 text-sm">
            <span className="text-steel-500">
              Categorie —{" "}
              <Link href={`/realisaties/${project.category.slug}`} className="text-ink hover:text-accent">
                {project.category.name}
              </Link>
            </span>
            {project.location && (
              <span className="flex items-center gap-2 text-steel-600">
                <MapPin className="h-4 w-4 text-accent" />
                {project.location}
              </span>
            )}
            {project.year && <span className="text-steel-600">{project.year}</span>}
          </div>

          <ProjectGallery images={project.images} />

          <div className="mt-12">
            <Link
              href={`/realisaties/${project.category.slug}`}
              className="group inline-flex items-center gap-2 text-sm font-medium text-ink transition-colors hover:text-accent"
            >
              <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
              Terug naar {project.category.name.toLowerCase()}
            </Link>
          </div>
        </div>
      </section>

      {related.length > 0 && (
        <section className="border-t border-line bg-white py-20">
          <div className="container-edge">
            <div className="flex items-end justify-between">
              <h2 className="text-3xl text-ink sm:text-4xl">
                Meer in {project.category.name.toLowerCase()}
              </h2>
              <Button href={`/realisaties/${project.category.slug}`} variant="outline">
                Alles bekijken
              </Button>
            </div>
            <div className="mt-10 grid gap-x-7 gap-y-9 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((p) => (
                <Link
                  key={p.id}
                  href={`/realisaties/${project.category.slug}/${p.slug}`}
                  className="group"
                >
                  <div className="relative aspect-[4/3] overflow-hidden rounded-[var(--radius-lg)] bg-white">
                    <Image
                      src={p.coverImage ?? `/images/categories/${project.category.slug}.webp`}
                      alt={p.title}
                      fill
                      sizes="(max-width: 640px) 100vw, 33vw"
                      className="object-cover transition-transform duration-700 ease-steel group-hover:scale-105"
                    />
                  </div>
                  <div className="mt-4 flex items-center justify-between">
                    <h3 className="text-lg text-ink transition-colors group-hover:text-accent">{p.title}</h3>
                    <ArrowRight className="h-4 w-4 text-accent" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
