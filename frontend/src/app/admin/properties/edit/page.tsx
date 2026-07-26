"use client";

import { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { ExternalLink } from "lucide-react";
import toast from "react-hot-toast";
import PropertyForm from "@/components/forms/PropertyForm";
import AdminPageHeader from "@/components/admin/AdminPageHeader";
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

    const propertyId = id;

    async function fetchProperty() {
      try {
        const res = await propertyService.getById(propertyId);
        if (res.success && res.data) {
          setProperty(res.data);
        } else {
          toast.error("Fastigheten hittades inte.");
          router.push("/admin/properties");
        }
      } catch {
        toast.error("Kunde inte hämta fastigheten.");
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
        toast.error(
          res.error?.includes(",")
            ? "Kunde inte spara — kontrollera uppgifterna och försök igen."
            : res.error || "Kunde inte uppdatera."
        );
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

  if (loadingData) {
    return <LoadingSpinner size="lg" className="py-20" />;
  }

  if (!property) return null;

  return (
    <div>
      <AdminPageHeader
        title="Redigera fastighet"
        description={property.title}
        backHref="/admin/properties"
        backLabel="Till fastighetslistan"
        action={
          <Link
            href={`/fastigheter/${property.slug}`}
            target="_blank"
            className="btn-outline text-sm"
          >
            <ExternalLink size={16} />
            Visa på webbplatsen
          </Link>
        }
      />
      <PropertyForm
        initialData={property}
        onSubmit={handleSubmit}
        onUploadImages={handleUpload}
        loading={loading}
        submitLabel="Spara ändringar"
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
