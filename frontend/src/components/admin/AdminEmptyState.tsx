import Link from "next/link";
import { LucideIcon } from "lucide-react";

interface AdminEmptyStateProps {
  icon: LucideIcon;
  title: string;
  description: string;
  actionLabel?: string;
  actionHref?: string;
}

export default function AdminEmptyState({
  icon: Icon,
  title,
  description,
  actionLabel,
  actionHref,
}: AdminEmptyStateProps) {
  return (
    <div className="bg-white rounded-xl border border-stone-200/90 shadow-soft py-16 px-8 text-center">
      <div className="w-14 h-14 rounded-2xl bg-brand-50 border border-brand-100 flex items-center justify-center mx-auto mb-5">
        <Icon size={24} className="text-brand-700" strokeWidth={1.5} />
      </div>
      <h3 className="font-display text-xl text-charcoal mb-2">{title}</h3>
      <p className="text-stone-500 font-body text-sm max-w-sm mx-auto mb-6">
        {description}
      </p>
      {actionLabel && actionHref && (
        <Link href={actionHref} className="btn-primary text-sm">
          {actionLabel}
        </Link>
      )}
    </div>
  );
}
