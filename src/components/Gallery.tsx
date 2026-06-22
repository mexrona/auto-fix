import Image from "next/image";
import { GALLERY } from "@/lib/data";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function Gallery() {
  return (
    <section id="gallery" className="py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <SectionHeading
          label="Галерея"
          title="Наш сервис изнутри"
          description="Современное оборудование, чистые рабочие зоны и внимание к деталям на каждом этапе обслуживания."
          light
        />

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {GALLERY.map((image, index) => (
            <figure
              key={image.src}
              className={`group relative overflow-hidden rounded-2xl border border-white/10 ${
                index === 0 ? "sm:col-span-2 sm:row-span-1 lg:col-span-2" : ""
              }`}
            >
              <div
                className={`relative overflow-hidden ${
                  index === 0 ? "aspect-[2/1]" : "aspect-[4/3]"
                }`}
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                <figcaption className="absolute bottom-0 left-0 right-0 translate-y-full p-4 text-sm text-white transition-transform duration-300 group-hover:translate-y-0">
                  {image.alt}
                </figcaption>
              </div>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
