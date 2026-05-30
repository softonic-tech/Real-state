"use client";

import { useState, useEffect } from "react";
import { Eye, Trash2 } from "lucide-react";
import toast from "react-hot-toast";
import { contactService } from "@/services/contact.service";
import { ContactMessage, PaginationMeta } from "@/types";
import { formatDate, cn } from "@/utils";
import LoadingSpinner from "@/components/ui/LoadingSpinner";

export default function AdminMessagesPage() {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [meta, setMeta] = useState<PaginationMeta | null>(null);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [expanded, setExpanded] = useState<string | null>(null);

  const fetchMessages = async () => {
    setLoading(true);
    try {
      const res = await contactService.getAll(page);
      if (res.success) {
        setMessages(res.data || []);
        setMeta(res.meta || null);
      }
    } catch {
      toast.error("Kunde inte hamta meddelanden.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, [page]);

  const handleMarkRead = async (id: string) => {
    try {
      await contactService.markAsRead(id);
      setMessages((prev) =>
        prev.map((m) => (m.id === id ? { ...m, read: true } : m))
      );
    } catch {
      toast.error("Kunde inte markera som last.");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Radera detta meddelande?")) return;
    try {
      const res = await contactService.delete(id);
      if (res.success) {
        toast.success("Meddelandet raderat.");
        fetchMessages();
      }
    } catch {
      toast.error("Nagot gick fel.");
    }
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-display text-2xl text-charcoal mb-1">
          Meddelanden
        </h1>
        <p className="text-stone-500 font-body text-sm">
          Kontaktmeddelanden fran besokare
        </p>
      </div>

      {loading ? (
        <LoadingSpinner size="lg" className="py-20" />
      ) : messages.length === 0 ? (
        <p className="text-center text-stone-400 py-20 font-body">
          Inga meddelanden.
        </p>
      ) : (
        <div className="space-y-3">
          {messages.map((message) => (
            <div
              key={message.id}
              className={cn(
                "bg-white border border-stone-200 p-5 transition-colors",
                !message.read && "border-l-4 border-l-brand-600"
              )}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="px-2 py-0.5 text-xs font-body font-medium bg-stone-100 text-stone-600">
                      {message.subject}
                    </span>
                    <span className="text-xs text-stone-400 font-body">
                      {formatDate(message.createdAt)}
                    </span>
                    {!message.read && (
                      <span className="w-2 h-2 rounded-full bg-brand-600" />
                    )}
                  </div>
                  <p className="font-body font-semibold text-charcoal text-sm">
                    {message.name}
                  </p>
                  <p className="text-xs text-stone-500 font-body">
                    {message.email}
                    {message.phone && ` | ${message.phone}`}
                  </p>

                  {expanded === message.id && (
                    <p className="text-sm text-stone-600 font-body mt-3 leading-relaxed whitespace-pre-wrap">
                      {message.message}
                    </p>
                  )}
                </div>

                <div className="flex items-center gap-1 shrink-0">
                  <button
                    onClick={() => {
                      setExpanded(
                        expanded === message.id ? null : message.id
                      );
                      if (!message.read) handleMarkRead(message.id);
                    }}
                    className="p-2 text-stone-400 hover:text-brand-700 transition-colors"
                    title="Visa/dolj"
                  >
                    <Eye size={16} />
                  </button>
                  <button
                    onClick={() => handleDelete(message.id)}
                    className="p-2 text-stone-400 hover:text-red-600 transition-colors"
                    title="Radera"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}

          {meta && meta.totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 pt-6">
              {Array.from({ length: meta.totalPages }, (_, i) => i + 1).map(
                (p) => (
                  <button
                    key={p}
                    onClick={() => setPage(p)}
                    className={`w-8 h-8 flex items-center justify-center font-body text-xs transition-colors ${
                      p === page
                        ? "bg-brand-800 text-white"
                        : "bg-white border border-stone-200 text-stone-600 hover:bg-stone-200"
                    }`}
                  >
                    {p}
                  </button>
                )
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
