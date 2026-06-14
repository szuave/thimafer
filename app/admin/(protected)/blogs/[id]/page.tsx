import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { getPostAdmin } from "@/lib/admin";
import { PostForm } from "@/components/admin/post-form";

export const dynamic = "force-dynamic";

export default async function EditPostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const post = await getPostAdmin(Number(id));
  if (!post) notFound();

  return (
    <div>
      <div className="flex items-center justify-between gap-4">
        <Link
          href="/admin/blogs"
          className="inline-flex items-center gap-2 text-sm text-steel-600 transition-colors hover:text-forge"
        >
          <ArrowLeft className="h-4 w-4" /> Terug naar blog
        </Link>
        {post.published && (
          <Link
            href={`/blog/${post.slug}`}
            target="_blank"
            className="inline-flex items-center gap-2 text-sm text-steel-600 transition-colors hover:text-forge"
          >
            Bekijk op site <ExternalLink className="h-4 w-4" />
          </Link>
        )}
      </div>
      <h1 className="mt-4 font-display text-4xl uppercase text-ink">
        {post.title}
      </h1>
      <p className="mt-1 mb-8 text-steel-600">Artikel bewerken</p>

      <PostForm post={post} />
    </div>
  );
}
