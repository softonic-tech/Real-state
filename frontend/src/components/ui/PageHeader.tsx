import SectionLabel from "@/components/ui/SectionLabel";

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  label?: string;
}

export default function PageHeader({ title, subtitle, label }: PageHeaderProps) {
  return (
    <section className="relative bg-brand-950 pt-32 pb-16 md:pt-36 md:pb-20 overflow-hidden">
      <div className="absolute inset-0 grain-overlay opacity-30" />
      <div className="absolute top-0 right-0 w-96 h-96 bg-accent/8 rounded-full blur-[100px]" />
      <div className="absolute -bottom-20 -left-20 w-72 h-72 bg-brand-800/20 rounded-full blur-[80px]" />
      <div className="relative section-padding page-container">
        {label && <SectionLabel light>{label}</SectionLabel>}
        <h1 className="text-display-md md:text-display-lg text-white mb-4 text-balance">
          {title}
        </h1>
        {subtitle && (
          <p className="text-stone-400 font-body text-lg max-w-2xl leading-relaxed">
            {subtitle}
          </p>
        )}
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
    </section>
  );
}
