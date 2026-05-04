import { Navbar } from "@/components/layout/Navbar";
import { HeroSection } from "@/components/home/HeroSection";
import { MantraBandSection } from "@/components/home/MantraBandSection";
import { IntroSection } from "@/components/home/IntroSection";
import { MahantSection } from "@/components/home/MahantSection";
import { DhamFlipAnimation } from "@/components/home/DhamFlipAnimation";
import { CinematicStorySection } from "@/components/home/CinematicStorySection";
import { CultureSection } from "@/components/home/CultureSection";
import { SacredStoreSection } from "@/components/sections/SacredStoreSection";
import { MissionSection } from "@/components/home/MissionSection";
import { DevoteeSection } from "@/components/home/DevoteeSection";
import { GallerySection } from "@/components/home/GallerySection";
import { InvocationSection } from "@/components/home/InvocationSection";
import { Footer } from "@/components/layout/Footer";

// Server Actions
import { getSequences } from "@/app/actions/getSequences";
import { getGalleryImages } from "@/app/actions/getGalleryImages";

export default async function Home() {
  // Parallel fetching of all required page data
  const [p1, p2, p3, allGalleryImages] = await Promise.all([
    getSequences("part 1"),
    getSequences("part 2"),
    getSequences("part 3"),
    getGalleryImages(),
  ]);

  const sequences = {
    "part 1": p1,
    "part 2": p2,
    "part 3": p3,
  };

  const galleryImages = allGalleryImages.slice(0, 12);

  return (
    <>
      <Navbar />
      <main className="overflow-x-hidden">
        <HeroSection />
        <MantraBandSection />
        <IntroSection />
        <MahantSection />
        <DhamFlipAnimation />
        <CinematicStorySection sequences={sequences} />
        <CultureSection />
        <SacredStoreSection />
        <MissionSection />
        <GallerySection images={galleryImages} />
        <InvocationSection />
      </main>
      <Footer />
    </>
  );
}
