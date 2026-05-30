"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import toast from "react-hot-toast";
import PropertyForm from "@/components/forms/PropertyForm";
import { propertyService } from "@/services/property.service";
import { Property } from "@/types";
import LoadingSpinner from "@/components/ui/LoadingSpinner";

function EditPropertyContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  const [property, setProperty] = useState<Property | null>(null);
  const [loadingData, setLoadingData] = useState(true);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!id) {
      router.push("/admin/properties");
      return;
    }

    async function fetchProperty() {
      try {
        const res = await propertyService.getById(id);
        if (res.success && res.data) {
          setProperty(res.data);
        } else {
          toast.error("Fastigheten hittades inte.");
          router.push("/admin/properties");
        }
      } catch {
        toast.error("Kunde inte hamta fastigheten.");
        router.push("/admin/properties");
      } finally {
        setLoadingData(false);
      }
    }

    fetchProperty();
  }, [id, router]);

  const handleSubmit = async (data: Partial<Property>) => {
    if (!id) return;
    setLoading(true);
    try {
      const res = await propertyService.update(id, data);
      if (res.success) {
        toast.success("Fastigheten uppdaterades.");
        router.push("/admin/properties");
      } else {
        toast.error(res.error || "Kunde inte uppdatera.");
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

  if (loadingData) {
    return <LoadingSpinner size="lg" className="py-20" />;
  }

  if (!property) return null;

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-display text-2xl text-charcoal mb-1">
          Redigera fastighet
        </h1>
        <p className="text-stone-500 font-body text-sm">{property.title}</p>
      </div>
      <PropertyForm
        initialData={property}
        onSubmit={handleSubmit}
        onUploadImages={handleUpload}
        loading={loading}
        submitLabel="Spara andringar"
      />
    </div>
  );
}

export default function EditPropertyPage() {
  return (
    <Suspense fallback={<LoadingSpinner size="lg" className="py-20" />}>
      <EditPropertyContent />
    </Suspense>
  );
}
