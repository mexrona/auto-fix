import { PRICES } from "@/lib/data";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function Prices() {
  return (
    <section id="prices" className="py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <div className="rounded-3xl bg-card px-6 py-14 shadow-xl shadow-black/10 md:px-12 md:py-16">
          <SectionHeading
            label="Цены"
            title="Популярные услуги и ориентировочная стоимость"
            description="Точная цена зависит от марки автомобиля и объёма работ. Финальную смету согласуем после диагностики."
          />

          <div className="overflow-hidden rounded-2xl border border-zinc-200">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[480px] text-left">
                <thead>
                  <tr className="border-b border-zinc-200 bg-zinc-50">
                    <th
                      scope="col"
                      className="px-6 py-4 text-sm font-semibold text-zinc-900"
                    >
                      Услуга
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-4 text-right text-sm font-semibold text-zinc-900"
                    >
                      Стоимость
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {PRICES.map((row, index) => (
                    <tr
                      key={row.service}
                      className={`border-b border-zinc-100 transition-colors duration-150 hover:bg-accent/5 ${
                        index === PRICES.length - 1 ? "border-b-0" : ""
                      }`}
                    >
                      <td className="px-6 py-4 text-sm text-zinc-700">
                        {row.service}
                      </td>
                      <td className="px-6 py-4 text-right text-sm font-semibold text-accent">
                        {row.price}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <p className="mt-6 text-center text-sm text-zinc-500">
            * Цены указаны без учёта стоимости запчастей. Действует программа
            лояльности для постоянных клиентов.
          </p>
        </div>
      </div>
    </section>
  );
}
