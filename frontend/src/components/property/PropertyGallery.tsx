"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import {
  ChevronLeft,
  ChevronRight,
  Grid3X3,
  ImageIcon,
  LayoutGrid,
  LucideIcon,
  Ruler,
  X,
} from "lucide-react";
import { cn } from "@/utils";

interface PropertyGalleryProps {
  images: string[];
  floorPlanImages: string[];
  title: string;
}

interface LightGalleryModalProps {
  open: boolean;
  onClose: () => void;
  propertyTitle: string;
  modalTitle: string;
  icon: LucideIcon;
  items: string[];
  index: number;
  onIndexChange: (index: number) => void;
  onPrev: () => void;
  onNext: () => void;
  itemLabel: string;
  imageFit?: "cover" | "contain";
}

function LightGalleryModal({
  open,
  onClose,
  propertyTitle,
  modalTitle,
  icon: Icon,
  items,
  index,
  onIndexChange,
  onPrev,
  onNext,
  itemLabel,
  imageFit = "cover",
}: LightGalleryModalProps) {
  if (!open || items.length === 0) return null;

  const hasMultiple = items.length > 1;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-0 sm:p-6 md:p-10"
      role="dialog"
      aria-modal="true"
      aria-label={modalTitle}
    >
      <button
        type="button"
        className="absolute inset-0 bg-brand-950/50 backdrop-blur-sm"
        onClick={onClose}
        aria-label={`Stäng ${modalTitle.toLowerCase()}`}
      />

      <div className="relative w-full sm:max-w-4xl lg:max-w-5xl max-h-[94vh] sm:max-h-[90vh] flex flex-col bg-cream rounded-t-2xl sm:rounded-2xl shadow-strong overflow-hidden animate-fade-up">
        {/* Header */}
        <div className="flex items-center justify-between gap-4 px-5 py-4 bg-white border-b border-stone-200/80 shrink-0">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-10 h-10 rounded-xl bg-brand-50 border border-brand-100 flex items-center justify-center shrink-0">
              <Icon size={18} className="text-brand-700" />
            </div>
            <div className="min-w-0">
              <p className="font-display text-lg text-charcoal font-semibold leading-tight">
                {modalTitle}
              </p>
              <p className="text-stone-500 font-body text-xs truncate">
                {propertyTitle}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <span className="text-stone-500 font-body text-sm font-medium tabular-nums">
              {index + 1} / {items.length}
            </span>
            <button
              type="button"
              onClick={onClose}
              className="w-10 h-10 rounded-full bg-stone-100 flex items-center justify-center text-stone-600 hover:bg-stone-200 hover:text-charcoal transition-colors"
              aria-label="Stäng"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Main image */}
        <div className="flex-1 min-h-0 overflow-y-auto bg-stone-100/80 p-4 sm:p-6 md:p-8">
          <div className="relative w-full aspect-[4/3] sm:aspect-[16/10] max-h-[58vh] mx-auto bg-stone-900 rounded-xl border border-stone-200/90 shadow-soft overflow-hidden">
            <Image
              src={items[index]}
              alt={`${propertyTitle} – ${itemLabel} ${index + 1}`}
              fill
              sizes="(max-width: 768px) 100vw, 900px"
              className={cn(
                imageFit === "contain" ? "object-contain p-2 sm:p-4" : "object-cover"
              )}
              priority
            />
          </div>

          {hasMultiple && (
            <p className="text-center text-stone-400 font-body text-xs mt-4">
              Använd pilarna eller miniatyrerna nedan för att bläddra
            </p>
          )}
        </div>

        {/* Footer navigation */}
        {hasMultiple && (
          <div className="shrink-0 px-4 sm:px-5 py-4 bg-white border-t border-stone-200/80">
            <div className="flex items-center gap-2 sm:gap-3">
              <button
                type="button"
                onClick={onPrev}
                className="w-10 h-10 rounded-full border border-stone-200 flex items-center justify-center text-charcoal hover:bg-stone-50 hover:border-stone-300 transition-colors shrink-0"
                aria-label={`Föregående ${itemLabel}`}
              >
                <ChevronLeft size={20} />
              </button>

              <div className="flex-1 overflow-x-auto py-1 scrollbar-thin">
                <div className="flex gap-2 justify-start sm:justify-center min-w-min px-1">
                  {items.map((src, i) => (
                    <button
                      key={`${src}-${i}`}
                      type="button"
                      onClick={() => onIndexChange(i)}
                      className={cn(
                        "relative w-14 h-11 sm:w-16 sm:h-12 rounded-lg overflow-hidden shrink-0 border-2 transition-all bg-stone-100",
                        i === index
                          ? "border-brand-700 ring-2 ring-brand-700/20 scale-105"
                          : "border-stone-200 opacity-75 hover:opacity-100"
                      )}
                    >
                      <Image
                        src={src}
                        alt={`${itemLabel} ${i + 1}`}
                        fill
                        sizes="64px"
                        className={cn(
                          imageFit === "contain"
                            ? "object-contain p-0.5"
                            : "object-cover"
                        )}
                      />
                      <span
                        className={cn(
                          "absolute bottom-0.5 right-0.5 min-w-[1.1rem] h-[1.1rem] px-0.5 rounded text-[9px] font-body font-bold flex items-center justify-center",
                          i === index
                            ? "bg-brand-700 text-white"
                            : "bg-black/50 text-white"
                        )}
                      >
                        {i + 1}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              <button
                type="button"
                onClick={onNext}
                className="w-10 h-10 rounded-full border border-stone-200 flex items-center justify-center text-charcoal hover:bg-stone-50 hover:border-stone-300 transition-colors shrink-0"
                aria-label={`Nästa ${itemLabel}`}
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function PropertyGallery({
  images,
  floorPlanImages,
  title,
}: PropertyGalleryProps) {
  const [photoLightboxOpen, setPhotoLightboxOpen] = useState(false);
  const [floorPlanOpen, setFloorPlanOpen] = useState(false);
  const [photoIndex, setPhotoIndex] = useState(0);
  const [floorPlanIndex, setFloorPlanIndex] = useState(0);

  const hasFloorPlans = floorPlanImages.length > 0;
  const displayImages = images.length ? images : ["/images/placeholder.jpg"];

  const openPhotos = (index = 0) => {
    setPhotoIndex(index);
    setPhotoLightboxOpen(true);
  };

  const openFloorPlans = (index = 0) => {
    setFloorPlanIndex(index);
    setFloorPlanOpen(true);
  };

  const closePhotos = useCallback(() => setPhotoLightboxOpen(false), []);
  const closeFloorPlans = useCallback(() => setFloorPlanOpen(false), []);

  const goPhoto = useCallback(
    (delta: number) => {
      if (!images.length) return;
      setPhotoIndex((i) => (i + delta + images.length) % images.length);
    },
    [images.length]
  );

  const goFloorPlan = useCallback(
    (delta: number) => {
      if (!floorPlanImages.length) return;
      setFloorPlanIndex(
        (i) => (i + delta + floorPlanImages.length) % floorPlanImages.length
      );
    },
    [floorPlanImages.length]
  );

  useEffect(() => {
    if (!photoLightboxOpen && !floorPlanOpen) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (floorPlanOpen) closeFloorPlans();
        else closePhotos();
        return;
      }
      if (photoLightboxOpen) {
        if (e.key === "ArrowRight") goPhoto(1);
        if (e.key === "ArrowLeft") goPhoto(-1);
      }
      if (floorPlanOpen) {
        if (e.key === "ArrowRight") goFloorPlan(1);
        if (e.key === "ArrowLeft") goFloorPlan(-1);
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [
    photoLightboxOpen,
    floorPlanOpen,
    closePhotos,
    closeFloorPlans,
    goPhoto,
    goFloorPlan,
  ]);

  const preview = displayImages.slice(0, 5);
  const remaining = displayImages.length - preview.length;

  return (
    <>
      <div className="relative bg-brand-950 pt-below-header">
        <div className="section-padding page-container py-4 md:py-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-2 md:gap-2.5 rounded-2xl overflow-hidden min-h-[280px] md:min-h-[480px]">
            <button
              type="button"
              onClick={() => openPhotos(0)}
              className="relative md:col-span-2 md:row-span-2 aspect-[4/3] md:aspect-auto md:min-h-[480px] group cursor-pointer"
            >
              <Image
                src={displayImages[0]}
                alt={title}
                fill
                priority
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover transition-transform duration-700 group-hover:scale-[1.02]"
              />
              <div className="absolute inset-0 bg-brand-950/0 group-hover:bg-brand-950/10 transition-colors" />
            </button>

            {preview.slice(1, 5).map((src, i) => {
              const index = i + 1;
              const isLast = index === 4 && remaining > 0;
              return (
                <button
                  key={`${src}-${index}`}
                  type="button"
                  onClick={() => openPhotos(index)}
                  className="relative hidden md:block aspect-[4/3] group cursor-pointer"
                >
                  <Image
                    src={src}
                    alt={`${title} – bild ${index + 1}`}
                    fill
                    sizes="25vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                  />
                  {isLast && (
                    <div className="absolute inset-0 bg-brand-950/55 flex items-center justify-center">
                      <span className="inline-flex items-center gap-2 text-white font-body font-semibold text-sm">
                        <Grid3X3 size={18} />
                        +{remaining} bilder
                      </span>
                    </div>
                  )}
                </button>
              );
            })}
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3 mt-4">
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => openPhotos(0)}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-white/10 border border-white/15 text-white text-sm font-body font-semibold hover:bg-white/15 transition-colors"
              >
                <LayoutGrid size={16} />
                {displayImages.length} bilder
              </button>
              {hasFloorPlans && (
                <button
                  type="button"
                  onClick={() => openFloorPlans(0)}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-white/10 border border-white/15 text-white text-sm font-body font-semibold hover:bg-white/15 transition-colors"
                >
                  <Ruler size={16} />
                  Planritning
                  <span className="opacity-70">({floorPlanImages.length})</span>
                </button>
              )}
            </div>
            <button
              type="button"
              onClick={() => openPhotos(0)}
              className="md:hidden inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-white text-brand-950 text-sm font-body font-semibold"
            >
              Visa alla bilder
            </button>
          </div>
        </div>
      </div>

      <LightGalleryModal
        open={photoLightboxOpen}
        onClose={closePhotos}
        propertyTitle={title}
        modalTitle="Bildgalleri"
        icon={ImageIcon}
        items={images}
        index={photoIndex}
        onIndexChange={setPhotoIndex}
        onPrev={() => goPhoto(-1)}
        onNext={() => goPhoto(1)}
        itemLabel="bild"
        imageFit="cover"
      />

      <LightGalleryModal
        open={floorPlanOpen}
        onClose={closeFloorPlans}
        propertyTitle={title}
        modalTitle="Planritning"
        icon={Ruler}
        items={floorPlanImages}
        index={floorPlanIndex}
        onIndexChange={setFloorPlanIndex}
        onPrev={() => goFloorPlan(-1)}
        onNext={() => goFloorPlan(1)}
        itemLabel="planritning"
        imageFit="contain"
      />
    </>
  );
}
