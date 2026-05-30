import Link from "next/link";
import { MapPin, Phone, Mail } from "lucide-react";
import { COMPANY_INFO, NAV_LINKS } from "@/constants";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-brand-950 text-stone-300">
      <div className="section-padding page-container py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-brand-600 flex items-center justify-center">
                <span className="text-white font-display text-lg leading-none">
                  N
                </span>
              </div>
              <div>
                <span className="font-display text-xl text-white">
                  Nordmark
                </span>
                <span className="font-body text-xs text-stone-500 block -mt-0.5 tracking-widest uppercase">
                  Fastigheter
                </span>
              </div>
            </div>
            <p className="text-sm text-stone-400 leading-relaxed max-w-xs">
              Specialister pa jordbruks- och skogsfastigheter i Sverige sedan
              1998. Vi erbjuder kvalificerad radgivning och formedling.
            </p>
          </div>

          <div>
            <h4 className="text-white text-sm font-body font-semibold tracking-widest uppercase mb-6">
              Navigation
            </h4>
            <ul className="space-y-3">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-stone-400 hover:text-white transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white text-sm font-body font-semibold tracking-widest uppercase mb-6">
              Tjanster
            </h4>
            <ul className="space-y-3">
              <li>
                <span className="text-sm text-stone-400">
                  Fastighetsformedling
                </span>
              </li>
              <li>
                <span className="text-sm text-stone-400">
                  Skogsvardering
                </span>
              </li>
              <li>
                <span className="text-sm text-stone-400">
                  Investeringsradgivning
                </span>
              </li>
              <li>
                <span className="text-sm text-stone-400">
                  Juridisk radgivning
                </span>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white text-sm font-body font-semibold tracking-widest uppercase mb-6">
              Kontakt
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin size={16} className="text-brand-500 mt-0.5 shrink-0" />
                <span className="text-sm text-stone-400">
                  {COMPANY_INFO.address}
                  <br />
                  {COMPANY_INFO.postalCode} {COMPANY_INFO.city}
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={16} className="text-brand-500 shrink-0" />
                <a
                  href={`tel:${COMPANY_INFO.phone}`}
                  className="text-sm text-stone-400 hover:text-white transition-colors"
                >
                  {COMPANY_INFO.phone}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={16} className="text-brand-500 shrink-0" />
                <a
                  href={`mailto:${COMPANY_INFO.email}`}
                  className="text-sm text-stone-400 hover:text-white transition-colors"
                >
                  {COMPANY_INFO.email}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-stone-800 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-stone-500">
            {currentYear} {COMPANY_INFO.name}. Alla rattigheter forbehallna.
            Org.nr: {COMPANY_INFO.orgNumber}
          </p>
          <div className="flex items-center gap-6">
            <Link
              href="/admin/login"
              className="text-xs text-stone-600 hover:text-stone-400 transition-colors"
            >
              Adminpanel
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
