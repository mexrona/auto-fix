import { Quote, Star } from "lucide-react";
import { REVIEWS } from "@/lib/data";
import { SectionHeading } from "@/components/ui/SectionHeading";

function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex gap-1" aria-label={`Оценка ${rating} из 5`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`h-4 w-4 ${
            i < rating
              ? "fill-accent text-accent"
              : "fill-zinc-200 text-zinc-200"
          }`}
          aria-hidden
        />
      ))}
    </div>
  );
}

export function Reviews() {
  return (
    <section id="reviews" className="py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <div className="rounded-3xl bg-card px-6 py-14 shadow-xl shadow-black/10 md:px-12 md:py-16">
          <SectionHeading
            label="Отзывы"
            title="Что говорят наши клиенты"
            description="Реальные впечатления владельцев автомобилей, которые уже воспользовались услугами AutoFix."
          />

          <div className="grid gap-6 sm:grid-cols-2">
            {REVIEWS.map((review) => (
              <article
                key={review.name}
                className="group flex flex-col rounded-2xl border border-zinc-100 bg-zinc-50/50 p-6 transition-all duration-200 hover:-translate-y-1 hover:border-accent/20 hover:shadow-lg"
              >
                <Quote
                  className="mb-4 h-8 w-8 text-accent/30 transition-colors duration-200 group-hover:text-accent/50"
                  aria-hidden
                />
                <p className="flex-1 text-sm leading-relaxed text-zinc-600">
                  &ldquo;{review.text}&rdquo;
                </p>
                <div className="mt-6 border-t border-zinc-100 pt-4">
                  <Stars rating={review.rating} />
                  <p className="mt-2 font-semibold text-zinc-900">{review.name}</p>
                  <p className="text-xs text-zinc-500">{review.car}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
