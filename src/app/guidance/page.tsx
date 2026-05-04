import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { GuidanceCarousel } from "@/components/guidance/GuidanceSection"; 
import { constructMetadata } from "@/lib/seo-metadata";

export const metadata = constructMetadata({
  title: "Spiritual Guidance in Darjeeling",
  description: "Connect with spiritual masters at Maa Unique Dham for personal astrology readings, sacred counseling, and divine guidance in Darjeeling.",
});

export default function GuidancePage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-ivory">
        <GuidanceCarousel />
      </main>
      <Footer />
    </>
  );
}