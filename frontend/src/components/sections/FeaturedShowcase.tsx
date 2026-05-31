"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ArrowUpRight,
  BedDouble,
  Camera,
  MapPin,
  Maximize,
} from "lucide-react";
import { Property } from "@/types";
import { formatPrice, formatArea, cn } from "@/utils";
import { STATUS_LABELS, STATUS_COLORS, TYPE_LABELS } from "@/constants";

interface ShowcaseCardProps {
  property: Property;
  variant: "hero" | "side";
  className?: string;
}

function ShowcaseCard({ property, variant, className }: ShowcaseCardProps) {
  const isHero = variant === "hero";
  const mainImage = property.images[0] || "/images/placeholder.jpg";
  const imageCount = property.images.length;
  const href = `/fastigheter/${property.slug}`;

  return (
    <Link
      href={href}
      className={cn(
        "group block h-full rounded-2xl overflow-hidden relative bg-brand-950 shadow-soft ring-1 ring-stone-200/60 transition-all duration-500 hover:shadow-strong hover:ring-stone-300/80 hover:-translate-y-1",
        isHero ? "min-h-[420px] lg:min-h-[580px]" : "min-h-[280px]",
        className
      )}
    >
      <Image
        src={mainImage}
        alt={property.title}
        fill
        sizes={
          isHero
            ? "(max-width: 1024px) 100vw, 58vw"
            : "(max-width: 1024px) 100vw, 38vw"
        }
        className="object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-[1.05]"
        priority={isHero}
      />

      <div className="absolute inset-0 bg-gradient-to-t from-brand-950/95 via-brand-950/35 to-brand-950/10" />
      <div className="absolute inset-0 bg-gradient-to-r from-brand-950/30 via-transparent to-transparent opacity-80" />

      <div className="absolute inset-0 flex flex-col justify-between p-5 md:p-6 lg:p-7">
        <div className="flex items-start justify-between gap-3">
          <div className="flex flex-wrap gap-2">
            {isHero && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-accent/90 text-brand-950 text-[10px] font-body font-bold uppercase tracking-wider">
                Utvald bostad
              </span>
            )}
            <span
              className={cn(
                "inline-block px-2.5 py-1 rounded-md text-[10px] font-body font-bold tracking-wider uppercase backdrop-blur-sm",
                STATUS_COLORS[property.status]
              )}
            >
              {STATUS_LABELS[property.status]}
            </span>
            {property.housingType && (
              <span className="inline-block px-2.5 py-1 rounded-md bg-white/15 text-white text-[10px] font-body font-semibold uppercase tracking-wider backdrop-blur-sm border border-white/10">
                {property.housingType}
              </span>
            )}
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {imageCount > 0 && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-black/35 text-white text-[10px] font-body font-semibold backdrop-blur-md border border-white/10">
                <Camera size={12} />
                {imageCount}
              </span>
            )}
            <span className="w-9 h-9 rounded-full bg-white/95 flex items-center justify-center text-charcoal opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 shadow-medium">
              <ArrowUpRight size={17} />
            </span>
          </div>
        </div>

        <div>
          <p
            className={cn(
              "font-display text-white font-semibold mb-2",
              isHero ? "text-3xl md:text-4xl lg:text-[2.75rem]" : "text-2xl md:text-[1.65rem]"
            )}
          >
            {formatPrice(property.price)}
          </p>

          <h3
            className={cn(
              "font-display font-semibold text-white/95 leading-snug mb-2 group-hover:text-white transition-colors",
              isHero ? "text-xl md:text-2xl lg:text-[1.75rem]" : "text-lg md:text-xl line-clamp-2"
            )}
          >
            {property.title}
          </h3>

          <div className="flex items-center gap-1.5 text-stone-300 mb-4">
            <MapPin size={14} className="shrink-0 text-accent-light" />
            <span className="text-sm font-body truncate">
              {property.city}
              {property.municipality
                ? `, ${property.municipality}`
                : `, ${property.county}`}
            </span>
          </div>

          <div className="flex flex-wrap gap-2">
            {property.rooms > 0 && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 text-white/90 text-xs font-body font-medium backdrop-blur-sm border border-white/10">
                <BedDouble size={13} />
                {property.rooms} rum
              </span>
            )}
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 text-white/90 text-xs font-body font-medium backdrop-blur-sm border border-white/10">
              <Maximize size={13} />
              {formatArea(property.area)}
            </span>
            {property.landArea && property.landArea > property.area && (
              <span className="inline-flex items-center px-3 py-1.5 rounded-lg bg-white/10 text-white/80 text-xs font-body font-medium backdrop-blur-sm border border-white/10">
                Tomt {formatArea(property.landArea)}
              </span>
            )}
            {!property.housingType && (
              <span className="inline-flex items-center px-3 py-1.5 rounded-lg bg-white/10 text-white/80 text-xs font-body font-medium backdrop-blur-sm border border-white/10">
                {TYPE_LABELS[property.propertyType]}
              </span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}

interface FeaturedShowcaseProps {
  featured: Property;
  secondary: Property[];
}

export default function FeaturedShowcase({
  featured,
  secondary,
}: FeaturedShowcaseProps) {
  const side = secondary.slice(0, 2);

  if (side.length === 0) {
    return <ShowcaseCard property={featured} variant="hero" />;
  }

  if (side.length === 1) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 lg:gap-6">
        <ShowcaseCard property={featured} variant="hero" className="min-h-[400px]" />
        <ShowcaseCard property={side[0]} variant="side" className="min-h-[400px] h-full" />
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-6">
      <div className="lg:col-span-7">
        <ShowcaseCard property={featured} variant="hero" />
      </div>

      <div className="lg:col-span-5 flex flex-col gap-5 lg:gap-6 lg:min-h-[580px]">
        {side.map((property) => (
          <div key={property.id} className="flex-1 min-h-[260px]">
            <ShowcaseCard property={property} variant="side" className="h-full" />
          </div>
        ))}
      </div>
    </div>
  );
}
