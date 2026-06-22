import {
  BadgeRussianRuble,
  CalendarCheck,
  Shield,
  Users,
  type LucideIcon,
} from "lucide-react";
import { BENEFITS } from "@/lib/data";
import { SectionHeading } from "@/components/ui/SectionHeading";

const ICONS: Record<(typeof BENEFITS)[number]["icon"], LucideIcon> = {
  users: Users,
  shield: Shield,
  "badge-russian-ruble": BadgeRussianRuble,
  "calendar-check": CalendarCheck,
};

export function Benefits() {
  return (
    <section className="py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <div className="rounded-3xl bg-card px-6 py-14 shadow-xl shadow-black/10 md:px-12 md:py-16">
          <SectionHeading
            label="Почему AutoFix"
            title="Надёжный сервис, которому доверяют"
            description="Мы строим долгосрочные отношения с клиентами через прозрачность, качество и уважение к вашему времени."
          />

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {BENEFITS.map((benefit) => {
              const Icon = ICONS[benefit.icon];
              return (
                <article
                  key={benefit.title}
                  className="group rounded-2xl border border-zinc-100 bg-zinc-50/80 p-6 transition-all duration-200 hover:-translate-y-1 hover:border-accent/20 hover:shadow-lg hover:shadow-accent/5"
                >
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10 text-accent transition-colors duration-200 group-hover:bg-accent group-hover:text-white">
                    <Icon className="h-6 w-6" aria-hidden />
                  </div>
                  <h3 className="text-lg font-semibold text-zinc-900">
                    {benefit.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-zinc-600">
                    {benefit.description}
                  </p>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
