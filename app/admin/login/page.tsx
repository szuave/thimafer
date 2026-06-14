import type { Metadata } from "next";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { getAuth, getUserCount } from "@/lib/auth";
import { AuthForm } from "@/components/admin/auth-form";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Beheer — inloggen",
  robots: { index: false, follow: false },
};

export default async function AdminLoginPage() {
  const session = await getAuth().api.getSession({ headers: await headers() });
  if (session) redirect("/admin");

  const count = await getUserCount();
  return <AuthForm bootstrap={count === 0} />;
}
