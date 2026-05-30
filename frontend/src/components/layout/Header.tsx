"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { NAV_LINKS, SITE_NAME } from "@/constants";
import { cn } from "@/utils";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
        scrolled
          ? "bg-cream/95 backdrop-blur-md border-b border-stone-200/60 py-4"
          : "bg-transparent py-6"
      )}
    >
      <div className="section-padding page-container flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 bg-brand-800 flex items-center justify-center transition-colors group-hover:bg-brand-900">
            <span className="text-white font-display text-lg leading-none">
              N
            </span>
          </div>
          <div className="hidden sm:block">
            <span className="font-display text-xl text-charcoal tracking-tight">
              {SITE_NAME.split(" ")[0]}
            </span>
            <span className="font-body text-xs text-stone-500 block -mt-0.5 tracking-widest uppercase">
              Fastigheter
            </span>
          </div>
        </Link>

        <nav className="hidden lg:flex items-center gap-1">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "px-4 py-2 font-body text-sm tracking-wide transition-colors duration-200",
                pathname === link.href
                  ? "text-brand-800 font-medium"
                  : "text-stone-600 hover:text-charcoal"
              )}
            >
              {link.label}
            </Link>
          ))}
          <Link href="/kontakt" className="btn-primary ml-4 text-xs py-2.5 px-6">
            Kontakta oss
          </Link>
        </nav>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="lg:hidden p-2 text-charcoal"
          aria-label="Meny"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {isOpen && (
        <div className="lg:hidden bg-cream border-t border-stone-200 animate-fade-in">
          <nav className="section-padding py-6 flex flex-col gap-1">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "py-3 px-4 font-body text-base transition-colors",
                  pathname === link.href
                    ? "text-brand-800 font-medium bg-brand-50"
                    : "text-stone-600 hover:text-charcoal hover:bg-stone-50"
                )}
              >
                {link.label}
              </Link>
            ))}
            <Link href="/kontakt" className="btn-primary mt-4 text-center">
              Kontakta oss
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
