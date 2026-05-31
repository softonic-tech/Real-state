import { cn } from "@/utils";

interface AdminPaginationProps {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
}

export default function AdminPagination({
  page,
  totalPages,
  onPageChange,
  className,
}: AdminPaginationProps) {
  if (totalPages <= 1) return null;

  return (
    <div
      className={cn(
        "flex items-center justify-center gap-2 pt-6",
        className
      )}
    >
      {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
        <button
          key={p}
          type="button"
          onClick={() => onPageChange(p)}
          className={cn(
            "w-9 h-9 rounded-lg flex items-center justify-center font-body text-sm transition-colors",
            p === page
              ? "bg-brand-800 text-white"
              : "bg-white border border-stone-200 text-stone-600 hover:bg-stone-50"
          )}
        >
          {p}
        </button>
      ))}
    </div>
  );
}
