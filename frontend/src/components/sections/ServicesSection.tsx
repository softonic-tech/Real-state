import { TreePine, Landmark, Scale, TrendingUp } from "lucide-react";

const services = [
  {
    icon: TreePine,
    title: "Skogsfastigheter",
    description:
      "Expertformedling av skogsmark med noggrann vardering av virkesforrad, tillvaxt och avkastningspotential.",
  },
  {
    icon: Landmark,
    title: "Jordbruksfastigheter",
    description:
      "Specialiserad formedling av lantbruksfastigheter med fokus pa jordbeskaffenhet, arrendeforhallanden och driftsekonomi.",
  },
  {
    icon: Scale,
    title: "Juridisk radgivning",
    description:
      "Kvalificerad radgivning kring fastighetsratt, skattefragor och avtalsskrivning vid kop och forsaljning.",
  },
  {
    icon: TrendingUp,
    title: "Investeringsanalys",
    description:
      "Strategisk radgivning for privatpersoner och institutionella investerare som soker mark- och skogstillgangar.",
  },
];

export default function ServicesSection() {
  return (
    <section className="bg-white py-24">
      <div className="section-padding page-container">
        <div className="text-center mb-16">
          <span className="text-brand-600 font-body text-xs tracking-[0.3em] uppercase block mb-3">
            Vara tjanster
          </span>
          <h2 className="text-display-md text-charcoal mb-4">
            Helhetslasning for fastighetsaffarer
          </h2>
          <p className="text-stone-500 font-body max-w-xl mx-auto">
            Vi erbjuder en komplett uppsattning av tjanster for den som vill
            kopa, salja eller investera i mark- och skogsfastigheter.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service) => (
            <div key={service.title} className="group text-center p-8">
              <div className="w-14 h-14 mx-auto mb-6 bg-brand-50 flex items-center justify-center transition-colors group-hover:bg-brand-100">
                <service.icon
                  size={24}
                  className="text-brand-700"
                  strokeWidth={1.5}
                />
              </div>
              <h3 className="font-display text-xl text-charcoal mb-3">
                {service.title}
              </h3>
              <p className="text-sm text-stone-500 font-body leading-relaxed">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
