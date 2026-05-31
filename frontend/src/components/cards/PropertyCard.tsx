"use client";

import Image from "next/image";
import Link from "next/link";
import { MapPin, Maximize, BedDouble, ArrowUpRight } from "lucide-react";
import { Property } from "@/types";
import { formatPrice, formatArea, cn } from "@/utils";
import { STATUS_LABELS, STATUS_COLORS, TYPE_LABELS } from "@/constants";

interface PropertyCardProps {
  property: Property;
  variant?: "default" | "featured" | "compact";
}

export default function PropertyCard({
  property,
  variant = "default",
}: PropertyCardProps) {
  const mainImage = property.images[0] || "/images/placeholder.jpg";
  const href = `/fastigheter/${property.slug}`;
  const imageCount = property.images.length;
  const isFeatured = variant === "featured";
  const isCompact = variant === "compact";

  return (
    <Link href={href} className="block group h-full">
      <article
        className={cn(
          "premium-card h-full flex flex-col",
          isCompact && "flex-row"
        )}
      >
        <div
          className={cn(
            "relative overflow-hidden bg-stone-100 shrink-0",
            isFeatured && "aspect-[16/10] lg:aspect-[16/11]",
            isCompact && "w-[42%] min-w-[132px] max-w-[44%] aspect-[4/3]",
            !isFeatured && !isCompact && "aspect-[4/3]"
          )}
        >
          <Image
            src={mainImage}
            alt={property.title}
            fill
            sizes={
              isFeatured
                ? "(max-width: 1024px) 100vw, 55vw"
                : isCompact
                  ? "180px"
                  : "(max-width: 768px) 100vw, 33vw"
            }
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-950/70 via-brand-950/10 to-transparent" />

          <div
            className={cn(
              "absolute top-4 left-4 flex flex-col gap-1.5",
              isCompact && "top-2 left-2 gap-1"
            )}
          >
            <span
              className={cn(
                "inline-block px-3 py-1 rounded-md text-[10px] font-body font-bold tracking-wider uppercase shadow-sm",
                STATUS_COLORS[property.status],
                isCompact && "px-2 py-0.5 text-[9px]"
              )}
            >
              {STATUS_LABELS[property.status]}
            </span>
            {imageCount > 1 && !isCompact && (
              <span className="inline-block px-2.5 py-0.5 rounded-md bg-black/50 text-white text-[10px] font-body font-semibold backdrop-blur-sm">
                {imageCount} bilder
              </span>
            )}
          </div>

          {!isCompact && (
            <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/95 flex items-center justify-center text-charcoal opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 shadow-medium">
              <ArrowUpRight size={18} />
            </div>
          )}

          {!isCompact && (
            <div className="absolute bottom-0 left-0 right-0 p-5">
              <p
                className={cn(
                  "font-display text-white font-semibold",
                  isFeatured ? "text-3xl md:text-4xl" : "text-2xl"
                )}
              >
                {formatPrice(property.price)}
              </p>
            </div>
          )}
        </div>

        <div
          className={cn(
            "p-5 md:p-6 flex flex-col flex-1 min-w-0",
            isCompact && "py-4 px-4 justify-center"
          )}
        >
          {isCompact && (
            <p className="font-display text-xl text-charcoal font-semibold mb-2">
              {formatPrice(property.price)}
            </p>
          )}
          <span className="inline-block w-fit px-2.5 py-0.5 rounded-md bg-brand-50 text-brand-700 text-[10px] font-bold uppercase tracking-wider mb-3">
            {TYPE_LABELS[property.propertyType]}
          </span>

          <h3
            className={cn(
              "font-display font-semibold text-charcoal mb-2 leading-snug group-hover:text-brand-800 transition-colors",
              isFeatured ? "text-2xl md:text-[1.65rem]" : "text-lg",
              isCompact && "text-base line-clamp-2"
            )}
          >
            {property.title}
          </h3>

          <div className="flex items-center gap-1.5 text-stone-500 mb-4">
            <MapPin size={14} className="shrink-0 text-accent" />
            <span className="text-sm font-body">
              {property.city}, {property.county}
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 pt-4 mt-auto border-t border-stone-100">
            {property.rooms > 0 && (
              <span className="inline-flex items-center gap-1.5 text-stone-500 text-xs font-medium">
                <BedDouble size={14} />
                {property.rooms} rum
              </span>
            )}
            <span className="inline-flex items-center gap-1.5 text-stone-500 text-xs font-medium">
              <Maximize size={14} />
              {formatArea(property.area)}
            </span>
            {property.landArea && property.landArea > property.area && (
              <span className="text-xs font-medium text-stone-400">
                Tomt {formatArea(property.landArea)}
              </span>
            )}
          </div>
        </div>
      </article>
    </Link>
  );
}
