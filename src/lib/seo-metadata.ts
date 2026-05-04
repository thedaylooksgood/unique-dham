import { Metadata } from "next";

const siteConfig = {
  name: "Maa Unique Dham",
  shortName: "Maa Unique Dham",
  description: "A sacred spiritual platform born in the hills of Darjeeling. Where Maa is not invoked. She Arrives.",
  url: "https://unique-dham.vercel.app",
  ogImage: "https://unique-dham.vercel.app/og-image.jpg",
  keywords: [
    "Maa Unique Dham",
    "Darjeeling",
    "Temple in Darjeeling",
    "Hindu Temple Darjeeling",
    "Best Temple in Darjeeling",
    "Spiritual Places Darjeeling",
    "Maa Durga",
    "Darjeeling Tourism",
    "Spiritual Guidance",
    "Online Puja Booking",
    "Places to visit in Darjeeling",
    "Darjeeling sightseeing",
    "Peaceful places in Darjeeling",
    "Nav Kanya Devi Mandir",
    "Mahant Yogiraj",
    "Shakti Peeth Darjeeling",
    "Spiritual healing Darjeeling"
  ],
  googleVerification: "mLv150vGWImZ6OzkhcyMd8s89eqNzrAPk-WhTlKfC6M",
};

export function constructMetadata({
  title,
  description = siteConfig.description,
  image = siteConfig.ogImage,
  noIndex = false,
  keywords = [],
}: {
  title?: string;
  description?: string;
  image?: string;
  noIndex?: boolean;
  keywords?: string[];
} = {}): Metadata {
  const fullTitle = title 
    ? (title.includes(siteConfig.name) ? title : `${title} | ${siteConfig.name}`)
    : `${siteConfig.name} | Best Temple in Darjeeling`;

  return {
    title: fullTitle,
    description,
    keywords: [...siteConfig.keywords, ...keywords],
    authors: [{ name: siteConfig.name }],
    creator: siteConfig.name,
    alternates: {
      canonical: "/",
    },
    // Google uses siteName for the brand name in search results
    openGraph: {
      type: "website",
      locale: "en_US",
      url: siteConfig.url,
      title: fullTitle,
      description,
      siteName: siteConfig.name,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: fullTitle,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [image],
      creator: "@maauniquedham",
    },
    icons: {
      icon: "/favicon.ico",
      shortcut: "/favicon.ico",
      apple: "/apple-touch-icon.png",
    },
    metadataBase: new URL(siteConfig.url),
    verification: {
      google: siteConfig.googleVerification,
    },
    ...(noIndex && {
      robots: {
        index: false,
        follow: false,
      },
    }),
    // For proper brand naming in search
    other: {
      "application-name": siteConfig.name,
      "apple-mobile-web-app-title": siteConfig.name,
    }
  };
}
