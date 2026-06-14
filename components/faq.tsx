import { Plus } from "lucide-react";
import { JsonLd } from "@/components/json-ld";
import { faqPage } from "@/lib/seo";
import { cn } from "@/lib/utils";

/**
 * Accessible FAQ accordion built on native <details>/<summary>
 * (no client JS) plus FAQPage structured data for rich results.
 */
export function Faq({
  items,
  className,
}: {
  items: { q: string; a: string }[];
  className?: string;
}) {
  if (!items.length) return null;
  return (
    <div className={cn("divide-y divide-line border-y border-line", className)}>
      <JsonLd schema={faqPage(items)} />
      {items.map((it) => (
        <details key={it.q} className="group">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-5 text-lg font-medium text-ink transition-colors hover:text-accent [&::-webkit-details-marker]:hidden">
            {it.q}
            <Plus className="h-5 w-5 shrink-0 text-accent transition-transform duration-300 group-open:rotate-45" />
          </summary>
          <p className="pb-5 pr-9 leading-relaxed text-steel-600">{it.a}</p>
        </details>
      ))}
    </div>
  );
}
