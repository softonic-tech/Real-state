"use client";

import { useState, FormEvent } from "react";
import Link from "next/link";
import toast from "react-hot-toast";
import { proposalService } from "@/services/contact.service";
import { COMPANY_INFO } from "@/constants";

type ProposalType = "BUYER" | "SELLER";

interface ProposalFormProps {
  type: ProposalType;
}

const FORM_COPY: Record<
  ProposalType,
  { title: string; messageLabel: string; submitLabel: string }
> = {
  BUYER: {
    title: "Valkommen till var spekulantregister",
    messageLabel: "Meddelande till Nordmark",
    submitLabel: "Skicka",
  },
  SELLER: {
    title: "Kontakta oss - jag funderar pa att salja",
    messageLabel: "Meddelande till Nordmark",
    submitLabel: "Skicka",
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
    "w-full bg-transparent border-0 border-b border-white/30 text-white placeholder:text-white/40 font-body text-sm py-3 focus:outline-none focus:border-white transition-colors";
  const labelClass =
    "block text-[11px] font-body font-medium text-white/70 tracking-[0.15em] uppercase mb-1";

  return (
    <section
      id="proposal-form"
      className="relative overflow-hidden bg-brand-950 text-white py-24"
    >
      <div
        className="absolute inset-0 opacity-15 bg-cover bg-center pointer-events-none"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1524661135-423995f22d0b?w=1600&q=80')",
        }}
      />
      <div className="absolute inset-0 bg-brand-950/85 pointer-events-none" />

      <div className="relative section-padding page-container max-w-4xl mx-auto">
        <h2 className="font-display text-2xl md:text-3xl text-white text-center mb-12 tracking-wide uppercase">
          {copy.title}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-8">
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

          <div className="flex justify-center pt-4">
            <button
              type="submit"
              disabled={loading}
              className="inline-flex items-center justify-center min-w-[160px] px-10 py-3.5 border border-white text-white font-body font-medium text-sm tracking-[0.2em] uppercase transition-all duration-300 hover:bg-white hover:text-brand-950 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Skickar..." : copy.submitLabel}
            </button>
          </div>
        </form>

        <p className="text-center text-white/40 text-xs font-body mt-10">
          Eller kontakta oss direkt pa{" "}
          <a
            href={`mailto:${COMPANY_INFO.email}`}
            className="text-white/60 hover:text-white transition-colors"
          >
            {COMPANY_INFO.email}
          </a>
        </p>
      </div>
    </section>
  );
}
