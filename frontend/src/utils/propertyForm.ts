import { Property } from "@/types";

type PropertyFormState = {
  title: string;
  description: string;
  price: string | number;
  city: string;
  address: string;
  county: string;
  municipality: string;
  rooms: string | number;
  area: string | number;
  landArea: string | number;
  propertyType: string;
  status: string;
  featured: boolean;
  housingType: string;
  ownershipForm: string;
  features: string;
  minCash: string | number;
  titleDeedCost: string | number;
  electricityKwh: string | number;
  viewingDate: string;
  viewingNote: string;
  images: string[];
  floorPlanImages: string[];
};

function parseOptionalNumber(value: string | number): number | null {
  if (value === "" || value === null || value === undefined) return null;
  const num = Number(value);
  if (Number.isNaN(num) || num <= 0) return null;
  return num;
}

function parseRequiredNumber(value: string | number, fallback: number): number {
  if (value === "" || value === null || value === undefined) return fallback;
  const num = Number(value);
  if (Number.isNaN(num) || num <= 0) return fallback;
  return num;
}

function parseRooms(value: string | number): number {
  if (value === "" || value === null || value === undefined) return 0;
  const num = parseInt(String(value), 10);
  if (Number.isNaN(num) || num < 0) return 0;
  return num;
}

/** Normalize admin form values before sending to the API. */
export function buildPropertyPayload(form: PropertyFormState): Partial<Property> {
  const title = form.title.trim() || "Ny fastighet";
  const address = form.address.trim() || title;

  return {
    title,
    description: form.description.trim() || "Beskrivning kommer snart.",
    price: parseRequiredNumber(form.price, 1),
    city: form.city.trim() || "Junsele",
    address,
    county: form.county.trim() || "Västernorrland",
    municipality: form.municipality.trim() || null,
    rooms: parseRooms(form.rooms),
    area: parseRequiredNumber(form.area, 1),
    landArea: parseOptionalNumber(form.landArea),
    propertyType: form.propertyType as Property["propertyType"],
    status: form.status as Property["status"],
    featured: form.featured,
    housingType: form.housingType.trim() || null,
    ownershipForm: form.ownershipForm.trim() || null,
    features: form.features
      .split(",")
      .map((f) => f.trim())
      .filter(Boolean),
    minCash: parseOptionalNumber(form.minCash),
    titleDeedCost: parseOptionalNumber(form.titleDeedCost),
    electricityKwh: parseOptionalNumber(form.electricityKwh),
    viewingDate: form.viewingDate.trim() || null,
    viewingNote: form.viewingNote.trim() || null,
    images: form.images,
    floorPlanImages: form.floorPlanImages,
  };
}

export function getDefaultPropertyFormState(
  initialData?: Partial<Property>
): PropertyFormState {
  return {
    title: initialData?.title || "",
    description: initialData?.description || "",
    price: initialData?.price ? String(initialData.price) : "",
    city: initialData?.city || "",
    address: initialData?.address || "",
    county: initialData?.county || "Västernorrland",
    municipality: initialData?.municipality || "",
    rooms:
      initialData?.rooms !== undefined && initialData.rooms !== null
        ? String(initialData.rooms)
        : "",
    area: initialData?.area ? String(initialData.area) : "",
    landArea:
      initialData?.landArea !== undefined && initialData.landArea !== null
        ? String(initialData.landArea)
        : "",
    propertyType: initialData?.propertyType || "RESIDENTIAL",
    status: initialData?.status || "FOR_SALE",
    featured: initialData?.featured || false,
    housingType: initialData?.housingType || "",
    ownershipForm: initialData?.ownershipForm || "",
    features: (initialData?.features || []).join(", "),
    minCash:
      initialData?.minCash !== undefined && initialData.minCash !== null
        ? String(initialData.minCash)
        : "",
    titleDeedCost:
      initialData?.titleDeedCost !== undefined &&
      initialData.titleDeedCost !== null
        ? String(initialData.titleDeedCost)
        : "",
    electricityKwh:
      initialData?.electricityKwh !== undefined &&
      initialData.electricityKwh !== null
        ? String(initialData.electricityKwh)
        : "",
    viewingDate: initialData?.viewingDate || "",
    viewingNote: initialData?.viewingNote || "",
    images: initialData?.images || [],
    floorPlanImages: initialData?.floorPlanImages || [],
  };
}

export type { PropertyFormState };
