"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Instagram, Youtube, Globe } from "lucide-react";
import { cn } from "@/lib/utils";
import { OmIcon } from "@/components/ui/OmIcon";
import { ShimmerButton } from "@/components/ui/shimmer-button";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/#mahant", label: "About Mahant" },
  { href: "/puja-booking", label: "Puja Booking" },
  { href: "/guidance", label: "Guidance" },
  { href: "/sacred-store", label: "Sacred Store" },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 py-4",
        isScrolled
          ? "bg-ivory/90 backdrop-blur-xl border-b border-saffron/10 shadow-sacred-warm"
          : "bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between h-16">
        <Link
          href="/"
          className="flex items-center gap-3 transition-transform hover:scale-105"
        >
          <img 
            src="/logo.png" 
            alt="Maa Unique Dham Logo" 
            className="h-12 w-auto object-contain drop-shadow-sm"
          />
          <div className="flex flex-col">
            <span className="font-display text-xl tracking-tight text-gradient-saffron leading-none">
              MAA UNIQUE DHAM
            </span>
            <span className="font-body text-[10px] tracking-[0.2em] uppercase text-warm-umber/60 mt-1">
              Darjeeling
            </span>
          </div>
        </Link>

        <nav className="hidden md:flex items-center gap-10">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="group relative font-body text-sm tracking-wide text-sacred-brown/70 hover:text-saffron transition-colors"
            >
              {link.label}
              <span className="absolute -bottom-1 left-0 w-0 h-px bg-saffron transition-all group-hover:w-full" />
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-6">
          <Link href="/puja-booking">
            <ShimmerButton className="px-6 py-2.5 shadow-2xl transition-all hover:scale-105 active:scale-95">
              <span className="font-display text-sm tracking-widest uppercase">
                Book a Puja
              </span>
            </ShimmerButton>
          </Link>
        </div>

        <button
          className="md:hidden p-2 text-sacred-brown hover:bg-saffron/5 rounded-full transition-colors"
          onClick={() => setIsMobileMenuOpen(true)}
        >
          <Menu size={24} />
        </button>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            className="fixed inset-0 bg-ivory z-50 md:hidden flex flex-col"
          >
            <div className="flex items-center justify-between h-20 px-6 border-b border-saffron/10">
              <Link href="/" className="flex items-center gap-2">
                <img 
                  src="/logo.png" 
                  alt="Maa Unique Dham Logo" 
                  className="h-10 w-auto object-contain"
                />
                <span className="font-display text-lg text-gradient-saffron">MAA UNIQUE DHAM</span>
              </Link>
              <button
                className="p-2 text-sacred-brown hover:bg-saffron/5 rounded-full"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <X size={24} />
              </button>
            </div>

            <div className="flex-1 flex flex-col items-center justify-center gap-8">
              {navLinks.map((link, idx) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="font-display text-3xl text-sacred-brown/80 hover:text-saffron transition-colors"
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}

              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 }}
                className="mt-8"
              >
                <Link href="/puja-booking" onClick={() => setIsMobileMenuOpen(false)}>
                  <ShimmerButton className="px-10 py-4 shadow-xl">
                    <span className="font-display text-lg tracking-widest uppercase">
                      Book a Puja
                    </span>
                  </ShimmerButton>
                </Link>
              </motion.div>
            </div>

            <div className="p-10 flex flex-col items-center gap-6">
              <div className="flex items-center gap-8">
                <Instagram className="text-sacred-brown/40 hover:text-saffron transition-colors cursor-pointer" />
                <Youtube className="text-sacred-brown/40 hover:text-saffron transition-colors cursor-pointer" />
                <Globe className="text-sacred-brown/40 hover:text-saffron transition-colors cursor-pointer" />
              </div>
              <p className="font-body text-xs text-sacred-brown/40 tracking-[0.2em] uppercase">
                Darjeeling To The World
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
