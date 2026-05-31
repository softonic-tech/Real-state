"use client";

import Link from "next/link";
import { MessageCircle, Search, Handshake, ArrowRight } from "lucide-react";
import ScrollReveal from "@/components/ui/ScrollReveal";
import SectionLabel from "@/components/ui/SectionLabel";

const steps = [
  {
    icon: MessageCircle,
    step: "01",
    title: "Kontakt & rådgivning",
    description:
      "Vi börjar med ett personligt samtal om dina önskemål — oavsett om du vill köpa eller sälja din bostad.",
  },
  {
    icon: Search,
    step: "02",
    title: "Värdering & strategi",
    description:
      "Noggrann analys av bostaden och marknaden. Vi lägger en tydlig plan anpassad efter dina mål.",
  },
  {
    icon: Handshake,
    step: "03",
    title: "Visning & budgivning",
    description:
      "Vi presenterar bostaden för rätt köpare och hanterar visningar, bud och förhandlingar tryggt.",
  },
];

export default function ProcessSection() {
  return (
    <section className="section-block bg-white border-y border-stone-100">
      <div className="section-padding page-container">
        <ScrollReveal>
          <div className="text-center max-w-2xl mx-auto mb-16">
            <SectionLabel align="center">Så arbetar vi</SectionLabel>
            <h2 className="text-display-md text-charcoal text-balance">
              En enkel och trygg process
            </h2>
            <p className="text-stone-500 font-body mt-4 leading-relaxed">
              Tre tydliga steg — vi finns med dig hela vägen.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 relative">
          <div className="hidden md:block absolute top-[4.5rem] left-[18%] right-[18%] h-px bg-gradient-to-r from-transparent via-stone-200 to-transparent" />

          {steps.map((item, i) => (
            <ScrollReveal key={item.step} delay={i * 100}>
              <div className="relative premium-card p-8 h-full text-center md:text-left">
                <span className="absolute top-6 right-6 font-display text-5xl text-stone-100 font-semibold select-none">
                  {item.step}
                </span>
                <div className="w-14 h-14 rounded-2xl bg-brand-800 text-white flex items-center justify-center mx-auto md:mx-0 mb-6 shadow-soft relative z-10">
                  <item.icon size={24} strokeWidth={1.5} />
                </div>
                <h3 className="font-display text-xl font-semibold text-charcoal mb-3">
                  {item.title}
                </h3>
                <p className="text-stone-500 font-body text-sm leading-relaxed">
                  {item.description}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal delay={250}>
          <div className="flex flex-wrap items-center justify-center gap-3 mt-14">
            <Link href="/hur-man-koper" className="btn-outline text-sm">
              Hur man köper
            </Link>
            <Link href="/hur-man-saljer" className="btn-outline text-sm">
              Hur man säljer
            </Link>
            <Link
              href="/kontakt"
              className="inline-flex items-center gap-1.5 text-brand-800 font-body text-sm font-semibold hover:text-brand-950 transition-colors ml-2"
            >
              Boka rådgivning
              <ArrowRight size={16} />
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
