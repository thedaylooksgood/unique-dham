import type { Metadata } from "next";
import { playfairDisplay, plusJakartaSans, tiroDevanagari } from "@/lib/fonts";
import "./globals.css";

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
      className={`${playfairDisplay.variable} ${plusJakartaSans.variable} ${tiroDevanagari.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-ivory text-sacred-brown">
        {children}
      </body>
    </html>
  );
}
