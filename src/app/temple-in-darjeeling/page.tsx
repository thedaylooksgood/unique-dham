import { SEOLandingTemplate } from "@/components/seo/SEOLandingTemplate";
import { constructMetadata } from "@/lib/seo-metadata";

const keyword = "Temple in Darjeeling";
export const metadata = constructMetadata({
  title: keyword,
  description: `Maa Unique Dham is the most sacred and peaceful temple in Darjeeling. Visit for divine blessings, spiritual guidance, and authentic Vedic pujas.`,
  canonicalPath: "/temple-in-darjeeling",
});

const content = `
Maa Unique Dham stands as a beacon of spiritual light in the mist-covered hills of Darjeeling. Unlike traditional temples, this is a "living dham" where the presence of the Divine Mother is not merely invoked, but felt by every soul that enters its sacred bounds. The air here carries the purity of the high Himalayas, and the silence is punctuated only by the rhythmic chanting of ancient mantras and the soft chime of temple bells.

### The Himalayan Spiritual Legacy
Darjeeling has long been known as the "Land of the Thunderbolt," but for the spiritual seeker, it is the Land of the Mother. Maa Unique Dham is strategically located in these sacred peaks, which have been the meditation grounds for sages and yogis for millennia. This geographical connection to the crown chakra of the earth allows the Dham to radiate a unique frequency of peace and power.

### A Sanctuary for the Modern Soul
In an era of digital noise and constant stress, the Dham serves as a vital sanctuary. Our temple provides a space where you can disconnect from the mundane and reconnect with the eternal. The architectural design of the Dham, combined with the natural beauty of the surrounding peaks, creates a portal to higher consciousness. It is often cited as a top **temple in Darjeeling** because it offers more than just a site for worship—it offers a path to inner transformation.

### The Presence of Mahant Yogiraj
The spiritual current of the Dham is anchored by the presence of Mahant Yogiraj. His guidance ensures that every ritual performed is not just a ceremony, but a deep energetic transmission. Whether you are participating in a group Aarti or a private puja, the integrity of the practice is maintained to the highest Vedic standards. This commitment to authenticity is what defines us as the most respected **Hindu temple in Darjeeling**.

### Experiencing the Divine Shakti
The worship of Maa Durga at Unique Dham is centered around the concept of "Sanatan Shakti"—the eternal primordial energy. Devotees come from all over the world to witness the "arrival" of Maa, a phenomenon where the atmosphere of the temple shifts into a state of divine grace. For those searching for **places to visit in Darjeeling** that offer deep spiritual substance, the Dham is an essential destination.

### Why Visit Maa Unique Dham?
As a prominent **Hindu temple in Darjeeling**, we offer:
- **Authentic Vedic Pujas**: Book personalized rituals for health, prosperity, and peace.
- **Spiritual Guidance**: One-on-one sessions with Mahant Yogiraj to help navigate your life's path.
- **Peaceful Environment**: A clean, quiet, and vibrationally high space for meditation.
- **Vedic Education**: Opportunities to learn about the deeper aspects of Sanatan Dharma and Himalayan traditions.
- **Community**: Join a global family of devotees walking the path of Shakti.

If you are planning your trip to the hills, ensure that Maa Unique Dham is at the top of your list of **places to visit in Darjeeling**. Your journey to the Himalayas is incomplete without experiencing the divine presence at the Dham.
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
  "url": "https://www.maauniquedham.in/temple-in-darjeeling",
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
