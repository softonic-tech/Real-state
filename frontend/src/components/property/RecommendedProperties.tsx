import Link from "next/link";
import { ArrowRight } from "lucide-react";
import PropertyCard from "@/components/cards/PropertyCard";
import SectionLabel from "@/components/ui/SectionLabel";
import { Property } from "@/types";

interface RecommendedPropertiesProps {
  properties: Property[];
  city: string;
}

export default function RecommendedProperties({
  properties,
  city,
}: RecommendedPropertiesProps) {
  if (properties.length === 0) return null;

  return (
    <section className="bg-white border-t border-stone-200/80 py-16 md:py-20 relative overflow-hidden">
      <div className="absolute inset-0 mesh-light pointer-events-none" />
      <div className="relative section-padding page-container">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-10 md:mb-12">
          <div className="max-w-xl">
            <SectionLabel>Rekommenderat</SectionLabel>
            <h2 className="text-display-sm md:text-display-md text-charcoal text-balance mb-3">
              Liknande bostäder
            </h2>
            <p className="text-stone-500 font-body text-sm md:text-base leading-relaxed">
              Fler objekt till salu i {city} och närområdet.
            </p>
          </div>
          <Link
            href="/fastigheter"
            className="btn-outline shrink-0 self-start sm:self-auto text-sm"
          >
            Alla bostäder
            <ArrowRight size={16} />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-7">
          {properties.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      </div>
    </section>
  );
}
