import { LucideIcon } from "lucide-react";
import { cn } from "@/utils";

interface AdminStatCardProps {
  title: string;
  value: number;
  icon: LucideIcon;
  tone?: "brand" | "green" | "amber" | "accent";
}

const toneClasses = {
  brand: "bg-brand-50 text-brand-700 border-brand-100",
  green: "bg-emerald-50 text-emerald-700 border-emerald-100",
  amber: "bg-amber-50 text-amber-700 border-amber-100",
  accent: "bg-accent/10 text-accent-dark border-accent/20",
};

export default function AdminStatCard({
  title,
  value,
  icon: Icon,
  tone = "brand",
}: AdminStatCardProps) {
  return (
    <div className="bg-white rounded-xl border border-stone-200/90 shadow-soft p-5 md:p-6">
      <div className="flex items-start justify-between gap-4 mb-4">
        <span className="text-[11px] font-body font-semibold text-stone-500 tracking-wide uppercase leading-snug">
          {title}
        </span>
        <div
          className={cn(
            "w-10 h-10 rounded-xl border flex items-center justify-center shrink-0",
            toneClasses[tone]
          )}
        >
          <Icon size={18} strokeWidth={1.75} />
        </div>
      </div>
      <p className="font-display text-3xl md:text-4xl text-charcoal font-semibold tabular-nums">
        {value}
      </p>
    </div>
  );
}
