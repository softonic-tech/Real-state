"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Building2,
  TrendingUp,
  CheckCircle,
  MessageSquare,
  Plus,
  ArrowRight,
} from "lucide-react";
import { propertyService } from "@/services/property.service";
import { DashboardStats } from "@/types";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import AdminPageHeader from "@/components/admin/AdminPageHeader";
import AdminStatCard from "@/components/admin/AdminStatCard";
import AdminCard from "@/components/admin/AdminCard";
import { cn } from "@/utils";

export default function DashboardPage() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStats() {
      try {
        const res = await propertyService.getStats();
        if (res.success && res.data) setStats(res.data);
      } catch {
        /* empty */
      } finally {
        setLoading(false);
      }
    }
    fetchStats();
  }, []);

  if (loading) {
    return <LoadingSpinner size="lg" className="py-20" />;
  }

  const total = stats?.total || 0;

  return (
    <div>
      <AdminPageHeader
        title="Välkommen"
        description="Översikt av fastigheter, meddelanden och förfrågningar."
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 md:gap-5 mb-8">
        <AdminStatCard
          title="Totalt fastigheter"
          value={stats?.total || 0}
          icon={Building2}
          tone="brand"
        />
        <AdminStatCard
          title="Till salu"
          value={stats?.forSale || 0}
          icon={TrendingUp}
          tone="green"
        />
        <AdminStatCard
          title="Sålda"
          value={stats?.sold || 0}
          icon={CheckCircle}
          tone="amber"
        />
        <AdminStatCard
          title="Olästa meddelanden"
          value={stats?.recentMessages || 0}
          icon={MessageSquare}
          tone="accent"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <AdminCard title="Statusfördelning">
          <div className="space-y-4">
            {[
              { label: "Till salu", value: stats?.forSale || 0, color: "bg-brand-600" },
              { label: "Sålda", value: stats?.sold || 0, color: "bg-stone-600" },
              { label: "Uthyrda", value: stats?.rented || 0, color: "bg-amber-600" },
              { label: "Reserverade", value: stats?.reserved || 0, color: "bg-stone-400" },
            ].map((item) => (
              <div key={item.label}>
                <div className="flex items-center justify-between text-sm font-body mb-1.5">
                  <span className="text-stone-600">{item.label}</span>
                  <span className="font-semibold text-charcoal tabular-nums">
                    {item.value}
                  </span>
                </div>
                <div className="h-2 rounded-full bg-stone-100 overflow-hidden">
                  <div
                    className={cn("h-full rounded-full transition-all", item.color)}
                    style={{
                      width: total
                        ? `${Math.max((item.value / total) * 100, item.value ? 8 : 0)}%`
                        : "0%",
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </AdminCard>

        <AdminCard title="Snabbstart">
          <div className="space-y-2">
            {[
              {
                href: "/admin/properties/new",
                title: "Lägg till fastighet",
                desc: "Skapa en ny bostadsannons",
                icon: Plus,
              },
              {
                href: "/admin/messages",
                title: "Meddelanden",
                desc: "Läs kontaktformulär från besökare",
                icon: MessageSquare,
              },
              {
                href: "/admin/proposals",
                title: "Förfrågningar",
                desc: "Köp- och säljintressen",
                icon: ArrowRight,
              },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center gap-4 p-4 rounded-xl border border-stone-100 hover:border-brand-200 hover:bg-brand-50/50 transition-all group"
              >
                <div className="w-10 h-10 rounded-xl bg-brand-50 border border-brand-100 flex items-center justify-center shrink-0 group-hover:bg-brand-100 transition-colors">
                  <item.icon size={18} className="text-brand-700" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-body font-semibold text-charcoal text-sm">
                    {item.title}
                  </p>
                  <p className="text-xs text-stone-500 font-body">{item.desc}</p>
                </div>
                <ArrowRight
                  size={16}
                  className="text-stone-300 group-hover:text-brand-700 shrink-0 transition-colors"
                />
              </Link>
            ))}
          </div>
        </AdminCard>
      </div>
    </div>
  );
}
