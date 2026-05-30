"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Plus, Pencil, Trash2 } from "lucide-react";
import toast from "react-hot-toast";
import { propertyService } from "@/services/property.service";
import { Property, PaginationMeta } from "@/types";
import { formatPrice } from "@/utils";
import { STATUS_LABELS, STATUS_COLORS, TYPE_LABELS } from "@/constants";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import { cn } from "@/utils";

export default function AdminPropertiesPage() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [meta, setMeta] = useState<PaginationMeta | null>(null);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);

  const fetchProperties = async () => {
    setLoading(true);
    try {
      const res = await propertyService.getAll({ page });
      if (res.success) {
        setProperties(res.data || []);
        setMeta(res.meta || null);
      }
    } catch {
      toast.error("Kunde inte hamta fastigheter.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProperties();
  }, [page]);

  const handleDelete = async (id: string) => {
    if (!confirm("Ar du saker pa att du vill radera denna fastighet?")) return;

    try {
      const res = await propertyService.delete(id);
      if (res.success) {
        toast.success("Fastigheten raderades.");
        fetchProperties();
      } else {
        toast.error(res.error || "Kunde inte radera.");
      }
    } catch {
      toast.error("Nagot gick fel.");
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-display text-2xl text-charcoal mb-1">
            Fastigheter
          </h1>
          <p className="text-stone-500 font-body text-sm">
            Hantera dina fastighetsannonser
          </p>
        </div>
        <Link href="/admin/properties/new" className="btn-primary text-xs py-2.5 px-5">
          <Plus size={16} className="mr-2" />
          Ny fastighet
        </Link>
      </div>

      {loading ? (
        <LoadingSpinner size="lg" className="py-20" />
      ) : (
        <div className="bg-white border border-stone-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-stone-200 bg-stone-50">
                  <th className="text-left px-6 py-3 text-xs font-body font-semibold text-stone-500 tracking-wide uppercase">
                    Titel
                  </th>
                  <th className="text-left px-6 py-3 text-xs font-body font-semibold text-stone-500 tracking-wide uppercase">
                    Pris
                  </th>
                  <th className="text-left px-6 py-3 text-xs font-body font-semibold text-stone-500 tracking-wide uppercase">
                    Typ
                  </th>
                  <th className="text-left px-6 py-3 text-xs font-body font-semibold text-stone-500 tracking-wide uppercase">
                    Status
                  </th>
                  <th className="text-left px-6 py-3 text-xs font-body font-semibold text-stone-500 tracking-wide uppercase">
                    Stad
                  </th>
                  <th className="text-right px-6 py-3 text-xs font-body font-semibold text-stone-500 tracking-wide uppercase">
                    Atgarder
                  </th>
                </tr>
              </thead>
              <tbody>
                {properties.map((property) => (
                  <tr
                    key={property.id}
                    className="border-b border-stone-100 hover:bg-stone-50 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <p className="font-body font-medium text-charcoal text-sm">
                        {property.title}
                      </p>
                    </td>
                    <td className="px-6 py-4">
                      <p className="font-body text-sm text-stone-600">
                        {formatPrice(property.price)}
                      </p>
                    </td>
                    <td className="px-6 py-4">
                      <p className="font-body text-sm text-stone-600">
                        {TYPE_LABELS[property.propertyType]}
                      </p>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={cn(
                          "px-2.5 py-1 text-xs font-body font-medium",
                          STATUS_COLORS[property.status]
                        )}
                      >
                        {STATUS_LABELS[property.status]}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <p className="font-body text-sm text-stone-600">
                        {property.city}
                      </p>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          href={`/admin/properties/edit?id=${property.id}`}
                          className="p-2 text-stone-400 hover:text-brand-700 transition-colors"
                        >
                          <Pencil size={16} />
                        </Link>
                        <button
                          onClick={() => handleDelete(property.id)}
                          className="p-2 text-stone-400 hover:text-red-600 transition-colors"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {meta && meta.totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 p-4 border-t border-stone-200">
              {Array.from({ length: meta.totalPages }, (_, i) => i + 1).map(
                (p) => (
                  <button
                    key={p}
                    onClick={() => setPage(p)}
                    className={`w-8 h-8 flex items-center justify-center font-body text-xs transition-colors ${
                      p === page
                        ? "bg-brand-800 text-white"
                        : "bg-stone-100 text-stone-600 hover:bg-stone-200"
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
