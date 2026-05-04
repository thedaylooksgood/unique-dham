import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import EventsCarousel from "@/components/events/EventsCarousel";
import { constructMetadata } from "@/lib/seo-metadata";

export const metadata = constructMetadata({
  title: "Spiritual Events in Darjeeling",
  description: "Join our upcoming spiritual events, festivals, and sacred gatherings at Maa Unique Dham, Darjeeling. Experience the grace of the Divine Mother.",
});

export default function TempleEventsPage() {
    return (
        <>
            <Navbar />
            <main className="min-h-screen bg-ivory overflow-x-hidden">
                <EventsCarousel />
            </main>
            <Footer />
        </>
    );
}