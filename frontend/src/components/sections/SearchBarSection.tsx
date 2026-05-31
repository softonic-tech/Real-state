"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";
import { TYPE_LABELS, COUNTIES } from "@/constants";
import { useDebounce } from "@/hooks";

function buildResultsUrl(
  search: string,
  propertyType: string,
  county: string
): string {
  const params = new URLSearchParams();
  if (search.trim()) params.set("search", search.trim());
  if (propertyType) params.set("propertyType", propertyType);
  if (county) params.set("county", county);
  const query = params.toString();
  return query ? `/fastigheter?${query}` : "/fastigheter";
}

export default function SearchBarSection({
  embedded = false,
}: {
  embedded?: boolean;
}) {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [propertyType, setPropertyType] = useState("");
  const [county, setCounty] = useState("");
  const debouncedSearch = useDebounce(search, 500);
  const hasInteracted = useRef(false);

  useEffect(() => {
    const hasFilters = debouncedSearch.trim() || propertyType || county;
    if (!hasInteracted.current) {
      if (!hasFilters) return;
      hasInteracted.current = true;
    }
    router.push(buildResultsUrl(debouncedSearch, propertyType, county));
  }, [debouncedSearch, propertyType, county, router]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    hasInteracted.current = true;
    router.push(buildResultsUrl(search, propertyType, county));
  };

  const fieldClass =
    "w-full min-h-[48px] px-4 rounded-xl bg-stone-50 border border-stone-200/80 text-charcoal placeholder:text-stone-400 font-body text-base sm:text-sm transition-all duration-200 focus:outline-none focus:bg-white focus:border-brand-600 focus:ring-4 focus:ring-brand-600/10";

  return (
    <form
      onSubmit={handleSubmit}
      className={
        embedded
          ? "glass-panel p-3 sm:p-4 md:p-5 animate-scale-in animate-delay-500 opacity-0 motion-reduce:opacity-100 [animation-fill-mode:forwards]"
          : "glass-panel section-padding page-container p-4 sm:p-5 md:p-6 -mt-10 relative z-10"
      }
    >
      <p className="text-xs font-semibold text-stone-500 uppercase tracking-wider mb-3 sm:hidden">
        Sök bostäder
      </p>

      <div className="flex flex-col lg:flex-row lg:items-stretch gap-2.5 sm:gap-3">
        <div className="flex-1 relative min-w-0">
          <Search
            size={18}
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400 pointer-events-none"
          />
          <input
            id="landing-search"
            type="search"
            inputMode="search"
            enterKeyHint="search"
            placeholder="Stad, område..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className={`${fieldClass} pl-10`}
            autoComplete="off"
          />
        </div>

        <div className="grid grid-cols-2 gap-2.5 sm:gap-3 lg:contents">
          <select
            id="landing-type"
            aria-label="Fastighetstyp"
            value={propertyType}
            onChange={(e) => setPropertyType(e.target.value)}
            className={`${fieldClass} lg:w-40 xl:w-44 cursor-pointer appearance-none min-w-0`}
          >
            <option value="">Alla typer</option>
            {Object.entries(TYPE_LABELS).map(([key, label]) => (
              <option key={key} value={key}>
                {label}
              </option>
            ))}
          </select>

          <select
            id="landing-county"
            aria-label="Län"
            value={county}
            onChange={(e) => setCounty(e.target.value)}
            className={`${fieldClass} lg:w-40 xl:w-44 cursor-pointer appearance-none min-w-0`}
          >
            <option value="">Alla län</option>
            {COUNTIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          className="min-h-[48px] w-full lg:w-auto px-6 rounded-xl bg-brand-800 text-white font-body font-semibold text-sm flex items-center justify-center gap-2 transition-all hover:bg-brand-900 active:scale-[0.98] shrink-0"
        >
          <Search size={18} />
          Sök fastigheter
        </button>
      </div>
    </form>
  );
}

export { buildResultsUrl };
