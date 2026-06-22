import { PROCESS_STEPS } from "@/lib/data";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function Process() {
  return (
    <section id="process" className="py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <SectionHeading
          label="Процесс"
          title="Как проходит обслуживание"
          description="Понятный и прозрачный путь от записи до получения автомобиля — без лишних визитов и неожиданностей."
          light
        />

        <div className="relative">
          <div
            className="absolute left-6 top-0 hidden h-full w-px bg-gradient-to-b from-accent/50 via-accent/20 to-transparent md:left-1/2 md:block md:-translate-x-px"
            aria-hidden
          />

          <ol className="space-y-8">
            {PROCESS_STEPS.map((step, index) => (
              <li
                key={step.step}
                className={`relative flex flex-col gap-4 md:flex-row md:items-center ${
                  index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                }`}
              >
                <div
                  className={`flex-1 ${
                    index % 2 === 0 ? "md:text-right" : "md:text-left"
                  }`}
                >
                  <article
                    className={`group inline-block w-full max-w-md rounded-2xl border border-white/10 bg-graphite-light p-6 transition-all duration-200 hover:-translate-y-1 hover:border-accent/30 hover:shadow-lg hover:shadow-accent/10 ${
                      index % 2 === 0 ? "md:ml-auto" : "md:mr-auto"
                    }`}
                  >
                    <span className="text-xs font-semibold uppercase tracking-widest text-accent">
                      Шаг {step.step}
                    </span>
                    <h3 className="mt-2 text-xl font-semibold text-white">
                      {step.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-zinc-400">
                      {step.description}
                    </p>
                  </article>
                </div>

                <div className="relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-2 border-accent bg-graphite text-sm font-bold text-accent shadow-lg shadow-accent/20 md:absolute md:left-1/2 md:-translate-x-1/2">
                  {step.step}
                </div>

                <div className="hidden flex-1 md:block" aria-hidden />
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
