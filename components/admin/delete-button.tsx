"use client";

import { useTransition } from "react";
import { Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Calls a server action imperatively (no <form>), so it can be safely
 * placed inside another form — e.g. the image-delete button inside the
 * project edit form. Nested <form> elements are invalid HTML.
 */
export function DeleteButton({
  action,
  hidden,
  confirmText = "Weet u zeker dat u dit wilt verwijderen?",
  className,
  children,
}: {
  action: (formData: FormData) => Promise<void>;
  hidden: Record<string, string | number>;
  confirmText?: string;
  className?: string;
  children?: React.ReactNode;
}) {
  const [pending, startTransition] = useTransition();

  return (
    <button
      type="button"
      disabled={pending}
      onClick={() => {
        if (!confirm(confirmText)) return;
        const fd = new FormData();
        for (const [k, v] of Object.entries(hidden)) fd.append(k, String(v));
        startTransition(() => action(fd));
      }}
      className={cn(
        "inline-flex items-center gap-2 text-steel-500 transition-colors hover:text-forge disabled:opacity-50",
        className,
      )}
    >
      {children ?? <Trash2 className="h-4 w-4" />}
    </button>
  );
}
