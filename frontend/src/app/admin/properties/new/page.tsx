"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import PropertyForm from "@/components/forms/PropertyForm";
import { propertyService } from "@/services/property.service";
import { Property } from "@/types";

export default function NewPropertyPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (data: Partial<Property>) => {
    setLoading(true);
    try {
      const res = await propertyService.create(data);
      if (res.success) {
        toast.success("Fastigheten skapades.");
        router.push("/admin/properties");
      } else {
        toast.error(res.error || "Kunde inte skapa fastigheten.");
      }
    } catch {
      toast.error("Nagot gick fel.");
    } finally {
      setLoading(false);
    }
  };

  const handleUpload = async (files: File[]): Promise<string[]> => {
    const res = await propertyService.uploadImages(files);
    if (res.success && res.data) {
      return res.data;
    }
    toast.error("Kunde inte ladda upp bilder.");
    return [];
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-display text-2xl text-charcoal mb-1">
          Ny fastighet
        </h1>
        <p className="text-stone-500 font-body text-sm">
          Skapa en ny fastighetsannons
        </p>
      </div>
      <PropertyForm
        onSubmit={handleSubmit}
        onUploadImages={handleUpload}
        loading={loading}
        submitLabel="Skapa fastighet"
      />
    </div>
  );
}
