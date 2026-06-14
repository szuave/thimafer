"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, ArrowRight, AlertCircle } from "lucide-react";
import { signIn, signUp } from "@/lib/auth-client";
import { Logo } from "@/components/logo";

export function AuthForm({ bootstrap }: { bootstrap: boolean }) {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      if (bootstrap) {
        const res = await signUp.email({
          email,
          password,
          name: name || "Beheerder",
        });
        if (res.error) {
          setError(res.error.message ?? "Account aanmaken mislukt.");
          return;
        }
      } else {
        const res = await signIn.email({ email, password });
        if (res.error) {
          setError(
            res.error.message ??
              "Inloggen mislukt. Controleer uw e-mail en wachtwoord.",
          );
          return;
        }
      }
      router.push("/admin");
      router.refresh();
    } catch {
      setError("Er ging iets mis. Probeer het opnieuw.");
    } finally {
      setLoading(false);
    }
  }

  const field =
    "w-full rounded-none border border-steel-700 bg-graphite px-4 py-3 text-paper outline-none transition-colors placeholder:text-steel-500 focus:border-forge";

  return (
    <div className="grid min-h-screen place-items-center bg-ink p-6 text-paper">
      <div className="bp-grid pointer-events-none fixed inset-0 text-white opacity-[0.04]" />
      <div className="relative w-full max-w-md">
        <div className="mb-8 flex flex-col items-center text-center">
          <Logo light />
          <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.2em] text-steel-500">
            Beheer
          </p>
        </div>

        <div className="border border-iron bg-coal p-8">
          <h1 className="text-2xl text-paper">
            {bootstrap ? "Eerste beheerder aanmaken" : "Inloggen"}
          </h1>
          <p className="mt-1 text-sm text-steel-400">
            {bootstrap
              ? "Er is nog geen account. Maak het beheerdersaccount aan."
              : "Welkom terug. Log in om de website te beheren."}
          </p>

          {error && (
            <p className="mt-5 flex items-center gap-2 border border-forge/40 bg-forge/10 px-4 py-3 text-sm text-forge-bright">
              <AlertCircle className="h-4 w-4 shrink-0" />
              {error}
            </p>
          )}

          <form onSubmit={onSubmit} className="mt-6 space-y-4">
            {bootstrap && (
              <div>
                <label className="label-mono mb-2 block text-steel-400">Naam</label>
                <input
                  className={field}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Uw naam"
                  autoComplete="name"
                />
              </div>
            )}
            <div>
              <label className="label-mono mb-2 block text-steel-400">E-mail</label>
              <input
                className={field}
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="naam@Thimafer.be"
                autoComplete="email"
              />
            </div>
            <div>
              <label className="label-mono mb-2 block text-steel-400">
                Wachtwoord
              </label>
              <input
                className={field}
                type="password"
                required
                minLength={8}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                autoComplete={bootstrap ? "new-password" : "current-password"}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="group flex w-full items-center justify-center gap-2 bg-forge py-3.5 font-mono text-xs uppercase tracking-[0.18em] text-white transition-colors hover:bg-forge-deep disabled:opacity-60"
            >
              {loading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <>
                  {bootstrap ? "Account aanmaken" : "Inloggen"}
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </>
              )}
            </button>
          </form>
        </div>

        <p className="mt-6 text-center text-xs text-steel-600">
          <a href="/" className="hover:text-forge">
            ← Terug naar de website
          </a>
        </p>
      </div>
    </div>
  );
}
