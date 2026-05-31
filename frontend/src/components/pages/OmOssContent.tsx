"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CheckCircle2, Phone } from "lucide-react";
import ScrollReveal from "@/components/ui/ScrollReveal";
import SectionLabel from "@/components/ui/SectionLabel";
import CTASection from "@/components/sections/CTASection";
import {
  COMPANY_INFO,
  OWNER_INFO,
  SERVICES_INTRO,
  SERVICES_LIST,
  SITE_NAME,
  TRUST_STATS,
} from "@/constants";

export default function OmOssContent() {
  return (
    <>
      <section className="inner-page-section">
        <div className="section-padding page-container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20 items-start">
            <ScrollReveal direction="left">
              <div className="relative max-w-md mx-auto lg:mx-0">
                <div className="relative aspect-[4/5] rounded-2xl overflow-hidden shadow-strong">
                  <Image
                    src={OWNER_INFO.image}
                    alt={OWNER_INFO.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 420px"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-950/50 via-transparent to-transparent" />
                </div>
                <div className="absolute -bottom-5 left-6 right-6 premium-card px-5 py-4 flex items-center justify-between gap-4">
                  <div>
                    <p className="font-display text-xl text-charcoal font-semibold">
                      {OWNER_INFO.name}
                    </p>
                    <p className="text-brand-700 text-xs font-body font-medium mt-0.5">
                      {OWNER_INFO.role}
                    </p>
                  </div>
                  <CheckCircle2 size={22} className="text-accent shrink-0" />
                </div>
              </div>
            </ScrollReveal>

            <div>
              <ScrollReveal delay={100}>
                <SectionLabel>Om {SITE_NAME}</SectionLabel>
                <h2 className="text-display-sm text-charcoal mb-6 text-balance">
                  Personlig mäklartjänst i norra Sverige
                </h2>
                <div className="space-y-5 text-stone-600 font-body leading-relaxed">
                  <p>
                    Jag förmedlar bostäder och fastigheter i Junsele och omnejd,
                    och hjälper privatpersoner, familjer och företag med
                    försäljning, värdering och rådgivning.
                  </p>
                  {SERVICES_INTRO.paragraphs.map((paragraph) => (
                    <p key={paragraph.slice(0, 40)}>{paragraph}</p>
                  ))}
                </div>
              </ScrollReveal>

              <ScrollReveal delay={200}>
                <div className="grid grid-cols-3 gap-3 mt-10 mb-10">
                  {TRUST_STATS.map((stat) => (
                    <div
                      key={stat.label}
                      className="premium-card p-4 text-center"
                    >
                      <span className="font-display text-2xl text-charcoal block font-semibold">
                        {stat.value}
                      </span>
                      <p className="text-stone-500 text-[11px] font-body mt-1 leading-tight">
                        {stat.label}
                      </p>
                    </div>
                  ))}
                </div>
              </ScrollReveal>

              <ScrollReveal delay={250}>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Link href="/kontakt" className="btn-primary">
                    Kontakta mig
                    <ArrowRight size={16} />
                  </Link>
                  <a
                    href={`tel:${COMPANY_INFO.phoneTel}`}
                    className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-lg border-2 border-stone-200 text-charcoal font-body font-semibold text-sm hover:border-brand-800 hover:text-brand-800 transition-all"
                  >
                    <Phone size={16} />
                    {COMPANY_INFO.phone}
                  </a>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      <section className="section-block bg-white border-y border-stone-100">
        <div className="section-padding page-container">
          <ScrollReveal>
            <div className="text-center max-w-2xl mx-auto mb-14">
              <SectionLabel align="center">Vårt erbjudande</SectionLabel>
              <h2 className="text-display-sm text-charcoal text-balance">
                {SERVICES_INTRO.title}
              </h2>
              <p className="text-stone-500 font-body mt-4 leading-relaxed">
                {SERVICES_INTRO.closing}
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {SERVICES_LIST.map((service, i) => (
              <ScrollReveal key={service} delay={i * 60}>
                <div className="premium-card p-6 h-full flex gap-4">
                  <div className="w-9 h-9 rounded-lg bg-brand-50 border border-brand-100 flex items-center justify-center shrink-0 mt-0.5">
                    <CheckCircle2 size={18} className="text-brand-700" />
                  </div>
                  <p className="text-stone-600 font-body text-sm leading-relaxed">
                    {service}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
