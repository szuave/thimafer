"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { LogOut, Loader2 } from "lucide-react";
import { signOut } from "@/lib/auth-client";

export function LogoutButton() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  return (
    <button
      type="button"
      disabled={loading}
      onClick={async () => {
        setLoading(true);
        await signOut();
        router.push("/admin/login");
        router.refresh();
      }}
      className="inline-flex items-center gap-2 border border-ink/15 px-4 py-2 font-mono text-[11px] uppercase tracking-[0.16em] text-ink transition-colors hover:border-forge hover:text-forge disabled:opacity-60"
    >
      {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <LogOut className="h-4 w-4" />}
      Uitloggen
    </button>
  );
}
