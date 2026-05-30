"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="relative min-h-[90vh] flex items-center bg-brand-950 overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center opacity-30"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1920&q=80')",
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-brand-950 via-brand-950/80 to-brand-950/40" />

      <div className="relative section-padding page-container w-full py-32">
        <div className="max-w-2xl">
          <div className="inline-block mb-8 animate-fade-in">
            <span className="text-brand-400 font-body text-xs tracking-[0.3em] uppercase border border-brand-700/40 px-4 py-2">
              Sveriges ledande specialister
            </span>
          </div>

          <h1 className="text-display-lg md:text-display-xl text-white mb-6 animate-fade-up">
            Skogs- &amp; jordbruks&shy;fastigheter
          </h1>

          <p className="text-stone-300 text-lg md:text-xl font-body font-light leading-relaxed mb-10 max-w-lg animate-fade-up animate-delay-200">
            Vi formedlar och varderar mark- och skogsfastigheter over hela
            Sverige. Med gedigen erfarenhet och djup marknadskannedskap
            skapar vi varde for vara klienter.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 animate-fade-up animate-delay-300">
            <Link href="/fastigheter" className="btn-primary bg-white text-brand-950 hover:bg-stone-100">
              Utforska fastigheter
              <ArrowRight size={16} className="ml-2" />
            </Link>
            <Link href="/kontakt" className="btn-outline border-stone-500 text-stone-300 hover:bg-white/10 hover:text-white hover:border-white/40">
              Boka radgivning
            </Link>
          </div>
        </div>

        <div className="hidden xl:flex absolute right-20 bottom-20 items-end gap-6">
          <div className="text-right">
            <span className="font-display text-5xl text-white/90">25+</span>
            <p className="text-stone-400 text-sm mt-1 font-body">
              Ars erfarenhet
            </p>
          </div>
          <div className="w-px h-16 bg-stone-700" />
          <div className="text-right">
            <span className="font-display text-5xl text-white/90">500+</span>
            <p className="text-stone-400 text-sm mt-1 font-body">
              Formedlade objekt
            </p>
          </div>
          <div className="w-px h-16 bg-stone-700" />
          <div className="text-right">
            <span className="font-display text-5xl text-white/90">98%</span>
            <p className="text-stone-400 text-sm mt-1 font-body">
              Nojda kunder
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
