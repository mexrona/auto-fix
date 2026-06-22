"use client";

import { Menu, Phone, X, Wrench } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { NAV_LINKS, SITE } from "@/lib/data";

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "border-b border-white/10 bg-graphite/95 shadow-lg shadow-black/20 backdrop-blur-md"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 md:px-6">
        <Link href="/" className="group flex items-center gap-2.5">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent text-white transition-transform duration-200 group-hover:scale-105">
            <Wrench className="h-5 w-5" aria-hidden />
          </span>
          <div>
            <span className="block text-lg font-bold tracking-tight text-white">
              {SITE.name}
            </span>
            <span className="hidden text-xs text-zinc-400 sm:block">
              Автосервис полного цикла
            </span>
          </div>
        </Link>

        <nav className="hidden items-center gap-8 lg:flex" aria-label="Основная навигация">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-zinc-300 transition-colors duration-200 hover:text-accent"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <a
            href={SITE.phoneHref}
            className="flex items-center gap-2 text-sm font-medium text-white transition-colors duration-200 hover:text-accent"
          >
            <Phone className="h-4 w-4" aria-hidden />
            {SITE.phone}
          </a>
          <a
            href="#booking"
            className="rounded-lg bg-accent px-5 py-2.5 text-sm font-semibold text-white transition-all duration-200 hover:bg-accent-hover hover:shadow-lg hover:shadow-accent/25"
          >
            Записаться
          </a>
        </div>

        <button
          type="button"
          className="rounded-lg p-2 text-white transition-colors hover:bg-white/10 lg:hidden"
          onClick={() => setOpen(!open)}
          aria-expanded={open}
          aria-label={open ? "Закрыть меню" : "Открыть меню"}
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {open && (
        <div className="border-t border-white/10 bg-graphite px-4 py-6 lg:hidden">
          <nav className="flex flex-col gap-4" aria-label="Мобильная навигация">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-base text-zinc-200 transition-colors hover:text-accent"
                onClick={() => setOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <a
              href={SITE.phoneHref}
              className="flex items-center gap-2 pt-2 text-base font-medium text-white"
            >
              <Phone className="h-4 w-4" aria-hidden />
              {SITE.phone}
            </a>
            <a
              href="#booking"
              className="mt-2 rounded-lg bg-accent px-5 py-3 text-center text-sm font-semibold text-white"
              onClick={() => setOpen(false)}
            >
              Записаться
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
