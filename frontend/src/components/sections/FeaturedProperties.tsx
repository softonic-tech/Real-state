"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Property } from "@/types";
import { propertyService } from "@/services/property.service";
import PropertyCard from "@/components/cards/PropertyCard";
import FeaturedShowcase from "@/components/sections/FeaturedShowcase";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import ScrollReveal from "@/components/ui/ScrollReveal";
import SectionLabel from "@/components/ui/SectionLabel";

export default function FeaturedProperties() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchFeatured() {
      try {
        const res = await propertyService.getFeatured();
        if (res.success && res.data) setProperties(res.data);
      } catch {
        /* empty */
      } finally {
        setLoading(false);
      }
    }
    fetchFeatured();
  }, []);

  const [featured, ...rest] = properties;

  return (
    <section className="section-block bg-white relative overflow-hidden">
      <div className="absolute inset-0 mesh-light pointer-events-none" />
      <div className="relative section-padding page-container">
        <ScrollReveal>
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-14">
            <div className="max-w-2xl">
              <SectionLabel>Utvalda objekt</SectionLabel>
              <h2 className="text-display-md text-charcoal text-balance mb-4">
                Bostäder till salu
              </h2>
              <p className="text-stone-500 font-body text-base leading-relaxed">
                Handplockade bostäder i Junsele, Sollefteå, Åsele och omnejd —
                uppdateras löpande.
              </p>
            </div>
            <Link
              href="/fastigheter"
              className="btn-outline shrink-0 self-start lg:self-auto"
            >
              Alla bostäder
              <ArrowRight size={16} />
            </Link>
          </div>
        </ScrollReveal>

        {loading ? (
          <LoadingSpinner size="lg" className="py-24" />
        ) : properties.length === 0 ? (
          <ScrollReveal>
            <div className="premium-card p-12 text-center max-w-lg mx-auto">
              <p className="text-stone-500 font-body text-lg mb-6">
                Inga utvalda bostäder just nu.
              </p>
              <Link href="/kontakt" className="btn-primary">
                Kontakta oss
              </Link>
            </div>
          </ScrollReveal>
        ) : (
          <>
            {featured && (
              <ScrollReveal delay={80}>
                <FeaturedShowcase featured={featured} secondary={rest} />
              </ScrollReveal>
            )}

            {rest.length > 2 && (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-7 mt-8 lg:mt-10">
                {rest.slice(2).map((property, i) => (
                  <ScrollReveal key={property.id} delay={i * 70}>
                    <PropertyCard property={property} />
                  </ScrollReveal>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}
