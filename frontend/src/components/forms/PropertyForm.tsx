"use client";

import { useState, FormEvent } from "react";
import { Upload, X } from "lucide-react";
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
    rooms: initialData?.rooms || 0,
    area: initialData?.area || 0,
    landArea: initialData?.landArea || 0,
    propertyType: initialData?.propertyType || "FOREST",
    status: initialData?.status || "FOR_SALE",
    featured: initialData?.featured || false,
    images: initialData?.images || ([] as string[]),
  });

  const [uploading, setUploading] = useState(false);

  const updateField = (field: string, value: unknown) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;

    setUploading(true);
    try {
      const urls = await onUploadImages(files);
      updateField("images", [...form.images, ...urls]);
    } catch {
      // Handle error
    } finally {
      setUploading(false);
    }
  };

  const removeImage = (index: number) => {
    updateField(
      "images",
      form.images.filter((_, i) => i !== index)
    );
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    await onSubmit(form);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="bg-white border border-stone-200 p-6">
        <h2 className="font-display text-lg text-charcoal mb-6">
          Grundinformation
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="md:col-span-2">
            <label className="block text-xs font-body font-medium text-stone-500 tracking-wide uppercase mb-2">
              Titel
            </label>
            <input
              type="text"
              required
              value={form.title}
              onChange={(e) => updateField("title", e.target.value)}
              className="input-field"
              placeholder="t.ex. Skogsmark i Dalarna"
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-xs font-body font-medium text-stone-500 tracking-wide uppercase mb-2">
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
            <label className="block text-xs font-body font-medium text-stone-500 tracking-wide uppercase mb-2">
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
            <label className="block text-xs font-body font-medium text-stone-500 tracking-wide uppercase mb-2">
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
            <label className="block text-xs font-body font-medium text-stone-500 tracking-wide uppercase mb-2">
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
              Utvald fastighet (visas pa startsidan)
            </label>
          </div>
        </div>
      </div>

      <div className="bg-white border border-stone-200 p-6">
        <h2 className="font-display text-lg text-charcoal mb-6">Plats</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-xs font-body font-medium text-stone-500 tracking-wide uppercase mb-2">
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
            <label className="block text-xs font-body font-medium text-stone-500 tracking-wide uppercase mb-2">
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
            <label className="block text-xs font-body font-medium text-stone-500 tracking-wide uppercase mb-2">
              Lan
            </label>
            <select
              required
              value={form.county}
              onChange={(e) => updateField("county", e.target.value)}
              className="input-field"
            >
              <option value="">Valj lan</option>
              {COUNTIES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="bg-white border border-stone-200 p-6">
        <h2 className="font-display text-lg text-charcoal mb-6">Detaljer</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block text-xs font-body font-medium text-stone-500 tracking-wide uppercase mb-2">
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
            <label className="block text-xs font-body font-medium text-stone-500 tracking-wide uppercase mb-2">
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
            <label className="block text-xs font-body font-medium text-stone-500 tracking-wide uppercase mb-2">
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
        </div>
      </div>

      <div className="bg-white border border-stone-200 p-6">
        <h2 className="font-display text-lg text-charcoal mb-6">Bilder</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
          {form.images.map((url, index) => (
            <div key={index} className="relative aspect-square bg-stone-100">
              <img
                src={url}
                alt={`Bild ${index + 1}`}
                className="w-full h-full object-cover"
              />
              <button
                type="button"
                onClick={() => removeImage(index)}
                className="absolute top-2 right-2 w-6 h-6 bg-red-600 text-white flex items-center justify-center hover:bg-red-700"
              >
                <X size={14} />
              </button>
            </div>
          ))}
          <label className="aspect-square border-2 border-dashed border-stone-300 flex flex-col items-center justify-center cursor-pointer hover:border-brand-500 transition-colors">
            <Upload size={24} className="text-stone-400 mb-2" />
            <span className="text-xs text-stone-400 font-body">
              {uploading ? "Laddar upp..." : "Ladda upp"}
            </span>
            <input
              type="file"
              accept="image/*"
              multiple
              className="hidden"
              onChange={handleImageUpload}
              disabled={uploading}
            />
          </label>
        </div>
        <p className="text-xs text-stone-400 font-body">
          Max 10 bilder, JPEG/PNG/WebP, max 10MB per bild
        </p>
      </div>

      <div className="flex items-center gap-4">
        <button
          type="submit"
          disabled={loading}
          className="btn-primary disabled:opacity-50"
        >
          {loading ? "Sparar..." : submitLabel}
        </button>
        <a href="/admin/properties" className="btn-ghost text-stone-500">
          Avbryt
        </a>
      </div>
    </form>
  );
}
