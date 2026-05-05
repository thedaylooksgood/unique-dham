import { JsonLd } from "./JsonLd";

export function BrandSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "PlaceOfWorship",
    "name": "Maa Unique Dham",
    "alternateName": ["Nav Kanya Devi Mandir", "Unique Dham"],
    "description": "A sacred spiritual platform and temple born in the hills of Darjeeling. Dedicated to Maa Durga and Sanatan Shakti.",
    "url": "https://www.maauniquedham.in",
    "logo": "https://www.maauniquedham.in/logo.png",
    "image": "https://www.maauniquedham.in/images/home-page/hero/banner 1.png",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Unique Market, RN Sinha Rd, Chauk Bazaar",
      "addressLocality": "Darjeeling",
      "addressRegion": "West Bengal",
      "postalCode": "734101",
      "addressCountry": "India"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "27.0410",
      "longitude": "88.2663"
    },
    "telephone": "+91 82508 88275",
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday"
        ],
        "opens": "06:00",
        "closes": "20:00"
      }
    ],
    "sameAs": [
      "https://www.facebook.com/p/Unique-dham-darjeeling-100068201122988/",
      "https://www.instagram.com/maa_unique_dham/",
      "https://youtube.com/@maauniquedham5911"
    ]
  };

  return <JsonLd data={schema} />;
}
