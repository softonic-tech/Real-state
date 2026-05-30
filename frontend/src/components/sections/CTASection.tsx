import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function CTASection() {
  return (
    <section className="relative py-28 overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1476231682828-37e571bc172f?w=1920&q=80')",
        }}
      />
      <div className="absolute inset-0 bg-brand-950/85" />

      <div className="relative section-padding page-container text-center">
        <span className="text-brand-400 font-body text-xs tracking-[0.3em] uppercase block mb-4">
          Kom igang
        </span>
        <h2 className="text-display-md md:text-display-lg text-white mb-6 max-w-2xl mx-auto">
          Redo att ta nasta steg?
        </h2>
        <p className="text-stone-300 font-body text-lg max-w-lg mx-auto mb-10">
          Oavsett om du soker kopa, salja eller investera i skogs- och
          jordbruksfastigheter sa finns vi har for att hjalpa dig.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/kontakt"
            className="btn-primary bg-white text-brand-950 hover:bg-stone-100"
          >
            Kontakta oss
            <ArrowRight size={16} className="ml-2" />
          </Link>
          <Link
            href="/fastigheter"
            className="btn-outline border-stone-500 text-stone-300 hover:bg-white/10 hover:text-white hover:border-white/40"
          >
            Se fastigheter
          </Link>
        </div>
      </div>
    </section>
  );
}
