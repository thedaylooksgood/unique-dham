"use client";

import Link from "next/link";
import { OmIcon } from "@/components/ui/OmIcon";
import { Instagram, Youtube, Globe, Mail, Phone, MapPin } from "lucide-react";

export function Footer() {
  return (
    <footer className="relative bg-parchment border-t border-saffron/10 pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-20">
          <div className="lg:col-span-2 space-y-8">
            <Link href="/" className="flex items-center gap-3 group">
              <OmIcon className="text-saffron h-10 w-10 transition-transform group-hover:scale-110" />
              <div className="flex flex-col">
                <span className="font-display text-2xl tracking-tight text-gradient-saffron leading-none">
                  MAA UNIQUE DHAM
                </span>
                <span className="font-body text-[10px] tracking-[0.3em] uppercase text-warm-umber/60 mt-2">
                  Darjeeling To The World
                </span>
              </div>
            </Link>

            <p className="font-sacred text-xl text-saffron/60 italic border-l-2 border-saffron/20 pl-6">
              ॐ सर्वमंगल मांगल्ये शिवे सर्वार्थ साधिके।
              <br />
              शरण्ये त्र्यम्बके गौरी नारायणी नमोस्तुते॥
            </p>

            <p className="font-body text-base text-warm-umber/60 max-w-md leading-relaxed">
              Born in the misty hills of Darjeeling, our Dham is a sanctuary for every seeker.
              We preserve the ancient traditions of Shakti while guiding global souls towards their divine purpose.
            </p>

            <div className="flex items-center gap-6">
              <a href="#" className="p-3 bg-white rounded-full border border-saffron/10 text-sacred-brown transition-all hover:bg-saffron hover:text-ivory hover:scale-110">
                <Instagram size={20} />
              </a>
              <a href="#" className="p-3 bg-white rounded-full border border-saffron/10 text-sacred-brown transition-all hover:bg-saffron hover:text-ivory hover:scale-110">
                <Youtube size={20} />
              </a>
              <a href="#" className="p-3 bg-white rounded-full border border-saffron/10 text-sacred-brown transition-all hover:bg-saffron hover:text-ivory hover:scale-110">
                <Globe size={20} />
              </a>
            </div>
          </div>

          <div className="space-y-8">
            <h4 className="font-display text-sm text-saffron tracking-[0.3em] uppercase font-bold">
              Sacred Path
            </h4>
            <ul className="space-y-4">
              {["Home", "About Mahant", "Our Tradition", "Nava Durga"].map((item) => (
                <li key={item}>
                  <Link href="#" className="font-body text-sacred-brown/60 hover:text-saffron transition-colors text-base flex items-center gap-2 group">
                    <span className="w-1.5 h-1.5 rounded-full bg-saffron/20 group-hover:bg-saffron transition-colors" />
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-8">
            <h4 className="font-display text-sm text-saffron tracking-[0.3em] uppercase font-bold">
              Connect
            </h4>
            <ul className="space-y-6">
              <li className="flex items-start gap-4">
                <MapPin size={20} className="text-saffron/60 mt-1" />
                <span className="font-body text-sacred-brown/60 text-sm leading-relaxed">
                  Darjeeling, West Bengal, India
                </span>
              </li>
              <li className="flex items-center gap-4">
                <Phone size={20} className="text-saffron/60" />
                <span className="font-body text-sacred-brown/60 text-sm">
                  +91 9876543210
                </span>
              </li>
              <li className="flex items-center gap-4">
                <Mail size={20} className="text-saffron/60" />
                <span className="font-body text-sacred-brown/60 text-sm">

                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between pt-10 border-t border-saffron/5 gap-6">
          <p className="font-body text-xs text-warm-umber/40 tracking-widest uppercase">
            © {new Date().getFullYear()} Maa Unique Dham. Rooted in the Himalayas.
          </p>

          <div className="flex items-center gap-8">
            <Link href="#" className="font-body text-[10px] uppercase tracking-widest text-warm-umber/40 hover:text-saffron transition-colors">
              Privacy Policy
            </Link>
            <Link href="#" className="font-body text-[10px] uppercase tracking-widest text-warm-umber/40 hover:text-saffron transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-saffron/30 to-transparent" />
    </footer>
  );
}