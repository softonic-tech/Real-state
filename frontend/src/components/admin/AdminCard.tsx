import { cn } from "@/utils";

interface AdminCardProps {
  title?: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
  padding?: "sm" | "md" | "lg";
}

const paddingClasses = {
  sm: "p-4 md:p-5",
  md: "p-5 md:p-6",
  lg: "p-6 md:p-8",
};

export default function AdminCard({
  title,
  description,
  children,
  className,
  padding = "md",
}: AdminCardProps) {
  return (
    <div
      className={cn(
        "bg-white rounded-xl border border-stone-200/90 shadow-soft",
        paddingClasses[padding],
        className
      )}
    >
      {(title || description) && (
        <div className="mb-5">
          {title && (
            <h2 className="font-display text-lg text-charcoal font-semibold">
              {title}
            </h2>
          )}
          {description && (
            <p className="text-stone-500 font-body text-sm mt-1">{description}</p>
          )}
        </div>
      )}
      {children}
    </div>
  );
}
