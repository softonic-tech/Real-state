import Image from "next/image";
import { cn } from "@/utils";
import { SITE_LOGO, SITE_NAME } from "@/constants";

interface SiteLogoProps {
  className?: string;
  size?: "full" | "compact" | "large";
  /** Use "light" on cream/white backgrounds (brand-colored logo), "dark" on dark backgrounds (white logo) */
  variant?: "light" | "dark";
}

const sizeConfig = {
  compact: { height: 40, width: 122, className: "h-9 sm:h-10 w-auto" },
  full: { height: 44, width: 134, className: "h-10 sm:h-11 w-auto" },
  large: { height: 56, width: 171, className: "h-12 sm:h-14 w-auto" },
};

export default function SiteLogo({
  className,
  size = "full",
  variant = "dark",
}: SiteLogoProps) {
  const config = sizeConfig[size];

  return (
    <Image
      src={SITE_LOGO}
      alt={SITE_NAME}
      width={config.width}
      height={config.height}
      priority
      className={cn(
        "shrink-0 object-contain object-left",
        config.className,
        variant === "light" ? "logo-on-light-bg" : "logo-on-dark-bg",
        className
      )}
    />
  );
}
