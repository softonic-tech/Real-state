"use client";

import { useState, useEffect, useCallback, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Search, SlidersHorizontal, X } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import PageHeader from "@/components/ui/PageHeader";
import PropertyCard from "@/components/cards/PropertyCard";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import { propertyService } from "@/services/property.service";
import { Property, PaginationMeta } from "@/types";
import { TYPE_LABELS, STATUS_LABELS } from "@/constants";
import { useDebounce } from "@/hooks";

function PropertiesContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [properties, setProperties] = useState<Property[]>([]);
  const [meta, setMeta] = useState<PaginationMeta | null>(null);
  const [loading, setLoading] = useState(true);
  const [showFilters, setShowFilters] = useState(false);

  const [search, setSearch] = useState(searchParams.get("search") || "");
  const [propertyType, setPropertyType] = useState(
    searchParams.get("propertyType") || ""
  );
  const [status, setStatus] = useState(searchParams.get("status") || "");
  const [page, setPage] = useState(
    parseInt(searchParams.get("page") || "1", 10)
  );

  const debouncedSearch = useDebounce(search, 400);

  const fetchProperties = useCallback(async () => {
    setLoading(true);
    try {
      const res = await propertyService.getAll({
        search: debouncedSearch || undefined,
        propertyType: propertyType || undefined,
        status: status || undefined,
        page,
      });
      if (res.success) {
        setProperties(res.data || []);
        setMeta(res.meta || null);
      }
    } catch {
      // Handle error silently
    } finally {
      setLoading(false);
    }
  }, [debouncedSearch, propertyType, status, page]);

  useEffect(() => {
    fetchProperties();
  }, [fetchProperties]);

  useEffect(() => {
    const params = new URLSearchParams();
    if (debouncedSearch) params.set("search", debouncedSearch);
    if (propertyType) params.set("propertyType", propertyType);
    if (status) params.set("status", status);
    if (page > 1) params.set("page", String(page));
    router.replace(`/fastigheter?${params.toString()}`, { scroll: false });
  }, [debouncedSearch, propertyType, status, page, router]);

  const clearFilters = () => {
    setSearch("");
    setPropertyType("");
    setStatus("");
    setPage(1);
  };

  const hasActiveFilters = search || propertyType || status;

  return (
    <>
      <PageHeader
        title="Fastigheter"
        subtitle="Utforska vart aktuella utbud av skogs- och jordbruksfastigheter over hela Sverige."
        label="Vart utbud"
      />

      <section className="section-padding page-container py-12">
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="flex-1 relative">
            <Search
              size={16}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400"
            />
            <input
              type="text"
              placeholder="Sok pa stad, omrade eller titel..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
              className="input-field pl-11"
            />
          </div>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="btn-outline py-3 md:w-auto"
          >
            <SlidersHorizontal size={16} className="mr-2" />
            Filter
          </button>
          {hasActiveFilters && (
            <button onClick={clearFilters} className="btn-ghost text-stone-500">
              <X size={16} className="mr-1" />
              Rensa
            </button>
          )}
        </div>

        {showFilters && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8 p-6 bg-white border border-stone-100 animate-fade-in">
            <div>
              <label className="block text-xs font-body font-medium text-stone-500 tracking-wide uppercase mb-2">
                Fastighetstyp
              </label>
              <select
                value={propertyType}
                onChange={(e) => {
                  setPropertyType(e.target.value);
                  setPage(1);
                }}
                className="input-field"
              >
                <option value="">Alla typer</option>
                {Object.entries(TYPE_LABELS).map(([key, label]) => (
                  <option key={key} value={key}>
                    {label}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-body font-medium text-stone-500 tracking-wide uppercase mb-2">
                Status
              </label>
              <select
                value={status}
                onChange={(e) => {
                  setStatus(e.target.value);
                  setPage(1);
                }}
                className="input-field"
              >
                <option value="">Alla statusar</option>
                {Object.entries(STATUS_LABELS).map(([key, label]) => (
                  <option key={key} value={key}>
                    {label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        )}

        {loading ? (
          <LoadingSpinner size="lg" className="py-20" />
        ) : properties.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-stone-400 font-body text-lg mb-2">
              Inga fastigheter hittades.
            </p>
            <p className="text-stone-400 font-body text-sm">
              Forsok med andra sokkriterier.
            </p>
          </div>
        ) : (
          <>
            <p className="text-sm text-stone-500 font-body mb-6">
              Visar {properties.length} av {meta?.total || 0} fastigheter
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {properties.map((property) => (
                <PropertyCard key={property.id} property={property} />
              ))}
            </div>

            {meta && meta.totalPages > 1 && (
              <div className="flex items-center justify-center gap-2 mt-12">
                {Array.from({ length: meta.totalPages }, (_, i) => i + 1).map(
                  (p) => (
                    <button
                      key={p}
                      onClick={() => {
                        setPage(p);
                        window.scrollTo({ top: 0, behavior: "smooth" });
                      }}
                      className={`w-10 h-10 flex items-center justify-center font-body text-sm transition-colors ${
                        p === page
                          ? "bg-brand-800 text-white"
                          : "bg-white border border-stone-200 text-stone-600 hover:bg-stone-50"
                      }`}
                    >
                      {p}
                    </button>
                  )
                )}
              </div>
            )}
          </>
        )}
      </section>
    </>
  );
}

export default function FastigheterPage() {
  return (
    <>
      <Header />
      <main>
        <Suspense fallback={<LoadingSpinner size="lg" className="py-40" />}>
          <PropertiesContent />
        </Suspense>
      </main>
      <Footer />
    </>
  );
}
