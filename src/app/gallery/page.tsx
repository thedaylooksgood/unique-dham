import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import GalleryPageClient from "@/components/gallery/GalleryPageClient";
import { getGalleryImages } from "@/app/actions/getGalleryImages";
import { constructMetadata } from "@/lib/seo-metadata";

export const metadata = constructMetadata({
  title: "Sacred Gallery - Temple in Darjeeling",
  description: "Explore the divine visuals of Maa Unique Dham. View photos of sacred rituals, the peaceful surroundings, and the spiritual energy of our Darjeeling temple.",
});

export default async function GalleryPage() {
  const images = await getGalleryImages();

  return (
    <>
      <Navbar />
      <GalleryPageClient initialImages={images} />
      <Footer />
    </>
  );
}
