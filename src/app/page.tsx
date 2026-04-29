import { Navbar } from "@/components/layout/Navbar";
import { HeroSection } from "@/components/home/HeroSection";
import { MantraBandSection } from "@/components/home/MantraBandSection";
import { IntroSection } from "@/components/home/IntroSection";
import { MahantSection } from "@/components/home/MahantSection";
import { DhamFlipAnimation } from "@/components/home/DhamFlipAnimation";
import { CinematicStorySection } from "@/components/home/CinematicStorySection";
import { CultureSection } from "@/components/home/CultureSection";
import { SacredStoreSection } from "@/components/sections/SacredStoreSection";
import { PhilosophySection } from "@/components/home/PhilosophySection";
import { MissionSection } from "@/components/home/MissionSection";
import { DevoteeSection } from "@/components/home/DevoteeSection";
import { GallerySection } from "@/components/home/GallerySection";
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
        <DhamFlipAnimation />
        <CinematicStorySection />
        <CultureSection />
        <SacredStoreSection />
        <PhilosophySection />
        <MissionSection />
        <GallerySection />
        <InvocationSection />
      </main>
      <Footer />
    </>
  );
}
