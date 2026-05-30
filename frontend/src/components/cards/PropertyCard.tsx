"use client";

import Image from "next/image";
import { MapPin, Maximize, BedDouble } from "lucide-react";
import { Property } from "@/types";
import { formatPrice, formatArea, cn } from "@/utils";
import { STATUS_LABELS, STATUS_COLORS, TYPE_LABELS } from "@/constants";

interface PropertyCardProps {
  property: Property;
}

export default function PropertyCard({ property }: PropertyCardProps) {
  const mainImage = property.images[0] || "/images/placeholder.jpg";

  return (
    <article className="card-elevated group overflow-hidden">
      <div className="relative aspect-[4/3] overflow-hidden bg-stone-100">
        <Image
          src={mainImage}
          alt={property.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute top-4 left-4 flex items-center gap-2">
          <span
            className={cn(
              "px-3 py-1 text-xs font-body font-medium tracking-wide",
              STATUS_COLORS[property.status]
            )}
          >
            {STATUS_LABELS[property.status]}
          </span>
        </div>
        <div className="absolute top-4 right-4">
          <span className="px-3 py-1 text-xs font-body font-medium tracking-wide bg-white/90 text-charcoal backdrop-blur-sm">
            {TYPE_LABELS[property.propertyType]}
          </span>
        </div>
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/40 to-transparent" />
        <div className="absolute bottom-4 left-4">
          <p className="font-display text-2xl text-white">
            {formatPrice(property.price)}
          </p>
        </div>
      </div>

      <div className="p-5">
        <h3 className="font-display text-lg text-charcoal mb-2 leading-tight">
          {property.title}
        </h3>

        <div className="flex items-center gap-1.5 text-stone-500 mb-4">
          <MapPin size={14} className="shrink-0" />
          <span className="text-sm font-body">
            {property.city}, {property.county}
          </span>
        </div>

        <div className="flex items-center gap-4 pt-4 border-t border-stone-100">
          {property.rooms > 0 && (
            <div className="flex items-center gap-1.5 text-stone-500">
              <BedDouble size={14} />
              <span className="text-xs font-body">
                {property.rooms} rum
              </span>
            </div>
          )}
          <div className="flex items-center gap-1.5 text-stone-500">
            <Maximize size={14} />
            <span className="text-xs font-body">
              {formatArea(property.area)}
            </span>
          </div>
          {property.landArea && property.landArea > property.area && (
            <div className="flex items-center gap-1.5 text-stone-500">
              <span className="text-xs font-body">
                Mark: {formatArea(property.landArea)}
              </span>
            </div>
          )}
        </div>
      </div>
    </article>
  );
}
