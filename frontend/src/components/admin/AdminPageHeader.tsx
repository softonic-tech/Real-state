import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { cn } from "@/utils";

interface AdminPageHeaderProps {
  title: string;
  description?: string;
  backHref?: string;
  backLabel?: string;
  action?: React.ReactNode;
  className?: string;
}

export default function AdminPageHeader({
  title,
  description,
  backHref,
  backLabel = "Tillbaka",
  action,
  className,
}: AdminPageHeaderProps) {
  return (
    <div
      className={cn(
        "flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-8",
        className
      )}
    >
      <div className="min-w-0">
        {backHref && (
          <Link
            href={backHref}
            className="inline-flex items-center gap-1.5 text-stone-500 font-body text-sm hover:text-brand-800 transition-colors mb-3"
          >
            <ArrowLeft size={16} />
            {backLabel}
          </Link>
        )}
        <h1 className="font-display text-2xl md:text-3xl text-charcoal mb-1">
          {title}
        </h1>
        {description && (
          <p className="text-stone-500 font-body text-sm leading-relaxed">
            {description}
          </p>
        )}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
}
