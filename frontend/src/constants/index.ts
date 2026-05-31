import { PropertyStatus, PropertyType } from "@/types";

export const SITE_NAME = "Olofssons Skog & Mäkleri";
export const SITE_NAME_SHORT = "Olofssons";
export const SITE_TAGLINE = "Skog & Mäkleri";
export const SITE_LOGO = "/logo.png";
export const SITE_DESCRIPTION =
  "Fastighetsmäkleri och rådgivning för jord- och skogsfastigheter. Bostäder till salu i Junsele och omnejd.";

export const SERVICES_INTRO = {
  title: "Fastighetsmäkleri och rådgivning för jord- och skogsfastigheter",
  paragraphs: [
    "Med kunskap, erfarenhet och ett personligt engagemang hjälper vi privatpersoner, familjer och företag med försäljning, värdering och rådgivning kring jord- och skogsfastigheter. Vi vet att en fastighet ofta betyder mer än bara mark och skog – den bär på historia, tradition och framtida möjligheter.",
    "Som fastighetsmäklare och rådgivare finns vi med genom hela processen och erbjuder trygg vägledning anpassad efter varje kunds behov.",
  ],
  closing:
    "Vårt mål är att skapa långsiktiga relationer där trygghet, tydlighet och personlig service står i fokus – från första rådgivning till avslutad affär.",
};

export const SERVICES_LIST = [
  "Fastighetsförmedling av jord- och skogsfastigheter",
  "Värdering av jord- och skogsfastigheter",
  "Rådgivning vid generationsskiften och ägarförändringar",
  "Bokföring och deklaration för jord- och skogsbruk",
  "Skogsekonomisk rådgivning vid ägande, köp och försäljning",
] as const;

export const LEGAL_DOCUMENTS = [
  "köpekontrakt",
  "köpebrev",
  "servitutsavtal",
  "handlingar vid fastighetsregleringar",
  "övriga fastighetsrättsliga dokument",
] as const;

export const NAV_LINKS = [
  { href: "/", label: "Hem" },
  { href: "/fastigheter", label: "Fastigheter" },
  { href: "/hur-man-koper", label: "Hur man köper" },
  { href: "/hur-man-saljer", label: "Hur man säljer" },
  { href: "/om-oss", label: "Om oss" },
  { href: "/kontakt", label: "Kontakt" },
] as const;

export const OWNER_INFO = {
  name: "Ingemar Olofsson",
  role: "Fastighetsmäklare, skogsmästare",
  image: "/owner.jpeg",
};

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
  "Gotland",
  "Gävleborg",
  "Halland",
  "Jämtland",
  "Jönköping",
  "Kalmar",
  "Kronoberg",
  "Norrbotten",
  "Skåne",
  "Stockholm",
  "Södermanland",
  "Uppsala",
  "Värmland",
  "Västerbotten",
  "Västernorrland",
  "Västmanland",
  "Västra Götaland",
  "Örebro",
  "Östergötland",
] as const;

export const COMPANY_INFO = {
  name: SITE_NAME,
  phone: "070-2582297",
  phoneTel: "+46702582297",
  address: "Kronvägen 13",
  postalCode: "883 71",
  city: "Junsele",
  mapsQuery: "Kronvägen+13,+883+71+Junsele",
};

export const TRUST_STATS = [
  { value: "30+", label: "Års erfarenhet" },
  { value: "100%", label: "Personlig service" },
  { value: "5", label: "Kärntjänster" },
] as const;
