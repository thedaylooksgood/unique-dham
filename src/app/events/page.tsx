import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import EventsCarousel from "@/components/events/EventsCarousel";

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