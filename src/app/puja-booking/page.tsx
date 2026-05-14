import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import PujaBookingClient from "@/components/puja-booking/PujaBookingClient"; 
import { constructMetadata } from "@/lib/seo-metadata";
import { supabase } from "@/lib/supabase";

export const metadata = constructMetadata({
  title: "Online Puja Booking in Darjeeling",
  description: "Book authentic Vedic rituals and personalized pujas at Maa Unique Dham. Connect with divine energy through sacred offerings.",
});

export const revalidate = 60;

async function getPujas() {
  const { data, error } = await supabase
    .from('pujas')
    .select('*')
    .order('created_at', { ascending: true });
  
  if (error) {
    console.error('Error fetching pujas:', error);
    return [];
  }
  return data;
}

export default async function PujaBookingPage() {
  const pujas = await getPujas();

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-ivory overflow-x-hidden">
        <PujaBookingClient initialPujas={pujas} />
      </main>
      <Footer />
    </>
  );
}