import { Benefits } from "@/components/Benefits";
import { BookingForm } from "@/components/BookingForm";
import { Contacts } from "@/components/Contacts";
import { Footer } from "@/components/Footer";
import { Gallery } from "@/components/Gallery";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Prices } from "@/components/Prices";
import { Process } from "@/components/Process";
import { Reviews } from "@/components/Reviews";
import { Services } from "@/components/Services";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Benefits />
        <Services />
        <Prices />
        <Gallery />
        <Reviews />
        <Process />
        <BookingForm />
        <Contacts />
      </main>
      <Footer />
    </>
  );
}
