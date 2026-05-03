// app/puja-booking/page.tsx (or wherever your page is located)
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import PujaBookingClient from "@/components/puja-booking/PujaBookingClient"; // Adjust path as needed

export default function PujaBookingPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-32 bg-ivory">
        <PujaBookingClient />
      </main>
      <div className="h-20 bg-ivory" />
      <Footer />
    </>
  );
}