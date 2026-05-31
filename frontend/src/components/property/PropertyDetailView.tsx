"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  BedDouble,
  Calendar,
  ChevronDown,
  ChevronUp,
  Heart,
  Mail,
  MapPin,
  Maximize,
  Phone,
  Share2,
  Zap,
} from "lucide-react";
import toast from "react-hot-toast";
import PropertyGallery from "@/components/property/PropertyGallery";
import { useFavorites } from "@/hooks";
import { Property } from "@/types";
import { formatPrice, formatArea, cn } from "@/utils";
import {
  COMPANY_INFO,
  OWNER_INFO,
  SITE_NAME,
  STATUS_LABELS,
  STATUS_COLORS,
  TYPE_LABELS,
} from "@/constants";

interface PropertyDetailViewProps {
  property: Property;
}

function DetailRow({ label, value }: { label: string; value: string }) {
  if (!value) return null;
  return (
    <div className="flex items-start justify-between gap-4 py-3.5 border-b border-stone-100 last:border-0">
      <span className="text-stone-500 font-body text-sm">{label}</span>
      <span className="text-charcoal font-body text-sm font-medium text-right">
        {value}
      </span>
    </div>
  );
}

export default function PropertyDetailView({ property }: PropertyDetailViewProps) {
  const { isFavorite, toggleFavorite, ready } = useFavorites();
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [showAllDetails, setShowAllDetails] = useState(false);
  const [showPhone, setShowPhone] = useState(false);

  const saved = ready && isFavorite(property.id);
  const mapsQuery = encodeURIComponent(
    `${property.address}, ${property.city}, ${property.municipality || property.county}`
  );

  const handleShare = async () => {
    const url = window.location.href;
    if (navigator.share) {
      await navigator.share({ title: property.title, url });
    } else {
      await navigator.clipboard.writeText(url);
      toast.success("Länk kopierad");
    }
  };

  const handleFavorite = () => {
    const wasSaved = isFavorite(property.id);
    toggleFavorite(property.id);
    toast.success(
      wasSaved ? "Borttagen från favoriter" : "Sparad i favoriter"
    );
  };

  const descriptionPreview =
    property.description.length > 320 && !showFullDescription
      ? property.description.slice(0, 320).trimEnd() + "…"
      : property.description;

  return (
    <>
      <PropertyGallery
        images={property.images}
        floorPlanImages={property.floorPlanImages || []}
        title={property.title}
      />

      <div className="bg-cream border-b border-stone-200/80">
        <div className="section-padding page-container py-6 md:py-8">
          <Link
            href="/fastigheter"
            className="inline-flex items-center gap-1.5 text-stone-500 font-body text-sm hover:text-brand-800 transition-colors mb-5"
          >
            <ArrowLeft size={16} />
            Tillbaka till fastigheter
          </Link>

          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap items-center gap-2 mb-3">
                <span
                  className={cn(
                    "inline-block px-3 py-1 rounded-md text-[10px] font-body font-bold tracking-wider uppercase",
                    STATUS_COLORS[property.status]
                  )}
                >
                  {STATUS_LABELS[property.status]}
                </span>
                <span className="inline-block px-2.5 py-1 rounded-md bg-brand-50 text-brand-700 text-[10px] font-bold uppercase tracking-wider">
                  {property.housingType || TYPE_LABELS[property.propertyType]}
                </span>
              </div>

              <h1 className="text-display-sm md:text-display-md text-charcoal text-balance mb-2">
                {property.title}
              </h1>
              <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
                <p className="flex items-center gap-1.5 text-stone-600 font-body">
                  <MapPin size={16} className="text-accent shrink-0" />
                  {property.city}
                  {property.municipality
                    ? `, ${property.municipality}`
                    : `, ${property.county}`}
                </p>
                <a
                  href={`https://www.google.com/maps?q=${mapsQuery}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-brand-700 font-body text-sm font-semibold hover:text-brand-900 underline underline-offset-2"
                >
                  Visa på karta
                </a>
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <button
                type="button"
                onClick={handleFavorite}
                className={cn(
                  "inline-flex items-center gap-2 px-4 py-2.5 rounded-lg border font-body text-sm font-semibold transition-all",
                  saved
                    ? "bg-red-50 border-red-200 text-red-600"
                    : "bg-white border-stone-200 text-charcoal hover:border-stone-300"
                )}
              >
                <Heart size={16} className={saved ? "fill-current" : ""} />
                {saved ? "Sparad" : "Spara favorit"}
              </button>
              <button
                type="button"
                onClick={handleShare}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-white border border-stone-200 text-charcoal font-body text-sm font-semibold hover:border-stone-300 transition-colors"
              >
                <Share2 size={16} />
                Dela
              </button>
            </div>
          </div>

          <p className="font-display text-3xl md:text-4xl text-charcoal font-semibold mt-6">
            {formatPrice(property.price)}
          </p>
          <p className="text-stone-500 font-body text-sm mt-1">Utgångspris</p>
        </div>
      </div>

      <section className="inner-page-section !py-12 md:!py-16">
        <div className="section-padding page-container">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-14">
            <div className="lg:col-span-2 space-y-8">
              <div className="premium-card p-6 md:p-8">
                <h2 className="font-display text-xl text-charcoal font-semibold mb-6">
                  Om bostaden
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
                  {property.housingType && (
                    <div className="rounded-xl bg-stone-50 border border-stone-100 p-4">
                      <p className="text-[11px] font-body font-semibold text-stone-400 uppercase tracking-wider mb-1">
                        Bostadstyp
                      </p>
                      <p className="text-charcoal font-body text-sm font-medium">
                        {property.housingType}
                      </p>
                    </div>
                  )}
                  {property.ownershipForm && (
                    <div className="rounded-xl bg-stone-50 border border-stone-100 p-4">
                      <p className="text-[11px] font-body font-semibold text-stone-400 uppercase tracking-wider mb-1">
                        Upplåtelseform
                      </p>
                      <p className="text-charcoal font-body text-sm font-medium">
                        {property.ownershipForm}
                      </p>
                    </div>
                  )}
                  {property.rooms > 0 && (
                    <div className="rounded-xl bg-stone-50 border border-stone-100 p-4">
                      <p className="text-[11px] font-body font-semibold text-stone-400 uppercase tracking-wider mb-1">
                        Antal rum
                      </p>
                      <p className="text-charcoal font-body text-sm font-medium flex items-center gap-1.5">
                        <BedDouble size={14} className="text-brand-600" />
                        {property.rooms} rum
                      </p>
                    </div>
                  )}
                  <div className="rounded-xl bg-stone-50 border border-stone-100 p-4">
                    <p className="text-[11px] font-body font-semibold text-stone-400 uppercase tracking-wider mb-1">
                      Boarea
                    </p>
                    <p className="text-charcoal font-body text-sm font-medium flex items-center gap-1.5">
                      <Maximize size={14} className="text-brand-600" />
                      {formatArea(property.area)}
                    </p>
                  </div>
                  {property.landArea && (
                    <div className="rounded-xl bg-stone-50 border border-stone-100 p-4">
                      <p className="text-[11px] font-body font-semibold text-stone-400 uppercase tracking-wider mb-1">
                        Tomtarea
                      </p>
                      <p className="text-charcoal font-body text-sm font-medium">
                        {formatArea(property.landArea)}
                      </p>
                    </div>
                  )}
                </div>

                {property.features?.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-6">
                    {property.features.map((feature) => (
                      <span
                        key={feature}
                        className="px-3 py-1.5 rounded-full bg-brand-50 border border-brand-100 text-brand-800 text-xs font-body font-semibold"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                )}

                <div className="prose prose-stone max-w-none">
                  <p className="text-stone-600 font-body leading-relaxed whitespace-pre-line">
                    {descriptionPreview}
                  </p>
                  {property.description.length > 320 && (
                    <button
                      type="button"
                      onClick={() => setShowFullDescription((v) => !v)}
                      className="inline-flex items-center gap-1 mt-3 text-brand-700 font-body text-sm font-semibold hover:text-brand-900"
                    >
                      {showFullDescription ? (
                        <>
                          Visa mindre <ChevronUp size={16} />
                        </>
                      ) : (
                        <>
                          Visa mer <ChevronDown size={16} />
                        </>
                      )}
                    </button>
                  )}
                </div>

                <button
                  type="button"
                  onClick={() => setShowAllDetails((v) => !v)}
                  className="mt-6 inline-flex items-center gap-1.5 text-brand-700 font-body text-sm font-semibold hover:text-brand-900"
                >
                  {showAllDetails ? "Dölj detaljer" : "Se alla detaljer"}
                  {showAllDetails ? (
                    <ChevronUp size={16} />
                  ) : (
                    <ChevronDown size={16} />
                  )}
                </button>

                {showAllDetails && (
                  <div className="mt-4 pt-4 border-t border-stone-100">
                    <DetailRow label="Adress" value={property.address} />
                    <DetailRow label="Stad" value={property.city} />
                    <DetailRow
                      label="Kommun"
                      value={property.municipality || "—"}
                    />
                    <DetailRow label="Län" value={property.county} />
                    <DetailRow
                      label="Fastighetstyp"
                      value={TYPE_LABELS[property.propertyType]}
                    />
                    <DetailRow label="Status" value={STATUS_LABELS[property.status]} />
                  </div>
                )}
              </div>

              {property.electricityKwh && (
                <div className="premium-card p-6 md:p-8">
                  <div className="flex items-start gap-4">
                    <div className="w-11 h-11 rounded-xl bg-amber-50 border border-amber-100 flex items-center justify-center shrink-0">
                      <Zap size={20} className="text-amber-600" />
                    </div>
                    <div>
                      <h3 className="font-display text-lg text-charcoal font-semibold mb-1">
                        Uppskattad elförbrukning
                      </h3>
                      <p className="text-stone-500 font-body text-sm mb-3">
                        Direktverkande el + hushållsel
                      </p>
                      <p className="text-charcoal font-body font-semibold">
                        ca {property.electricityKwh.toLocaleString("sv-SE")}{" "}
                        kWh/år
                      </p>
                      <p className="text-stone-400 font-body text-xs mt-2 leading-relaxed">
                        Uppskattningen baseras på statistik från
                        Energimyndigheten. Kontakta mäklaren för mer exakt
                        förbrukning för just denna bostad.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              <div className="premium-card overflow-hidden">
                <div className="aspect-[16/9] md:aspect-[21/9] relative">
                  <iframe
                    src={`https://www.google.com/maps?q=${mapsQuery}&output=embed`}
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Fastighet på karta"
                    className="absolute inset-0"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-5 lg:sticky lg:sticky-below-header lg:self-start">
              {(property.viewingDate || property.viewingNote) && (
                <div className="premium-card p-6 md:p-7">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-xl bg-brand-800 text-white flex items-center justify-center">
                      <Calendar size={18} />
                    </div>
                    <h3 className="font-display text-lg text-charcoal font-semibold">
                      Visning
                    </h3>
                  </div>
                  {property.viewingDate && (
                    <p className="text-charcoal font-body font-semibold text-lg mb-1">
                      {property.viewingDate}
                    </p>
                  )}
                  {property.viewingNote && (
                    <p className="text-stone-500 font-body text-sm">
                      {property.viewingNote}
                    </p>
                  )}
                  <Link
                    href={`/kontakt?property=${encodeURIComponent(property.title)}`}
                    className="btn-primary w-full mt-5 text-sm"
                  >
                    Anmäl intresse
                  </Link>
                </div>
              )}

              <div className="premium-card p-6 md:p-7">
                <h3 className="font-display text-lg text-charcoal font-semibold mb-5">
                  Pris & kostnader
                </h3>
                <div className="space-y-0">
                  <DetailRow
                    label="Utgångspris"
                    value={formatPrice(property.price)}
                  />
                  {property.minCash && (
                    <DetailRow
                      label="Minsta kontantinsats"
                      value={formatPrice(property.minCash)}
                    />
                  )}
                  {property.titleDeedCost && (
                    <DetailRow
                      label="Lagfartskostnad"
                      value={formatPrice(property.titleDeedCost)}
                    />
                  )}
                </div>
              </div>

              <div className="premium-card p-6 md:p-7">
                <div className="flex items-start gap-4 mb-5">
                  <div className="relative w-16 h-16 rounded-xl overflow-hidden shrink-0">
                    <Image
                      src={OWNER_INFO.image}
                      alt={OWNER_INFO.name}
                      fill
                      className="object-cover"
                      sizes="64px"
                    />
                  </div>
                  <div>
                    <p className="font-display text-lg text-charcoal font-semibold">
                      {OWNER_INFO.name}
                    </p>
                    <p className="text-brand-700 font-body text-xs font-medium mt-0.5">
                      {OWNER_INFO.role}
                    </p>
                    <p className="text-stone-500 font-body text-xs mt-1">
                      {SITE_NAME}
                    </p>
                  </div>
                </div>

                <div className="space-y-2">
                  <Link
                    href={`/kontakt?property=${encodeURIComponent(property.title)}`}
                    className="flex items-center justify-center gap-2 w-full px-4 py-3 rounded-lg bg-brand-800 text-white font-body text-sm font-semibold hover:bg-brand-900 transition-colors"
                  >
                    <Mail size={16} />
                    Skicka e-post
                  </Link>
                  <button
                    type="button"
                    onClick={() => setShowPhone(true)}
                    className={cn(
                      "flex items-center justify-center gap-2 w-full px-4 py-3 rounded-lg border-2 border-stone-200 text-charcoal font-body text-sm font-semibold hover:border-brand-800 hover:text-brand-800 transition-colors",
                      showPhone && "hidden"
                    )}
                  >
                    <Phone size={16} />
                    Visa telefonnummer
                  </button>
                  {showPhone && (
                    <a
                      href={`tel:${COMPANY_INFO.phoneTel}`}
                      className="flex items-center justify-center gap-2 w-full px-4 py-3 rounded-lg border-2 border-brand-800 text-brand-800 font-body text-sm font-semibold"
                    >
                      <Phone size={16} />
                      {COMPANY_INFO.phone}
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
