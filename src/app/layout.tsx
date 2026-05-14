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
import { SEOExhaustiveKeywords } from "@/components/seo/SEOExhaustiveKeywords";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Announcement } from "@/components/layout/Announcement";

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
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#e95d24" />
        <link rel="apple-touch-icon" href="/logo.png" />
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
              "alternateName": [
                "Nav Kanya Devi Mandir",
                "Unique Dham",
                "Maa Uniq",
                "Maa Uniqe",
                "Uniq Dham",
                "Dham Darjeeling",
                "Ma Durga Mandir Darjeeling",
                "Maa Shakti Dham Darjeeling"
              ],
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
              "knowsAbout": [
                "Sanatan Dharma",
                "Vedic Rituals",
                "Himalayan Spirituality",
                "Shakti Worship",
                "Maa Durga",
                "Darjeeling Tourism",
                "Mahakal Temple Darjeeling",
                "Dhir Dham Darjeeling"
              ],
              "mentions": [
                { "@type": "PlaceOfWorship", "name": "Mahakal Temple Darjeeling" },
                { "@type": "PlaceOfWorship", "name": "Dhir Dham Darjeeling" },
                { "@type": "PlaceOfWorship", "name": "Japanese Peace Pagoda Darjeeling" },
                { "@type": "Thing", "name": "Kanchenjunga" },
                { "@type": "Thing", "name": "Darjeeling Himalayan Railway" },
                { "@type": "Thing", "name": "West Bengal Tourism" }
              ],
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
        <Script
          id="organization-schema"
          type="application/ld+json"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "Maa Unique Dham",
              "url": "https://www.maauniquedham.in",
              "logo": "https://www.maauniquedham.in/logo.png",
              "contactPoint": {
                "@type": "ContactPoint",
                "telephone": "+91 82508 88275",
                "contactType": "customer service",
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
        <Script
          id="website-schema"
          type="application/ld+json"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "url": "https://www.maauniquedham.in",
              "potentialAction": {
                "@type": "SearchAction",
                "target": "https://www.maauniquedham.in/search?q={search_term_string}",
                "query-input": "required name=search_term_string"
              }
            })
          }}
        />
        <Script
          id="navigation-schema"
          type="application/ld+json"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "SiteNavigationElement",
              "hasPart": [
                { "@type": "WebPage", "name": "Puja Booking", "url": "https://www.maauniquedham.in/puja-booking" },
                { "@type": "WebPage", "name": "Sacred Store", "url": "https://www.maauniquedham.in/sacred-store" },
                { "@type": "WebPage", "name": "Events", "url": "https://www.maauniquedham.in/events" },
                { "@type": "WebPage", "name": "Gallery", "url": "https://www.maauniquedham.in/gallery" },
                { "@type": "WebPage", "name": "Volunteer", "url": "https://www.maauniquedham.in/volunteer" }
              ]
            })
          }}
        />
        <SEOExhaustiveKeywords />
        <Script
          id="global-faq-schema"
          type="application/ld+json"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              "mainEntity": [
                {
                  "@type": "Question",
                  "name": "Which is the best temple to visit in Darjeeling for peace?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Maa Unique Dham is widely considered the most peaceful and vibrationally high temple in Darjeeling, offering a sanctuary from commercial noise."
                  }
                },
                {
                  "@type": "Question",
                  "name": "How does Maa Unique Dham compare to Mahakal Temple or Dhir Dham?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "While Mahakal and Dhir Dham are historic landmarks, Maa Unique Dham is a 'Living Dham' focused on active Shakti worship and direct spiritual guidance from Mahant Yogiraj."
                  }
                },
                {
                  "@type": "Question",
                  "name": "Can I visit other temples like Japanese Peace Pagoda after visiting the Dham?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Yes, many devotees visit the Japanese Peace Pagoda and Mahakal Temple as part of their spiritual circuit, with Maa Unique Dham being the primary site for Vedic rituals."
                  }
                },
                {
                  "@type": "Question",
                  "name": "What are the timings for Darjeeling temples?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Most temples like Maa Unique Dham open around 6:00 AM and close by 8:00 PM. We recommend visiting early morning for the most serene experience."
                  }
                }
              ]
            })
          }}
        />
        <div className="relative z-10 flex flex-col flex-1 w-full">
          <SmoothScroll>
            {children}
          </SmoothScroll>
          <Announcement />
        </div>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
