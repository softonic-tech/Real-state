import Link from "next/link";
import { MapPin, Phone, ArrowUpRight } from "lucide-react";
import SiteLogo from "@/components/ui/SiteLogo";
import {
  COMPANY_INFO,
  NAV_LINKS,
  SITE_NAME,
} from "@/constants";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-brand-950 text-stone-400">
      <div className="section-padding page-container pt-16 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8">
          <div className="lg:col-span-4">
            <Link href="/" className="inline-block mb-6 group">
              <SiteLogo size="large" className="group-hover:opacity-90 transition-opacity" />
            </Link>
            <p className="text-sm leading-relaxed max-w-xs mb-6">
              Bostäder till salu i Junsele och omnejd. Fastighetsmäkleri och
              rådgivning för jord- och skogsfastigheter.
            </p>
            <Link
              href="/kontakt"
              className="inline-flex items-center gap-2 text-accent-light text-sm font-semibold hover:text-white transition-colors"
            >
              Kontakta oss
              <ArrowUpRight size={16} />
            </Link>
          </div>

          <div className="lg:col-span-2 lg:col-start-6">
            <h4 className="text-white text-xs font-bold tracking-[0.2em] uppercase mb-5">
              Navigation
            </h4>
            <ul className="space-y-2.5">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h4 className="text-white text-xs font-bold tracking-[0.2em] uppercase mb-5">
              Tjänster
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>Fastighetsförmedling</li>
              <li>Värdering</li>
              <li>Generationsskiften</li>
              <li>Juridiska handlingar</li>
            </ul>
          </div>

          <div className="lg:col-span-3">
            <h4 className="text-white text-xs font-bold tracking-[0.2em] uppercase mb-5">
              Kontakt
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin size={17} className="text-accent mt-0.5 shrink-0" />
                <span className="text-sm leading-relaxed">
                  {COMPANY_INFO.address}
                  <br />
                  {COMPANY_INFO.postalCode} {COMPANY_INFO.city}
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={17} className="text-accent shrink-0" />
                <a
                  href={`tel:${COMPANY_INFO.phoneTel}`}
                  className="text-sm hover:text-white transition-colors font-medium"
                >
                  {COMPANY_INFO.phone}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="divider-fade opacity-30 mt-14 mb-8" />

        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-stone-600">
          <p>
            © {currentYear} {SITE_NAME}. Alla rättigheter förbehållna.
          </p>
          <Link
            href="/admin/login"
            className="hover:text-stone-400 transition-colors"
          >
            Adminpanel
          </Link>
        </div>
      </div>
    </footer>
  );
}
