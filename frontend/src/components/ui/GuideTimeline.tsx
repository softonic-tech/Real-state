"use client";

import { LucideIcon } from "lucide-react";
import ScrollReveal from "@/components/ui/ScrollReveal";

export interface GuideStep {
  icon: LucideIcon;
  step: string;
  title: string;
  description: string;
}

interface GuideTimelineProps {
  steps: GuideStep[];
}

export default function GuideTimeline({ steps }: GuideTimelineProps) {
  return (
    <div className="space-y-5">
      {steps.map((item, i) => (
        <ScrollReveal key={item.step} delay={i * 80}>
          <div className="premium-card p-8 md:p-10 flex flex-col sm:flex-row gap-6 md:gap-8 relative overflow-hidden">
            <span className="absolute top-5 right-6 font-display text-6xl md:text-7xl text-stone-100 font-semibold select-none leading-none">
              {item.step}
            </span>
            <div className="w-14 h-14 rounded-2xl bg-brand-800 text-white flex items-center justify-center shrink-0 shadow-soft relative z-10">
              <item.icon size={24} strokeWidth={1.5} />
            </div>
            <div className="relative z-10 flex-1 min-w-0">
              <h3 className="font-display text-xl md:text-2xl text-charcoal mb-3 font-semibold">
                {item.title}
              </h3>
              <p className="text-stone-500 font-body leading-relaxed">
                {item.description}
              </p>
            </div>
          </div>
        </ScrollReveal>
      ))}
    </div>
  );
}
