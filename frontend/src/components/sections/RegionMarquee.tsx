"use client";

const regions = [
  "Junsele",
  "Sollefteå",
  "Hällviken",
  "Backe",
  "Gafsele",
  "Åsele",
  "Västernorrland",
  "Jämtland",
  "Västerbotten",
];

export default function RegionMarquee() {
  const items = [...regions, ...regions];

  return (
    <section className="py-4 bg-brand-900 border-y border-brand-800/80 overflow-hidden">
      <div className="flex animate-marquee motion-reduce:animate-none whitespace-nowrap">
        {items.map((region, i) => (
          <span
            key={`${region}-${i}`}
            className="inline-flex items-center mx-10 text-stone-500 font-body text-xs font-semibold tracking-[0.18em] uppercase"
          >
            <span className="w-1 h-1 rounded-full bg-accent mr-4" />
            {region}
          </span>
        ))}
      </div>
    </section>
  );
}
