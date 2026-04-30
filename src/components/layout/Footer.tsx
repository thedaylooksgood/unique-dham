"use client";

import Link from "next/link";
import Image from "next/image";
import { Mail, Phone, MapPin, ArrowRight } from "lucide-react";

export function Footer() {
  return (
    <footer className="relative border-t border-saffron/30">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <Image
          src="/images/home-page/darjeeling-section-bg.png"
          alt="Darjeeling Background"
          fill
          className="object-cover object-center opacity-60"
          quality={100}
        />
        {/* Soft gradient to ensure text readability while keeping the image very visible */}
        <div className="absolute inset-0 bg-gradient-to-t from-parchment via-parchment/80 to-parchment/30" />
        <div className="absolute inset-0 opacity-[0.02] mix-blend-overlay bg-[url('/noise.png')]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-16 pb-12">
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8">
          
          {/* Brand Column */}
          <div className="lg:col-span-5 space-y-5">
            <Link href="/" className="flex items-center gap-3 group inline-flex">
              <div className="relative flex items-center justify-center w-12 h-12 rounded-full bg-white/70 border border-saffron/40 shadow-sm group-hover:bg-white transition-all duration-500 overflow-hidden p-1.5 shrink-0">
                <Image 
                  src="/logo.png" 
                  alt="Maa Unique Dham Logo" 
                  width={36} 
                  height={36} 
                  className="object-contain transition-transform duration-500 group-hover:scale-110 relative z-10"
                />
              </div>
              <div className="flex flex-col">
                <span className="font-display text-xl md:text-2xl tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-saffron to-sacred-brown">
                  MAA UNIQUE DHAM
                </span>
                <span className="font-body text-[11px] tracking-[0.1em] text-sacred-brown/80 mt-0.5 font-bold">
                  Formerly Nav Kanya Devi Mandir
                </span>
                <span className="font-body text-[9px] tracking-[0.3em] uppercase text-sacred-brown/70 mt-1 font-semibold">
                  Darjeeling To The World
                </span>
              </div>
            </Link>

            <div className="relative">
              <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-gradient-to-b from-saffron/60 to-transparent rounded-full" />
              <p className="font-sacred text-lg md:text-xl text-sacred-brown/90 italic pl-5 leading-loose">
                ॐ सर्वमंगल मांगल्ये शिवे सर्वार्थ साधिके।
                <br />
                शरण्ये त्र्यम्बके गौरी नारायणी नमोस्तुते॥
              </p>
            </div>

            <p className="font-body text-sm text-sacred-brown/80 max-w-md leading-relaxed font-medium">
              Born in the misty hills of Darjeeling, our Dham is a sanctuary for every seeker. 
              We preserve ancient traditions while guiding global souls towards their divine purpose.
            </p>

            <div className="flex items-center gap-4 pt-2">
              <a 
                href="#" 
                className="group relative transition-transform hover:-translate-y-1"
                aria-label="Instagram"
              >
                <div className="w-10 h-10 rounded-lg bg-white shadow-sm border border-black/5 flex items-center justify-center overflow-hidden relative">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 relative z-10 group-hover:opacity-0 transition-opacity absolute inset-0 m-auto text-sacred-brown"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
                  
                  <div className="absolute inset-0 bg-gradient-to-tr from-[#FD1D1D] via-[#E1306C] to-[#833AB4] opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
                  </div>
                </div>
              </a>
              
              <a 
                href="#" 
                className="group relative transition-transform hover:-translate-y-1"
                aria-label="Facebook"
              >
                <div className="w-10 h-10 rounded-lg bg-white shadow-sm border border-black/5 flex items-center justify-center overflow-hidden relative">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 relative z-10 group-hover:opacity-0 transition-opacity absolute inset-0 m-auto text-sacred-brown"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
                  
                  <div className="absolute inset-0 bg-[#1877F2] opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 fill-white"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
                  </div>
                </div>
              </a>
              
              <a 
                href="#" 
                className="group relative transition-transform hover:-translate-y-1"
                aria-label="YouTube"
              >
                <div className="w-10 h-10 rounded-lg bg-white shadow-sm border border-black/5 flex items-center justify-center overflow-hidden relative">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 relative z-10 group-hover:opacity-0 transition-opacity absolute inset-0 m-auto text-sacred-brown"><path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17"/><polygon points="10 15 15 12 10 9 10 15"/></svg>

                  <div className="absolute inset-0 bg-[#FF0000] opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 fill-white"><path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17"/><polygon points="10 15 15 12 10 9 10 15"/></svg>
                  </div>
                </div>
              </a>
            </div>
          </div>

          {/* Spacer */}
          <div className="hidden lg:block lg:col-span-1" />

          {/* Links Column */}
          <div className="lg:col-span-3 space-y-5 pt-2">
            <h4 className="font-display text-sm text-saffron tracking-[0.3em] uppercase font-bold flex items-center gap-2">
              <span className="w-6 h-px bg-saffron/50" />
              Sacred Path
            </h4>
            <ul className="space-y-3">
              {[
                { name: "Home", href: "/" },
                { name: "About Mahant", href: "#" },
                { name: "Our Tradition", href: "#" },
                { name: "Nava Durga", href: "#" },
                { name: "Gallery", href: "/gallery" },
              ].map((item) => (
                <li key={item.name}>
                  <Link 
                    href={item.href} 
                    className="font-body text-sacred-brown/80 hover:text-saffron transition-all duration-300 text-sm flex items-center gap-2 group w-fit font-bold"
                  >
                    <ArrowRight size={14} className="opacity-0 -translate-x-3 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 text-saffron" />
                    <span className="group-hover:translate-x-1 transition-transform duration-300">{item.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Column */}
          <div className="lg:col-span-3 space-y-5 pt-2">
            <h4 className="font-display text-sm text-saffron tracking-[0.3em] uppercase font-bold flex items-center gap-2">
              <span className="w-6 h-px bg-saffron/50" />
              Connect
            </h4>
            <ul className="space-y-4">
              {[
                { icon: MapPin, text: "Darjeeling, West Bengal, India" },
                { icon: Phone, text: "+91 9876543210" },
                { icon: Mail, text: "blessings@maauniquedham.org" },
              ].map((contact, idx) => (
                <li key={idx} className="flex items-start gap-3 group cursor-pointer">
                  <div className="p-2 rounded-md bg-white/80 border border-saffron/30 group-hover:bg-saffron group-hover:text-white transition-colors duration-300 shadow-sm text-saffron shrink-0">
                    <contact.icon size={16} className="currentColor" />
                  </div>
                  <span className="font-body text-sacred-brown/90 font-bold text-sm leading-tight group-hover:text-saffron transition-colors duration-300 pt-1.5">
                    {contact.text}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
