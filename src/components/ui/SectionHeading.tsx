type SectionHeadingProps = {
  label: string;
  title: string;
  description?: string;
  light?: boolean;
};

export function SectionHeading({
  label,
  title,
  description,
  light = false,
}: SectionHeadingProps) {
  return (
    <div className="mx-auto mb-12 max-w-2xl text-center md:mb-16">
      <span className="mb-3 inline-block text-sm font-semibold uppercase tracking-widest text-accent">
        {label}
      </span>
      <h2
        className={`text-3xl font-bold tracking-tight md:text-4xl ${
          light ? "text-white" : "text-zinc-900"
        }`}
      >
        {title}
      </h2>
      {description && (
        <p
          className={`mt-4 text-base leading-relaxed md:text-lg ${
            light ? "text-zinc-300" : "text-zinc-600"
          }`}
        >
          {description}
        </p>
      )}
    </div>
  );
}
