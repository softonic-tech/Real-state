interface PageHeaderProps {
  title: string;
  subtitle?: string;
  label?: string;
}

export default function PageHeader({ title, subtitle, label }: PageHeaderProps) {
  return (
    <section className="bg-brand-950 pt-36 pb-20">
      <div className="section-padding page-container">
        {label && (
          <span className="text-brand-400 font-body text-xs tracking-[0.3em] uppercase block mb-3">
            {label}
          </span>
        )}
        <h1 className="text-display-md md:text-display-lg text-white mb-4">
          {title}
        </h1>
        {subtitle && (
          <p className="text-stone-400 font-body text-lg max-w-xl">
            {subtitle}
          </p>
        )}
      </div>
    </section>
  );
}
