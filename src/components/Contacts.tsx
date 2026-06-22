import { Clock, Mail, MapPin, Navigation, Phone } from "lucide-react";
import { SITE } from "@/lib/data";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function Contacts() {
  return (
    <section id="contacts" className="py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <SectionHeading
          label="Контакты"
          title="Приезжайте или свяжитесь с нами"
          description="Мы находимся в 5 минутах от метро «Автозаводская». Удобная парковка для клиентов на территории сервиса."
          light
        />

        <div className="grid gap-8 lg:grid-cols-2">
          <div className="space-y-4">
            {[
              {
                icon: MapPin,
                label: "Адрес",
                value: SITE.address,
              },
              {
                icon: Phone,
                label: "Телефон",
                value: SITE.phone,
                href: SITE.phoneHref,
              },
              {
                icon: Mail,
                label: "Email",
                value: SITE.email,
                href: `mailto:${SITE.email}`,
              },
              {
                icon: Clock,
                label: "Режим работы",
                value: SITE.hours,
              },
            ].map((item) => (
              <div
                key={item.label}
                className="group flex items-start gap-4 rounded-2xl border border-white/10 bg-graphite-light p-5 transition-all duration-200 hover:border-accent/30"
              >
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-accent/15 text-accent transition-colors duration-200 group-hover:bg-accent group-hover:text-white">
                  <item.icon className="h-5 w-5" aria-hidden />
                </div>
                <div>
                  <p className="text-sm text-zinc-500">{item.label}</p>
                  {item.href ? (
                    <a
                      href={item.href}
                      className="mt-0.5 block font-medium text-white transition-colors duration-200 hover:text-accent"
                    >
                      {item.value}
                    </a>
                  ) : (
                    <p className="mt-0.5 font-medium text-white">{item.value}</p>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="overflow-hidden rounded-2xl border border-white/10">
            <div className="relative aspect-[4/3] bg-graphite-light lg:aspect-auto lg:min-h-[320px]">
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-gradient-to-br from-zinc-800 to-graphite">
                <Navigation className="h-10 w-10 text-accent" aria-hidden />
                <p className="text-sm font-medium text-zinc-300">
                  Как нас найти
                </p>
                <p className="max-w-xs text-center text-xs text-zinc-500">
                  {SITE.address}
                </p>
                <a
                  href="https://yandex.ru/maps"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 rounded-lg border border-white/20 px-4 py-2 text-xs text-zinc-300 transition-colors duration-200 hover:border-accent hover:text-accent"
                >
                  Открыть в Яндекс.Картах
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
