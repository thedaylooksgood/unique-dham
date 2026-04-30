"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Instagram, Youtube, Globe } from "lucide-react";
import { cn } from "@/lib/utils";
import { ShimmerButton } from "@/components/ui/shimmer-button";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/#mahant", label: "About Mahant" },
  { href: "/puja-booking", label: "Puja Booking" },
  { href: "/guidance", label: "Guidance" },
  { href: "/sacred-store", label: "Sacred Store" },
  { href: "/gallery", label: "Gallery" },
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
      layout
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 400, damping: 40 }}
      className={cn(
        "fixed z-50 inset-x-0 mx-auto",
        isScrolled
          ? "top-4 w-[calc(100%-2rem)] max-w-5xl bg-ivory/95 backdrop-blur-xl border border-saffron/30 shadow-2xl rounded-2xl px-4 md:px-6 py-2 transition-colors duration-500"
          : "top-0 w-full max-w-none bg-gradient-to-b from-white/90 via-white/50 to-transparent px-6 py-4 transition-colors duration-500"
      )}
    >
      <motion.div 
        layout
        className={cn(
          "flex items-center mx-auto",
          isScrolled ? "justify-between h-14" : "justify-between max-w-7xl h-16 w-full"
        )}
      >
        <Link
          href="/"
          className="flex items-center gap-3 shrink-0 group"
        >
          <motion.img 
            layout
            src="/logo.png" 
            alt="Maa Unique Dham Logo" 
            className={cn(
              "object-contain drop-shadow-sm group-hover:scale-105 transition-transform",
              isScrolled ? "h-10 w-10 md:h-12 md:w-12" : "h-12 w-12 md:h-14 md:w-14"
            )}
          />
          
          <AnimatePresence mode="popLayout">
            {!isScrolled && (
              <motion.div
                layout
                initial={{ opacity: 0, x: -10, filter: "blur(4px)" }}
                animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, x: -10, filter: "blur(4px)", scale: 0.95 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="flex flex-col origin-left"
              >
                <span className="font-display text-lg md:text-xl tracking-tight text-gradient-saffron leading-none whitespace-nowrap">
                  MAA UNIQUE DHAM
                </span>
                <span className="font-body text-[9px] md:text-[10px] tracking-[0.1em] text-warm-umber/80 mt-1 font-bold whitespace-nowrap">
                  Formerly Nav Kanya Devi Mandir
                </span>
              </motion.div>
            )}
          </AnimatePresence>
        </Link>

        <motion.nav 
          layout
          className={cn(
            "hidden lg:flex items-center",
            isScrolled ? "gap-6" : "gap-10"
          )}
        >
          {navLinks.map((link) => (
            <motion.div layout key={link.href}>
              <Link
                href={link.href}
                className="group relative font-body text-sm tracking-wide text-sacred-brown/80 hover:text-saffron transition-colors font-medium"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-[2px] rounded-full bg-saffron transition-all duration-300 group-hover:w-full" />
              </Link>
            </motion.div>
          ))}
        </motion.nav>

        <motion.div layout className="hidden lg:flex items-center gap-6 shrink-0">
          <Link href="/puja-booking">
            <ShimmerButton className={cn(
              "shadow-lg hover:scale-105 active:scale-95 transition-transform duration-300",
              isScrolled ? "px-5 py-2" : "px-6 py-2.5"
            )}>
              <span className="font-display text-sm tracking-widest uppercase whitespace-nowrap">
                Book a Puja
              </span>
            </ShimmerButton>
          </Link>
        </motion.div>

        <motion.button
          layout
          className="lg:hidden p-2 text-sacred-brown bg-saffron/5 hover:bg-saffron/10 border border-saffron/20 rounded-xl transition-colors"
          onClick={() => setIsMobileMenuOpen(true)}
        >
          <Menu size={24} />
        </motion.button>
      </motion.div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 top-0 left-0 right-0 h-[100dvh] bg-ivory/95 backdrop-blur-2xl z-[100] lg:hidden flex flex-col pt-4"
          >
            <div className="flex items-center justify-between h-20 px-6 border-b border-saffron/10 bg-ivory/50 rounded-3xl mx-4 mb-4">
              <Link href="/" className="flex items-center gap-3">
                <img 
                  src="/logo.png" 
                  alt="Maa Unique Dham Logo" 
                  className="h-12 w-auto object-contain"
                />
                <div className="flex flex-col">
                  <span className="font-display text-lg text-gradient-saffron leading-none">MAA UNIQUE DHAM</span>
                  <span className="font-body text-[9px] tracking-widest text-warm-umber/60 mt-1 uppercase">Darjeeling</span>
                </div>
              </Link>
              <button
                className="p-3 bg-white border border-saffron/20 text-sacred-brown shadow-sm hover:bg-saffron/5 rounded-xl transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <X size={24} />
              </button>
            </div>

            <div className="flex-1 flex flex-col items-center justify-center gap-6 overflow-y-auto pb-10">
              {navLinks.map((link, idx) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
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
                transition={{ delay: 0.3 }}
                className="mt-8 w-full px-10"
              >
                <Link href="/puja-booking" onClick={() => setIsMobileMenuOpen(false)} className="block w-full">
                  <ShimmerButton className="w-full py-4 shadow-xl rounded-2xl">
                    <span className="font-display text-lg tracking-widest uppercase">
                      Book a Puja
                    </span>
                  </ShimmerButton>
                </Link>
              </motion.div>
            </div>
            
            <div className="p-8 flex flex-col items-center gap-6 bg-white/50 border-t border-saffron/10 mt-auto rounded-t-3xl">
              <div className="flex items-center gap-8">
                <a href="#" className="p-3 bg-white rounded-xl border border-saffron/20 text-sacred-brown shadow-sm hover:bg-saffron/5 transition-colors"><Instagram size={20} /></a>
                <a href="#" className="p-3 bg-white rounded-xl border border-saffron/20 text-sacred-brown shadow-sm hover:bg-saffron/5 transition-colors"><Youtube size={20} /></a>
                <a href="#" className="p-3 bg-white rounded-xl border border-saffron/20 text-sacred-brown shadow-sm hover:bg-saffron/5 transition-colors"><Globe size={20} /></a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
