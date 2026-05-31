import Image from "next/image";
import { MapPin, Phone } from "lucide-react";
import { COMPANY_INFO, OWNER_INFO, SITE_NAME } from "@/constants";

interface ContactSidebarProps {
  showMap?: boolean;
}

export default function ContactSidebar({ showMap = true }: ContactSidebarProps) {
  return (
    <div className="space-y-6">
      <div className="premium-card p-6 md:p-8">
        <div className="relative w-full aspect-[4/5] max-w-xs mx-auto rounded-xl overflow-hidden mb-6">
          <Image
            src={OWNER_INFO.image}
            alt={OWNER_INFO.name}
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 320px"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-950/60 via-transparent to-transparent" />
        </div>
        <h2 className="font-display text-2xl text-charcoal font-semibold">
          {OWNER_INFO.name}
        </h2>
        <p className="text-brand-700 font-body text-sm mt-1 font-medium">
          {OWNER_INFO.role}
        </p>
        <p className="text-stone-500 font-body text-sm mt-1">{SITE_NAME}</p>
      </div>

      <div className="premium-card p-6 md:p-8 space-y-6">
        <h3 className="font-display text-lg text-charcoal font-semibold">
          Kontaktuppgifter
        </h3>

        <div className="flex items-start gap-4">
          <div className="w-11 h-11 rounded-xl bg-brand-50 border border-brand-100 flex items-center justify-center shrink-0">
            <Phone size={18} className="text-brand-700" />
          </div>
          <div>
            <p className="font-body font-semibold text-charcoal text-sm">
              Mobilnummer
            </p>
            <a
              href={`tel:${COMPANY_INFO.phoneTel}`}
              className="text-stone-500 font-body text-sm mt-1 hover:text-brand-700 transition-colors block"
            >
              {COMPANY_INFO.phone}
            </a>
          </div>
        </div>

        <div className="flex items-start gap-4">
          <div className="w-11 h-11 rounded-xl bg-brand-50 border border-brand-100 flex items-center justify-center shrink-0">
            <MapPin size={18} className="text-brand-700" />
          </div>
          <div>
            <p className="font-body font-semibold text-charcoal text-sm">
              Adress
            </p>
            <p className="text-stone-500 font-body text-sm mt-1 leading-relaxed">
              {COMPANY_INFO.address}
              <br />
              {COMPANY_INFO.postalCode} {COMPANY_INFO.city}
            </p>
          </div>
        </div>
      </div>

      {showMap && (
        <div className="premium-card overflow-hidden">
          <div className="aspect-[4/3] relative">
            <iframe
              src={`https://www.google.com/maps?q=${COMPANY_INFO.mapsQuery}&output=embed`}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Kontor plats"
              className="absolute inset-0"
            />
          </div>
        </div>
      )}
    </div>
  );
}
