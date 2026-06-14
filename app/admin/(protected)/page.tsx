import Link from "next/link";
import { Hammer, Newspaper, Mail, Plus, ArrowUpRight, Inbox } from "lucide-react";
import { adminStats, listContacts } from "@/lib/admin";
import { formatDateNL } from "@/lib/utils";

export const dynamic = "force-dynamic";

export default async function AdminDashboard() {
  const stats = await adminStats();
  const recent = (await listContacts()).slice(0, 5);

  const cards = [
    { label: "Realisaties", value: stats.projects, icon: Hammer, href: "/admin/realisaties" },
    { label: "Blogartikels", value: stats.posts, sub: `${stats.postsPublished} gepubliceerd`, icon: Newspaper, href: "/admin/blogs" },
    { label: "Nieuwe berichten", value: stats.unread, sub: `${stats.contacts} totaal`, icon: Mail, href: "/admin/contact" },
  ];

  return (
    <div>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-display text-4xl uppercase text-ink">Dashboard</h1>
          <p className="mt-1 text-steel-600">Welkom terug in het beheer van Thimafer.</p>
        </div>
        <div className="flex gap-3">
          <Link href="/admin/realisaties/new" className="inline-flex items-center gap-2 bg-forge px-5 py-3 font-mono text-[11px] uppercase tracking-[0.16em] text-white transition-colors hover:bg-forge-deep">
            <Plus className="h-4 w-4" /> Realisatie
          </Link>
          <Link href="/admin/blogs/new" className="inline-flex items-center gap-2 border border-ink/15 px-5 py-3 font-mono text-[11px] uppercase tracking-[0.16em] text-ink transition-colors hover:border-forge hover:text-forge">
            <Plus className="h-4 w-4" /> Artikel
          </Link>
        </div>
      </div>

      {/* Stat cards */}
      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        {cards.map((c) => (
          <Link
            key={c.label}
            href={c.href}
            className="group flex flex-col justify-between border border-ink/10 bg-paper p-6 transition-colors hover:border-forge"
          >
            <div className="flex items-start justify-between">
              <c.icon className="h-7 w-7 text-forge" strokeWidth={1.5} />
              <ArrowUpRight className="h-5 w-5 text-steel-400 transition-colors group-hover:text-forge" />
            </div>
            <div className="mt-8">
              <p className="font-display text-5xl leading-none text-ink">{c.value}</p>
              <p className="mt-2 text-sm font-medium text-ink">{c.label}</p>
              {c.sub && <p className="text-xs text-steel-500">{c.sub}</p>}
            </div>
          </Link>
        ))}
      </div>

      {/* Recent messages */}
      <div className="mt-10">
        <div className="flex items-center justify-between">
          <h2 className="font-display text-2xl uppercase text-ink">Recente berichten</h2>
          <Link href="/admin/contact" className="font-mono text-[11px] uppercase tracking-[0.16em] text-forge hover:underline">
            Alle berichten
          </Link>
        </div>

        <div className="mt-4 border border-ink/10 bg-paper">
          {recent.length === 0 ? (
            <div className="flex flex-col items-center gap-2 px-6 py-16 text-center text-steel-500">
              <Inbox className="h-8 w-8" />
              <p>Nog geen berichten ontvangen.</p>
            </div>
          ) : (
            <ul className="divide-y divide-ink/8">
              {recent.map((c) => (
                <li key={c.id}>
                  <Link
                    href="/admin/contact"
                    className="flex items-center justify-between gap-4 px-5 py-4 transition-colors hover:bg-paper-2/50"
                  >
                    <div className="min-w-0">
                      <p className="flex items-center gap-2 font-medium text-ink">
                        {!c.isRead && <span className="h-2 w-2 shrink-0 rounded-full bg-forge" />}
                        {c.name}
                        <span className="truncate font-normal text-steel-500">— {c.subject ?? "Bericht"}</span>
                      </p>
                      <p className="truncate text-sm text-steel-500">{c.message}</p>
                    </div>
                    <span className="shrink-0 text-xs text-steel-400">
                      {c.createdAt ? formatDateNL(c.createdAt) : ""}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
