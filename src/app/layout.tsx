import type { Metadata } from "next";
import { playfairDisplay, plusJakartaSans, tiroDevanagari } from "@/lib/fonts";
import "./globals.css";
import { Particles } from "@/components/ui/particles";
import { Preloader } from "@/components/layout/Preloader";
import { SmoothScroll } from "@/components/providers/SmoothScroll";
import NextTopLoader from 'nextjs-toploader';
import Script from "next/script";

import { constructMetadata } from "@/lib/seo-metadata";
import { GTM } from "@/components/seo/GTM";

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
        <Script
          id="scroll-restoration"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `if ('scrollRestoration' in history) history.scrollRestoration = 'manual';`,
          }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-ivory text-sacred-brown relative">
        <GTM gtmId="GTM-XXXXXXX" />
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
