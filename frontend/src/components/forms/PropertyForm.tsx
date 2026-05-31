"use client";

import { useState, FormEvent } from "react";
import { Upload, X } from "lucide-react";
import Link from "next/link";
import { Property } from "@/types";
import { TYPE_LABELS, STATUS_LABELS, COUNTIES } from "@/constants";

interface PropertyFormProps {
  initialData?: Partial<Property>;
  onSubmit: (data: Partial<Property>) => Promise<void>;
  onUploadImages: (files: File[]) => Promise<string[]>;
  loading: boolean;
  submitLabel: string;
}

export default function PropertyForm({
  initialData,
  onSubmit,
  onUploadImages,
  loading,
  submitLabel,
}: PropertyFormProps) {
  const [form, setForm] = useState({
    title: initialData?.title || "",
    description: initialData?.description || "",
    price: initialData?.price || 0,
    city: initialData?.city || "",
    address: initialData?.address || "",
    county: initialData?.county || "",
    municipality: initialData?.municipality || "",
    rooms: initialData?.rooms || 0,
    area: initialData?.area || 0,
    landArea: initialData?.landArea || 0,
    propertyType: initialData?.propertyType || "RESIDENTIAL",
    status: initialData?.status || "FOR_SALE",
    featured: initialData?.featured || false,
    housingType: initialData?.housingType || "",
    ownershipForm: initialData?.ownershipForm || "Äganderätt",
    features: (initialData?.features || []).join(", "),
    minCash: initialData?.minCash || 0,
    titleDeedCost: initialData?.titleDeedCost || 0,
    electricityKwh: initialData?.electricityKwh || 0,
    viewingDate: initialData?.viewingDate || "",
    viewingNote: initialData?.viewingNote || "",
    images: initialData?.images || ([] as string[]),
    floorPlanImages: initialData?.floorPlanImages || ([] as string[]),
  });

  const [uploading, setUploading] = useState(false);

  const updateField = (field: string, value: unknown) => {
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
      updateField(field, [...form[field], ...urls]);
    } catch {
      // Handle error
    } finally {
      setUploading(false);
      e.target.value = "";
    }
  };

  const removeImage = (
    index: number,
    field: "images" | "floorPlanImages" = "images"
  ) => {
    updateField(
      field,
      form[field].filter((_, i) => i !== index)
    );
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const { features, ...rest } = form;
    await onSubmit({
      ...rest,
      features: features
        .split(",")
        .map((f) => f.trim())
        .filter(Boolean),
      minCash: rest.minCash || null,
      titleDeedCost: rest.titleDeedCost || null,
      electricityKwh: rest.electricityKwh || null,
      municipality: rest.municipality || null,
      housingType: rest.housingType || null,
      ownershipForm: rest.ownershipForm || null,
      viewingDate: rest.viewingDate || null,
      viewingNote: rest.viewingNote || null,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 pb-24">
      <div className="admin-form-section">
        <h2 className="font-display text-lg text-charcoal mb-5 pb-3 border-b border-stone-100">
          Grundinformation
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="md:col-span-2">
            <label className="label-field">
              Titel
            </label>
            <input
              type="text"
              required
              value={form.title}
              onChange={(e) => updateField("title", e.target.value)}
              className="input-field"
              placeholder="t.ex. Villa i Junsele"
            />
          </div>
          <div className="md:col-span-2">
            <label className="label-field">
              Beskrivning
            </label>
            <textarea
              required
              rows={5}
              value={form.description}
              onChange={(e) => updateField("description", e.target.value)}
              className="input-field resize-none"
              placeholder="Beskriv fastigheten..."
            />
          </div>
          <div>
            <label className="label-field">
              Pris (SEK)
            </label>
            <input
              type="number"
              required
              value={form.price}
              onChange={(e) => updateField("price", parseFloat(e.target.value))}
              className="input-field"
            />
          </div>
          <div>
            <label className="label-field">
              Fastighetstyp
            </label>
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
            <label className="label-field">
              Status
            </label>
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
          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              id="featured"
              checked={form.featured}
              onChange={(e) => updateField("featured", e.target.checked)}
              className="w-4 h-4 accent-brand-700"
            />
            <label
              htmlFor="featured"
              className="text-sm font-body text-stone-600"
            >
              Utvald fastighet (visas på startsidan)
            </label>
          </div>
        </div>
      </div>

      <div className="admin-form-section">
        <h2 className="font-display text-lg text-charcoal mb-5 pb-3 border-b border-stone-100">Plats</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="label-field">
              Adress
            </label>
            <input
              type="text"
              required
              value={form.address}
              onChange={(e) => updateField("address", e.target.value)}
              className="input-field"
            />
          </div>
          <div>
            <label className="label-field">
              Stad
            </label>
            <input
              type="text"
              required
              value={form.city}
              onChange={(e) => updateField("city", e.target.value)}
              className="input-field"
            />
          </div>
          <div>
            <label className="label-field">
              Lan
            </label>
            <select
              required
              value={form.county}
              onChange={(e) => updateField("county", e.target.value)}
              className="input-field"
            >
              <option value="">Välj län</option>
              {COUNTIES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="label-field">
              Kommun
            </label>
            <input
              type="text"
              value={form.municipality}
              onChange={(e) => updateField("municipality", e.target.value)}
              className="input-field"
              placeholder="t.ex. Sollefteå kommun"
            />
          </div>
        </div>
      </div>

      <div className="admin-form-section">
        <h2 className="font-display text-lg text-charcoal mb-5 pb-3 border-b border-stone-100">Detaljer</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="label-field">
              Antal rum
            </label>
            <input
              type="number"
              value={form.rooms}
              onChange={(e) => updateField("rooms", parseInt(e.target.value))}
              className="input-field"
            />
          </div>
          <div>
            <label className="label-field">
              Boarea (m2)
            </label>
            <input
              type="number"
              required
              value={form.area}
              onChange={(e) => updateField("area", parseFloat(e.target.value))}
              className="input-field"
            />
          </div>
          <div>
            <label className="label-field">
              Markareal (m2)
            </label>
            <input
              type="number"
              value={form.landArea || ""}
              onChange={(e) =>
                updateField("landArea", parseFloat(e.target.value) || null)
              }
              className="input-field"
            />
          </div>
          <div>
            <label className="label-field">
              Bostadstyp
            </label>
            <input
              type="text"
              value={form.housingType}
              onChange={(e) => updateField("housingType", e.target.value)}
              className="input-field"
              placeholder="t.ex. Fritidshus"
            />
          </div>
          <div>
            <label className="label-field">
              Upplåtelseform
            </label>
            <input
              type="text"
              value={form.ownershipForm}
              onChange={(e) => updateField("ownershipForm", e.target.value)}
              className="input-field"
            />
          </div>
          <div className="md:col-span-3">
            <label className="label-field">
              Egenskaper (kommaseparerade)
            </label>
            <input
              type="text"
              value={form.features}
              onChange={(e) => updateField("features", e.target.value)}
              className="input-field"
              placeholder="Balkong, Uteplats"
            />
          </div>
        </div>
      </div>

      <div className="admin-form-section">
        <h2 className="font-display text-lg text-charcoal mb-5 pb-3 border-b border-stone-100">
          Pris, visning & drift
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="label-field">
              Minsta kontantinsats (SEK)
            </label>
            <input
              type="number"
              value={form.minCash || ""}
              onChange={(e) =>
                updateField("minCash", parseFloat(e.target.value) || 0)
              }
              className="input-field"
            />
          </div>
          <div>
            <label className="label-field">
              Lagfartskostnad (SEK)
            </label>
            <input
              type="number"
              value={form.titleDeedCost || ""}
              onChange={(e) =>
                updateField("titleDeedCost", parseFloat(e.target.value) || 0)
              }
              className="input-field"
            />
          </div>
          <div>
            <label className="label-field">
              Elförbrukning (kWh/år)
            </label>
            <input
              type="number"
              value={form.electricityKwh || ""}
              onChange={(e) =>
                updateField("electricityKwh", parseInt(e.target.value) || 0)
              }
              className="input-field"
            />
          </div>
          <div>
            <label className="label-field">
              Visningsdatum
            </label>
            <input
              type="text"
              value={form.viewingDate}
              onChange={(e) => updateField("viewingDate", e.target.value)}
              className="input-field"
              placeholder="Fre 5 jun"
            />
          </div>
          <div className="md:col-span-2">
            <label className="label-field">
              Visningsinfo
            </label>
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
          Bilder ({form.images.length})
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
          {form.images.map((url, index) => (
            <div key={index} className="relative aspect-square bg-stone-100 rounded-lg overflow-hidden">
              <img
                src={url}
                alt={`Bild ${index + 1}`}
                className="w-full h-full object-cover"
              />
              <button
                type="button"
                onClick={() => removeImage(index, "images")}
                className="absolute top-2 right-2 w-6 h-6 bg-red-600 text-white flex items-center justify-center hover:bg-red-700 rounded"
              >
                <X size={14} />
              </button>
            </div>
          ))}
          <label className="aspect-square border-2 border-dashed border-stone-300 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-brand-500 transition-colors">
            <Upload size={24} className="text-stone-400 mb-2" />
            <span className="text-xs text-stone-400 font-body">
              {uploading ? "Laddar upp..." : "Ladda upp"}
            </span>
            <input
              type="file"
              accept="image/*"
              multiple
              className="hidden"
              onChange={(e) => handleImageUpload(e, "images")}
              disabled={uploading}
            />
          </label>
        </div>
        <p className="text-xs text-stone-400 font-body">
          Ladda upp obegränsat antal bilder (50 per batch). JPEG/PNG/WebP, max 10MB.
        </p>
      </div>

      <div className="admin-form-section">
        <h2 className="font-display text-lg text-charcoal mb-5 pb-3 border-b border-stone-100">
          Planritningar ({form.floorPlanImages.length})
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
          {form.floorPlanImages.map((url, index) => (
            <div key={index} className="relative aspect-square bg-stone-100 rounded-lg overflow-hidden">
              <img
                src={url}
                alt={`Planritning ${index + 1}`}
                className="w-full h-full object-cover"
              />
              <button
                type="button"
                onClick={() => removeImage(index, "floorPlanImages")}
                className="absolute top-2 right-2 w-6 h-6 bg-red-600 text-white flex items-center justify-center hover:bg-red-700 rounded"
              >
                <X size={14} />
              </button>
            </div>
          ))}
          <label className="aspect-square border-2 border-dashed border-stone-300 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-brand-500 transition-colors">
            <Upload size={24} className="text-stone-400 mb-2" />
            <span className="text-xs text-stone-400 font-body">
              {uploading ? "Laddar upp..." : "Planritning"}
            </span>
            <input
              type="file"
              accept="image/*"
              multiple
              className="hidden"
              onChange={(e) => handleImageUpload(e, "floorPlanImages")}
              disabled={uploading}
            />
          </label>
        </div>
      </div>

      <div className="sticky bottom-0 -mx-5 sm:-mx-8 px-5 sm:px-8 py-4 bg-cream/95 backdrop-blur border-t border-stone-200/80 flex flex-wrap items-center gap-3 z-10">
        <button
          type="submit"
          disabled={loading || uploading}
          className="btn-primary disabled:opacity-50 min-w-[140px]"
        >
          {loading ? "Sparar..." : submitLabel}
        </button>
        <Link href="/admin/properties" className="btn-ghost text-stone-500">
          Avbryt
        </Link>
        {uploading && (
          <span className="text-sm text-stone-500 font-body">Laddar upp bilder...</span>
        )}
      </div>
    </form>
  );
}
