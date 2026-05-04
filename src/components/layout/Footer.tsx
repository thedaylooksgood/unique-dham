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
                { name: "Spiritual Guidance", href: "/guidance" },
                { name: "Sacred Store", href: "/sacred-store" },
                { name: "Book a Puja", href: "/puja-booking" },
                { name: "Events", href: "/events" },
                { name: "Gallery", href: "/gallery" },
                { name: "Volunteer", href: "/volunteer" },
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

          {/* Connect Column */}
          <div className="lg:col-span-3 space-y-5 pt-2">
            <h4 className="font-display text-sm text-saffron tracking-[0.3em] uppercase font-bold flex items-center gap-2">
              <span className="w-6 h-px bg-saffron/50" />
              Connect
            </h4>
            <ul className="space-y-4">
              {[
                { icon: MapPin, text: "Unique Market, RN Sinha Rd, Chauk Bazaar, Darjeeling, West Bengal 734101", href: "https://maps.app.goo.gl/ccwYS8C3JmjeNtqR9" },
                { icon: Phone, text: "+91 82508 88275", href: "tel:+918250888275" },
                { icon: Mail, text: "maauniquedham@gmail.com", href: "mailto:maauniquedham@gmail.com" },
              ].map((contact, idx) => (
                <li key={idx} className="group">
                  <a
                    href={contact.href}
                    target={contact.icon === MapPin ? "_blank" : undefined}
                    rel={contact.icon === MapPin ? "noopener noreferrer" : undefined}
                    className="flex items-start gap-3 cursor-pointer"
                  >
                    <div className="p-2 rounded-md bg-white/80 border border-saffron/30 group-hover:bg-saffron group-hover:text-white transition-colors duration-300 shadow-sm text-saffron shrink-0">
                      <contact.icon size={16} className="currentColor" />
                    </div>
                    <span className="font-body text-sacred-brown/90 font-bold text-sm leading-tight group-hover:text-saffron transition-colors duration-300 pt-1.5">
                      {contact.text}
                    </span>
                  </a>
                </li>
              ))}
            </ul>

            {/* Social Links with Stock Colors */}
            <div className="flex items-center gap-4 pt-4">
              <a
                href="https://wa.me/918250888275"
                target="_blank"
                rel="noopener noreferrer"
                className="group transition-transform hover:-translate-y-1"
                aria-label="WhatsApp"
              >
                <div className="w-10 h-10 rounded-lg bg-white shadow-sm border border-black/5 flex items-center justify-center overflow-hidden relative">
                  <svg viewBox="0 0 24 24" fill="#25D366" className="w-6 h-6">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.067 2.877 1.215 3.076.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                  </svg>
                </div>
              </a>

              <a
                href="https://www.facebook.com/p/Unique-dham-darjeeling-100068201122988/"
                target="_blank"
                rel="noopener noreferrer"
                className="group transition-transform hover:-translate-y-1"
                aria-label="Facebook"
              >
                <div className="w-10 h-10 rounded-lg bg-white shadow-sm border border-black/5 flex items-center justify-center overflow-hidden relative">
                  <svg viewBox="0 0 24 24" fill="#1877F2" className="w-6 h-6">
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                  </svg>
                </div>
              </a>

              <a
                href="https://www.instagram.com/maa_unique_dham/"
                target="_blank"
                rel="noopener noreferrer"
                className="group transition-transform hover:-translate-y-1"
                aria-label="Instagram"
              >
                <div className="w-10 h-10 rounded-lg bg-white shadow-sm border border-black/5 flex items-center justify-center overflow-hidden relative">
                  <svg viewBox="0 0 24 24" fill="none" stroke="url(#instagram-gradient-footer)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
                    <defs>
                      <linearGradient id="instagram-gradient-footer" x1="0%" y1="100%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#f09433" />
                        <stop offset="25%" stopColor="#e6683c" />
                        <stop offset="50%" stopColor="#dc2743" />
                        <stop offset="75%" stopColor="#cc2366" />
                        <stop offset="100%" stopColor="#bc1888" />
                      </linearGradient>
                    </defs>
                    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                  </svg>
                </div>
              </a>

              <a
                href="https://youtube.com/@maauniquedham5911?si=i74IDFhERAWK8t_7"
                target="_blank"
                rel="noopener noreferrer"
                className="group transition-transform hover:-translate-y-1"
                aria-label="YouTube"
              >
                <div className="w-10 h-10 rounded-lg bg-white shadow-sm border border-black/5 flex items-center justify-center overflow-hidden relative">
                  <svg viewBox="0 0 24 24" fill="#FF0000" className="w-6 h-6">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                  </svg>
                </div>
              </a>
            </div>
          </div>
        </div>


      </div>
    </footer>
  );
}
