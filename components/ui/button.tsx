import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "outline" | "light";

const base =
  "group/btn inline-flex items-center justify-center gap-2 rounded-[var(--radius)] px-6 py-3 text-sm font-medium transition-colors duration-200";

const variants: Record<Variant, string> = {
  primary: "bg-accent text-white hover:bg-[var(--color-accent-dark)]",
  outline: "border border-line bg-white text-ink hover:border-accent hover:text-accent",
  light: "border border-white/50 text-white hover:bg-white hover:text-ink",
};

export function Button({
  href,
  children,
  variant = "primary",
  className,
  arrow = true,
  external = false,
}: {
  href: string;
  children: React.ReactNode;
  variant?: Variant;
  className?: string;
  arrow?: boolean;
  external?: boolean;
}) {
  const content = (
    <>
      {children}
      {arrow && (
        <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover/btn:translate-x-0.5" />
      )}
    </>
  );

  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={cn(base, variants[variant], className)}
      >
        {content}
      </a>
    );
  }

  return (
    <Link href={href} className={cn(base, variants[variant], className)}>
      {content}
    </Link>
  );
}
