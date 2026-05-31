"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import {
  LayoutDashboard,
  Building2,
  MessageSquare,
  FileText,
  LogOut,
  Menu,
  ExternalLink,
} from "lucide-react";
import { useAuth } from "@/hooks";
import { authService } from "@/services/auth.service";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import SiteLogo from "@/components/ui/SiteLogo";
import { cn } from "@/utils";

const sidebarLinks = [
  { href: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/properties", label: "Fastigheter", icon: Building2 },
  { href: "/admin/proposals", label: "Förfrågningar", icon: FileText },
  { href: "/admin/messages", label: "Meddelanden", icon: MessageSquare },
];

const pageTitles: Record<string, string> = {
  "/admin/dashboard": "Dashboard",
  "/admin/properties": "Fastigheter",
  "/admin/properties/new": "Ny fastighet",
  "/admin/properties/edit": "Redigera fastighet",
  "/admin/proposals": "Förfrågningar",
  "/admin/messages": "Meddelanden",
};

function getPageTitle(pathname: string): string {
  if (pathname.startsWith("/admin/properties/edit")) return "Redigera fastighet";
  return pageTitles[pathname] || "Adminpanel";
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isAuthenticated, isLoading, logout } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    if (pathname === "/admin/login") return;
    if (!authService.isAuthenticated()) {
      router.push("/admin/login");
    }
  }, [pathname, router]);

  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-cream">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (!isAuthenticated) return null;

  const pageTitle = getPageTitle(pathname);

  return (
    <div className="min-h-screen bg-cream">
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-[260px] h-screen bg-brand-950 flex flex-col overflow-hidden transform transition-transform duration-300 lg:translate-x-0",
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="shrink-0 p-5 border-b border-white/10">
          <Link href="/" className="block group">
            <SiteLogo size="compact" className="group-hover:opacity-90 transition-opacity" />
            <span className="font-body text-[10px] text-stone-500 uppercase tracking-wider mt-2 block">
              Adminpanel
            </span>
          </Link>
        </div>

        <nav className="flex-1 p-3 space-y-1">
          {sidebarLinks.map((link) => {
            const isActive =
              pathname === link.href ||
              (link.href !== "/admin/dashboard" &&
                pathname.startsWith(link.href));

            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setSidebarOpen(false)}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 font-body text-sm font-medium rounded-xl transition-all",
                  isActive
                    ? "bg-brand-800 text-white shadow-soft"
                    : "text-stone-400 hover:text-white hover:bg-white/5"
                )}
              >
                <link.icon size={18} strokeWidth={1.75} />
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="shrink-0 p-3 border-t border-white/10 space-y-1">
          <Link
            href="/"
            target="_blank"
            className="flex items-center gap-3 px-4 py-3 font-body text-sm text-stone-400 hover:text-white rounded-xl hover:bg-white/5 transition-colors"
          >
            <ExternalLink size={18} />
            Visa webbplatsen
          </Link>
          <button
            onClick={logout}
            className="flex items-center gap-3 px-4 py-3 w-full font-body text-sm text-stone-400 hover:text-white rounded-xl hover:bg-white/5 transition-colors"
          >
            <LogOut size={18} />
            Logga ut
          </button>
        </div>
      </aside>

      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-brand-950/40 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <div className="lg:pl-[260px] min-h-screen flex flex-col">
        <header className="sticky top-0 z-30 bg-cream/95 backdrop-blur-xl border-b border-stone-200/80 px-5 sm:px-8 py-4 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 min-w-0">
            <button
              className="lg:hidden p-2 -ml-2 rounded-lg text-stone-600 hover:bg-stone-100 transition-colors"
              onClick={() => setSidebarOpen(true)}
              aria-label="Öppna meny"
            >
              <Menu size={22} />
            </button>
            <h1 className="font-display text-lg sm:text-xl text-charcoal truncate">
              {pageTitle}
            </h1>
          </div>
          <Link
            href="/admin/properties/new"
            className="hidden sm:inline-flex btn-primary text-xs !py-2.5 !px-4"
          >
            + Ny fastighet
          </Link>
        </header>

        <main className="flex-1 p-5 sm:p-8 max-w-6xl w-full mx-auto">{children}</main>
      </div>
    </div>
  );
}
