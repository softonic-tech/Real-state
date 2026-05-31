"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Phone, CheckCircle2 } from "lucide-react";
import ScrollReveal from "@/components/ui/ScrollReveal";
import SectionLabel from "@/components/ui/SectionLabel";
import {
  COMPANY_INFO,
  OWNER_INFO,
  SITE_NAME,
  TRUST_STATS,
} from "@/constants";

const highlights = [
  "Personlig rådgivning",
  "Lokal marknadskunskap",
  "Trygg affär till avslut",
];

export default function AboutTrustSection() {
  return (
    <section className="relative bg-brand-950 overflow-hidden section-block">
      <div className="absolute inset-0 grain-overlay opacity-40" />
      <div className="absolute -top-40 -right-40 w-[500px] h-[500px] bg-accent/8 rounded-full blur-[120px]" />

      <div className="relative section-padding page-container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20 items-center">
          <ScrollReveal direction="left">
            <div className="relative max-w-md mx-auto lg:mx-0">
              <div className="relative aspect-[4/5] rounded-2xl overflow-hidden shadow-glow">
                <Image
                  src={OWNER_INFO.image}
                  alt={OWNER_INFO.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 420px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-950/80 via-transparent to-transparent" />
              </div>
              <div className="absolute -bottom-5 left-6 right-6 glass-panel-dark rounded-xl px-5 py-4 flex items-center justify-between gap-4">
                <div>
                  <p className="font-display text-xl text-white font-semibold">
                    {OWNER_INFO.name}
                  </p>
                  <p className="text-accent-light text-xs font-body font-medium mt-0.5">
                    {OWNER_INFO.role}
                  </p>
                </div>
                <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center shrink-0">
                  <CheckCircle2 size={20} className="text-accent-light" />
                </div>
              </div>
            </div>
          </ScrollReveal>

          <div>
            <ScrollReveal delay={100}>
              <SectionLabel light>Om oss</SectionLabel>
              <h2 className="text-display-md text-white mb-6 text-balance">
                Din lokala mäklare i norra Sverige
              </h2>
              <p className="text-stone-400 font-body leading-relaxed mb-5 text-base">
                {SITE_NAME} förmedlar bostäder och fastigheter med personligt
                engagemang. {OWNER_INFO.name} finns med genom hela resan — från
                första samtal till nycklar i hand.
              </p>
              <ul className="space-y-3 mb-10">
                {highlights.map((item) => (
                  <li
                    key={item}
                    className="flex items-center gap-3 text-stone-300 text-sm font-body"
                  >
                    <CheckCircle2 size={18} className="text-accent shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </ScrollReveal>

            <ScrollReveal delay={200}>
              <div className="grid grid-cols-3 gap-4 mb-10">
                {TRUST_STATS.map((stat) => (
                  <div
                    key={stat.label}
                    className="rounded-xl bg-white/5 border border-white/10 p-4 text-center"
                  >
                    <span className="font-display text-2xl md:text-3xl text-white block font-semibold">
                      {stat.value}
                    </span>
                    <p className="text-stone-500 text-[11px] font-body mt-1 leading-tight">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>
            </ScrollReveal>

            <ScrollReveal delay={300}>
              <div className="flex flex-col sm:flex-row gap-3">
                <Link href="/om-oss" className="btn-white">
                  Läs mer
                  <ArrowRight size={16} />
                </Link>
                <a
                  href={`tel:${COMPANY_INFO.phoneTel}`}
                  className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-lg border border-white/20 text-white font-body font-semibold text-sm hover:bg-white/10 transition-all"
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
  );
}
