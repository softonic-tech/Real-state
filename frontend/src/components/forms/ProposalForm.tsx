"use client";

import { useState, FormEvent } from "react";
import Link from "next/link";
import toast from "react-hot-toast";
import SectionLabel from "@/components/ui/SectionLabel";
import { proposalService } from "@/services/contact.service";
import { COMPANY_INFO } from "@/constants";

type ProposalType = "BUYER" | "SELLER";

interface ProposalFormProps {
  type: ProposalType;
}

const FORM_COPY: Record<
  ProposalType,
  { title: string; subtitle: string; messageLabel: string; submitLabel: string }
> = {
  BUYER: {
    title: "Spekulantregister",
    subtitle: "Registrera dig som köpare så hör vi av oss när rätt bostad dyker upp.",
    messageLabel: "Meddelande till Olofssons Skog & Mäkleri",
    submitLabel: "Skicka förfrågan",
  },
  SELLER: {
    title: "Säljförfrågan",
    subtitle: "Funderar du på att sälja? Berätta om din fastighet så återkommer vi.",
    messageLabel: "Meddelande till Olofssons Skog & Mäkleri",
    submitLabel: "Skicka förfrågan",
  },
};

function buildMessage(
  type: ProposalType,
  message: string,
  extras: Record<string, string>
): string {
  const lines: string[] = [];

  if (message.trim()) {
    lines.push(message.trim());
  }

  const details: string[] = [];

  if (type === "BUYER") {
    if (extras.area) details.push(`Omrade: ${extras.area}`);
    if (extras.livingArea) details.push(`Boarea: ${extras.livingArea} m²`);
    if (extras.maxPrice) details.push(`Maxpris: ${extras.maxPrice} SEK`);
  } else {
    if (extras.address) details.push(`Nuvarande adress: ${extras.address}`);
    if (extras.rooms) details.push(`Antal rum: ${extras.rooms}`);
    if (extras.livingArea) details.push(`Boarea: ${extras.livingArea} m²`);
  }

  if (details.length) {
    if (lines.length) lines.push("");
    lines.push(...details);
  }

  const result = lines.join("\n").trim();
  return result.length >= 10
    ? result
    : `${type === "BUYER" ? "Kopforfragan" : "Saljforfragan"} via webbplatsen.\n\n${result}`.trim();
}

export default function ProposalForm({ type }: ProposalFormProps) {
  const copy = FORM_COPY[type];
  const [loading, setLoading] = useState(false);
  const [acceptedPrivacy, setAcceptedPrivacy] = useState(false);

  const [buyerForm, setBuyerForm] = useState({
    name: "",
    email: "",
    phone: "",
    area: "",
    livingArea: "",
    maxPrice: "",
    message: "",
  });

  const [sellerForm, setSellerForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    rooms: "",
    livingArea: "",
    message: "",
  });

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!acceptedPrivacy) {
      toast.error("Du maste godkanna integritetspolicyn.");
      return;
    }

    setLoading(true);

    try {
      const payload =
        type === "BUYER"
          ? {
              type: "BUYER" as const,
              name: buyerForm.name.trim(),
              email: buyerForm.email.trim(),
              phone: buyerForm.phone.trim(),
              propertyName: buyerForm.area.trim() || undefined,
              message: buildMessage("BUYER", buyerForm.message, {
                area: buyerForm.area,
                livingArea: buyerForm.livingArea,
                maxPrice: buyerForm.maxPrice,
              }),
            }
          : {
              type: "SELLER" as const,
              name: `${sellerForm.firstName.trim()} ${sellerForm.lastName.trim()}`.trim(),
              email: sellerForm.email.trim(),
              phone: sellerForm.phone.trim(),
              propertyName: sellerForm.address.trim() || undefined,
              message: buildMessage("SELLER", sellerForm.message, {
                address: sellerForm.address,
                rooms: sellerForm.rooms,
                livingArea: sellerForm.livingArea,
              }),
            };

      const res = await proposalService.send(payload);

      if (res.success) {
        toast.success("Din forfragan har skickats. Vi kontaktar dig snart.");
        if (type === "BUYER") {
          setBuyerForm({
            name: "",
            email: "",
            phone: "",
            area: "",
            livingArea: "",
            maxPrice: "",
            message: "",
          });
        } else {
          setSellerForm({
            firstName: "",
            lastName: "",
            email: "",
            phone: "",
            address: "",
            rooms: "",
            livingArea: "",
            message: "",
          });
        }
        setAcceptedPrivacy(false);
      } else {
        toast.error(res.error || "Nagot gick fel. Forsok igen.");
      }
    } catch {
      toast.error("Nagot gick fel. Forsok igen.");
    } finally {
      setLoading(false);
    }
  };

  const fieldClass =
    "w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-white/35 font-body text-sm transition-all duration-200 focus:outline-none focus:border-accent/50 focus:ring-4 focus:ring-accent/10";
  const labelClass = "label-field text-white/60 mb-2";

  return (
    <section
      id="proposal-form"
      className="relative overflow-hidden bg-brand-950 text-white section-block"
    >
      <div className="absolute inset-0 grain-overlay opacity-40" />
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-accent/8 rounded-full blur-[120px]" />
      <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-brand-800/30 rounded-full blur-[100px]" />

      <div className="relative section-padding page-container max-w-3xl mx-auto">
        <div className="text-center mb-10">
          <SectionLabel light align="center">
            {type === "BUYER" ? "Köpare" : "Säljare"}
          </SectionLabel>
          <h2 className="font-display text-display-sm text-white mb-3">
            {copy.title}
          </h2>
          <p className="text-stone-400 font-body text-sm max-w-md mx-auto leading-relaxed">
            {copy.subtitle}
          </p>
        </div>

        <div className="glass-panel-dark p-6 md:p-10">
        <form onSubmit={handleSubmit} className="space-y-6">
          {type === "BUYER" ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-6">
                <div>
                  <label className={labelClass}>Namn *</label>
                  <input
                    type="text"
                    required
                    value={buyerForm.name}
                    onChange={(e) =>
                      setBuyerForm((prev) => ({ ...prev, name: e.target.value }))
                    }
                    className={fieldClass}
                  />
                </div>
                <div>
                  <label className={labelClass}>E-post *</label>
                  <input
                    type="email"
                    required
                    value={buyerForm.email}
                    onChange={(e) =>
                      setBuyerForm((prev) => ({ ...prev, email: e.target.value }))
                    }
                    className={fieldClass}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-6">
                <div>
                  <label className={labelClass}>Telefon *</label>
                  <input
                    type="tel"
                    required
                    value={buyerForm.phone}
                    onChange={(e) =>
                      setBuyerForm((prev) => ({ ...prev, phone: e.target.value }))
                    }
                    className={fieldClass}
                  />
                </div>
                <div>
                  <label className={labelClass}>Omrade</label>
                  <input
                    type="text"
                    value={buyerForm.area}
                    onChange={(e) =>
                      setBuyerForm((prev) => ({ ...prev, area: e.target.value }))
                    }
                    className={fieldClass}
                    placeholder="t.ex. Dalarna, Skane"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-6">
                <div>
                  <label className={labelClass}>Boarea</label>
                  <input
                    type="text"
                    value={buyerForm.livingArea}
                    onChange={(e) =>
                      setBuyerForm((prev) => ({
                        ...prev,
                        livingArea: e.target.value,
                      }))
                    }
                    className={fieldClass}
                    placeholder="m²"
                  />
                </div>
                <div>
                  <label className={labelClass}>Maxpris</label>
                  <input
                    type="text"
                    value={buyerForm.maxPrice}
                    onChange={(e) =>
                      setBuyerForm((prev) => ({
                        ...prev,
                        maxPrice: e.target.value,
                      }))
                    }
                    className={fieldClass}
                    placeholder="SEK"
                  />
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-6">
                <div>
                  <label className={labelClass}>Fornamn *</label>
                  <input
                    type="text"
                    required
                    value={sellerForm.firstName}
                    onChange={(e) =>
                      setSellerForm((prev) => ({
                        ...prev,
                        firstName: e.target.value,
                      }))
                    }
                    className={fieldClass}
                  />
                </div>
                <div>
                  <label className={labelClass}>Efternamn *</label>
                  <input
                    type="text"
                    required
                    value={sellerForm.lastName}
                    onChange={(e) =>
                      setSellerForm((prev) => ({
                        ...prev,
                        lastName: e.target.value,
                      }))
                    }
                    className={fieldClass}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-6">
                <div>
                  <label className={labelClass}>E-post *</label>
                  <input
                    type="email"
                    required
                    value={sellerForm.email}
                    onChange={(e) =>
                      setSellerForm((prev) => ({ ...prev, email: e.target.value }))
                    }
                    className={fieldClass}
                  />
                </div>
                <div>
                  <label className={labelClass}>Telefon *</label>
                  <input
                    type="tel"
                    required
                    value={sellerForm.phone}
                    onChange={(e) =>
                      setSellerForm((prev) => ({ ...prev, phone: e.target.value }))
                    }
                    className={fieldClass}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-x-10 gap-y-6">
                <div>
                  <label className={labelClass}>Nuvarande adress</label>
                  <input
                    type="text"
                    value={sellerForm.address}
                    onChange={(e) =>
                      setSellerForm((prev) => ({
                        ...prev,
                        address: e.target.value,
                      }))
                    }
                    className={fieldClass}
                  />
                </div>
                <div>
                  <label className={labelClass}>Antal rum</label>
                  <input
                    type="text"
                    value={sellerForm.rooms}
                    onChange={(e) =>
                      setSellerForm((prev) => ({ ...prev, rooms: e.target.value }))
                    }
                    className={fieldClass}
                  />
                </div>
                <div>
                  <label className={labelClass}>Boarea</label>
                  <input
                    type="text"
                    value={sellerForm.livingArea}
                    onChange={(e) =>
                      setSellerForm((prev) => ({
                        ...prev,
                        livingArea: e.target.value,
                      }))
                    }
                    className={fieldClass}
                    placeholder="m²"
                  />
                </div>
              </div>
            </>
          )}

          <div>
            <label className={labelClass}>{copy.messageLabel}</label>
            <textarea
              rows={4}
              value={type === "BUYER" ? buyerForm.message : sellerForm.message}
              onChange={(e) =>
                type === "BUYER"
                  ? setBuyerForm((prev) => ({ ...prev, message: e.target.value }))
                  : setSellerForm((prev) => ({ ...prev, message: e.target.value }))
              }
              className={`${fieldClass} resize-none`}
              placeholder="Beratta mer om dina onskemal..."
            />
          </div>

          <label className="flex items-start gap-3 cursor-pointer group">
            <input
              type="checkbox"
              checked={acceptedPrivacy}
              onChange={(e) => setAcceptedPrivacy(e.target.checked)}
              className="mt-1 accent-brand-400"
            />
            <span className="text-sm font-body text-white/70 leading-relaxed">
              Jag har last och godkant{" "}
              <Link
                href="/om-oss"
                className="text-brand-300 underline underline-offset-2 hover:text-white transition-colors"
              >
                integritetspolicyn
              </Link>
              .
            </span>
          </label>

          <div className="flex justify-center pt-2">
            <button
              type="submit"
              disabled={loading}
              className="btn-white disabled:opacity-50 disabled:cursor-not-allowed min-w-[180px]"
            >
              {loading ? "Skickar..." : copy.submitLabel}
            </button>
          </div>
        </form>
        </div>

        <p className="text-center text-stone-500 text-xs font-body mt-8">
          Eller kontakta oss direkt på{" "}
          <a
            href={`tel:${COMPANY_INFO.phoneTel}`}
            className="text-accent-light hover:text-white transition-colors"
          >
            {COMPANY_INFO.phone}
          </a>
        </p>
      </div>
    </section>
  );
}
