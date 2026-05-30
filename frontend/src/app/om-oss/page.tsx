import { Metadata } from "next";
import Image from "next/image";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import PageHeader from "@/components/ui/PageHeader";

export const metadata: Metadata = {
  title: "Om oss",
  description:
    "Lar kanna Nordmark Fastigheter - Sveriges ledande specialister pa jord- och skogsfastigheter.",
};

const team = [
  {
    name: "Gustaf Nordmark",
    role: "VD & Grundare",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop",
    description:
      "Over 30 ars erfarenhet av fastighetsformedling med fokus pa skogs- och jordbruksfastigheter.",
  },
  {
    name: "Helena Sjoberg",
    role: "Chefsmaklare",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop",
    description:
      "Specialist pa jordbruksfastigheter i sodra Sverige med bakgrund inom lantbruksekonomi.",
  },
  {
    name: "Lars Eriksson",
    role: "Skogsradgivare",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
    description:
      "Certifierad skogsvarderingsman med djup kompetens inom skogsekonomi och hallbart skogsbruk.",
  },
  {
    name: "Maria Lindqvist",
    role: "Juridisk radgivare",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop",
    description:
      "Specialiserad pa fastighetsratt, nyttjanderatter och skattefragor relaterade till mark och skog.",
  },
];

export default function OmOssPage() {
  return (
    <>
      <Header />
      <main>
        <PageHeader
          title="Om oss"
          subtitle="Tradition, kompetens och engagemang sedan 1998."
          label="Nordmark Fastigheter"
        />

        <section className="section-padding page-container py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <div>
              <h2 className="text-display-sm text-charcoal mb-6">
                Var historia
              </h2>
              <div className="space-y-5 text-stone-600 font-body leading-relaxed">
                <p>
                  Nordmark Fastigheter grundades 1998 av Gustaf Nordmark med en
                  enkel vision: att erbjuda Sveriges markagare och investerare
                  den basta radgivningen och formedlingstjansten for skogs- och
                  jordbruksfastigheter.
                </p>
                <p>
                  Fran var bas i Stockholm har vi vuxit till att bli en av
                  Sveriges mest respekterade aktorer inom segmentet. Vi har
                  formedlat over 500 fastigheter till ett sammanlagt varde
                  overstigande 3 miljarder kronor.
                </p>
                <p>
                  Var framgang bygger pa djup marknadskanneddom, personlig
                  service och en orubblig integritet. Vi ar stolta over att
                  manga av vara klienter aterkommmer gang pa gang.
                </p>
              </div>
            </div>
            <div className="relative aspect-[4/3] bg-stone-100">
              <Image
                src="https://images.unsplash.com/photo-1448375240586-882707db888b?w=800"
                alt="Svensk skog"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </section>

        <section className="bg-white py-24">
          <div className="section-padding page-container">
            <div className="text-center mb-16">
              <span className="text-brand-600 font-body text-xs tracking-[0.3em] uppercase block mb-3">
                Var mission
              </span>
              <h2 className="text-display-md text-charcoal mb-6 max-w-2xl mx-auto">
                Att skapa langssiktigt varde genom ansvarsfull fastighetsformedling
              </h2>
              <p className="text-stone-500 font-body max-w-xl mx-auto">
                Vi tror pa transparent och etisk formedling dar klientens
                basta alltid star i centrum. Var oberoende stallning
                garanterar att vi alltid agerar i ditt intresse.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { value: "25+", label: "Ars erfarenhet" },
                { value: "500+", label: "Formedlade fastigheter" },
                { value: "3 mdr+", label: "Totalt formedlat varde (SEK)" },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="text-center py-10 border border-stone-100"
                >
                  <span className="font-display text-display-sm text-brand-700">
                    {stat.value}
                  </span>
                  <p className="text-stone-500 font-body text-sm mt-2">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="section-padding page-container py-24">
          <div className="text-center mb-16">
            <span className="text-brand-600 font-body text-xs tracking-[0.3em] uppercase block mb-3">
              Vart team
            </span>
            <h2 className="text-display-md text-charcoal">
              Erfarna specialister
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member) => (
              <div key={member.name} className="text-center group">
                <div className="relative w-48 h-48 mx-auto mb-6 bg-stone-100 overflow-hidden">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                  />
                </div>
                <h3 className="font-display text-lg text-charcoal">
                  {member.name}
                </h3>
                <p className="text-brand-600 font-body text-sm mb-3">
                  {member.role}
                </p>
                <p className="text-stone-500 font-body text-sm leading-relaxed">
                  {member.description}
                </p>
              </div>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
