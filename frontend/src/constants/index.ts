import { PropertyStatus, PropertyType } from "@/types";

export const SITE_NAME = "Nordmark Fastigheter";
export const SITE_DESCRIPTION =
  "Specialister pa jordbruks- och skogsfastigheter i Sverige. Radgivning, formedling och vardering.";

export const NAV_LINKS = [
  { href: "/", label: "Hem" },
  { href: "/fastigheter", label: "Fastigheter" },
  { href: "/hur-man-koper", label: "Hur man koper" },
  { href: "/hur-man-saljer", label: "Hur man saljer" },
  { href: "/om-oss", label: "Om oss" },
  { href: "/kontakt", label: "Kontakt" },
] as const;

export const STATUS_LABELS: Record<PropertyStatus, string> = {
  FOR_SALE: "Till salu",
  SOLD: "Sald",
  RENTED: "Uthyrd",
  RESERVED: "Reserverad",
};

export const STATUS_COLORS: Record<PropertyStatus, string> = {
  FOR_SALE: "bg-brand-600 text-white",
  SOLD: "bg-stone-700 text-white",
  RENTED: "bg-amber-700 text-white",
  RESERVED: "bg-stone-500 text-white",
};

export const TYPE_LABELS: Record<PropertyType, string> = {
  AGRICULTURAL: "Jordbruk",
  FOREST: "Skog",
  MIXED: "Blandad",
  RESIDENTIAL: "Bostad",
  COMMERCIAL: "Kommersiell",
};

export const COUNTIES = [
  "Blekinge",
  "Dalarna",
  "Gavleborg",
  "Gotland",
  "Halland",
  "Jamtland",
  "Jonkoping",
  "Kalmar",
  "Kronoberg",
  "Norrbotten",
  "Skane",
  "Stockholm",
  "Sodermanland",
  "Uppsala",
  "Varmland",
  "Vasterbotten",
  "Vasternorrland",
  "Vastmanland",
  "Vastra Gotaland",
  "Orebro",
  "Ostergotland",
];

export const COMPANY_INFO = {
  name: "Nordmark Fastigheter AB",
  email: "kontakt@nordmark.se",
  phone: "+46 8 123 456 78",
  address: "Strandvagen 24",
  postalCode: "114 56",
  city: "Stockholm",
  orgNumber: "556789-1234",
};
