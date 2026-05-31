"use client";

import Link from "next/link";
import { ArrowRight, Phone, Shield, MapPin } from "lucide-react";
import { COMPANY_INFO, SITE_TAGLINE } from "@/constants";
import SearchBarSection from "@/components/sections/SearchBarSection";

const reveal =
  "animate-fade-up opacity-0 motion-reduce:opacity-100 motion-reduce:translate-y-0 [animation-fill-mode:forwards]";

export default function HeroSection() {
  return (
    <section className="relative bg-brand-950 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-[center_30%] sm:bg-center md:animate-ken-burns motion-reduce:animate-none will-change-transform"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1920&q=85')",
          }}
        />
        <div className="absolute inset-0 hero-gradient" />
        <div className="absolute inset-0 grain-overlay opacity-50 mix-blend-overlay" />
      </div>

      <div className="hidden md:block absolute top-24 right-[10%] w-72 h-72 bg-accent/10 rounded-full blur-[100px] pointer-events-none" />

      {/* Content */}
      <div className="relative section-padding page-container pt-24 pb-6 sm:pt-28 md:pt-32 lg:pt-36">
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-16 lg:items-end">
          <div className="lg:col-span-7 xl:col-span-8">
            <div className={`inline-flex mb-5 sm:mb-7 animate-fade-in opacity-0 motion-reduce:opacity-100 [animation-fill-mode:forwards]`}>
              <span className="inline-flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-[10px] sm:text-[11px] font-body font-semibold tracking-[0.15em] sm:tracking-[0.18em] uppercase text-white/90 bg-white/10 border border-white/15 backdrop-blur-md">
                <span className="w-1.5 h-1.5 rounded-full bg-accent-light shrink-0" />
                {SITE_TAGLINE}
              </span>
            </div>

            <h1
              className={`text-[2rem] leading-[1.1] sm:text-display-lg lg:text-display-xl text-white mb-4 sm:mb-6 text-balance ${reveal}`}
            >
              Hitta din nästa{" "}
              <span className="italic text-gradient-light">bostad</span> i norra
              Sverige
            </h1>

            <p
              className={`text-stone-300/95 text-base sm:text-lg md:text-xl font-body leading-relaxed mb-6 sm:mb-8 max-w-xl ${reveal} animate-delay-200`}
            >
              Personlig mäklarservice i Junsele och omnejd — från första visning
              till tillträde.
            </p>

            <div
              className={`flex flex-col sm:flex-row gap-3 mb-6 sm:mb-10 ${reveal} animate-delay-300`}
            >
              <Link href="/fastigheter" className="btn-white w-full sm:w-auto justify-center">
                Se bostäder till salu
                <ArrowRight size={17} />
              </Link>
              <a
                href={`tel:${COMPANY_INFO.phoneTel}`}
                className="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-7 py-3.5 rounded-lg border border-white/20 text-white font-body font-semibold text-sm transition-all hover:bg-white/10"
              >
                <Phone size={17} className="opacity-80 shrink-0" />
                {COMPANY_INFO.phone}
              </a>
            </div>

            <div
              className={`hidden sm:flex flex-wrap gap-4 sm:gap-6 ${reveal} animate-delay-400`}
            >
              {[
                { icon: Shield, text: "Trygg helhetsprocess" },
                { icon: MapPin, text: "Lokal expertis" },
              ].map(({ icon: Icon, text }) => (
                <div
                  key={text}
                  className="flex items-center gap-2.5 text-stone-400 text-sm font-body"
                >
                  <span className="flex items-center justify-center w-9 h-9 rounded-lg bg-white/10 border border-white/10 shrink-0">
                    <Icon size={16} className="text-accent-light" />
                  </span>
                  {text}
                </div>
              ))}
            </div>
          </div>

          <div className={`hidden lg:block lg:col-span-5 xl:col-span-4 ${reveal} animate-delay-500`}>
            <div className="glass-panel-dark rounded-2xl p-6 space-y-5">
              <p className="text-accent-light text-[11px] font-bold tracking-[0.2em] uppercase">
                Varför Olofssons
              </p>
              <p className="font-display text-2xl text-white leading-snug">
                &ldquo;En fastighet betyder mer än bara ett hus — den bär på
                historia och framtida möjligheter.&rdquo;
              </p>
              <div className="divider-fade opacity-30" />
              <div className="grid grid-cols-2 gap-4">
                {[
                  { v: "30+", l: "Års erfarenhet" },
                  { v: "100%", l: "Personlig service" },
                ].map((s) => (
                  <div
                    key={s.l}
                    className="rounded-xl bg-white/5 border border-white/10 p-4"
                  >
                    <p className="font-display text-2xl text-white">{s.v}</p>
                    <p className="text-stone-500 text-xs font-body mt-1">
                      {s.l}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Search — full width on mobile, sits below fold-friendly content */}
      <div className="relative z-10 section-padding page-container pb-8 sm:pb-10 md:pb-14 -mt-1">
        <SearchBarSection embedded />
      </div>
    </section>
  );
}
