import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ChatWidget } from "@/components/chat/ChatWidget";
import { SITE } from "@/lib/data";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin", "cyrillic"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: `${SITE.name} — автосервис в Москве | Ремонт и обслуживание`,
    template: `%s | ${SITE.name}`,
  },
  description:
    "Профессиональный ремонт и обслуживание автомобилей в Москве. Диагностика, шиномонтаж, ТО и ремонт с гарантией качества. Онлайн-запись на удобное время.",
  keywords: [
    "автосервис",
    "ремонт автомобилей",
    "техническое обслуживание",
    "диагностика авто",
    "шиномонтаж",
    "AutoFix",
    "Москва",
  ],
  openGraph: {
    title: `${SITE.name} — профессиональный автосервис`,
    description:
      "Диагностика, шиномонтаж, ТО и ремонт с гарантией качества. Запишитесь онлайн или позвоните нам.",
    locale: "ru_RU",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "AutoRepair",
  name: SITE.name,
  description:
    "Профессиональный ремонт и обслуживание автомобилей. Диагностика, шиномонтаж, ТО и ремонт с гарантией качества.",
  telephone: SITE.phone,
  email: SITE.email,
  address: {
    "@type": "PostalAddress",
    streetAddress: "ул. Автомобильная, д. 15, корп. 2",
    addressLocality: "Москва",
    addressCountry: "RU",
  },
  openingHours: ["Mo-Sa 09:00-20:00", "Su 10:00-18:00"],
  priceRange: "₽₽",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ru"
      className={`${geistSans.variable} ${geistMono.variable} h-full scroll-smooth antialiased`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-graphite text-foreground">
        {children}
        <ChatWidget />
      </body>
    </html>
  );
}
