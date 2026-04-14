import { Navbar } from "@/components/layout/Navbar";
import { HeroSection } from "@/components/home/HeroSection";
import { MantraBandSection } from "@/components/home/MantraBandSection";
import { IntroSection } from "@/components/home/IntroSection";
import { MahantSection } from "@/components/home/MahantSection";
import { TraditionSection } from "@/components/home/TraditionSection";
import { NavaDurgaSection } from "@/components/home/NavaDurgaSection";
import { ServicesSection } from "@/components/home/ServicesSection";
import { PhilosophySection } from "@/components/home/PhilosophySection";
import { MissionSection } from "@/components/home/MissionSection";
import { DevoteeSection } from "@/components/home/DevoteeSection";
import { InvocationSection } from "@/components/home/InvocationSection";
import { Footer } from "@/components/layout/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="overflow-x-hidden">
        <HeroSection />
        <MantraBandSection />
        <IntroSection />
        <MahantSection />
        <TraditionSection />
        <NavaDurgaSection />
        <ServicesSection />
        <PhilosophySection />
        <MissionSection />
        <DevoteeSection />
        <InvocationSection />
      </main>
      <Footer />
    </>
  );
}