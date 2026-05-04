import { Metadata } from "next";

const siteConfig = {
  name: "Maa Unique Dham",
  description: "A sacred spiritual platform born in the hills of Darjeeling. Where Maa is not invoked. She Arrives.",
  url: "https://maauniquedham.com", // Replace with actual URL if different
  ogImage: "https://maauniquedham.com/og-image.jpg",
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
    "Online Puja Booking"
  ],
};

export function constructMetadata({
  title = "Temple in Darjeeling",
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
  return {
    title: `${title} | ${siteConfig.name}`,
    description,
    keywords: [...siteConfig.keywords, ...keywords],
    authors: [{ name: siteConfig.name }],
    creator: siteConfig.name,
    openGraph: {
      type: "website",
      locale: "en_US",
      url: siteConfig.url,
      title: `${title} | ${siteConfig.name}`,
      description,
      siteName: siteConfig.name,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | ${siteConfig.name}`,
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
    ...(noIndex && {
      robots: {
        index: false,
        follow: false,
      },
    }),
  };
}
