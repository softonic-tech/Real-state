"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import SiteLogo from "@/components/ui/SiteLogo";
import { NAV_LINKS } from "@/constants";
import { cn } from "@/utils";

export default function Header() {
  const headerRef = useRef<HTMLElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === "/";
  const solidHeader = scrolled || !isHome || isOpen;

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 32);
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  useEffect(() => {
    const el = headerRef.current;
    if (!el) return;

    const syncHeaderHeight = () => {
      document.documentElement.style.setProperty(
        "--site-header-height",
        `${el.offsetHeight}px`
      );
    };

    syncHeaderHeight();
    const observer = new ResizeObserver(syncHeaderHeight);
    observer.observe(el);
    window.addEventListener("resize", syncHeaderHeight);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", syncHeaderHeight);
    };
  }, [isOpen, solidHeader, pathname]);

  return (
    <header
      ref={headerRef}
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
        solidHeader
          ? "bg-cream/95 backdrop-blur-xl border-b border-stone-200/70 py-3.5 shadow-soft"
          : "bg-gradient-to-b from-brand-950/70 to-transparent py-5"
      )}
    >
      <div className="section-padding page-container flex items-center justify-between">
        <Link href="/" className="flex items-center group shrink-0">
          <SiteLogo
            variant={solidHeader ? "light" : "dark"}
            className="group-hover:scale-[1.02] transition-transform duration-300"
          />
        </Link>

        <nav className="hidden lg:flex items-center gap-0.5">
          {NAV_LINKS.map((link) => {
            const isContact = link.href === "/kontakt";
            const isActive = pathname === link.href;

            if (isContact) {
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "ml-3 text-xs py-2.5 px-5 rounded-lg font-body font-semibold transition-all duration-200",
                    solidHeader ? "btn-primary !py-2.5 !px-5" : "btn-white !py-2.5 !px-5"
                  )}
                >
                  {link.label}
                </Link>
              );
            }

            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "px-4 py-2 rounded-lg font-body text-sm font-medium transition-all duration-200",
                  solidHeader
                    ? isActive
                      ? "text-brand-800 bg-brand-50"
                      : "text-stone-600 hover:text-charcoal hover:bg-stone-100/80"
                    : isActive
                      ? "text-white bg-white/10"
                      : "text-stone-300 hover:text-white hover:bg-white/10"
                )}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className={cn(
            "lg:hidden p-2.5 rounded-lg transition-colors",
            solidHeader
              ? "text-charcoal hover:bg-stone-100"
              : "text-white hover:bg-white/10"
          )}
          aria-label="Meny"
        >
          {isOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {isOpen && (
        <div className="lg:hidden bg-cream border-t border-stone-200 shadow-medium animate-fade-in">
          <nav className="section-padding py-5 flex flex-col gap-1">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "py-3.5 px-4 rounded-xl font-body text-[15px] font-medium transition-colors",
                  pathname === link.href
                    ? "text-brand-800 bg-brand-50"
                    : "text-stone-700 hover:bg-stone-50"
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
