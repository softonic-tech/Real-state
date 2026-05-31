"use client";

import { useState, useEffect, useMemo } from "react";
import { Mail, Trash2, ChevronDown, ChevronUp, MessageSquare } from "lucide-react";
import toast from "react-hot-toast";
import { contactService } from "@/services/contact.service";
import { ContactMessage, PaginationMeta } from "@/types";
import { formatDate, cn } from "@/utils";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import AdminPageHeader from "@/components/admin/AdminPageHeader";
import AdminEmptyState from "@/components/admin/AdminEmptyState";
import AdminPagination from "@/components/admin/AdminPagination";

type ReadFilter = "all" | "unread" | "read";

export default function AdminMessagesPage() {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [meta, setMeta] = useState<PaginationMeta | null>(null);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [expanded, setExpanded] = useState<string | null>(null);
  const [readFilter, setReadFilter] = useState<ReadFilter>("all");

  const fetchMessages = async () => {
    setLoading(true);
    try {
      const res = await contactService.getAll(page);
      if (res.success) {
        setMessages(res.data || []);
        setMeta(res.meta || null);
      }
    } catch {
      toast.error("Kunde inte hämta meddelanden.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, [page]);

  const unreadCount = useMemo(
    () => messages.filter((m) => !m.read).length,
    [messages]
  );

  const filteredMessages = useMemo(() => {
    if (readFilter === "unread") return messages.filter((m) => !m.read);
    if (readFilter === "read") return messages.filter((m) => m.read);
    return messages;
  }, [messages, readFilter]);

  const handleMarkRead = async (id: string) => {
    try {
      await contactService.markAsRead(id);
      setMessages((prev) =>
        prev.map((m) => (m.id === id ? { ...m, read: true } : m))
      );
    } catch {
      toast.error("Kunde inte markera som läst.");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Vill du radera detta meddelande? Detta kan inte ångras."))
      return;
    try {
      const res = await contactService.delete(id);
      if (res.success) {
        toast.success("Meddelandet raderades.");
        fetchMessages();
      }
    } catch {
      toast.error("Något gick fel.");
    }
  };

  const toggleExpand = (message: ContactMessage) => {
    const isOpen = expanded === message.id;
    setExpanded(isOpen ? null : message.id);
    if (!isOpen && !message.read) handleMarkRead(message.id);
  };

  return (
    <div>
      <AdminPageHeader
        title="Meddelanden"
        description={
          unreadCount > 0
            ? `${unreadCount} olästa meddelanden på denna sida`
            : "Kontaktmeddelanden från besökare via kontaktformuläret"
        }
      />

      <div className="flex flex-wrap gap-2 mb-6">
        {(
          [
            { value: "all", label: "Alla" },
            { value: "unread", label: "Olästa" },
            { value: "read", label: "Lästa" },
          ] as const
        ).map((opt) => (
          <button
            key={opt.value}
            type="button"
            onClick={() => setReadFilter(opt.value)}
            className={cn(
              "px-4 py-2 rounded-lg text-sm font-body font-medium transition-colors",
              readFilter === opt.value
                ? "bg-brand-800 text-white"
                : "bg-white border border-stone-200 text-stone-600 hover:bg-stone-50"
            )}
          >
            {opt.label}
          </button>
        ))}
      </div>

      {loading ? (
        <LoadingSpinner size="lg" className="py-20" />
      ) : messages.length === 0 ? (
        <AdminEmptyState
          icon={MessageSquare}
          title="Inga meddelanden ännu"
          description="När någon skickar ett meddelande via kontaktformuläret visas det här."
        />
      ) : filteredMessages.length === 0 ? (
        <div className="bg-white rounded-xl border border-stone-200/90 shadow-soft py-12 px-6 text-center">
          <p className="text-stone-500 font-body text-sm">
            Inga meddelanden matchar filtret.
          </p>
        </div>
      ) : (
        <>
          <div className="space-y-3">
            {filteredMessages.map((message) => {
              const isOpen = expanded === message.id;

              return (
                <article
                  key={message.id}
                  className={cn(
                    "bg-white rounded-xl border border-stone-200/90 shadow-soft overflow-hidden transition-colors",
                    !message.read && "ring-2 ring-brand-200 ring-inset"
                  )}
                >
                  <div className="p-5">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap items-center gap-2 mb-2">
                          <span className="px-2.5 py-1 rounded-md text-xs font-body font-medium bg-stone-100 text-stone-700">
                            {message.subject}
                          </span>
                          <span className="text-xs text-stone-400 font-body">
                            {formatDate(message.createdAt)}
                          </span>
                          {!message.read && (
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase bg-brand-100 text-brand-800">
                              Nytt
                            </span>
                          )}
                        </div>
                        <p className="font-body font-semibold text-charcoal">
                          {message.name}
                        </p>
                        <p className="text-sm text-stone-500 font-body mt-0.5">
                          {message.email}
                          {message.phone && ` · ${message.phone}`}
                        </p>
                      </div>

                      <div className="flex items-center gap-1 shrink-0">
                        <a
                          href={`mailto:${message.email}?subject=Re: ${encodeURIComponent(message.subject)}`}
                          className="p-2 rounded-lg text-stone-400 hover:text-brand-700 hover:bg-brand-50 transition-colors"
                          title="Svara via e-post"
                        >
                          <Mail size={18} />
                        </a>
                        <button
                          type="button"
                          onClick={() => handleDelete(message.id)}
                          className="p-2 rounded-lg text-stone-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                          title="Radera"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </div>

                    {isOpen && (
                      <div className="mt-4 pt-4 border-t border-stone-100">
                        <p className="text-sm text-stone-600 font-body leading-relaxed whitespace-pre-wrap">
                          {message.message}
                        </p>
                      </div>
                    )}

                    <button
                      type="button"
                      onClick={() => toggleExpand(message)}
                      className="mt-4 inline-flex items-center gap-1.5 text-sm font-body font-medium text-brand-700 hover:text-brand-900 transition-colors"
                    >
                      {isOpen ? (
                        <>
                          <ChevronUp size={16} />
                          Dölj meddelande
                        </>
                      ) : (
                        <>
                          <ChevronDown size={16} />
                          Läs meddelande
                        </>
                      )}
                    </button>
                  </div>
                </article>
              );
            })}
          </div>

          {meta && (
            <AdminPagination
              page={page}
              totalPages={meta.totalPages}
              onPageChange={setPage}
            />
          )}
        </>
      )}
    </div>
  );
}
