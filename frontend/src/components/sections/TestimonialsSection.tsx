"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight, Star, Quote } from "lucide-react";
import ScrollReveal from "@/components/ui/ScrollReveal";
import SectionLabel from "@/components/ui/SectionLabel";

const testimonials = [
  {
    quote:
      "Ingemar guidade oss genom hela försäljningen av vårt hus på ett tryggt och professionellt sätt. Vi kände oss alltid väl omhändertagna.",
    author: "Lars & Karin",
    role: "Säljare, villa i Hällviken",
  },
  {
    quote:
      "Värderingen var noggrann och realistisk. Affären gick smidigare än vi någonsin kunnat hoppas på.",
    author: "Mikael Johansson",
    role: "Köpare, bostad i Backe",
  },
  {
    quote:
      "Personlig service och lokal kunskap gjorde stor skillnad. Rekommenderas varmt till alla som funderar på att sälja.",
    author: "Anna & Per",
    role: "Säljare, fastighet i Junsele",
  },
];

export default function TestimonialsSection() {
  const [active, setActive] = useState(0);
  const current = testimonials[active];

  return (
    <section className="section-block bg-cream relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-accent/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="relative section-padding page-container">
        <ScrollReveal>
          <div className="text-center mb-14">
            <SectionLabel align="center">Våra klienter</SectionLabel>
            <h2 className="text-display-md text-charcoal">Vad våra kunder säger</h2>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={100}>
          <div className="max-w-3xl mx-auto">
            <div className="premium-card p-10 md:p-14 text-center relative">
              <Quote
                size={48}
                className="text-accent/25 mx-auto mb-6"
                strokeWidth={1}
              />
              <div className="flex justify-center gap-1 mb-8">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    size={15}
                    className="text-accent fill-accent"
                  />
                ))}
              </div>
              <blockquote className="font-display text-2xl md:text-[1.75rem] text-charcoal leading-relaxed mb-8 font-medium">
                &ldquo;{current.quote}&rdquo;
              </blockquote>
              <div className="divider-fade mb-6" />
              <p className="font-body font-bold text-charcoal">{current.author}</p>
              <p className="text-stone-400 text-sm font-body mt-1">{current.role}</p>
            </div>

            <div className="flex items-center justify-center gap-4 mt-8">
              <button
                onClick={() =>
                  setActive((i) => (i === 0 ? testimonials.length - 1 : i - 1))
                }
                aria-label="Föregående"
                className="w-11 h-11 rounded-xl border border-stone-200 bg-white flex items-center justify-center text-charcoal hover:bg-brand-800 hover:text-white hover:border-brand-800 transition-all shadow-soft"
              >
                <ChevronLeft size={20} />
              </button>
              <div className="flex gap-2">
                {testimonials.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActive(i)}
                    aria-label={`Omdöme ${i + 1}`}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      i === active ? "w-8 bg-accent" : "w-2 bg-stone-300"
                    }`}
                  />
                ))}
              </div>
              <button
                onClick={() =>
                  setActive((i) => (i === testimonials.length - 1 ? 0 : i + 1))
                }
                aria-label="Nästa"
                className="w-11 h-11 rounded-xl border border-stone-200 bg-white flex items-center justify-center text-charcoal hover:bg-brand-800 hover:text-white hover:border-brand-800 transition-all shadow-soft"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
