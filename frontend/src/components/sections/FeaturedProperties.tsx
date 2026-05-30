"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Property } from "@/types";
import { propertyService } from "@/services/property.service";
import PropertyCard from "@/components/cards/PropertyCard";
import LoadingSpinner from "@/components/ui/LoadingSpinner";

export default function FeaturedProperties() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchFeatured() {
      try {
        const res = await propertyService.getFeatured();
        if (res.success && res.data) {
          setProperties(res.data);
        }
      } catch {
        // Silently handle error
      } finally {
        setLoading(false);
      }
    }
    fetchFeatured();
  }, []);

  return (
    <section className="section-padding page-container py-24">
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14">
        <div>
          <span className="text-brand-600 font-body text-xs tracking-[0.3em] uppercase block mb-3">
            Utvalda objekt
          </span>
          <h2 className="text-display-md text-charcoal">
            Aktuella fastigheter
          </h2>
        </div>
        <Link
          href="/fastigheter"
          className="btn-ghost text-brand-700 hover:text-brand-900 group"
        >
          Visa alla
          <ArrowRight
            size={16}
            className="ml-1.5 transition-transform group-hover:translate-x-1"
          />
        </Link>
      </div>

      {loading ? (
        <LoadingSpinner size="lg" className="py-20" />
      ) : properties.length === 0 ? (
        <p className="text-center text-stone-400 py-20 font-body">
          Inga utvalda fastigheter just nu.
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {properties.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      )}
    </section>
  );
}
