"use client";

import {
  PhoneCall,
  ClipboardCheck,
  Camera,
  Megaphone,
  Gavel,
  ArrowRight,
} from "lucide-react";
import GuideTimeline from "@/components/ui/GuideTimeline";
import SectionLabel from "@/components/ui/SectionLabel";
import ProposalForm from "@/components/forms/ProposalForm";

const steps = [
  {
    icon: PhoneCall,
    step: "01",
    title: "Första kontakten",
    description:
      "Allt börjar med ett samtal. Vi lyssnar på dina önskemål, diskuterar tidsramar och ger dig en första bild av marknadsläget och förväntat pris.",
  },
  {
    icon: ClipboardCheck,
    step: "02",
    title: "Värdering",
    description:
      "Vi genomför en professionell värdering av din fastighet. För skog innefattar detta inventering av virkesförråd, bonitet och årlig tillväxt. För jordbruk utvärderar vi jordbeskaffenhet och arrendevillkor.",
  },
  {
    icon: Camera,
    step: "03",
    title: "Marknadsföringsmaterial",
    description:
      "Vi skapar ett professionellt prospekt med fotografering, drönfoto, kartor och detaljerad fastighetsbeskrivning. Allt presenteras på ett sätt som attraherar rätt köpare.",
  },
  {
    icon: Megaphone,
    step: "04",
    title: "Marknadsföring",
    description:
      "Din fastighet presenteras via våra kanaler, branschnätverk och riktade kontakter. Vi når både privata köpare och institutionella investerare.",
  },
  {
    icon: Gavel,
    step: "05",
    title: "Försäljning och överlåtelse",
    description:
      "Vi hanterar budgivning, förhandling och avtalsskrivning. Från kontrakt till tillträde säkerställer vi en trygg och professionell process.",
  },
];

const benefits = [
  {
    title: "Djup marknadskännedom",
    text: "Vi har arbetat med mark- och skogsfastigheter i över 25 år och har ett unikt nätverk av köpare och säljare.",
  },
  {
    title: "Professionell värdering",
    text: "Vår värderingsmetodik baseras på aktuella marknadsdata, skogsbruksplaner och detaljerade analyser.",
  },
  {
    title: "Rikstäckande nätverk",
    text: "Vi verkar över hela norra Sverige och har kontakter med både privata och institutionella investerare.",
  },
  {
    title: "Helhetsservice",
    text: "Från värdering och juridik till marknadsföring och förhandling — vi hanterar allt.",
  },
];

export default function SellerGuideContent() {
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
          <div className="max-w-4xl mx-auto">
            <SectionLabel>Varför oss</SectionLabel>
            <h2 className="text-display-sm text-charcoal mb-10 text-balance">
              Varför välja Olofssons Skog & Mäkleri?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-10">
              {benefits.map((item) => (
                <div key={item.title} className="premium-card p-7 md:p-8">
                  <div className="w-1 h-8 bg-accent rounded-full mb-4" />
                  <h3 className="font-display text-lg text-charcoal mb-2 font-semibold">
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
              Skicka säljförfrågan
              <ArrowRight size={16} />
            </a>
          </div>
        </div>
      </section>

      <ProposalForm type="SELLER" />
    </>
  );
}
