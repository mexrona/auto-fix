import {
  CarFront,
  CircleDot,
  Cpu,
  Droplets,
  Search,
  Wrench,
  type LucideIcon,
} from "lucide-react";
import { SERVICES } from "@/lib/data";
import { SectionHeading } from "@/components/ui/SectionHeading";

const ICONS: Record<(typeof SERVICES)[number]["icon"], LucideIcon> = {
  wrench: Wrench,
  search: Search,
  "circle-dot": CircleDot,
  "car-front": CarFront,
  droplets: Droplets,
  cpu: Cpu,
};

export function Services() {
  return (
    <section id="services" className="py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <SectionHeading
          label="Услуги"
          title="Полный спектр работ для вашего автомобиля"
          description="От планового обслуживания до сложного ремонта — выполняем работы на современном оборудовании с соблюдением регламентов."
          light
        />

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((service) => {
            const Icon = ICONS[service.icon];
            return (
              <article
                key={service.title}
                className="group rounded-2xl border border-white/10 bg-graphite-light p-6 transition-all duration-200 hover:-translate-y-1 hover:border-accent/30 hover:shadow-lg hover:shadow-accent/10"
              >
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-lg bg-accent/15 text-accent transition-colors duration-200 group-hover:bg-accent group-hover:text-white">
                  <Icon className="h-5 w-5" aria-hidden />
                </div>
                <h3 className="text-lg font-semibold text-white">
                  {service.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-zinc-400">
                  {service.description}
                </p>
                <a
                  href="#booking"
                  className="mt-4 inline-block text-sm font-medium text-accent transition-colors duration-200 hover:text-accent-hover"
                >
                  Записаться →
                </a>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
