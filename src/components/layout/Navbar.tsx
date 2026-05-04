"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Instagram, Youtube, Globe } from "lucide-react";
import { cn } from "@/lib/utils";
import { ShimmerButton } from "@/components/ui/shimmer-button";

const navLinks = [
  { href: "/guidance", label: "Guidance" },
  { href: "/sacred-store", label: "Sacred Store" },
  { href: "/gallery", label: "Gallery" },
  { href: "/events", label: "Events" },
  { href: "/volunteer", label: "Volunteer" },
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

  const dockTransition = {
    duration: 0.8,
    ease: [0.16, 1, 0.3, 1] as const, // Cinematic butter-smooth easing
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 flex justify-center pointer-events-none px-4 md:px-0">
        <motion.div
          initial={{ y: -60, scale: 0.8, opacity: 0, filter: "blur(12px)" }}
          animate={{
            y: 0,
            scale: 1,
            opacity: 1,
            filter: "blur(0px)",
            width: isScrolled ? "min(100%, 960px)" : "100%",
            marginTop: isScrolled ? "1rem" : "0rem",
            borderRadius: isScrolled ? "18px" : "0px", // MacBook dock style tighter corners
            paddingLeft: isScrolled ? "1.5rem" : "1.5rem",
            paddingRight: isScrolled ? "1.5rem" : "1.5rem",
            paddingTop: isScrolled ? "0.875rem" : "1rem", // Increased vertical height
            paddingBottom: isScrolled ? "0.875rem" : "1rem", // Increased vertical height
          }}
          transition={dockTransition}
          className={cn(
            "pointer-events-auto relative flex items-center justify-between overflow-hidden transition-shadow duration-700",
            isScrolled ? "shadow-[0_8px_40px_0_rgba(180,100,20,0.13),_0_2px_12px_0_rgba(0,0,0,0.08)]" : ""
          )}
        >
          {/* Animated Backgrounds */}
          <motion.div
            animate={{ opacity: isScrolled ? 1 : 0 }}
            transition={dockTransition}
            className="absolute inset-0 bg-ivory/95 backdrop-blur-xl z-0"
          />
          <motion.div
            animate={{ opacity: isScrolled ? 0 : 1 }}
            transition={dockTransition}
            className="absolute inset-0 bg-gradient-to-b from-white/90 via-white/50 to-transparent z-0 shadow-sm"
          />
          
          {/* Continuous Border for connectivity */}
          <motion.div
            animate={{ 
              borderRadius: isScrolled ? "18px" : "0px",
            }}
            transition={dockTransition}
            className={cn(
              "absolute inset-0 pointer-events-none z-[1]",
              isScrolled ? "border border-saffron/30" : "border-b border-saffron/10"
            )}
          />

          {/* Foreground Content */}
          <div className={cn("relative z-10 flex items-center justify-between w-full mx-auto transition-all duration-700", isScrolled ? "max-w-none" : "max-w-7xl")}>
            
            {/* Logo Group */}
            <Link href="/" className="flex items-center gap-3 shrink-0 group">
              <motion.img
                src="/logo.png"
                alt="Maa Unique Dham Logo"
                initial={{ height: "56px", width: "56px" }}
                animate={{
                  height: isScrolled ? "48px" : "56px", // Larger logo in dock mode
                  width: isScrolled ? "48px" : "56px", // Larger logo in dock mode
                }}
                transition={dockTransition}
                className="object-contain drop-shadow-sm group-hover:scale-105 w-14 h-14"
              />
              
              <AnimatePresence mode="popLayout">
                {!isScrolled && (
                  <motion.div
                    key="brand-text"
                    initial={{ opacity: 0, x: -20, filter: "blur(8px)" }}
                    animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                    exit={{ opacity: 0, x: -20, filter: "blur(8px)", scale: 0.95 }}
                    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
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

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center">
              <motion.div 
                animate={{ gap: isScrolled ? "1.75rem" : "2.5rem" }} // Slightly more breathing room for links in dock
                transition={dockTransition}
                className="flex items-center"
              >
                {navLinks.map((link) => (
                  <div key={link.href}>
                    <Link
                      href={link.href}
                      className="group relative font-body text-sm tracking-wide text-sacred-brown/80 hover:text-saffron transition-colors font-medium whitespace-nowrap"
                    >
                      {link.label}
                      <span className="absolute -bottom-1 left-0 w-0 h-[2px] rounded-full bg-saffron transition-all duration-300 group-hover:w-full" />
                    </Link>
                  </div>
                ))}
              </motion.div>
            </nav>

            {/* CTA & Mobile Toggle */}
            <div className="flex items-center gap-3 shrink-0">
              <div className="hidden lg:flex items-center gap-3">
                <Link href="/events">
                  <motion.div transition={dockTransition}>
                    <button className="px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-widest text-sacred-brown border border-saffron/20 hover:bg-saffron/5 transition-all">
                      Events
                    </button>
                  </motion.div>
                </Link>
                <Link href="/puja-booking">
                  <motion.div transition={dockTransition}>
                    <ShimmerButton background="#e95d24" className="shadow-lg hover:scale-105 active:scale-95 transition-transform duration-300 px-6 py-2.5">
                      <span className="font-display text-sm tracking-widest uppercase whitespace-nowrap text-white">
                        Book a Puja
                      </span>
                    </ShimmerButton>
                  </motion.div>
                </Link>
              </div>
              <button
                className="lg:hidden ml-4 p-2 text-sacred-brown bg-saffron/5 hover:bg-saffron/10 border border-saffron/20 rounded-xl transition-colors"
                onClick={() => setIsMobileMenuOpen(true)}
              >
                <Menu size={24} />
              </button>
            </div>
          </div>
        </motion.div>
      </header>

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
                  <ShimmerButton background="#e95d24" className="w-full py-4 shadow-xl rounded-2xl">
                    <span className="font-display text-lg tracking-widest uppercase text-white">
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
    </>
  );
}
