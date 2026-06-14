import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getPostBySlug } from "@/lib/queries";
import { formatDateNL } from "@/lib/utils";
import { pageMeta, blogPostingSchema, breadcrumbList } from "@/lib/seo";
import { JsonLd } from "@/components/json-ld";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return {};
  return pageMeta({
    title: post.title,
    description: post.excerpt ?? undefined,
    path: `/blog/${post.slug}`,
    image: post.coverImage,
    imageAlt: post.title,
    type: "article",
    publishedTime: post.publishedAt?.toISOString(),
    modifiedTime: (post.updatedAt ?? post.publishedAt)?.toISOString(),
  });
}

export default async function PostDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) notFound();

  return (
    <article>
      <JsonLd
        schema={[
          blogPostingSchema(post),
          breadcrumbList([
            { name: "Home", path: "/" },
            { name: "Blog", path: "/blog" },
            { name: post.title },
          ]),
        ]}
      />
      {/* Header */}
      <header className="border-b border-line bg-white">
        <div className="container-edge pb-12 pt-32 lg:pt-40">
          <nav className="flex items-center gap-2 text-sm text-steel-400">
            <Link href="/" className="hover:text-accent">Home</Link>
            <span className="text-steel-300">/</span>
            <Link href="/blog" className="hover:text-accent">Blog</Link>
          </nav>
          {post.publishedAt && (
            <p className="eyebrow mt-7 text-accent">{formatDateNL(post.publishedAt)}</p>
          )}
          <h1 className="mt-4 max-w-4xl text-4xl sm:text-5xl">{post.title}</h1>
          {post.excerpt && (
            <p className="mt-5 max-w-2xl text-lg text-steel-500">{post.excerpt}</p>
          )}
        </div>
      </header>

      {/* Cover */}
      {post.coverImage && (
        <div className="bg-white">
          <div className="container-edge pt-10">
            <div className="relative aspect-[16/9] w-full overflow-hidden rounded-[var(--radius-lg)] bg-mist">
              <Image
                src={post.coverImage}
                alt={post.title}
                fill
                sizes="100vw"
                className="object-cover"
                priority
              />
            </div>
          </div>
        </div>
      )}

      {/* Body */}
      <section className="bg-white pb-24 pt-12 lg:pt-16">
        <div className="container-edge">
          <div
            className="mx-auto max-w-2xl text-lg leading-relaxed text-steel-600 [&_h2]:mt-10 [&_h2]:font-display [&_h2]:text-2xl [&_h2]:font-semibold [&_h2]:text-ink [&_p]:mt-5"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          <div className="mx-auto mt-14 max-w-2xl border-t border-ink/10 pt-8">
            <Link
              href="/blog"
              className="group inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.16em] text-ink transition-colors hover:text-forge"
            >
              <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
              Terug naar de blog
            </Link>
          </div>
        </div>
      </section>
    </article>
  );
}
