import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { PostForm } from "@/components/admin/post-form";

export const dynamic = "force-dynamic";

export default function NewPostPage() {
  return (
    <div>
      <Link
        href="/admin/blogs"
        className="inline-flex items-center gap-2 text-sm text-steel-600 transition-colors hover:text-forge"
      >
        <ArrowLeft className="h-4 w-4" /> Terug naar blog
      </Link>
      <h1 className="mt-4 font-display text-4xl uppercase text-ink">
        Nieuw artikel
      </h1>
      <p className="mt-1 mb-8 text-steel-600">
        Schrijf je artikel en publiceer wanneer je klaar bent.
      </p>

      <PostForm />
    </div>
  );
}
