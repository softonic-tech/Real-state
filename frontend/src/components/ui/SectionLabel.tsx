import { cn } from "@/utils";

interface SectionLabelProps {
  children: React.ReactNode;
  className?: string;
  light?: boolean;
  align?: "left" | "center";
}

export default function SectionLabel({
  children,
  className,
  light = false,
  align = "left",
}: SectionLabelProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-3 font-body text-[11px] font-bold tracking-[0.22em] uppercase mb-5",
        align === "center" && "justify-center w-full",
        light ? "text-accent-light" : "text-brand-800",
        className
      )}
    >
      <span
        className={cn(
          "w-2 h-2 rounded-full shrink-0",
          light ? "bg-accent-light" : "bg-accent"
        )}
      />
      {children}
    </span>
  );
}
