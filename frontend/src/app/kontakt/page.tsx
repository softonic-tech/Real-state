"use client";

import { useState, FormEvent } from "react";
import { MapPin, Phone, Mail, Clock, Send } from "lucide-react";
import toast from "react-hot-toast";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import PageHeader from "@/components/ui/PageHeader";
import { contactService } from "@/services/contact.service";
import { COMPANY_INFO } from "@/constants";

export default function KontaktPage() {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await contactService.send(form);
      if (res.success) {
        toast.success("Meddelandet har skickats. Vi kontaktar dig snart.");
        setForm({ name: "", email: "", phone: "", subject: "", message: "" });
      } else {
        toast.error(res.error || "Nagot gick fel. Forsok igen.");
      }
    } catch {
      toast.error("Nagot gick fel. Forsok igen.");
    } finally {
      setLoading(false);
    }
  };

  const updateField = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <>
      <Header />
      <main>
        <PageHeader
          title="Kontakta oss"
          subtitle="Vi ser fram emot att hora fran dig. Tveka inte att hora av dig med fragor eller for att boka ett mote."
          label="Kontakt"
        />

        <section className="section-padding page-container py-24">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
            <div className="lg:col-span-2">
              <h2 className="font-display text-2xl text-charcoal mb-8">
                Skicka ett meddelande
              </h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-body font-medium text-stone-500 tracking-wide uppercase mb-2">
                      Namn
                    </label>
                    <input
                      type="text"
                      required
                      value={form.name}
                      onChange={(e) => updateField("name", e.target.value)}
                      className="input-field"
                      placeholder="Ditt fullstandiga namn"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-body font-medium text-stone-500 tracking-wide uppercase mb-2">
                      E-post
                    </label>
                    <input
                      type="email"
                      required
                      value={form.email}
                      onChange={(e) => updateField("email", e.target.value)}
                      className="input-field"
                      placeholder="din@email.se"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-body font-medium text-stone-500 tracking-wide uppercase mb-2">
                      Telefon
                    </label>
                    <input
                      type="tel"
                      value={form.phone}
                      onChange={(e) => updateField("phone", e.target.value)}
                      className="input-field"
                      placeholder="+46 70 123 45 67"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-body font-medium text-stone-500 tracking-wide uppercase mb-2">
                      Amne
                    </label>
                    <select
                      required
                      value={form.subject}
                      onChange={(e) => updateField("subject", e.target.value)}
                      className="input-field"
                    >
                      <option value="">Valj amne</option>
                      <option value="Kopradgivning">Kopradgivning</option>
                      <option value="Saljradgivning">Saljradgivning</option>
                      <option value="Vardering">Vardering</option>
                      <option value="Allman fraga">Allman fraga</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-body font-medium text-stone-500 tracking-wide uppercase mb-2">
                    Meddelande
                  </label>
                  <textarea
                    required
                    rows={6}
                    value={form.message}
                    onChange={(e) => updateField("message", e.target.value)}
                    className="input-field resize-none"
                    placeholder="Beskriv ditt arende..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    "Skickar..."
                  ) : (
                    <>
                      Skicka meddelande
                      <Send size={16} className="ml-2" />
                    </>
                  )}
                </button>
              </form>
            </div>

            <div>
              <h2 className="font-display text-2xl text-charcoal mb-8">
                Kontaktuppgifter
              </h2>
              <div className="space-y-8">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-brand-50 flex items-center justify-center shrink-0">
                    <MapPin size={18} className="text-brand-700" />
                  </div>
                  <div>
                    <p className="font-body font-semibold text-charcoal text-sm">
                      Besoksadress
                    </p>
                    <p className="text-stone-500 font-body text-sm mt-1">
                      {COMPANY_INFO.address}
                      <br />
                      {COMPANY_INFO.postalCode} {COMPANY_INFO.city}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-brand-50 flex items-center justify-center shrink-0">
                    <Phone size={18} className="text-brand-700" />
                  </div>
                  <div>
                    <p className="font-body font-semibold text-charcoal text-sm">
                      Telefon
                    </p>
                    <a
                      href={`tel:${COMPANY_INFO.phone}`}
                      className="text-stone-500 font-body text-sm mt-1 hover:text-brand-700 transition-colors"
                    >
                      {COMPANY_INFO.phone}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-brand-50 flex items-center justify-center shrink-0">
                    <Mail size={18} className="text-brand-700" />
                  </div>
                  <div>
                    <p className="font-body font-semibold text-charcoal text-sm">
                      E-post
                    </p>
                    <a
                      href={`mailto:${COMPANY_INFO.email}`}
                      className="text-stone-500 font-body text-sm mt-1 hover:text-brand-700 transition-colors"
                    >
                      {COMPANY_INFO.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-brand-50 flex items-center justify-center shrink-0">
                    <Clock size={18} className="text-brand-700" />
                  </div>
                  <div>
                    <p className="font-body font-semibold text-charcoal text-sm">
                      Oppettider
                    </p>
                    <p className="text-stone-500 font-body text-sm mt-1">
                      Mandag - Fredag: 08:00 - 17:00
                      <br />
                      Lordag - Sondag: Stangt
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-10 aspect-[4/3] bg-stone-100 border border-stone-200 relative overflow-hidden">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2034.7!2d18.076!3d59.336!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNTnCsDIwJzEwLjAiTiAxOMKwMDQnMzMuNiJF!5e0!3m2!1ssv!2sse!4v1700000000000"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Kontor plats"
                />
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
