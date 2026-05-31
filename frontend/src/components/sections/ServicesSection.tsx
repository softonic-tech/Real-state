"use client";

import Image from "next/image";
import {
  Home,
  TrendingUp,
  Users,
  ClipboardList,
  TreePine,
  FileText,
} from "lucide-react";
import ScrollReveal from "@/components/ui/ScrollReveal";
import SectionLabel from "@/components/ui/SectionLabel";
import {
  SERVICES_INTRO,
  SERVICES_LIST,
  LEGAL_DOCUMENTS,
} from "@/constants";

const serviceIcons = [Home, TrendingUp, Users, ClipboardList, TreePine, FileText];

export default function ServicesSection() {
  return (
    <section className="section-block bg-parchment relative overflow-hidden">
      <div className="absolute inset-0 mesh-light pointer-events-none" />
      <div className="relative section-padding page-container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20 items-start mb-16">
          <ScrollReveal>
            <SectionLabel>Våra tjänster</SectionLabel>
            <h2 className="text-display-md text-charcoal mb-6 text-balance">
              {SERVICES_INTRO.title}
            </h2>
            <div className="space-y-4 text-stone-600 font-body leading-relaxed">
              {SERVICES_INTRO.paragraphs.map((p) => (
                <p key={p.slice(0, 48)}>{p}</p>
              ))}
            </div>
          </ScrollReveal>

          <ScrollReveal direction="right" delay={120}>
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-strong">
              <Image
                src="https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=900&q=85"
                alt="Bostad och fastighet"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute bottom-0 left-0 right-0 p-5 md:p-6">
                <div className="rounded-xl bg-white/95 backdrop-blur-sm p-5 md:p-6 shadow-medium">
                  <p className="font-display text-lg md:text-xl text-charcoal leading-snug">
                    {SERVICES_INTRO.closing}
                  </p>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-12">
          {SERVICES_LIST.map((title, i) => {
            const Icon = serviceIcons[i] || FileText;
            return (
              <ScrollReveal key={title} delay={i * 60}>
                <div className="premium-card p-6 h-full group">
                  <div className="flex items-start gap-4">
                    <span className="flex items-center justify-center w-11 h-11 rounded-xl bg-brand-800 text-white shrink-0 group-hover:bg-accent-dark transition-colors duration-300">
                      <Icon size={20} strokeWidth={1.75} />
                    </span>
                    <div>
                      <h3 className="font-display text-lg font-semibold text-charcoal leading-snug group-hover:text-brand-800 transition-colors">
                        {title}
                      </h3>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            );
          })}
        </div>

        <ScrollReveal delay={100}>
          <div className="premium-card p-8 md:p-10">
            <h3 className="font-display text-xl font-semibold text-charcoal mb-5">
              Juridiska handlingar
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {LEGAL_DOCUMENTS.map((doc) => (
                <div
                  key={doc}
                  className="flex items-center gap-2.5 px-4 py-3 rounded-xl bg-cream border border-stone-100 text-stone-600 text-sm font-body"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-accent shrink-0" />
                  {doc}
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
