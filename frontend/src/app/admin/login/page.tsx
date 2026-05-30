"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
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
      toast.error("Nagot gick fel. Forsok igen.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-brand-950 flex items-center justify-center px-6">
      <div className="w-full max-w-sm">
        <div className="text-center mb-10">
          <div className="w-14 h-14 bg-brand-600 flex items-center justify-center mx-auto mb-6">
            <span className="text-white font-display text-2xl">N</span>
          </div>
          <h1 className="font-display text-2xl text-white mb-2">
            Adminpanel
          </h1>
          <p className="text-stone-400 font-body text-sm">
            Logga in for att hantera fastigheter
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-xs font-body font-medium text-stone-400 tracking-wide uppercase mb-2">
              E-postadress
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 bg-brand-900 border border-brand-800 text-white placeholder:text-stone-500 font-body text-sm focus:outline-none focus:border-brand-500"
              placeholder="admin@nordmark.se"
            />
          </div>

          <div>
            <label className="block text-xs font-body font-medium text-stone-400 tracking-wide uppercase mb-2">
              Losenord
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 bg-brand-900 border border-brand-800 text-white placeholder:text-stone-500 font-body text-sm focus:outline-none focus:border-brand-500"
              placeholder="Ange losenord"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn-primary w-full bg-brand-600 hover:bg-brand-700 disabled:opacity-50"
          >
            {loading ? "Loggar in..." : "Logga in"}
          </button>
        </form>
      </div>
    </div>
  );
}
