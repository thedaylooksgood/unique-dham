import type { Metadata } from "next";
import { playfairDisplay, plusJakartaSans, tiroDevanagari } from "@/lib/fonts";
import "./globals.css";
import { Particles } from "@/components/ui/particles";
import { Preloader } from "@/components/layout/Preloader";

export const metadata: Metadata = {
  title: "Maa Unique Dham | Darjeeling",
  description: "A sacred spiritual platform born in the hills of Darjeeling. Where Maa is not invoked. She Arrives.",
  keywords: ["Maa Unique Dham", "Darjeeling", "Spiritual", "Puja", "Shakti", "Mahant", "Sanatan", "Durga"],
  authors: [{ name: "Maa Unique Dham" }],
  openGraph: {
    title: "Maa Unique Dham | Darjeeling",
    description: "A sacred spiritual platform born in the hills of Darjeeling.",
    type: "website",
  },
};

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
        <script
          dangerouslySetInnerHTML={{
            __html: `
              document.documentElement.classList.add('js-loading');
              window.addEventListener('load', function() {
                // The preloader component will handle removing this, 
                // but this is a safety fallback.
              });
            `,
          }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-ivory text-sacred-brown relative">
        <Preloader />
        <Particles
          className="fixed inset-0 z-0 pointer-events-none opacity-40"
          quantity={60}
          ease={80}
          color="#E8860C"
          refresh
        />
        <div className="relative z-10 flex flex-col flex-1 w-full">
          {children}
        </div>
      </body>
    </html>
  );
}
