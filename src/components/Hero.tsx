import { ArrowRight, Calendar, Phone, ShieldCheck, Star } from "lucide-react";
import { SITE } from "@/lib/data";

const SCHEDULE = [
  { service: "Диагностика ходовой", time: "45 мин" },
  { service: "Замена масла", time: "1 ч" },
  { service: "Шиномонтаж", time: "40 мин" },
] as const;

export function Hero() {
  return (
    <section className="relative overflow-hidden pt-28 pb-20 md:pt-36 md:pb-28">
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(249,115,22,0.15)_0%,_transparent_50%)]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -left-32 top-1/2 h-96 w-96 rounded-full bg-accent/5 blur-3xl"
        aria-hidden
      />

      <div className="relative mx-auto max-w-7xl px-4 md:px-6">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-sm text-zinc-300">
              <Star className="h-4 w-4 fill-accent text-accent" aria-hidden />
              <span>Более 3 000 довольных клиентов с 2016 года</span>
            </div>

            <h1 className="text-4xl font-bold leading-tight tracking-tight text-white md:text-5xl lg:text-[3.25rem] lg:leading-[1.15]">
              Профессиональный ремонт и обслуживание автомобилей
            </h1>

            <p className="mt-6 max-w-xl text-lg leading-relaxed text-zinc-400 md:text-xl">
              Диагностика, шиномонтаж, ТО и ремонт с гарантией качества
            </p>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <a
                href="#booking"
                className="group inline-flex items-center justify-center gap-2 rounded-xl bg-accent px-8 py-4 text-base font-semibold text-white transition-all duration-200 hover:bg-accent-hover hover:shadow-xl hover:shadow-accent/30"
              >
                Записаться
                <ArrowRight className="h-5 w-5 transition-transform duration-200 group-hover:translate-x-1" />
              </a>
              <a
                href={SITE.phoneHref}
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/5 px-8 py-4 text-base font-semibold text-white transition-all duration-200 hover:border-accent/50 hover:bg-white/10"
              >
                <Phone className="h-5 w-5" aria-hidden />
                Позвонить
              </a>
            </div>

            <div className="mt-12 flex flex-wrap gap-6 text-sm text-zinc-400">
              <span className="flex items-center gap-2">
                <ShieldCheck className="h-5 w-5 text-accent" aria-hidden />
                Гарантия до 12 месяцев
              </span>
              <span className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-accent" aria-hidden />
                Запись без очереди
              </span>
            </div>
          </div>

          <div className="relative hidden lg:block">
            <div className="overflow-hidden rounded-2xl border border-white/10 bg-graphite-light shadow-2xl shadow-black/40">
              <div className="flex min-h-[380px] flex-col p-8">
                <div className="flex items-center justify-between gap-4 border-b border-white/10 pb-6">
                  <span className="shrink-0 rounded-lg bg-accent/20 px-3 py-1.5 text-xs font-medium text-accent">
                    Свободно 4 поста
                  </span>
                  <span className="text-right text-xs text-zinc-500">
                    Обновлено сегодня
                  </span>
                </div>

                <div className="mt-6 space-y-3">
                  {SCHEDULE.map((item) => (
                    <div
                      key={item.service}
                      className="flex items-center justify-between gap-4 rounded-lg border border-white/5 bg-white/5 px-4 py-3.5"
                    >
                      <div className="min-w-0">
                        <p className="truncate text-sm font-medium text-zinc-200">
                          {item.service}
                        </p>
                        <p className="text-xs text-zinc-500">{item.time}</p>
                      </div>
                      <span className="h-2.5 w-2.5 shrink-0 rounded-full bg-emerald-500" />
                    </div>
                  ))}
                </div>

                <div className="mt-auto flex items-end justify-between gap-4 pt-8">
                  <div className="rounded-xl border border-white/10 bg-card px-5 py-4 shadow-lg">
                    <p className="text-2xl font-bold leading-none text-zinc-900">
                      4.9
                    </p>
                    <p className="mt-1 text-xs text-zinc-500">
                      Средняя оценка клиентов
                    </p>
                  </div>
                  <p className="max-w-[140px] text-right text-xs leading-relaxed text-zinc-500">
                    Ближайшее окно — сегодня после 14:00
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
