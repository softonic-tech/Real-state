"use client";

import { useState, FormEvent } from "react";
import { Send } from "lucide-react";
import toast from "react-hot-toast";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import PageHeader from "@/components/ui/PageHeader";
import ContactSidebar from "@/components/ui/ContactSidebar";
import ScrollReveal from "@/components/ui/ScrollReveal";
import SectionLabel from "@/components/ui/SectionLabel";
import { contactService } from "@/services/contact.service";

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
        toast.error(res.error || "Något gick fel. Försök igen.");
      }
    } catch {
      toast.error("Något gick fel. Försök igen.");
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
          subtitle="Vi ser fram emot att höra från dig. Tveka inte att höra av dig med frågor eller för att boka ett möte."
          label="Kontakt"
        />

        <section className="inner-page-section">
          <div className="section-padding page-container">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-14">
              <div className="lg:col-span-2">
                <ScrollReveal>
                  <SectionLabel>Skriv till oss</SectionLabel>
                  <h2 className="text-display-sm text-charcoal mb-8">
                    Skicka ett meddelande
                  </h2>
                </ScrollReveal>

                <ScrollReveal delay={100}>
                  <div className="premium-card p-6 md:p-10">
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="label-field">Namn</label>
                          <input
                            type="text"
                            required
                            value={form.name}
                            onChange={(e) => updateField("name", e.target.value)}
                            className="input-field"
                            placeholder="Ditt fullständiga namn"
                          />
                        </div>
                        <div>
                          <label className="label-field">E-post</label>
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
                          <label className="label-field">Telefon</label>
                          <input
                            type="tel"
                            value={form.phone}
                            onChange={(e) => updateField("phone", e.target.value)}
                            className="input-field"
                            placeholder="070-123 45 67"
                          />
                        </div>
                        <div>
                          <label className="label-field">Ämne</label>
                          <select
                            required
                            value={form.subject}
                            onChange={(e) => updateField("subject", e.target.value)}
                            className="input-field"
                          >
                            <option value="">Välj ämne</option>
                            <option value="Köprådgivning">Köprådgivning</option>
                            <option value="Säljrådgivning">Säljrådgivning</option>
                            <option value="Värdering">Värdering</option>
                            <option value="Allmän fråga">Allmän fråga</option>
                          </select>
                        </div>
                      </div>

                      <div>
                        <label className="label-field">Meddelande</label>
                        <textarea
                          required
                          rows={6}
                          value={form.message}
                          onChange={(e) => updateField("message", e.target.value)}
                          className="input-field resize-none"
                          placeholder="Beskriv ditt ärende..."
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
                            <Send size={16} />
                          </>
                        )}
                      </button>
                    </form>
                  </div>
                </ScrollReveal>
              </div>

              <ScrollReveal direction="right" delay={150}>
                <ContactSidebar />
              </ScrollReveal>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
