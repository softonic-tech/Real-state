import { Metadata } from "next";
import {
  PhoneCall,
  ClipboardCheck,
  Camera,
  Megaphone,
  Gavel,
  ArrowRight,
} from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import PageHeader from "@/components/ui/PageHeader";
import ProposalForm from "@/components/forms/ProposalForm";

export const metadata: Metadata = {
  title: "Hur man saljer",
  description:
    "Professionell formedling och vardering av skogs- och jordbruksfastigheter.",
};

const steps = [
  {
    icon: PhoneCall,
    title: "1. Forsta kontakten",
    description:
      "Allt borjar med ett samtal. Vi lyssnar pa dina onskemal, diskuterar tidsramar och ger dig en forsta bild av marknadslaget och forvantat pris.",
  },
  {
    icon: ClipboardCheck,
    title: "2. Vardering",
    description:
      "Vi genomfor en professionell vardering av din fastighet. For skog innefattar detta inventering av virkesforrad, bonitet och arlig tillvaxt. For jordbruk utvar vi jordbeskaffenhet och arrendevillkor.",
  },
  {
    icon: Camera,
    title: "3. Marknadsforingsmaterial",
    description:
      "Vi skapar ett professionellt prospekt med fotografering, dronfoto, kartor och detaljerad fastighetsbeskrivning. Allt presenteras pa ett satt som attraherar ratt kopare.",
  },
  {
    icon: Megaphone,
    title: "4. Marknadsforing",
    description:
      "Din fastighet presenteras via vara kanaler, branschntverk och riktade kontakter. Vi nar bade privata kopare och institutionella investerare.",
  },
  {
    icon: Gavel,
    title: "5. Forsaljning och overlatelse",
    description:
      "Vi hanterar budgivning, forhandling och avtalsskrivning. Fran kontrakt till tilltrade saker vi en trygg och professionell process.",
  },
];

export default function HurManSaljerPage() {
  return (
    <>
      <Header />
      <main>
        <PageHeader
          title="Hur man saljer"
          subtitle="Professionell formedling som maximerar vardet pa din fastighet."
          label="Saljguide"
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
                Varfor valja Nordmark?
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
                {[
                  {
                    title: "Djup marknadskanneddom",
                    text: "Vi har arbetat med mark- och skogsfastigheter i over 25 ar och har ett unikt natverk av kopare och saljare.",
                  },
                  {
                    title: "Professionell vardering",
                    text: "Var varderingsmetodik baseras pa aktuella marknadsdata, skogsbruksplaner och detaljerade analyser.",
                  },
                  {
                    title: "Rikstackande natverk",
                    text: "Vi verkar over hela Sverige och har kontakter med bade privata och institutionella investerare.",
                  },
                  {
                    title: "Helhetssservice",
                    text: "Fran vardering och juridik till marknadsforing och forhandling. Vi hanterar allt.",
                  },
                ].map((item) => (
                  <div
                    key={item.title}
                    className="border-l-2 border-brand-300 pl-6"
                  >
                    <h3 className="font-display text-lg text-charcoal mb-2">
                      {item.title}
                    </h3>
                    <p className="text-sm text-stone-500 font-body leading-relaxed">
                      {item.text}
                    </p>
                  </div>
                ))}
              </div>
              <a
                href="#proposal-form"
                className="btn-primary inline-flex items-center"
              >
                Skicka saljforfragan
                <ArrowRight size={16} className="ml-2" />
              </a>
            </div>
          </div>
        </section>

        <ProposalForm type="SELLER" />
      </main>
      <Footer />
    </>
  );
}
