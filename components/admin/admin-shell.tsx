import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { Logo } from "@/components/logo";
import { AdminNav } from "./admin-nav";
import { LogoutButton } from "./logout-button";

export function AdminShell({
  children,
  userName,
  userEmail,
}: {
  children: React.ReactNode;
  userName: string;
  userEmail: string;
}) {
  return (
    <div className="min-h-screen bg-paper-2/30 lg:grid lg:grid-cols-[260px_1fr]">
      {/* Sidebar */}
      <aside className="flex flex-col bg-ink text-paper lg:sticky lg:top-0 lg:h-screen">
        <div className="border-b border-iron px-6 py-5">
          <Link href="/admin" className="inline-flex flex-col gap-1.5">
            <Logo light className="h-6" />
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-steel-600">
              Beheer
            </span>
          </Link>
        </div>
        <div className="flex-1 p-3 lg:p-4">
          <AdminNav />
        </div>
        <div className="border-t border-iron p-4">
          <Link
            href="/"
            target="_blank"
            className="flex items-center gap-2 text-sm text-steel-400 transition-colors hover:text-forge"
          >
            <ExternalLink className="h-4 w-4" />
            Bekijk website
          </Link>
        </div>
      </aside>

      {/* Main */}
      <div className="flex min-h-screen flex-col">
        <header className="flex items-center justify-between border-b border-ink/10 bg-paper px-6 py-4">
          <div className="leading-tight">
            <p className="text-sm font-medium text-ink">{userName}</p>
            <p className="text-xs text-steel-500">{userEmail}</p>
          </div>
          <LogoutButton />
        </header>
        <main className="flex-1 p-6 lg:p-10">
          <div className="mx-auto w-full max-w-5xl">{children}</div>
        </main>
      </div>
    </div>
  );
}
