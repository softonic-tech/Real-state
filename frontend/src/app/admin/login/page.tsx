"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import toast from "react-hot-toast";
import SiteLogo from "@/components/ui/SiteLogo";
import { authService } from "@/services/auth.service";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await authService.login(email, password);
      if (res.success) {
        toast.success("Inloggningen lyckades.");
        router.replace("/admin/dashboard");
      } else {
        toast.error(res.error || "Ogiltiga inloggningsuppgifter.");
      }
    } catch {
      toast.error("Något gick fel. Försök igen.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-cream flex flex-col">
      <div className="p-6">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-stone-500 font-body text-sm hover:text-brand-800 transition-colors"
        >
          <ArrowLeft size={16} />
          Tillbaka till webbplatsen
        </Link>
      </div>

      <div className="flex-1 flex items-center justify-center px-6 pb-16">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-2xl border border-stone-200/90 shadow-soft p-8 md:p-10">
            <div className="text-center mb-8">
              <div className="flex justify-center mb-5">
                <SiteLogo size="large" variant="light" />
              </div>
              <h1 className="font-display text-2xl text-charcoal mb-2">
                Adminpanel
              </h1>
              <p className="text-stone-500 font-body text-sm">
                Logga in för att hantera fastigheter och meddelanden
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label htmlFor="email" className="label-field">
                  E-postadress
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="input-field"
                  placeholder="admin@nordmark.se"
                />
              </div>

              <div>
                <label htmlFor="password" className="label-field">
                  Lösenord
                </label>
                <input
                  id="password"
                  type="password"
                  required
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="input-field"
                  placeholder="Ange lösenord"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="btn-primary w-full disabled:opacity-50 mt-2"
              >
                {loading ? "Loggar in..." : "Logga in"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
