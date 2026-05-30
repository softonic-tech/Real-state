"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";
import { TYPE_LABELS, COUNTIES } from "@/constants";
import { PropertyType } from "@/types";

export default function SearchBarSection() {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [propertyType, setPropertyType] = useState("");
  const [county, setCounty] = useState("");

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (search) params.set("search", search);
    if (propertyType) params.set("propertyType", propertyType);
    if (county) params.set("city", county);
    router.push(`/fastigheter?${params.toString()}`);
  };

  return (
    <section className="section-padding page-container -mt-12 relative z-10">
      <div className="bg-white shadow-lg border border-stone-100 p-6 md:p-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="md:col-span-1">
            <label className="block text-xs font-body font-medium text-stone-500 tracking-wide uppercase mb-2">
              Sok
            </label>
            <div className="relative">
              <Search
                size={16}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400"
              />
              <input
                type="text"
                placeholder="Stad, omrade..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="input-field pl-10"
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-body font-medium text-stone-500 tracking-wide uppercase mb-2">
              Fastighetstyp
            </label>
            <select
              value={propertyType}
              onChange={(e) => setPropertyType(e.target.value)}
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
              Lan
            </label>
            <select
              value={county}
              onChange={(e) => setCounty(e.target.value)}
              className="input-field"
            >
              <option value="">Alla lan</option>
              {COUNTIES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-end">
            <button onClick={handleSearch} className="btn-primary w-full">
              <Search size={16} className="mr-2" />
              Sok fastigheter
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
