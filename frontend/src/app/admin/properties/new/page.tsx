"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import PropertyForm from "@/components/forms/PropertyForm";
import AdminPageHeader from "@/components/admin/AdminPageHeader";
import { propertyService } from "@/services/property.service";
import { Property } from "@/types";

export default function NewPropertyPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (data: Partial<Property>) => {
    setLoading(true);
    try {
      const res = await propertyService.create(data);
      if (res.success && res.data?.id) {
        toast.success("Publicerad! Lägg gärna till fler detaljer.");
        router.push(`/admin/properties/edit?id=${res.data.id}`);
      } else if (res.success) {
        toast.success("Fastigheten skapades.");
        router.push("/admin/properties");
      } else {
        toast.error(res.error || "Kunde inte publicera. Försök igen.");
      }
    } catch {
      toast.error("Något gick fel.");
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
      <AdminPageHeader
        title="Ny fastighet"
        description="Titel, pris och ort räcker — publicera direkt och fyll i resten efteråt."
        backHref="/admin/properties"
        backLabel="Till fastighetslistan"
      />
      <PropertyForm
        mode="quick"
        onSubmit={handleSubmit}
        onUploadImages={handleUpload}
        loading={loading}
        submitLabel="Publicera fastighet"
      />
    </div>
  );
}
