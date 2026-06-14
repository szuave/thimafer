import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Logo } from "@/components/logo";

export default function NotFound() {
  return (
    <div className="relative grid min-h-screen place-items-center overflow-hidden bg-ink p-6 text-paper">
      <div className="bp-grid pointer-events-none absolute inset-0 text-white opacity-[0.05]" />
      <div className="relative text-center">
        <Link href="/" className="inline-flex">
          <Logo light />
        </Link>
        <p className="mt-8 font-display text-[7rem] leading-none text-forge sm:text-[10rem]">
          404
        </p>
        <h1 className="mt-2 text-3xl">Pagina niet gevonden</h1>
        <p className="mx-auto mt-3 max-w-md text-steel-400">
          Deze pagina bestaat niet (meer) of werd verplaatst.
        </p>
        <Link
          href="/"
          className="group mt-8 inline-flex items-center gap-2 bg-forge px-7 py-3.5 font-mono text-xs uppercase tracking-[0.18em] text-white transition-colors hover:bg-forge-deep"
        >
          Terug naar home
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
    </div>
  );
}
