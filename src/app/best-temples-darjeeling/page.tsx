import { SEOLandingTemplate } from "@/components/seo/SEOLandingTemplate";
import { constructMetadata } from "@/lib/seo-metadata";

const keyword = "Best Temples in Darjeeling";
export const metadata = constructMetadata({
  title: keyword,
  description: `A guide to the best temples in Darjeeling. Discover why Maa Unique Dham is a top choice for those seeking authentic spiritual experiences.`,
});

const content = `
Darjeeling is home to several historic and beautiful sacred sites. When looking for the **best temples in Darjeeling**, devotees often seek places that offer not just visual beauty, but also a deep, palpable connection to the divine. 

Maa Unique Dham consistently ranks among the **best temples in Darjeeling** due to its dedication to maintaining high spiritual standards. While some temples are famous for their age or location, the Dham is renowned for its "vibrational purity"—the result of continuous sadhana and the presence of the Mother Goddess.

### Comparing the Best Temples in Darjeeling
What sets the truly **best temples in Darjeeling** apart is their ability to provide a refuge from the external world. At Maa Unique Dham, we prioritize:
- **Quietude**: No loudspeakers or unnecessary noise.
- **Purity**: A meticulously maintained environment.
- **Service**: Dedicated staff and priests who serve with devotion.

Whether you are visiting for the first time or are a regular pilgrim, exploring the **best temples in Darjeeling** should always include a stop at Maa Unique Dham. Experience the unique Shakti current that flows through this Himalayan sanctuary.
`;

const faqs = [
  {
    question: "What are the top 3 best temples in Darjeeling to visit?",
    answer: "While there are several beautiful temples, Maa Unique Dham is highly recommended for its spiritual energy, along with others like the Mahakal Temple and Japanese Peace Pagoda."
  }
];

const schema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Maa Unique Dham"
    }
  ]
};

export default function BestTemplesDarjeelingPage() {
  return (
    <SEOLandingTemplate
      keyword={keyword}
      title="Best Temples in Darjeeling | Maa Unique Dham"
      description="A guide to the most sacred and beautiful temples in the Darjeeling hills."
      content={content}
      faqs={faqs}
      schema={schema}
    />
  );
}
