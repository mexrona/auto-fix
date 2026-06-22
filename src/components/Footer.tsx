import { Phone, Wrench } from "lucide-react";
import Link from "next/link";
import { NAV_LINKS, SITE } from "@/lib/data";

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-graphite-light">
      <div className="mx-auto max-w-7xl px-4 py-12 md:px-6 md:py-16">
        <div className="grid gap-10 md:grid-cols-3">
          <div>
            <Link href="/" className="flex items-center gap-2.5">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent text-white">
                <Wrench className="h-4 w-4" aria-hidden />
              </span>
              <span className="text-lg font-bold text-white">{SITE.name}</span>
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-zinc-400">
              Профессиональный автосервис в Москве. Диагностика, ремонт и
              обслуживание с гарантией качества и прозрачными ценами.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white">
              Навигация
            </h3>
            <nav className="mt-4 flex flex-col gap-2.5" aria-label="Навигация в подвале">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-sm text-zinc-400 transition-colors duration-200 hover:text-accent"
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white">
              Контакты
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm text-zinc-400">
              <li>{SITE.address}</li>
              <li>
                <a
                  href={SITE.phoneHref}
                  className="inline-flex items-center gap-1.5 transition-colors duration-200 hover:text-accent"
                >
                  <Phone className="h-3.5 w-3.5" aria-hidden />
                  {SITE.phone}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${SITE.email}`}
                  className="transition-colors duration-200 hover:text-accent"
                >
                  {SITE.email}
                </a>
              </li>
              <li>{SITE.hours}</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 text-xs text-zinc-500 sm:flex-row">
          <p>© {SITE.year} {SITE.name}. Все права защищены.</p>
          <p>ИНН 7701234567 · ОГРН 1167746123456</p>
        </div>
      </div>
    </footer>
  );
}
