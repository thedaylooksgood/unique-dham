import type { Metadata } from "next";
import { playfairDisplay, plusJakartaSans, tiroDevanagari } from "@/lib/fonts";
import "./globals.css";
import { Particles } from "@/components/ui/particles";
import { Preloader } from "@/components/layout/Preloader";
import { SmoothScroll } from "@/components/providers/SmoothScroll";
import NextTopLoader from 'nextjs-toploader';
import Script from "next/script";

import { constructMetadata } from "@/lib/seo-metadata";
import { GoogleTagManager, GoogleAnalytics } from '@next/third-parties/google';

export const metadata = constructMetadata();

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${playfairDisplay.variable} ${plusJakartaSans.variable} ${tiroDevanagari.variable} h-full antialiased js-loading`}
    >
      <head>
        <link rel="preconnect" href="https://www.youtube.com" />
        <link rel="preconnect" href="https://www.google.com" />
        <link rel="preconnect" href="https://i.ytimg.com" />
        <link rel="sitemap" type="application/xml" href="https://www.maauniquedham.in/sitemap.xml" />
      </head>
      <body className="min-h-full flex flex-col bg-ivory text-sacred-brown relative">
        <Script
          id="scroll-restoration"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `if ('scrollRestoration' in history) history.scrollRestoration = 'manual';`,
          }}
        />
        <Script
          id="structured-data"
          type="application/ld+json"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "HinduTemple",
              "name": "Maa Unique Dham",
              "alternateName": ["Nav Kanya Devi Mandir", "Unique Dham"],
              "description": "A sacred spiritual platform born in the hills of Darjeeling. Where Maa is not invoked. She Arrives.",
              "url": "https://www.maauniquedham.in",
              "logo": "https://www.maauniquedham.in/logo.png",
              "image": "https://www.maauniquedham.in/og-image.jpg",
              "telephone": "+91 82508 88275",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "Unique Market, RN Sinha Rd, Chauk Bazaar",
                "addressLocality": "Darjeeling",
                "addressRegion": "West Bengal",
                "postalCode": "734101",
                "addressCountry": "IN"
              },
              "geo": {
                "@type": "GeoCoordinates",
                "latitude": "27.0410",
                "longitude": "88.2663"
              },
              "openingHoursSpecification": [
                {
                  "@type": "OpeningHoursSpecification",
                  "dayOfWeek": [
                    "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"
                  ],
                  "opens": "06:00",
                  "closes": "20:00"
                }
              ],
              "contactPoint": {
                "@type": "ContactPoint",
                "telephone": "+91 82508 88275",
                "contactType": "Enquiry",
                "areaServed": "IN",
                "availableLanguage": ["English", "Hindi", "Bengali", "Nepali"]
              },
              "sameAs": [
                "https://www.instagram.com/maa_unique_dham/",
                "https://www.facebook.com/p/Unique-dham-darjeeling-100068201122988/",
                "https://youtube.com/@maauniquedham5911"
              ]
            })
          }}
        />
        <GoogleTagManager gtmId={process.env.NEXT_PUBLIC_GTM_ID || ""} />
        <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID || ""} />
        <NextTopLoader 
          color="#e95d24"
          initialPosition={0.08}
          crawlSpeed={200}
          height={3}
          crawl={true}
          showSpinner={false}
          easing="ease"
          speed={200}
          shadow="0 0 10px #e95d24,0 0 5px #e95d24"
        />
        <Preloader />
        <Particles
          className="fixed inset-0 z-0 pointer-events-none opacity-40 md:hidden"
          quantity={60}
          ease={80}
          color="#FFD700"
          refresh
        />
        <div className="relative z-10 flex flex-col flex-1 w-full">
          <SmoothScroll>
            {children}
          </SmoothScroll>
        </div>
      </body>
    </html>
  );
}
