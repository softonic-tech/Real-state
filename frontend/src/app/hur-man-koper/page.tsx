import { Metadata } from "next";
import {
  Search,
  FileText,
  Banknote,
  Handshake,
  CheckCircle,
  ArrowRight,
} from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import PageHeader from "@/components/ui/PageHeader";
import ProposalForm from "@/components/forms/ProposalForm";

export const metadata: Metadata = {
  title: "Hur man koper",
  description:
    "Steg-for-steg guide till att kopa skogs- och jordbruksfastigheter i Sverige.",
};

const steps = [
  {
    icon: Search,
    title: "1. Utforska marknaden",
    description:
      "Borja med att definiera dina krav och onskemal. Vilken typ av fastighet soker du? Var i Sverige? Vad ar din budget? Vi hjalper dig att navigera marknaden och identifiera ratt objekt.",
  },
  {
    icon: FileText,
    title: "2. Besiktning och vardering",
    description:
      "Nar vi hittar ett intressant objekt genomfor vi en grundlig besiktning och oberoende vardering. For skogsfastigheter innefattar detta skogsbruksplan, virkesforrad och tillvaxtprognoser.",
  },
  {
    icon: Banknote,
    title: "3. Finansiering",
    description:
      "Vi samarbetar med ledande banker och finansinstitut som ar specialiserade pa jord- och skogsbruksfastigheter. Vi hjalper dig att satta ihop en finansieringslosning som passar dina forutsattningar.",
  },
  {
    icon: Handshake,
    title: "4. Forhandling och avtal",
    description:
      "Vart erfarna team forhandlar villkoren for ditt kop. Vi saker staller att alla juridiska aspekter hanteras korrekt och att kopeavtalet skyddar dina intressen.",
  },
  {
    icon: CheckCircle,
    title: "5. Tilltradeoch overlatelse",
    description:
      "Vid tilltradesdagen sakerställer vi en smidig overgang. Vi hjlper till med lagfart, fastighetsregistrering och alla praktiska detaljer som foljer med overtagandet.",
  },
];

export default function HurManKoperPage() {
  return (
    <>
      <Header />
      <main>
        <PageHeader
          title="Hur man koper"
          subtitle="En tydlig och trygg process fran forsta kontakt till tilltrade."
          label="Kopguide"
        />

        <section className="section-padding page-container py-24">
          <div className="max-w-3xl mx-auto">
            <div className="space-y-0">
              {steps.map((step, index) => (
                <div key={step.title} className="relative pl-16 pb-16 last:pb-0">
                  {index < steps.length - 1 && (
                    <div className="absolute left-6 top-14 bottom-0 w-px bg-stone-200" />
                  )}
                  <div className="absolute left-0 top-0 w-12 h-12 bg-brand-50 border border-brand-200 flex items-center justify-center">
                    <step.icon
                      size={20}
                      className="text-brand-700"
                      strokeWidth={1.5}
                    />
                  </div>
                  <h3 className="font-display text-xl text-charcoal mb-3 pt-2">
                    {step.title}
                  </h3>
                  <p className="text-stone-500 font-body leading-relaxed">
                    {step.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-white py-24">
          <div className="section-padding page-container">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-display-sm text-charcoal mb-6">
                Finansieringsmojligheter
              </h2>
              <div className="space-y-6 text-stone-600 font-body leading-relaxed">
                <p>
                  Finansiering av skogs- och jordbruksfastigheter skiljer sig
                  fran traditionella bostadslan. Bankerna varderar fastigheten
                  baserat pa dess produktionsformaga, virkesforrad och
                  marknadsposition snarare an traditionellt bovardesbegrepp.
                </p>
                <p>
                  Typiskt erbjuds belaningsgrader mellan 50-75% av
                  marknadsvarde, beroende pa fastighetstyp och lanarens
                  forutsattningar. Vi samarbetar med Landshypotek Bank,
                  Swedbank, och Handelsbanken som alla har specialiserade
                  avdelningar for jord- och skogsbruk.
                </p>
                <p>
                  Kontakta oss for en personlig genomgang av dina
                  finansieringsmojligheter. Vi hjalper dig att hitta den
                  basta losningen.
                </p>
              </div>
              <a
                href="#proposal-form"
                className="btn-primary mt-8 inline-flex items-center"
              >
                Registrera dig som kopare
                <ArrowRight size={16} className="ml-2" />
              </a>
            </div>
          </div>
        </section>

        <ProposalForm type="BUYER" />
      </main>
      <Footer />
    </>
  );
}
