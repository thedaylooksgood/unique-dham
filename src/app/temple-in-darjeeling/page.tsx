import { SEOLandingTemplate } from "@/components/seo/SEOLandingTemplate";
import { constructMetadata } from "@/lib/seo-metadata";

const keyword = "Temple in Darjeeling";
export const metadata = constructMetadata({
  title: keyword,
  description: `Maa Unique Dham is the most sacred and peaceful temple in Darjeeling. Visit for divine blessings, spiritual guidance, and authentic Vedic pujas.`,
});

const content = `
Maa Unique Dham stands as a beacon of spiritual light in the mist-covered hills of Darjeeling. Unlike traditional temples, this is a "living dham" where the presence of the Divine Mother is not merely invoked, but felt by every soul that enters its sacred bounds.

Located in the serene landscapes of the Himalayas, our temple provides a sanctuary for those seeking refuge from the chaos of modern life. Whether you are looking for the **best temple in Darjeeling** to offer your prayers or a quiet place for meditation, Maa Unique Dham offers an unparalleled spiritual experience.

Our temple is dedicated to the ancient traditions of Sanatan Shakti. Under the guidance of Mahant Yogiraj, we conduct rituals that have been preserved for generations in the Himalayan peaks. Visitors often describe the energy here as "transformative" and "pure," making it a must-visit spiritual destination in Darjeeling.

### Why Visit Maa Unique Dham?
As a prominent **Hindu temple in Darjeeling**, we offer:
- **Authentic Vedic Pujas**: Book personalized rituals for health, prosperity, and peace.
- **Spiritual Guidance**: One-on-one sessions with Mahant Yogiraj to help navigate your life's path.
- **Peaceful Environment**: A clean, quiet, and vibrationally high space for meditation.
- **Community**: Join a global family of devotees walking the path of Shakti.

If you are planning your trip to the hills, ensure that Maa Unique Dham is at the top of your list of **places to visit in Darjeeling**.
`;

const faqs = [
  {
    question: "What are the timings for Maa Unique Dham temple in Darjeeling?",
    answer: "The temple is open daily from 6:00 AM to 8:00 PM. Special Aarti is conducted at sunrise and sunset."
  },
  {
    question: "Can I book a puja online at this Darjeeling temple?",
    answer: "Yes, Maa Unique Dham offers online puja booking through our website for devotees who cannot visit in person."
  },
  {
    question: "Is there an entry fee to visit the temple?",
    answer: "No, entry to the temple is free for all. We welcome seekers from all walks of life to experience the divine grace."
  },
  {
    question: "Where is the temple located in Darjeeling?",
    answer: "We are located in a peaceful area of Darjeeling, away from the commercial noise, providing a perfect environment for spiritual practice."
  }
];

const schema = {
  "@context": "https://schema.org",
  "@type": "PlaceOfWorship",
  "name": "Maa Unique Dham",
  "description": "The most sacred spiritual temple in Darjeeling, dedicated to Maa Durga and Sanatan Shakti.",
  "url": "https://maauniquedham.com/temple-in-darjeeling",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Darjeeling",
    "addressRegion": "West Bengal",
    "addressCountry": "India"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": "27.0410",
    "longitude": "88.2663"
  }
};

export default function TempleInDarjeelingPage() {
  return (
    <SEOLandingTemplate
      keyword={keyword}
      title="Temple in Darjeeling | Maa Unique Dham"
      description="Visit Maa Unique Dham, the most peaceful temple in Darjeeling known for divine energy and beautiful surroundings."
      content={content}
      faqs={faqs}
      schema={schema}
    />
  );
}
