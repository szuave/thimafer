import { Mail, Phone, Check, RotateCcw, Inbox } from "lucide-react";
import { listContacts } from "@/lib/admin";
import { formatDateNL } from "@/lib/utils";
import { setRead, deleteContact } from "./actions";
import { DeleteButton } from "@/components/admin/delete-button";
import { cn } from "@/lib/utils";

export const dynamic = "force-dynamic";

export default async function AdminContactPage() {
  const messages = await listContacts();
  const unread = messages.filter((m) => !m.isRead).length;

  return (
    <div>
      <div>
        <h1 className="font-display text-4xl uppercase text-ink">Berichten</h1>
        <p className="mt-1 text-steel-600">
          {messages.length} bericht(en){unread > 0 && ` · ${unread} ongelezen`}
        </p>
      </div>

      {messages.length === 0 ? (
        <div className="mt-8 flex flex-col items-center gap-3 border border-ink/10 bg-paper px-6 py-20 text-center text-steel-500">
          <Inbox className="h-9 w-9" />
          <p>Nog geen berichten ontvangen via het contactformulier.</p>
        </div>
      ) : (
        <div className="mt-8 space-y-4">
          {messages.map((m) => (
            <article
              key={m.id}
              className={cn(
                "border bg-paper p-6 transition-colors",
                m.isRead ? "border-ink/10" : "border-forge/40 bg-forge/[0.03]",
              )}
            >
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <h2 className="flex items-center gap-2 text-xl text-ink">
                    {!m.isRead && <span className="h-2 w-2 rounded-full bg-forge" />}
                    {m.name}
                  </h2>
                  <div className="mt-2 flex flex-wrap items-center gap-x-5 gap-y-1 text-sm text-steel-600">
                    <a href={`mailto:${m.email}`} className="flex items-center gap-1.5 hover:text-forge">
                      <Mail className="h-4 w-4 text-forge" /> {m.email}
                    </a>
                    {m.phone && (
                      <a href={`tel:${m.phone}`} className="flex items-center gap-1.5 hover:text-forge">
                        <Phone className="h-4 w-4 text-forge" /> {m.phone}
                      </a>
                    )}
                  </div>
                </div>
                <span className="text-xs text-steel-400">
                  {m.createdAt ? formatDateNL(m.createdAt) : ""}
                </span>
              </div>

              {m.subject && (
                <p className="mt-4 font-medium text-ink">{m.subject}</p>
              )}
              <p className="mt-2 whitespace-pre-wrap leading-relaxed text-steel-700">
                {m.message}
              </p>

              <div className="mt-5 flex items-center gap-4 border-t border-ink/8 pt-4">
                <form action={setRead}>
                  <input type="hidden" name="id" value={m.id} />
                  <input type="hidden" name="read" value={(!m.isRead).toString()} />
                  <button
                    type="submit"
                    className="inline-flex items-center gap-2 text-sm text-steel-600 transition-colors hover:text-forge"
                  >
                    {m.isRead ? (
                      <>
                        <RotateCcw className="h-4 w-4" /> Markeer als ongelezen
                      </>
                    ) : (
                      <>
                        <Check className="h-4 w-4" /> Markeer als gelezen
                      </>
                    )}
                  </button>
                </form>
                <a
                  href={`mailto:${m.email}?subject=${encodeURIComponent("RE: " + (m.subject ?? "uw bericht"))}`}
                  className="inline-flex items-center gap-2 text-sm text-steel-600 transition-colors hover:text-forge"
                >
                  <Mail className="h-4 w-4" /> Antwoorden
                </a>
                <DeleteButton
                  action={deleteContact}
                  hidden={{ id: m.id }}
                  confirmText="Dit bericht verwijderen?"
                  className="text-sm"
                >
                  <span className="inline-flex items-center gap-2">
                    Verwijderen
                  </span>
                </DeleteButton>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
