import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { PageHero } from "@/components/ui/page-hero";
import { getPublishedPosts } from "@/lib/queries";
import { formatDateNL } from "@/lib/utils";

export const dynamic = "force-dynamic";

export const metadata: Metadata = pageMeta({
  title: "Blog",
  description:
    "Nieuws, inzichten en inspiratie over maatwerk in staal, metaalbewerking en onze projecten.",
  path: "/blog",
});

export default async function BlogPage() {
  const posts = await getPublishedPosts();

  return (
    <>
      <PageHero
        eyebrow="/ Blog & nieuws"
        title={
          <>
            Inzichten in <span className="text-forge">staal</span>
          </>
        }
        intro="Nieuws, inspiratie en achtergrond over onze projecten en het vak."
        crumbs={[{ label: "Blog" }]}
      />

      <section className="bg-paper py-20 lg:py-28">
        <div className="container-edge">
          {posts.length === 0 ? (
            <p className="text-steel-500">Binnenkort verschijnen hier onze eerste artikels.</p>
          ) : (
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {posts.map((post, i) => (
                <Link
                  key={post.id}
                  href={`/blog/${post.slug}`}
                  data-reveal
                  style={{ "--reveal-delay": `${(i % 3) * 80}ms` } as React.CSSProperties}
                  className="group flex flex-col"
                >
                  <div className="relative aspect-[16/10] overflow-hidden bg-ink">
                    {post.coverImage && (
                      <Image
                        src={post.coverImage}
                        alt={post.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        className="object-cover transition-transform duration-700 ease-steel group-hover:scale-105"
                      />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-ink/40 to-transparent" />
                  </div>
                  <div className="flex flex-1 flex-col pt-5">
                    {post.publishedAt && (
                      <span className="label-mono text-steel-500">
                        {formatDateNL(post.publishedAt)}
                      </span>
                    )}
                    <h2 className="mt-2 text-2xl text-ink transition-colors group-hover:text-forge">
                      {post.title}
                    </h2>
                    {post.excerpt && (
                      <p className="mt-2 flex-1 text-sm leading-relaxed text-steel-600">
                        {post.excerpt}
                      </p>
                    )}
                    <span className="mt-4 inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.16em] text-ink transition-colors group-hover:text-forge">
                      Lees meer
                      <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
