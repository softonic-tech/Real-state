"use client";

import { useState, useEffect, useMemo } from "react";
import {
  Mail,
  Trash2,
  ChevronDown,
  ChevronUp,
  FileText,
} from "lucide-react";
import toast from "react-hot-toast";
import { proposalService } from "@/services/contact.service";
import { Proposal, PaginationMeta } from "@/types";
import { formatDate, cn } from "@/utils";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import AdminPageHeader from "@/components/admin/AdminPageHeader";
import AdminEmptyState from "@/components/admin/AdminEmptyState";
import AdminPagination from "@/components/admin/AdminPagination";

export default function AdminProposalsPage() {
  const [proposals, setProposals] = useState<Proposal[]>([]);
  const [meta, setMeta] = useState<PaginationMeta | null>(null);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<string>("");
  const [page, setPage] = useState(1);
  const [expanded, setExpanded] = useState<string | null>(null);

  const fetchProposals = async () => {
    setLoading(true);
    try {
      const res = await proposalService.getAll(filter || undefined, page);
      if (res.success) {
        setProposals(res.data || []);
        setMeta(res.meta || null);
      }
    } catch {
      toast.error("Kunde inte hämta förfrågningar.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProposals();
  }, [filter, page]);

  const unreadCount = useMemo(
    () => proposals.filter((p) => !p.read).length,
    [proposals]
  );

  const handleMarkRead = async (id: string) => {
    try {
      await proposalService.markAsRead(id);
      setProposals((prev) =>
        prev.map((p) => (p.id === id ? { ...p, read: true } : p))
      );
    } catch {
      toast.error("Kunde inte markera som läst.");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Vill du radera denna förfrågan? Detta kan inte ångras."))
      return;
    try {
      const res = await proposalService.delete(id);
      if (res.success) {
        toast.success("Förfrågan raderades.");
        fetchProposals();
      }
    } catch {
      toast.error("Något gick fel.");
    }
  };

  const toggleExpand = (proposal: Proposal) => {
    const isOpen = expanded === proposal.id;
    setExpanded(isOpen ? null : proposal.id);
    if (!isOpen && !proposal.read) handleMarkRead(proposal.id);
  };

  return (
    <div>
      <AdminPageHeader
        title="Förfrågningar"
        description={
          unreadCount > 0
            ? `${unreadCount} olästa förfrågningar på denna sida`
            : "Köp- och säljförfrågningar från besökare"
        }
      />

      <div className="flex flex-wrap gap-2 mb-6">
        {[
          { value: "", label: "Alla" },
          { value: "BUYER", label: "Köpare" },
          { value: "SELLER", label: "Säljare" },
        ].map((opt) => (
          <button
            key={opt.value || "all"}
            type="button"
            onClick={() => {
              setFilter(opt.value);
              setPage(1);
            }}
            className={cn(
              "px-4 py-2 rounded-lg text-sm font-body font-medium transition-colors",
              filter === opt.value
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
      ) : proposals.length === 0 ? (
        <AdminEmptyState
          icon={FileText}
          title="Inga förfrågningar ännu"
          description="När någon skickar en köp- eller säljförfrågan via webbplatsen visas den här."
        />
      ) : (
        <>
          <div className="space-y-3">
            {proposals.map((proposal) => {
              const isOpen = expanded === proposal.id;

              return (
                <article
                  key={proposal.id}
                  className={cn(
                    "bg-white rounded-xl border border-stone-200/90 shadow-soft overflow-hidden transition-colors",
                    !proposal.read && "ring-2 ring-brand-200 ring-inset"
                  )}
                >
                  <div className="p-5">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap items-center gap-2 mb-2">
                          <span
                            className={cn(
                              "px-2.5 py-1 rounded-md text-xs font-body font-medium",
                              proposal.type === "BUYER"
                                ? "bg-blue-50 text-blue-700"
                                : "bg-emerald-50 text-emerald-700"
                            )}
                          >
                            {proposal.type === "BUYER" ? "Köpare" : "Säljare"}
                          </span>
                          <span className="text-xs text-stone-400 font-body">
                            {formatDate(proposal.createdAt)}
                          </span>
                          {!proposal.read && (
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase bg-brand-100 text-brand-800">
                              Ny
                            </span>
                          )}
                        </div>
                        <p className="font-body font-semibold text-charcoal">
                          {proposal.name}
                        </p>
                        <p className="text-sm text-stone-500 font-body mt-0.5">
                          {proposal.email} · {proposal.phone}
                        </p>
                        {proposal.propertyName && (
                          <p className="text-sm text-brand-700 font-body mt-2">
                            Fastighet: {proposal.propertyName}
                          </p>
                        )}
                      </div>

                      <div className="flex items-center gap-1 shrink-0">
                        <a
                          href={`mailto:${proposal.email}?subject=Re: ${proposal.type === "BUYER" ? "Köpförfrågan" : "Säljförfrågan"}`}
                          className="p-2 rounded-lg text-stone-400 hover:text-brand-700 hover:bg-brand-50 transition-colors"
                          title="Svara via e-post"
                        >
                          <Mail size={18} />
                        </a>
                        <button
                          type="button"
                          onClick={() => handleDelete(proposal.id)}
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
                          {proposal.message}
                        </p>
                      </div>
                    )}

                    <button
                      type="button"
                      onClick={() => toggleExpand(proposal)}
                      className="mt-4 inline-flex items-center gap-1.5 text-sm font-body font-medium text-brand-700 hover:text-brand-900 transition-colors"
                    >
                      {isOpen ? (
                        <>
                          <ChevronUp size={16} />
                          Dölj förfrågan
                        </>
                      ) : (
                        <>
                          <ChevronDown size={16} />
                          Läs förfrågan
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
