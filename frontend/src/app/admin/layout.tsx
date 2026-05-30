"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import {
  LayoutDashboard,
  Building2,
  MessageSquare,
  FileText,
  LogOut,
  Menu,
  X,
} from "lucide-react";
import { useState } from "react";
import { useAuth } from "@/hooks";
import { authService } from "@/services/auth.service";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import { cn } from "@/utils";

const sidebarLinks = [
  { href: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/properties", label: "Fastigheter", icon: Building2 },
  { href: "/admin/proposals", label: "Forfragningar", icon: FileText },
  { href: "/admin/messages", label: "Meddelanden", icon: MessageSquare },
];

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
      <div className="min-h-screen flex items-center justify-center bg-stone-50">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (!isAuthenticated) return null;

  return (
    <div className="min-h-screen bg-stone-50 flex">
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-64 bg-brand-950 transform transition-transform duration-300 lg:translate-x-0 lg:static",
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="p-6 border-b border-brand-900">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-8 h-8 bg-brand-600 flex items-center justify-center">
              <span className="text-white font-display text-sm">N</span>
            </div>
            <span className="font-display text-lg text-white">
              Adminpanel
            </span>
          </Link>
        </div>

        <nav className="p-4 space-y-1">
          {sidebarLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setSidebarOpen(false)}
              className={cn(
                "flex items-center gap-3 px-4 py-3 font-body text-sm transition-colors rounded",
                pathname === link.href
                  ? "bg-brand-800 text-white"
                  : "text-stone-400 hover:text-white hover:bg-brand-900"
              )}
            >
              <link.icon size={18} />
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-brand-900">
          <button
            onClick={logout}
            className="flex items-center gap-3 px-4 py-3 w-full font-body text-sm text-stone-400 hover:text-white transition-colors rounded hover:bg-brand-900"
          >
            <LogOut size={18} />
            Logga ut
          </button>
        </div>
      </aside>

      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <div className="flex-1 min-w-0">
        <header className="bg-white border-b border-stone-200 px-6 py-4 flex items-center justify-between lg:justify-end">
          <button
            className="lg:hidden p-2 text-stone-600"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu size={22} />
          </button>
          <Link
            href="/"
            className="text-sm text-stone-500 font-body hover:text-brand-700 transition-colors"
          >
            Visa webbplatsen
          </Link>
        </header>
        <main className="p-6 lg:p-8">{children}</main>
      </div>
    </div>
  );
}
