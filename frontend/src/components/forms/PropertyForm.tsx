"use client";

import { useState, FormEvent } from "react";
import { ChevronDown, ChevronUp, Upload, X } from "lucide-react";
import Link from "next/link";
import toast from "react-hot-toast";
import { Property } from "@/types";
import { TYPE_LABELS, STATUS_LABELS, COUNTIES } from "@/constants";
import {
  buildPropertyPayload,
  getDefaultPropertyFormState,
  type PropertyFormState,
} from "@/utils/propertyForm";
import { cn } from "@/utils";

interface PropertyFormProps {
  initialData?: Partial<Property>;
  onSubmit: (data: Partial<Property>) => Promise<void>;
  onUploadImages: (files: File[]) => Promise<string[]>;
  loading: boolean;
  submitLabel: string;
  /** Quick = minimal fields for new listings; full = all sections for editing */
  mode?: "quick" | "full";
}

function FieldLabel({
  children,
  optional = false,
}: {
  children: React.ReactNode;
  optional?: boolean;
}) {
  return (
    <label className="label-field">
      {children}
      {optional && (
        <span className="normal-case tracking-normal text-stone-400 font-normal ml-1">
          (valfritt)
        </span>
      )}
    </label>
  );
}

function ImageUploadGrid({
  images,
  uploading,
  onUpload,
  onRemove,
  emptyLabel,
}: {
  images: string[];
  uploading: boolean;
  onUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onRemove: (index: number) => void;
  emptyLabel: string;
}) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
      {images.map((url, index) => (
        <div
          key={index}
          className="relative aspect-square bg-stone-100 rounded-lg overflow-hidden"
        >
          <img
            src={url}
            alt={`Bild ${index + 1}`}
            className="w-full h-full object-cover"
          />
          <button
            type="button"
            onClick={() => onRemove(index)}
            className="absolute top-2 right-2 w-7 h-7 bg-red-600 text-white flex items-center justify-center hover:bg-red-700 rounded-lg"
          >
            <X size={14} />
          </button>
        </div>
      ))}
      <label className="aspect-square border-2 border-dashed border-stone-300 rounded-xl flex flex-col items-center justify-center cursor-pointer hover:border-brand-500 hover:bg-brand-50/50 transition-colors">
        <Upload size={22} className="text-stone-400 mb-1.5" />
        <span className="text-xs text-stone-500 font-body text-center px-2">
          {uploading ? "Laddar upp..." : emptyLabel}
        </span>
        <input
          type="file"
          accept="image/*"
          multiple
          className="hidden"
          onChange={onUpload}
          disabled={uploading}
        />
      </label>
    </div>
  );
}

export default function PropertyForm({
  initialData,
  onSubmit,
  onUploadImages,
  loading,
  submitLabel,
  mode = initialData ? "full" : "quick",
}: PropertyFormProps) {
  const isQuick = mode === "quick";
  const [form, setForm] = useState<PropertyFormState>(() =>
    getDefaultPropertyFormState(initialData)
  );
  const [uploading, setUploading] = useState(false);
  const [showAdvanced, setShowAdvanced] = useState(!isQuick);

  const updateField = <K extends keyof PropertyFormState>(
    field: K,
    value: PropertyFormState[K]
  ) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleImageUpload = async (
    e: React.ChangeEvent<HTMLInputElement>,
    field: "images" | "floorPlanImages" = "images"
  ) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;

    setUploading(true);
    try {
      const urls = await onUploadImages(files);
      if (urls.length > 0) {
        updateField(field, [...form[field], ...urls]);
        toast.success(
          urls.length === 1 ? "Bild uppladdad" : `${urls.length} bilder uppladdade`
        );
      }
    } finally {
      setUploading(false);
      e.target.value = "";
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      await onSubmit(buildPropertyPayload(form));
    } catch {
      toast.error("Kunde inte spara. Försök igen.");
    }
  };

  const advancedSections = (
    <>
      <div className="admin-form-section">
        <h2 className="font-display text-lg text-charcoal mb-5 pb-3 border-b border-stone-100">
          Plats & typ
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <FieldLabel optional>Adress</FieldLabel>
            <input
              type="text"
              value={form.address}
              onChange={(e) => updateField("address", e.target.value)}
              className="input-field"
              placeholder="Använder titeln om tom"
            />
          </div>
          <div>
            <FieldLabel optional>Kommun</FieldLabel>
            <input
              type="text"
              value={form.municipality}
              onChange={(e) => updateField("municipality", e.target.value)}
              className="input-field"
              placeholder="t.ex. Sollefteå kommun"
            />
          </div>
          <div>
            <FieldLabel>Fastighetstyp</FieldLabel>
            <select
              value={form.propertyType}
              onChange={(e) => updateField("propertyType", e.target.value)}
              className="input-field"
            >
              {Object.entries(TYPE_LABELS).map(([key, label]) => (
                <option key={key} value={key}>
                  {label}
                </option>
              ))}
            </select>
          </div>
          <div>
            <FieldLabel>Status</FieldLabel>
            <select
              value={form.status}
              onChange={(e) => updateField("status", e.target.value)}
              className="input-field"
            >
              {Object.entries(STATUS_LABELS).map(([key, label]) => (
                <option key={key} value={key}>
                  {label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="admin-form-section">
        <h2 className="font-display text-lg text-charcoal mb-5 pb-3 border-b border-stone-100">
          Detaljer
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
          <div>
            <FieldLabel optional>Antal rum</FieldLabel>
            <input
              type="number"
              min={0}
              value={form.rooms}
              onChange={(e) => updateField("rooms", e.target.value)}
              className="input-field"
              placeholder="0"
            />
          </div>
          <div>
            <FieldLabel optional>Boarea (m²)</FieldLabel>
            <input
              type="number"
              min={0}
              value={form.area}
              onChange={(e) => updateField("area", e.target.value)}
              className="input-field"
              placeholder="t.ex. 70"
            />
          </div>
          <div>
            <FieldLabel optional>Tomtarea (m²)</FieldLabel>
            <input
              type="number"
              min={0}
              value={form.landArea}
              onChange={(e) => updateField("landArea", e.target.value)}
              className="input-field"
            />
          </div>
          <div>
            <FieldLabel optional>Bostadstyp</FieldLabel>
            <input
              type="text"
              value={form.housingType}
              onChange={(e) => updateField("housingType", e.target.value)}
              className="input-field"
              placeholder="t.ex. Fritidshus"
            />
          </div>
          <div>
            <FieldLabel optional>Upplåtelseform</FieldLabel>
            <input
              type="text"
              value={form.ownershipForm}
              onChange={(e) => updateField("ownershipForm", e.target.value)}
              className="input-field"
              placeholder="t.ex. Äganderätt"
            />
          </div>
          <div className="sm:col-span-2 md:col-span-3">
            <FieldLabel optional>Egenskaper</FieldLabel>
            <input
              type="text"
              value={form.features}
              onChange={(e) => updateField("features", e.target.value)}
              className="input-field"
              placeholder="Balkong, Uteplats (kommaseparerade)"
            />
          </div>
        </div>
      </div>

      <div className="admin-form-section">
        <h2 className="font-display text-lg text-charcoal mb-5 pb-3 border-b border-stone-100">
          Visning & kostnader
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
          <div>
            <FieldLabel optional>Minsta kontantinsats</FieldLabel>
            <input
              type="number"
              min={0}
              value={form.minCash}
              onChange={(e) => updateField("minCash", e.target.value)}
              className="input-field"
            />
          </div>
          <div>
            <FieldLabel optional>Lagfartskostnad</FieldLabel>
            <input
              type="number"
              min={0}
              value={form.titleDeedCost}
              onChange={(e) => updateField("titleDeedCost", e.target.value)}
              className="input-field"
            />
          </div>
          <div>
            <FieldLabel optional>Elförbrukning (kWh/år)</FieldLabel>
            <input
              type="number"
              min={0}
              value={form.electricityKwh}
              onChange={(e) => updateField("electricityKwh", e.target.value)}
              className="input-field"
            />
          </div>
          <div>
            <FieldLabel optional>Visningsdatum</FieldLabel>
            <input
              type="text"
              value={form.viewingDate}
              onChange={(e) => updateField("viewingDate", e.target.value)}
              className="input-field"
              placeholder="Fre 5 jun"
            />
          </div>
          <div className="sm:col-span-2">
            <FieldLabel optional>Visningsinfo</FieldLabel>
            <input
              type="text"
              value={form.viewingNote}
              onChange={(e) => updateField("viewingNote", e.target.value)}
              className="input-field"
            />
          </div>
        </div>
      </div>

      <div className="admin-form-section">
        <h2 className="font-display text-lg text-charcoal mb-5 pb-3 border-b border-stone-100">
          Planritningar ({form.floorPlanImages.length})
        </h2>
        <ImageUploadGrid
          images={form.floorPlanImages}
          uploading={uploading}
          onUpload={(e) => handleImageUpload(e, "floorPlanImages")}
          onRemove={(i) =>
            updateField(
              "floorPlanImages",
              form.floorPlanImages.filter((_, idx) => idx !== i)
            )
          }
          emptyLabel="Ladda upp planritning"
        />
      </div>
    </>
  );

  return (
    <form onSubmit={handleSubmit} className="space-y-5 pb-24" noValidate>
      {isQuick ? (
        <>
          <div className="admin-form-section !p-6 md:!p-8 space-y-6">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-brand-700 mb-1">
                Snabb publicering
              </p>
              <p className="text-stone-500 font-body text-sm">
                Fyll i det viktigaste — du kan lägga till mer efteråt.
              </p>
            </div>

            <div>
              <FieldLabel>Titel på annonsen</FieldLabel>
              <input
                type="text"
                value={form.title}
                onChange={(e) => updateField("title", e.target.value)}
                className="input-field text-base md:text-lg"
                placeholder="t.ex. Villa i Junsele"
                autoFocus
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <FieldLabel optional>Pris (SEK)</FieldLabel>
                <input
                  type="number"
                  min={0}
                  value={form.price}
                  onChange={(e) => updateField("price", e.target.value)}
                  className="input-field"
                  placeholder="600 000"
                />
              </div>
              <div>
                <FieldLabel optional>Stad / ort</FieldLabel>
                <input
                  type="text"
                  value={form.city}
                  onChange={(e) => updateField("city", e.target.value)}
                  className="input-field"
                  placeholder="t.ex. Junsele"
                />
              </div>
            </div>

            <div>
              <FieldLabel>Län</FieldLabel>
              <select
                value={form.county}
                onChange={(e) => updateField("county", e.target.value)}
                className="input-field"
              >
                {COUNTIES.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <FieldLabel optional>Kort beskrivning</FieldLabel>
              <textarea
                rows={3}
                value={form.description}
                onChange={(e) => updateField("description", e.target.value)}
                className="input-field resize-none"
                placeholder="Valfritt — kan skrivas senare"
              />
            </div>

            <div>
              <FieldLabel optional>Bilder ({form.images.length})</FieldLabel>
              <ImageUploadGrid
                images={form.images}
                uploading={uploading}
                onUpload={(e) => handleImageUpload(e, "images")}
                onRemove={(i) =>
                  updateField(
                    "images",
                    form.images.filter((_, idx) => idx !== i)
                  )
                }
                emptyLabel="Klicka för att ladda upp"
              />
            </div>

            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={form.featured}
                onChange={(e) => updateField("featured", e.target.checked)}
                className="w-4 h-4 accent-brand-700"
              />
              <span className="text-sm font-body text-stone-600">
                Visa som utvald fastighet på startsidan
              </span>
            </label>
          </div>

          <button
            type="button"
            onClick={() => setShowAdvanced((v) => !v)}
            className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl border border-stone-200 bg-white text-stone-600 font-body text-sm font-medium hover:bg-stone-50 hover:border-stone-300 transition-colors"
          >
            {showAdvanced ? (
              <>
                <ChevronUp size={18} />
                Dölj fler alternativ
              </>
            ) : (
              <>
                <ChevronDown size={18} />
                Fler alternativ (adress, rum, visning m.m.)
              </>
            )}
          </button>

          {showAdvanced && advancedSections}
        </>
      ) : (
        <>
          <div className="rounded-xl bg-brand-50 border border-brand-100 px-4 py-3 text-sm text-brand-900 font-body">
            Uppdatera uppgifterna nedan. Tomma fält behåller befintliga värden
            eller får standardvärden vid sparning.
          </div>

          <div className="admin-form-section">
            <h2 className="font-display text-lg text-charcoal mb-5 pb-3 border-b border-stone-100">
              Grundinformation
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="md:col-span-2">
                <FieldLabel>Titel</FieldLabel>
                <input
                  type="text"
                  value={form.title}
                  onChange={(e) => updateField("title", e.target.value)}
                  className="input-field"
                />
              </div>
              <div className="md:col-span-2">
                <FieldLabel optional>Beskrivning</FieldLabel>
                <textarea
                  rows={5}
                  value={form.description}
                  onChange={(e) => updateField("description", e.target.value)}
                  className="input-field resize-none"
                />
              </div>
              <div>
                <FieldLabel optional>Pris (SEK)</FieldLabel>
                <input
                  type="number"
                  min={0}
                  value={form.price}
                  onChange={(e) => updateField("price", e.target.value)}
                  className="input-field"
                />
              </div>
              <div>
                <FieldLabel optional>Stad</FieldLabel>
                <input
                  type="text"
                  value={form.city}
                  onChange={(e) => updateField("city", e.target.value)}
                  className="input-field"
                />
              </div>
              <div>
                <FieldLabel>Län</FieldLabel>
                <select
                  value={form.county}
                  onChange={(e) => updateField("county", e.target.value)}
                  className="input-field"
                >
                  {COUNTIES.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  id="featured-full"
                  checked={form.featured}
                  onChange={(e) => updateField("featured", e.target.checked)}
                  className="w-4 h-4 accent-brand-700"
                />
                <label
                  htmlFor="featured-full"
                  className="text-sm font-body text-stone-600"
                >
                  Utvald fastighet
                </label>
              </div>
            </div>
          </div>

          {advancedSections}

          <div className="admin-form-section">
            <h2 className="font-display text-lg text-charcoal mb-5 pb-3 border-b border-stone-100">
              Bilder ({form.images.length})
            </h2>
            <ImageUploadGrid
              images={form.images}
              uploading={uploading}
              onUpload={(e) => handleImageUpload(e, "images")}
              onRemove={(i) =>
                updateField(
                  "images",
                  form.images.filter((_, idx) => idx !== i)
                )
              }
              emptyLabel="Ladda upp bilder"
            />
          </div>
        </>
      )}

      <div className="sticky bottom-0 -mx-5 sm:-mx-8 px-5 sm:px-8 py-4 bg-cream/95 backdrop-blur border-t border-stone-200/80 flex flex-wrap items-center gap-3 z-10">
        <button
          type="submit"
          disabled={loading || uploading}
          className={cn(
            "btn-primary disabled:opacity-50",
            isQuick ? "min-w-[180px] !py-3.5 !text-base" : "min-w-[140px]"
          )}
        >
          {loading ? "Sparar..." : submitLabel}
        </button>
        <Link href="/admin/properties" className="btn-ghost text-stone-500">
          Avbryt
        </Link>
        {uploading && (
          <span className="text-sm text-stone-500 font-body">
            Laddar upp bilder...
          </span>
        )}
      </div>
    </form>
  );
}
