"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Plus, Pencil, Trash2, ExternalLink, Building2 } from "lucide-react";
import toast from "react-hot-toast";
import { propertyService } from "@/services/property.service";
import { Property, PaginationMeta } from "@/types";
import { formatPrice } from "@/utils";
import { STATUS_LABELS, STATUS_COLORS, TYPE_LABELS } from "@/constants";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import AdminPageHeader from "@/components/admin/AdminPageHeader";
import AdminEmptyState from "@/components/admin/AdminEmptyState";
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
      toast.error("Kunde inte hämta fastigheter.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProperties();
  }, [page]);

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Vill du radera "${title}"? Detta kan inte ångras.`)) return;

    try {
      const res = await propertyService.delete(id);
      if (res.success) {
        toast.success("Fastigheten raderades.");
        fetchProperties();
      } else {
        toast.error(res.error || "Kunde inte radera.");
      }
    } catch {
      toast.error("Något gick fel.");
    }
  };

  return (
    <div>
      <AdminPageHeader
        title="Fastigheter"
        description="Hantera alla bostadsannonser — skapa, redigera och ta bort."
        action={
          <Link href="/admin/properties/new" className="btn-primary text-sm">
            <Plus size={16} />
            Ny fastighet
          </Link>
        }
      />

      {loading ? (
        <LoadingSpinner size="lg" className="py-20" />
      ) : properties.length === 0 ? (
        <AdminEmptyState
          icon={Building2}
          title="Inga fastigheter ännu"
          description="Skapa din första annons så visas den på webbplatsen."
          actionLabel="Skapa fastighet"
          actionHref="/admin/properties/new"
        />
      ) : (
        <>
          <p className="text-sm text-stone-500 font-body mb-4">
            {meta?.total || properties.length} fastigheter totalt
          </p>

          <div className="hidden md:block bg-white rounded-xl border border-stone-200/90 shadow-soft overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-stone-100 bg-stone-50/80">
                    <th className="text-left px-5 py-3.5 text-[11px] font-body font-semibold text-stone-500 uppercase tracking-wider">
                      Fastighet
                    </th>
                    <th className="text-left px-5 py-3.5 text-[11px] font-body font-semibold text-stone-500 uppercase tracking-wider">
                      Pris
                    </th>
                    <th className="text-left px-5 py-3.5 text-[11px] font-body font-semibold text-stone-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="text-left px-5 py-3.5 text-[11px] font-body font-semibold text-stone-500 uppercase tracking-wider">
                      Plats
                    </th>
                    <th className="text-right px-5 py-3.5 text-[11px] font-body font-semibold text-stone-500 uppercase tracking-wider">
                      Åtgärder
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {properties.map((property) => (
                    <tr
                      key={property.id}
                      className="border-b border-stone-50 hover:bg-stone-50/80 transition-colors"
                    >
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <div className="relative w-14 h-10 rounded-lg overflow-hidden bg-stone-100 shrink-0">
                            {property.images[0] ? (
                              <Image
                                src={property.images[0]}
                                alt=""
                                fill
                                className="object-cover"
                                sizes="56px"
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center text-stone-300">
                                <Building2 size={16} />
                              </div>
                            )}
                          </div>
                          <div className="min-w-0">
                            <p className="font-body font-semibold text-charcoal text-sm truncate">
                              {property.title}
                            </p>
                            <p className="text-xs text-stone-400 font-body">
                              {TYPE_LABELS[property.propertyType]}
                              {property.images.length > 0 &&
                                ` · ${property.images.length} bilder`}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-5 py-4 font-body text-sm text-stone-700 whitespace-nowrap">
                        {formatPrice(property.price)}
                      </td>
                      <td className="px-5 py-4">
                        <span
                          className={cn(
                            "inline-block px-2.5 py-1 rounded-md text-[10px] font-body font-bold uppercase tracking-wide",
                            STATUS_COLORS[property.status]
                          )}
                        >
                          {STATUS_LABELS[property.status]}
                        </span>
                      </td>
                      <td className="px-5 py-4 font-body text-sm text-stone-600">
                        {property.city}
                      </td>
                      <td className="px-5 py-4">
                        <div className="flex items-center justify-end gap-1">
                          <Link
                            href={`/fastigheter/${property.slug}`}
                            target="_blank"
                            className="p-2 rounded-lg text-stone-400 hover:text-brand-700 hover:bg-brand-50 transition-colors"
                            title="Visa på webbplatsen"
                          >
                            <ExternalLink size={16} />
                          </Link>
                          <Link
                            href={`/admin/properties/edit?id=${property.id}`}
                            className="p-2 rounded-lg text-stone-400 hover:text-brand-700 hover:bg-brand-50 transition-colors"
                            title="Redigera"
                          >
                            <Pencil size={16} />
                          </Link>
                          <button
                            onClick={() => handleDelete(property.id, property.title)}
                            className="p-2 rounded-lg text-stone-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                            title="Radera"
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
          </div>

          <div className="md:hidden space-y-3">
            {properties.map((property) => (
              <div
                key={property.id}
                className="bg-white rounded-xl border border-stone-200/90 shadow-soft p-4"
              >
                <div className="flex gap-3">
                  <div className="relative w-20 h-16 rounded-lg overflow-hidden bg-stone-100 shrink-0">
                    {property.images[0] && (
                      <Image
                        src={property.images[0]}
                        alt=""
                        fill
                        className="object-cover"
                        sizes="80px"
                      />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-body font-semibold text-charcoal text-sm line-clamp-2">
                      {property.title}
                    </p>
                    <p className="text-sm font-display text-brand-800 mt-1">
                      {formatPrice(property.price)}
                    </p>
                    <span
                      className={cn(
                        "inline-block mt-2 px-2 py-0.5 rounded text-[10px] font-bold uppercase",
                        STATUS_COLORS[property.status]
                      )}
                    >
                      {STATUS_LABELS[property.status]}
                    </span>
                  </div>
                </div>
                <div className="flex gap-2 mt-4 pt-3 border-t border-stone-100">
                  <Link
                    href={`/admin/properties/edit?id=${property.id}`}
                    className="flex-1 btn-outline text-xs !py-2 justify-center"
                  >
                    Redigera
                  </Link>
                  <Link
                    href={`/fastigheter/${property.slug}`}
                    target="_blank"
                    className="flex-1 btn-ghost text-xs !py-2 justify-center border border-stone-200"
                  >
                    Visa
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {meta && meta.totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 mt-6">
              {Array.from({ length: meta.totalPages }, (_, i) => i + 1).map(
                (p) => (
                  <button
                    key={p}
                    onClick={() => setPage(p)}
                    className={cn(
                      "w-9 h-9 rounded-lg flex items-center justify-center font-body text-sm transition-colors",
                      p === page
                        ? "bg-brand-800 text-white"
                        : "bg-white border border-stone-200 text-stone-600 hover:bg-stone-50"
                    )}
                  >
                    {p}
                  </button>
                )
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
}
