import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import PujaBookingClient from "@/components/puja-booking/PujaBookingClient"; 
import { constructMetadata } from "@/lib/seo-metadata";

export const metadata = constructMetadata({
  title: "Online Puja Booking in Darjeeling",
  description: "Book authentic Vedic rituals and personalized pujas at Maa Unique Dham. Connect with divine energy through sacred offerings.",
});

export default function PujaBookingPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-ivory overflow-x-hidden">
        <PujaBookingClient />
      </main>
      <Footer />
    </>
  );
}