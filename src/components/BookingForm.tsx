"use client";

import { CheckCircle2, Send } from "lucide-react";
import { FormEvent, useState } from "react";
import { BOOKING_SERVICES } from "@/lib/data";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function BookingForm() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <section id="booking" className="py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <div className="rounded-3xl bg-card px-6 py-14 shadow-xl shadow-black/10 md:px-12 md:py-16">
          <SectionHeading
            label="Онлайн-запись"
            title="Запишитесь на обслуживание"
            description="Заполните форму — менеджер свяжется с вами в течение 15 минут в рабочее время для подтверждения записи."
          />

          {submitted ? (
            <div className="mx-auto max-w-lg rounded-2xl border border-emerald-200 bg-emerald-50 p-8 text-center">
              <CheckCircle2 className="mx-auto h-12 w-12 text-emerald-500" />
              <h3 className="mt-4 text-xl font-semibold text-zinc-900">
                Заявка отправлена
              </h3>
              <p className="mt-2 text-sm text-zinc-600">
                Спасибо! Мы перезвоним вам в ближайшее время для подтверждения
                даты и времени визита.
              </p>
              <button
                type="button"
                onClick={() => setSubmitted(false)}
                className="mt-6 text-sm font-medium text-accent transition-colors hover:text-accent-hover"
              >
                Отправить ещё одну заявку
              </button>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="mx-auto grid max-w-2xl gap-5 sm:grid-cols-2"
            >
              <div>
                <label
                  htmlFor="name"
                  className="mb-1.5 block text-sm font-medium text-zinc-700"
                >
                  Имя
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  placeholder="Александр"
                  className="w-full rounded-xl border border-zinc-200 bg-white px-4 py-3 text-sm text-zinc-900 outline-none transition-all duration-200 placeholder:text-zinc-400 focus:border-accent focus:ring-2 focus:ring-accent/20"
                />
              </div>

              <div>
                <label
                  htmlFor="phone"
                  className="mb-1.5 block text-sm font-medium text-zinc-700"
                >
                  Телефон
                </label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  required
                  placeholder="+7 (___) ___-__-__"
                  className="w-full rounded-xl border border-zinc-200 bg-white px-4 py-3 text-sm text-zinc-900 outline-none transition-all duration-200 placeholder:text-zinc-400 focus:border-accent focus:ring-2 focus:ring-accent/20"
                />
              </div>

              <div>
                <label
                  htmlFor="car"
                  className="mb-1.5 block text-sm font-medium text-zinc-700"
                >
                  Марка автомобиля
                </label>
                <input
                  id="car"
                  name="car"
                  type="text"
                  required
                  placeholder="Toyota Camry"
                  className="w-full rounded-xl border border-zinc-200 bg-white px-4 py-3 text-sm text-zinc-900 outline-none transition-all duration-200 placeholder:text-zinc-400 focus:border-accent focus:ring-2 focus:ring-accent/20"
                />
              </div>

              <div>
                <label
                  htmlFor="service"
                  className="mb-1.5 block text-sm font-medium text-zinc-700"
                >
                  Услуга
                </label>
                <select
                  id="service"
                  name="service"
                  required
                  className="w-full rounded-xl border border-zinc-200 bg-white px-4 py-3 text-sm text-zinc-900 outline-none transition-all duration-200 focus:border-accent focus:ring-2 focus:ring-accent/20"
                  defaultValue=""
                >
                  <option value="" disabled>
                    Выберите услугу
                  </option>
                  {BOOKING_SERVICES.map((service) => (
                    <option key={service} value={service}>
                      {service}
                    </option>
                  ))}
                </select>
              </div>

              <div className="sm:col-span-2">
                <label
                  htmlFor="comment"
                  className="mb-1.5 block text-sm font-medium text-zinc-700"
                >
                  Комментарий
                </label>
                <textarea
                  id="comment"
                  name="comment"
                  rows={4}
                  placeholder="Опишите симптомы, желаемую дату визита или дополнительные пожелания"
                  className="w-full resize-none rounded-xl border border-zinc-200 bg-white px-4 py-3 text-sm text-zinc-900 outline-none transition-all duration-200 placeholder:text-zinc-400 focus:border-accent focus:ring-2 focus:ring-accent/20"
                />
              </div>

              <div className="sm:col-span-2">
                <button
                  type="submit"
                  className="group inline-flex w-full items-center justify-center gap-2 rounded-xl bg-accent px-8 py-4 text-base font-semibold text-white transition-all duration-200 hover:bg-accent-hover hover:shadow-lg hover:shadow-accent/25 sm:w-auto"
                >
                  <Send className="h-5 w-5 transition-transform duration-200 group-hover:translate-x-0.5" />
                  Записаться
                </button>
                <p className="mt-3 text-xs text-zinc-500">
                  Нажимая кнопку, вы соглашаетесь на обработку персональных
                  данных для организации записи.
                </p>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
