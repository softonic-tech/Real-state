"use client";

import { useState, useEffect } from "react";
import { Eye, Trash2 } from "lucide-react";
import toast from "react-hot-toast";
import { proposalService } from "@/services/contact.service";
import { Proposal, PaginationMeta } from "@/types";
import { formatDate, cn } from "@/utils";
import LoadingSpinner from "@/components/ui/LoadingSpinner";

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
      toast.error("Kunde inte hamta forfragningar.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProposals();
  }, [filter, page]);

  const handleMarkRead = async (id: string) => {
    try {
      await proposalService.markAsRead(id);
      setProposals((prev) =>
        prev.map((p) => (p.id === id ? { ...p, read: true } : p))
      );
    } catch {
      toast.error("Kunde inte markera som last.");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Radera denna forfragan?")) return;
    try {
      const res = await proposalService.delete(id);
      if (res.success) {
        toast.success("Forfragan raderad.");
        fetchProposals();
      }
    } catch {
      toast.error("Nagot gick fel.");
    }
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-display text-2xl text-charcoal mb-1">
          Forfragningar
        </h1>
        <p className="text-stone-500 font-body text-sm">
          Kop- och saljforfragningar fran besokare
        </p>
      </div>

      <div className="flex gap-2 mb-6">
        {[
          { value: "", label: "Alla" },
          { value: "BUYER", label: "Kopare" },
          { value: "SELLER", label: "Saljare" },
        ].map((opt) => (
          <button
            key={opt.value}
            onClick={() => {
              setFilter(opt.value);
              setPage(1);
            }}
            className={cn(
              "px-4 py-2 text-xs font-body font-medium tracking-wide uppercase transition-colors",
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
        <p className="text-center text-stone-400 py-20 font-body">
          Inga forfragningar.
        </p>
      ) : (
        <div className="space-y-3">
          {proposals.map((proposal) => (
            <div
              key={proposal.id}
              className={cn(
                "bg-white border border-stone-200 p-5 transition-colors",
                !proposal.read && "border-l-4 border-l-brand-600"
              )}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-2">
                    <span
                      className={cn(
                        "px-2 py-0.5 text-xs font-body font-medium",
                        proposal.type === "BUYER"
                          ? "bg-blue-50 text-blue-700"
                          : "bg-green-50 text-green-700"
                      )}
                    >
                      {proposal.type === "BUYER" ? "Kopare" : "Saljare"}
                    </span>
                    <span className="text-xs text-stone-400 font-body">
                      {formatDate(proposal.createdAt)}
                    </span>
                    {!proposal.read && (
                      <span className="w-2 h-2 rounded-full bg-brand-600" />
                    )}
                  </div>
                  <p className="font-body font-semibold text-charcoal text-sm">
                    {proposal.name}
                  </p>
                  <p className="text-xs text-stone-500 font-body">
                    {proposal.email} | {proposal.phone}
                  </p>
                  {proposal.propertyName && (
                    <p className="text-xs text-brand-600 font-body mt-1">
                      Fastighet: {proposal.propertyName}
                    </p>
                  )}

                  {expanded === proposal.id && (
                    <p className="text-sm text-stone-600 font-body mt-3 leading-relaxed whitespace-pre-wrap">
                      {proposal.message}
                    </p>
                  )}
                </div>

                <div className="flex items-center gap-1 shrink-0">
                  <button
                    onClick={() => {
                      setExpanded(
                        expanded === proposal.id ? null : proposal.id
                      );
                      if (!proposal.read) handleMarkRead(proposal.id);
                    }}
                    className="p-2 text-stone-400 hover:text-brand-700 transition-colors"
                    title="Visa/dolj"
                  >
                    <Eye size={16} />
                  </button>
                  <button
                    onClick={() => handleDelete(proposal.id)}
                    className="p-2 text-stone-400 hover:text-red-600 transition-colors"
                    title="Radera"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
