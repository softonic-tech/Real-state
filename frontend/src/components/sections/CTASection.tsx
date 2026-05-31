"use client";

import Link from "next/link";
import { ArrowRight, Phone } from "lucide-react";
import ScrollReveal from "@/components/ui/ScrollReveal";
import SectionLabel from "@/components/ui/SectionLabel";
import { COMPANY_INFO } from "@/constants";

export default function CTASection() {
  return (
    <section className="relative py-24 md:py-32 bg-white border-t border-stone-100 overflow-hidden">
      <div className="absolute inset-0 mesh-light pointer-events-none" />

      <div className="relative section-padding page-container">
        <ScrollReveal>
          <div className="max-w-2xl mx-auto text-center">
            <SectionLabel align="center">Kom igång</SectionLabel>
            <h2 className="text-display-md md:text-display-lg text-charcoal mb-5 text-balance">
              Redo att hitta eller sälja din bostad?
            </h2>
            <p className="text-stone-600 font-body text-lg leading-relaxed mb-10 max-w-lg mx-auto">
              Kontakta oss idag för en kostnadsfri rådgivning. Vi återkommer
              snabbt och personligt.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link href="/kontakt" className="btn-primary w-full sm:w-auto">
                Kontakta oss
                <ArrowRight size={16} />
              </Link>
              <a
                href={`tel:${COMPANY_INFO.phoneTel}`}
                className="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-7 py-3.5 rounded-lg border-2 border-stone-200 text-charcoal font-body font-semibold text-sm hover:border-brand-800 hover:text-brand-800 transition-all"
              >
                <Phone size={16} />
                {COMPANY_INFO.phone}
              </a>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
