const testimonials = [
  {
    quote:
      "Nordmark guidade oss genom hela processen pa ett professionellt och tryggt satt. Vi kande oss alltid i goda hander.",
    author: "Erik Lindstrom",
    role: "Kopare, Skogsfastighet Dalarna",
  },
  {
    quote:
      "Varderingen var noggrann och realistisk. Forsaljningen gick smidigare an vi nagonsin kunde ha hoppats pa.",
    author: "Anna Berggren",
    role: "Saljare, Jordbruksfastighet Skane",
  },
  {
    quote:
      "Som institutionell investerare uppskattar vi den djupa marknadskunskapen och analytiska approach som Nordmark erbjuder.",
    author: "Magnus Ohlsson",
    role: "Investeringschef, Kapitalforvaltning AB",
  },
];

export default function TestimonialsSection() {
  return (
    <section className="bg-parchment py-24">
      <div className="section-padding page-container">
        <div className="text-center mb-16">
          <span className="text-brand-600 font-body text-xs tracking-[0.3em] uppercase block mb-3">
            Var klienter
          </span>
          <h2 className="text-display-md text-charcoal">
            Vad vara kunder sager
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.author}
              className="bg-white p-8 border border-stone-100"
            >
              <div className="mb-6">
                <svg
                  width="32"
                  height="24"
                  viewBox="0 0 32 24"
                  fill="none"
                  className="text-brand-300"
                >
                  <path
                    d="M0 24V14.4C0 10.4 0.8 7.2 2.4 4.8C4.08 2.4 6.72 0.64 10.32 -0.48L12 2.88C9.84 3.68 8.16 4.88 6.96 6.48C5.84 8.08 5.28 9.92 5.28 12H12V24H0ZM20 24V14.4C20 10.4 20.8 7.2 22.4 4.8C24.08 2.4 26.72 0.64 30.32 -0.48L32 2.88C29.84 3.68 28.16 4.88 26.96 6.48C25.84 8.08 25.28 9.92 25.28 12H32V24H20Z"
                    fill="currentColor"
                  />
                </svg>
              </div>
              <p className="text-stone-600 font-body leading-relaxed mb-6 text-sm">
                {testimonial.quote}
              </p>
              <div className="pt-6 border-t border-stone-100">
                <p className="font-body font-semibold text-charcoal text-sm">
                  {testimonial.author}
                </p>
                <p className="text-stone-400 text-xs font-body mt-0.5">
                  {testimonial.role}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
