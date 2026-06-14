"use client";

import { useActionState } from "react";
import Image from "next/image";
import { Loader2, Save, AlertCircle } from "lucide-react";
import {
  savePost,
  type PostFormState,
} from "@/app/admin/(protected)/blogs/actions";
import { cn } from "@/lib/utils";

type Post = {
  id: number;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string;
  coverImage: string | null;
  published: boolean;
};

const label = "label-mono mb-2 block text-steel-600";
const field =
  "w-full rounded-none border border-ink/15 bg-white px-4 py-3 text-ink outline-none transition-colors focus:border-forge";

export function PostForm({ post }: { post?: Post }) {
  const [state, action, pending] = useActionState<PostFormState, FormData>(
    savePost,
    null,
  );

  return (
    <form action={action} className="max-w-3xl space-y-6">
      {post && <input type="hidden" name="id" value={post.id} />}

      {state?.error && (
        <p className="flex items-center gap-2 border border-forge/30 bg-forge/5 px-4 py-3 text-sm text-forge-deep">
          <AlertCircle className="h-4 w-4 shrink-0" />
          {state.error}
        </p>
      )}

      <div>
        <label className={label}>Titel *</label>
        <input name="title" required defaultValue={post?.title} className={field} />
      </div>

      <div>
        <label className={label}>Slug (optioneel)</label>
        <input
          name="slug"
          defaultValue={post?.slug}
          className={field}
          placeholder="automatisch uit titel"
        />
      </div>

      <div>
        <label className={label}>Korte samenvatting</label>
        <textarea
          name="excerpt"
          rows={2}
          defaultValue={post?.excerpt ?? ""}
          className={cn(field, "resize-y")}
          placeholder="Eén of twee zinnen die in het overzicht verschijnen."
        />
      </div>

      <div>
        <label className={label}>Inhoud *</label>
        <textarea
          name="content"
          rows={14}
          required
          defaultValue={post?.content}
          className={cn(field, "resize-y font-sans leading-relaxed")}
          placeholder="Schrijf hier uw artikel. Laat een lege regel tussen alinea's."
        />
        <p className="mt-1 text-xs text-steel-500">
          Tip: gewone tekst volstaat — lege regels worden automatisch alinea's.
        </p>
      </div>

      <div>
        <label className={label}>Coverfoto {post ? "(vervangen)" : ""}</label>
        {post?.coverImage && (
          <div className="relative mb-3 h-40 w-64 overflow-hidden border border-ink/10">
            <Image src={post.coverImage} alt="" fill className="object-cover" sizes="256px" />
          </div>
        )}
        <input type="file" name="cover" accept="image/*" className={cn(field, "py-2.5")} />
      </div>

      <div className="border-y border-ink/10 py-5">
        <label className="flex items-center gap-3 text-sm text-ink">
          <input
            type="checkbox"
            name="published"
            defaultChecked={post?.published ?? false}
            className="h-4 w-4 accent-[var(--color-forge)]"
          />
          Publiceren (zichtbaar op de website)
        </label>
      </div>

      <button
        type="submit"
        disabled={pending}
        className="inline-flex items-center gap-2 bg-forge px-7 py-3.5 font-mono text-xs uppercase tracking-[0.18em] text-white transition-colors hover:bg-forge-deep disabled:opacity-60"
      >
        {pending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
        {post ? "Wijzigingen opslaan" : "Artikel aanmaken"}
      </button>
    </form>
  );
}
