"use client";

import { useState, useEffect, useCallback, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Search, SlidersHorizontal, X, Home } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import PageHeader from "@/components/ui/PageHeader";
import PropertyCard from "@/components/cards/PropertyCard";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import ScrollReveal from "@/components/ui/ScrollReveal";
import CTASection from "@/components/sections/CTASection";
import { propertyService } from "@/services/property.service";
import { Property, PaginationMeta } from "@/types";
import { TYPE_LABELS, STATUS_LABELS, COUNTIES } from "@/constants";
import { useDebounce } from "@/hooks";

function PropertiesContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [properties, setProperties] = useState<Property[]>([]);
  const [meta, setMeta] = useState<PaginationMeta | null>(null);
  const [loading, setLoading] = useState(true);
  const [showFilters, setShowFilters] = useState(
    !!(
      searchParams.get("propertyType") ||
      searchParams.get("county") ||
      searchParams.get("status")
    )
  );

  const [search, setSearch] = useState(searchParams.get("search") || "");
  const [propertyType, setPropertyType] = useState(
    searchParams.get("propertyType") || ""
  );
  const [county, setCounty] = useState(searchParams.get("county") || "");
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
        county: county || undefined,
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
  }, [debouncedSearch, propertyType, county, status, page]);

  useEffect(() => {
    fetchProperties();
  }, [fetchProperties]);

  useEffect(() => {
    const params = new URLSearchParams();
    if (debouncedSearch) params.set("search", debouncedSearch);
    if (propertyType) params.set("propertyType", propertyType);
    if (county) params.set("county", county);
    if (status) params.set("status", status);
    if (page > 1) params.set("page", String(page));
    router.replace(`/fastigheter?${params.toString()}`, { scroll: false });
  }, [debouncedSearch, propertyType, county, status, page, router]);

  const clearFilters = () => {
    setSearch("");
    setPropertyType("");
    setCounty("");
    setStatus("");
    setPage(1);
  };

  const hasActiveFilters = search || propertyType || county || status;

  return (
    <>
      <PageHeader
        title="Fastigheter"
        subtitle="Utforska vårt aktuella utbud av bostäder till salu i Junsele och omnejd."
        label="Vårt utbud"
      />

      <section className="inner-page-section">
        <div className="section-padding page-container">
          <ScrollReveal>
            <div className="premium-card p-4 md:p-5 mb-8">
              <div className="flex flex-col md:flex-row gap-3">
                <div className="flex-1 relative">
                  <Search
                    size={16}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400"
                  />
                  <input
                    type="text"
                    placeholder="Sök på stad, område eller titel..."
                    value={search}
                    onChange={(e) => {
                      setSearch(e.target.value);
                      setPage(1);
                    }}
                    className="input-field pl-11 border-stone-100"
                  />
                </div>
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className={`btn-outline py-3 md:w-auto shrink-0 ${
                    showFilters ? "border-brand-800 bg-brand-50" : ""
                  }`}
                >
                  <SlidersHorizontal size={16} />
                  Filter
                </button>
                {hasActiveFilters && (
                  <button
                    onClick={clearFilters}
                    className="btn-ghost text-stone-500 shrink-0"
                  >
                    <X size={16} />
                    Rensa
                  </button>
                )}
              </div>
            </div>
          </ScrollReveal>

          {showFilters && (
            <ScrollReveal delay={50}>
              <div className="premium-card p-6 md:p-8 mb-8 animate-fade-in">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                  <div>
                    <label className="label-field">Fastighetstyp</label>
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
                    <label className="label-field">Län</label>
                    <select
                      value={county}
                      onChange={(e) => {
                        setCounty(e.target.value);
                        setPage(1);
                      }}
                      className="input-field"
                    >
                      <option value="">Alla län</option>
                      {COUNTIES.map((c) => (
                        <option key={c} value={c}>
                          {c}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="label-field">Status</label>
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
              </div>
            </ScrollReveal>
          )}

          {loading ? (
            <LoadingSpinner size="lg" className="py-20" />
          ) : properties.length === 0 ? (
            <div className="premium-card py-20 px-8 text-center">
              <div className="w-16 h-16 rounded-2xl bg-brand-50 border border-brand-100 flex items-center justify-center mx-auto mb-6">
                <Home size={28} className="text-brand-600" strokeWidth={1.5} />
              </div>
              <p className="font-display text-xl text-charcoal mb-2">
                Inga fastigheter hittades
              </p>
              <p className="text-stone-500 font-body text-sm mb-6">
                Försök med andra sökkriterier eller rensa filtren.
              </p>
              {hasActiveFilters && (
                <button onClick={clearFilters} className="btn-outline text-sm">
                  Rensa alla filter
                </button>
              )}
            </div>
          ) : (
            <>
              <p className="text-sm text-stone-500 font-body mb-6">
                Visar {properties.length} av {meta?.total || 0} fastigheter
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                {properties.map((property, i) => (
                  <ScrollReveal key={property.id} delay={(i % 3) * 80}>
                    <PropertyCard property={property} />
                  </ScrollReveal>
                ))}
              </div>

              {meta && meta.totalPages > 1 && (
                <div className="flex items-center justify-center gap-2 mt-14">
                  {Array.from({ length: meta.totalPages }, (_, i) => i + 1).map(
                    (p) => (
                      <button
                        key={p}
                        onClick={() => {
                          setPage(p);
                          window.scrollTo({ top: 0, behavior: "smooth" });
                        }}
                        className={`w-10 h-10 rounded-lg flex items-center justify-center font-body text-sm transition-all duration-200 ${
                          p === page
                            ? "bg-brand-800 text-white shadow-soft"
                            : "bg-white border border-stone-200 text-stone-600 hover:bg-stone-50 hover:border-stone-300"
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
        </div>
      </section>

      <CTASection />
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
