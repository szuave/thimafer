"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Hammer, Layers, Newspaper, Mail } from "lucide-react";
import { cn } from "@/lib/utils";

const items = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard, exact: true },
  { href: "/admin/realisaties", label: "Realisaties", icon: Hammer },
  { href: "/admin/categories", label: "Rubrieken", icon: Layers },
  { href: "/admin/blogs", label: "Blog", icon: Newspaper },
  { href: "/admin/contact", label: "Berichten", icon: Mail },
];

export function AdminNav() {
  const pathname = usePathname();
  const isActive = (href: string, exact?: boolean) =>
    exact ? pathname === href : pathname.startsWith(href);

  return (
    <nav className="flex gap-1 overflow-x-auto lg:flex-col lg:overflow-visible">
      {items.map((it) => {
        const active = isActive(it.href, it.exact);
        return (
          <Link
            key={it.href}
            href={it.href}
            className={cn(
              "flex shrink-0 items-center gap-3 px-4 py-3 text-sm font-medium transition-colors",
              active
                ? "bg-forge text-white"
                : "text-steel-300 hover:bg-graphite hover:text-paper",
            )}
          >
            <it.icon className="h-4.5 w-4.5" strokeWidth={1.6} />
            {it.label}
          </Link>
        );
      })}
    </nav>
  );
}
