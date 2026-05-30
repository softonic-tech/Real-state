"use client";

import { useState, useEffect } from "react";
import { Building2, TrendingUp, CheckCircle, MessageSquare } from "lucide-react";
import { propertyService } from "@/services/property.service";
import { DashboardStats } from "@/types";
import LoadingSpinner from "@/components/ui/LoadingSpinner";

export default function DashboardPage() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStats() {
      try {
        const res = await propertyService.getStats();
        if (res.success && res.data) {
          setStats(res.data);
        }
      } catch {
        // Handle error
      } finally {
        setLoading(false);
      }
    }
    fetchStats();
  }, []);

  if (loading) {
    return <LoadingSpinner size="lg" className="py-20" />;
  }

  const cards = [
    {
      title: "Totalt fastigheter",
      value: stats?.total || 0,
      icon: Building2,
      color: "bg-blue-50 text-blue-700",
    },
    {
      title: "Aktiva annonser",
      value: stats?.forSale || 0,
      icon: TrendingUp,
      color: "bg-green-50 text-green-700",
    },
    {
      title: "Salda fastigheter",
      value: stats?.sold || 0,
      icon: CheckCircle,
      color: "bg-amber-50 text-amber-700",
    },
    {
      title: "Olasta meddelanden",
      value: stats?.recentMessages || 0,
      icon: MessageSquare,
      color: "bg-purple-50 text-purple-700",
    },
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-display text-2xl text-charcoal mb-1">
          Dashboard
        </h1>
        <p className="text-stone-500 font-body text-sm">
          Oversikt av din fastighetsverksamhet
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
        {cards.map((card) => (
          <div
            key={card.title}
            className="bg-white border border-stone-200 p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-body font-medium text-stone-500 tracking-wide uppercase">
                {card.title}
              </span>
              <div
                className={`w-10 h-10 flex items-center justify-center ${card.color}`}
              >
                <card.icon size={18} />
              </div>
            </div>
            <p className="font-display text-3xl text-charcoal">{card.value}</p>
          </div>
        ))}
      </div>

      <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white border border-stone-200 p-6">
          <h2 className="font-display text-lg text-charcoal mb-4">
            Statusfordelning
          </h2>
          <div className="space-y-4">
            {[
              { label: "Till salu", value: stats?.forSale || 0, color: "bg-brand-600" },
              { label: "Salda", value: stats?.sold || 0, color: "bg-stone-700" },
              { label: "Uthyrda", value: stats?.rented || 0, color: "bg-amber-600" },
              { label: "Reserverade", value: stats?.reserved || 0, color: "bg-stone-400" },
            ].map((item) => (
              <div key={item.label} className="flex items-center gap-4">
                <div className={`w-3 h-3 ${item.color}`} />
                <span className="text-sm font-body text-stone-600 flex-1">
                  {item.label}
                </span>
                <span className="text-sm font-body font-semibold text-charcoal">
                  {item.value}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white border border-stone-200 p-6">
          <h2 className="font-display text-lg text-charcoal mb-4">
            Snabblankar
          </h2>
          <div className="space-y-3">
            <a
              href="/admin/properties/new"
              className="block p-4 border border-stone-100 hover:bg-stone-50 transition-colors"
            >
              <p className="font-body font-semibold text-charcoal text-sm">
                Lagg till fastighet
              </p>
              <p className="text-xs text-stone-400 font-body mt-0.5">
                Skapa en ny fastighetsannons
              </p>
            </a>
            <a
              href="/admin/messages"
              className="block p-4 border border-stone-100 hover:bg-stone-50 transition-colors"
            >
              <p className="font-body font-semibold text-charcoal text-sm">
                Visa meddelanden
              </p>
              <p className="text-xs text-stone-400 font-body mt-0.5">
                Hantera inkomna kontaktforfragan
              </p>
            </a>
            <a
              href="/admin/proposals"
              className="block p-4 border border-stone-100 hover:bg-stone-50 transition-colors"
            >
              <p className="font-body font-semibold text-charcoal text-sm">
                Visa forfragningar
              </p>
              <p className="text-xs text-stone-400 font-body mt-0.5">
                Kop- och saljforfragningar
              </p>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
