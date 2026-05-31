"use client";

import {
  Search,
  FileText,
  Banknote,
  Handshake,
  CheckCircle,
  ArrowRight,
} from "lucide-react";
import GuideTimeline from "@/components/ui/GuideTimeline";
import SectionLabel from "@/components/ui/SectionLabel";
import ProposalForm from "@/components/forms/ProposalForm";

const steps = [
  {
    icon: Search,
    step: "01",
    title: "Utforska marknaden",
    description:
      "Börja med att definiera dina krav och önskemål. Vilken typ av bostad söker du? Var i regionen? Vad är din budget? Vi hjälper dig att navigera marknaden och identifiera rätt objekt.",
  },
  {
    icon: FileText,
    step: "02",
    title: "Besiktning och värdering",
    description:
      "När vi hittar ett intressant objekt genomför vi en grundlig genomgång och oberoende värdering. För fastigheter kan detta innefatta skogsbruksplan, virkesförråd och tillväxtprognoser.",
  },
  {
    icon: Banknote,
    step: "03",
    title: "Finansiering",
    description:
      "Vi samarbetar med banker och finansinstitut som är specialiserade på jord- och skogsbruksfastigheter. Vi hjälper dig att sätta ihop en finansieringslösning som passar dina förutsättningar.",
  },
  {
    icon: Handshake,
    step: "04",
    title: "Förhandling och avtal",
    description:
      "Vårt erfarna team förhandlar villkoren för ditt köp. Vi säkerställer att alla juridiska aspekter hanteras korrekt och att köpeavtalet skyddar dina intressen.",
  },
  {
    icon: CheckCircle,
    step: "05",
    title: "Tillträde och överlåtelse",
    description:
      "Vid tillträdesdagen säkerställer vi en smidig övergång. Vi hjälper till med lagfart, fastighetsregistrering och alla praktiska detaljer som följer med övertagandet.",
  },
];

export default function BuyerGuideContent() {
  return (
    <>
      <section className="inner-page-section">
        <div className="section-padding page-container">
          <div className="max-w-3xl mx-auto">
            <GuideTimeline steps={steps} />
          </div>
        </div>
      </section>

      <section className="section-block bg-white border-y border-stone-100">
        <div className="section-padding page-container">
          <div className="max-w-3xl mx-auto">
            <SectionLabel>Finansiering</SectionLabel>
            <h2 className="text-display-sm text-charcoal mb-6 text-balance">
              Finansieringsmöjligheter
            </h2>
            <div className="premium-card p-8 md:p-10 space-y-5 text-stone-600 font-body leading-relaxed">
              <p>
                Finansiering av skogs- och jordbruksfastigheter skiljer sig från
                traditionella bostadslån. Bankerna värderar fastigheten baserat
                på dess produktionsförmåga, virkesförråd och marknadsposition
                snarare än traditionellt bovärde.
              </p>
              <p>
                Typiskt erbjuds belåningsgrader mellan 50–75% av marknadsvärde,
                beroende på fastighetstyp och låntagarens förutsättningar. Vi
                samarbetar med Landshypotek Bank, Swedbank och Handelsbanken som
                alla har specialiserade avdelningar för jord- och skogsbruk.
              </p>
              <p>
                Kontakta oss för en personlig genomgång av dina
                finansieringsmöjligheter. Vi hjälper dig att hitta den bästa
                lösningen.
              </p>
            </div>
            <a
              href="#proposal-form"
              className="btn-primary mt-8 inline-flex items-center"
            >
              Registrera dig som köpare
              <ArrowRight size={16} />
            </a>
          </div>
        </div>
      </section>

      <ProposalForm type="BUYER" />
    </>
  );
}
