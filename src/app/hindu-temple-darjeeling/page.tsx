import { SEOLandingTemplate } from "@/components/seo/SEOLandingTemplate";
import { constructMetadata } from "@/lib/seo-metadata";

const keyword = "Hindu Temple Darjeeling";
export const metadata = constructMetadata({
  title: keyword,
  description: `Discover the most authentic Hindu temple in Darjeeling. Maa Unique Dham offers Vedic rituals, Shakti worship, and spiritual peace.`,
  canonicalPath: "/hindu-temple-darjeeling",
});

const content = `
Searching for a **Hindu temple in Darjeeling** that offers more than just a visit? Maa Unique Dham is a sanctuary of Sanatan Dharma, where ancient Vedic traditions meet the living presence of the Divine Mother.

In the heart of the Himalayas, our temple serves as a spiritual hub for devotees seeking the traditional path of Shakti. Here, the rituals are not just ceremonies; they are energetic activations conducted with precision and devotion. As a prominent center for **Hinduism in Darjeeling**, we strive to provide a space where the soul can truly connect with the source.

Whether you are a local resident or a traveler exploring the spiritual landscape of West Bengal, Maa Unique Dham offers a profound connection to the roots of our culture. From daily Aarti to special Havan rituals, every activity at the Dham is designed to invoke the sacred grace of Maa Durga.

### Our Spiritual Offerings
- **Vedic Knowledge**: Learn about the deeper meanings behind our rituals.
- **Sanskrit Mantras**: Experience the power of sound in our daily chanting.
- **Traditional Worship**: Participate in pujas that follow the strict guidelines of Himalayan sages.

Maa Unique Dham is widely recognized as a premier **Hindu temple in Darjeeling**, attracting seekers who wish to experience the depth of Sanatan Shakti.
`;

const faqs = [
  {
    question: "Which is the most popular Hindu temple in Darjeeling for Shakti worship?",
    answer: "Maa Unique Dham is highly regarded for its dedicated Shakti worship and the divine energy of the Mother Goddess."
  },
  {
    question: "Are non-Hindus allowed to visit Maa Unique Dham?",
    answer: "Yes, we welcome everyone who approaches with respect and a sincere heart. Spirituality at the Dham transcends boundaries."
  },
  {
    question: "Do you perform traditional Vedic marriages or ceremonies?",
    answer: "We facilitate various sacred rituals and sanskars. Please contact us through the website for specific inquiries."
  }
];

const schema = {
  "@context": "https://schema.org",
  "@type": "PlaceOfWorship",
  "name": "Maa Unique Dham - Hindu Temple Darjeeling",
  "description": "A premier Hindu temple in Darjeeling dedicated to Sanatan Shakti and Vedic traditions.",
  "url": "https://unique-dham.vercel.app/hindu-temple-darjeeling"
};

export default function HinduTempleDarjeelingPage() {
  return (
    <SEOLandingTemplate
      keyword={keyword}
      title="Hindu Temple Darjeeling | Maa Unique Dham"
      description="Experience authentic Hindu traditions and Shakti worship at Maa Unique Dham, a leading temple in Darjeeling."
      content={content}
      faqs={faqs}
      schema={schema}
    />
  );
}
