"use client";

import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  Play,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  X,
  Mail,
  Clock,
  Sparkles,
  Info
} from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { pujasData } from "@/lib/data/pujas";
import { ShimmerButton } from "@/components/ui/shimmer-button";

const layoutConfig = {
  container: {
    mt: "mt-4 md:mt-6 lg:mt-8",
    maxW: "max-w-7xl"
  },
  textSection: {
    mt: "mt-0 lg:mt-[-40px]", // Added negative margin to push text up
    pt: "pt-2 md:pt-4 lg:pt-6",
    pb: "pb-8 md:pb-12", 
    innerPy: "py-4 md:py-6",
    spacing: "space-y-4 md:space-y-5",
    px: "px-6 md:px-16 lg:px-0"
  },
  imageSection: {
    mt: "mt-4 lg:mt-10",
    p: "p-0",
    h: "h-[350px] md:h-[450px] lg:h-[550px]"
  }
};

export default function PujaBookingClient() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isEnquiryModalOpen, setIsEnquiryModalOpen] = useState(false);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scrollLeftNav = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -300, behavior: "smooth" });
    }
  };

  const scrollRightNav = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 300, behavior: "smooth" });
    }
  };

  const activePuja = pujasData[activeIndex];

  const handleNext = () => setActiveIndex((prev) => (prev + 1) % pujasData.length);
  const handlePrev = () => setActiveIndex((prev) => (prev - 1 + pujasData.length) % pujasData.length);

  return (
    <div className={cn("relative w-full min-h-[calc(100vh-8rem)] flex flex-col bg-transparent text-sacred-brown font-body selection:bg-saffron selection:text-white overflow-x-hidden", layoutConfig.container.mt)}>

      {/* --- BACKGROUND IMAGE LAYER (Exactly like Home Page Hero) --- */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/home-page/hero/banner 1.png"
          alt="Sacred Hero Background"
          fill
          className="object-cover"
          priority
          unoptimized
        />
        {/* Subtle Bottom Gradient like Home Page */}
        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-ivory to-transparent z-[1]" />
      </div>

      {/* Decorative Background Elements */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div className="absolute top-[10%] left-[5%] w-64 h-64 bg-saffron/5 rounded-full" />
        <div className="absolute bottom-[10%] right-[5%] w-96 h-96 bg-vermillion/5 rounded-full" />
      </div>

      {/* Main Content Layout */}
      <div className={cn("relative z-10 w-full mx-auto flex-grow flex flex-col lg:flex-row items-center gap-8 lg:gap-0", layoutConfig.container.maxW)}>

        {/* --- LEFT CONTENT AREA --- */}
        <div className={cn("w-full lg:w-[45%] h-full flex flex-col justify-start z-20 relative", layoutConfig.textSection.px, layoutConfig.textSection.pt, layoutConfig.textSection.pb, layoutConfig.textSection.mt)}>
          <AnimatePresence mode="wait">
            <motion.div
              key={activePuja.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className={cn("w-full", layoutConfig.textSection.spacing,
                "p-6 md:p-8 lg:p-0 lg:py-10",
                "bg-ivory/85 md:bg-ivory/70 lg:bg-transparent",
                "backdrop-blur-xl lg:backdrop-blur-none",
                "rounded-[2rem] lg:rounded-none",
                "border border-white/60 lg:border-none",
                "shadow-2xl shadow-black/5 lg:shadow-none"
              )}
            >
              {/* Meta Info */}
              <div className="flex items-center gap-4">
                <div className="px-3 py-1 bg-saffron/10 border border-saffron/20 rounded-full flex items-center gap-2">
                  <Clock size={12} className="text-saffron" />
                  <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-saffron">
                    {activePuja.duration}
                  </span>
                </div>
                <div className="px-3 py-1 bg-warm-umber/5 border border-warm-umber/10 rounded-full flex items-center gap-2">
                  <Sparkles size={12} className="text-warm-umber/60" />
                  <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-warm-umber/60">
                    {activePuja.deity}
                  </span>
                </div>
              </div>

              {/* Title */}
              <h1 className="font-display text-4xl md:text-5xl lg:text-6xl leading-[1.1] text-sacred-brown tracking-tight">
                {activePuja.name}
              </h1>

              {/* Description */}
              <p className="font-body text-sm md:text-base text-warm-umber leading-relaxed font-semibold tracking-wide max-w-lg">
                {activePuja.shortDescription}
              </p>

              {/* Benefits Highlights */}
              <div className="flex flex-col gap-4">
                {activePuja.benefits.slice(0, 5).map((benefit, i) => (
                  <div key={i} className="flex items-start gap-4 group">
                    <div className="mt-1 relative flex items-center justify-center shrink-0">
                      {/* Custom Sacred Icon */}
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="transition-transform duration-500 group-hover:rotate-45">
                        <path 
                          d="M12 2L13.5 7.5H19L14.5 11L16 16.5L12 13L8 16.5L9.5 11L5 7.5H10.5L12 2Z" 
                          stroke="#E8860C" 
                          strokeWidth="1.2" 
                          strokeLinecap="round" 
                          strokeLinejoin="round"
                        />
                        <circle cx="12" cy="11" r="2.5" fill="#E8860C" fillOpacity="0.2" stroke="#E8860C" strokeWidth="1" />
                        <circle cx="12" cy="11" r="0.8" fill="#E8860C" />
                      </svg>
                      {/* Subtle glow behind icon */}
                      <div className="absolute inset-0 bg-saffron/10 blur-[6px] rounded-full -z-10 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                    <span className="text-[15px] font-medium text-sacred-brown/80 leading-snug tracking-wide group-hover:text-sacred-brown transition-colors">
                      {benefit}
                    </span>
                  </div>
                ))}
              </div>

              {/* Primary Actions */}
              <div className="flex flex-nowrap items-center gap-4 lg:gap-6">
                <ShimmerButton
                  onClick={() => setIsEnquiryModalOpen(true)}
                  className="px-6 md:px-8 py-3 md:py-3.5 shadow-2xl hover:scale-105 transition-transform"
                >
                  <div className="flex items-center gap-3">
                    <span className="font-display text-sm tracking-widest uppercase">Reserve Ritual</span>
                    <ArrowRight size={16} />
                  </div>
                </ShimmerButton>

                <button
                  onClick={() => setIsVideoModalOpen(true)}
                  className="group flex items-center gap-2 px-4 py-2 rounded-full hover:bg-saffron/5 transition-colors shrink-0"
                >
                  <div className="w-8 h-8 rounded-full border border-saffron/20 flex items-center justify-center text-saffron group-hover:bg-saffron group-hover:text-white transition-all duration-300">
                    <Play size={14} fill="currentColor" className="ml-0.5" />
                  </div>
                  <span className="font-display text-xs tracking-widest uppercase text-sacred-brown border-b border-sacred-brown/20 pb-0.5 group-hover:border-saffron transition-colors">
                    Watch Ritual
                  </span>
                </button>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* --- RIGHT IMAGE AREA (Background on mobile) --- */}
        <div className={cn("absolute lg:relative inset-0 lg:inset-auto w-full lg:w-[55%] h-full z-0 lg:z-10 flex items-center justify-center lg:order-2", layoutConfig.imageSection.mt, layoutConfig.imageSection.p)}>
          {/* Mobile Overlay */}
          <div className="absolute inset-0 bg-black/20 lg:hidden z-10 pointer-events-none" />

          <div
            className={cn("relative w-full h-[40vh] lg:h-full overflow-hidden group transition-all duration-700", layoutConfig.imageSection.h)}
            style={{
              maskImage: "url('/images/home-page/mahant/brush-mask.png')",
              WebkitMaskImage: "url('/images/home-page/mahant/brush-mask.png')",
              maskSize: "100% 100%",
              WebkitMaskSize: "100% 100%",
              maskRepeat: "no-repeat",
              WebkitMaskRepeat: "no-repeat",
              maskPosition: "center",
              WebkitMaskPosition: "center",
            }}
          >
            <AnimatePresence mode="wait">
              <motion.img
                key={activePuja.image}
                src={activePuja.image}
                alt={activePuja.name}
                initial={{ scale: 1.1, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 1.05, opacity: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="absolute inset-0 w-full h-full object-cover object-center"
              />
            </AnimatePresence>
          </div>

          {/* Nav Arrows (Beside the image) */}
          <div className="absolute top-[65%] lg:top-1/2 -translate-y-1/2 inset-x-4 lg:-inset-x-2 flex justify-between z-30 pointer-events-none">
            <button
              onClick={handlePrev}
              className="pointer-events-auto w-12 h-12 lg:w-14 lg:h-14 rounded-full bg-black/30 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-saffron hover:border-saffron hover:scale-110 transition-all duration-300 shadow-[0_8px_30px_rgb(0,0,0,0.12)] group/btn"
            >
              <ChevronLeft size={24} className="group-hover/btn:-translate-x-1 transition-transform drop-shadow-md" />
            </button>
            <button
              onClick={handleNext}
              className="pointer-events-auto w-12 h-12 lg:w-14 lg:h-14 rounded-full bg-black/30 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-saffron hover:border-saffron hover:scale-110 transition-all duration-300 shadow-[0_8px_30px_rgb(0,0,0,0.12)] group/btn"
            >
              <ChevronRight size={24} className="group-hover/btn:translate-x-1 transition-transform drop-shadow-md" />
            </button>
          </div>
        </div>
      </div>

      {/* =========================================
          LIGHT THEMED NAVIGATION DOCK
          ========================================= */}
      <div className="relative lg:sticky bottom-4 lg:bottom-[130px] inset-x-0 mx-auto z-[40] w-full max-w-7xl px-4 lg:px-8 pointer-events-none mt-0 mb-8">
        <motion.div
          initial={false}
          animate={{
            height: isExpanded ? "auto" : "auto",
            width: isExpanded ? "100%" : "auto",
          }}
          className={cn(
            "mx-auto pointer-events-auto bg-ivory border border-saffron/20 shadow-[0_20px_50px_rgba(233,93,36,0.1)] rounded-2xl overflow-hidden transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] flex flex-col",
            isExpanded ? "p-4 md:p-6" : "p-2"
          )}
        >
          {/* Dock Header */}
          <div className="flex items-center justify-between px-3 md:px-6 py-1 mb-1">
            <div className="flex items-center gap-2">
              <div className="w-1 h-1 rounded-full bg-saffron animate-pulse" />
              <span className="text-[8px] md:text-[9px] font-bold uppercase tracking-[0.2em] md:tracking-[0.3em] text-sacred-brown/60">
                Pujas Offered
              </span>
            </div>
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="flex items-center gap-1.5 px-2 md:px-3 py-1 rounded-full bg-saffron/5 border border-saffron/10 hover:bg-saffron/10 transition-all text-saffron"
            >
              <span className="text-[8px] md:text-[9px] font-bold uppercase tracking-widest">
                {isExpanded ? "Close" : "Change"}
              </span>
              {isExpanded ? <X size={8} /> : <Info size={8} />}
            </button>
          </div>

          <div className="flex items-center">
            {/* Navigation Left Arrow (Only show when NOT expanded) */}
            {!isExpanded && (
              <button
                onClick={scrollLeftNav}
                className="p-2 text-sacred-brown/60 hover:text-saffron transition-colors shrink-0"
              >
                <ChevronLeft size={24} />
              </button>
            )}

            <div
              ref={scrollContainerRef}
              className={cn(
                "flex scrollbar-hide scroll-smooth",
                isExpanded
                  ? "flex-wrap justify-center items-start gap-4 max-h-[60vh] overflow-y-auto px-4 py-4"
                  : "items-center gap-3 overflow-x-hidden w-full px-2 py-1"
              )}
            >
              {pujasData.map((puja, i) => {
                const isActive = activeIndex === i;
                const Icon = puja.icon;

                return (
                  <button
                    key={puja.id}
                    onClick={() => {
                      setActiveIndex(i);
                      if (isExpanded) setIsExpanded(false);
                    }}
                    className={cn(
                      "group relative flex items-center gap-2 md:gap-3 px-4 md:px-6 py-2 md:py-2.5 rounded-xl transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] whitespace-nowrap",
                      isActive
                        ? "bg-saffron text-white shadow-lg shadow-saffron/30 scale-105"
                        : "hover:bg-saffron/5 text-sacred-brown/70 hover:text-saffron",
                      isExpanded && "min-w-[200px] md:min-w-[280px] justify-start bg-white/50 border border-saffron/5 shadow-sm py-3 md:py-4"
                    )}
                  >
                    <Icon size={14} className={cn("md:w-[18px] md:h-[18px] transition-transform duration-500", isActive ? "scale-110" : "group-hover:scale-110")} />
                    <div className="flex flex-col items-start min-w-0 overflow-hidden">
                      <span className={cn(
                        "text-[11px] md:text-xs xl:text-sm font-bold tracking-wide transition-all duration-500 truncate w-full",
                        isActive ? "opacity-100" : "opacity-80"
                      )}>
                        {puja.name}
                      </span>
                      {isExpanded && (
                        <span className={cn(
                          "text-[8px] md:text-[9px] uppercase tracking-widest font-medium transition-all duration-500",
                          isActive ? "text-white/70" : "text-sacred-brown/40"
                        )}>
                          {puja.deity}
                        </span>
                      )}
                    </div>

                    {isActive && (
                      <motion.div
                        layoutId="dock-indicator"
                        className="absolute inset-0 bg-saffron rounded-xl -z-10 shadow-lg shadow-saffron/30"
                      />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Navigation Right Arrow (Only show when NOT expanded) */}
            {!isExpanded && (
              <button
                onClick={scrollRightNav}
                className="p-2 text-sacred-brown/60 hover:text-saffron transition-colors shrink-0"
              >
                <ChevronRight size={24} />
              </button>
            )}
          </div>
        </motion.div>
      </div>

      {/* =========================================
          MODALS (Enquiry & Video)
          ========================================= */}

      {/* Enquiry Modal */}
      <AnimatePresence>
        {isEnquiryModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsEnquiryModalOpen(false)}
              className="absolute inset-0 bg-sacred-brown/80"
            />
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative w-full max-w-xl bg-ivory rounded-[2.5rem] shadow-2xl overflow-hidden border border-saffron/20"
            >
              <div className="p-8 md:p-12">
                <div className="flex items-center justify-between mb-10">
                  <div>
                    <span className="font-bold text-[10px] tracking-[0.3em] uppercase text-saffron mb-2 block">
                      Secure Ritual Booking
                    </span>
                    <h3 className="font-display text-3xl text-sacred-brown">
                      {activePuja.name}
                    </h3>
                  </div>
                  <button
                    onClick={() => setIsEnquiryModalOpen(false)}
                    className="p-3 hover:bg-saffron/10 rounded-full transition-colors self-start border border-saffron/10"
                  >
                    <X size={20} className="text-sacred-brown/60" />
                  </button>
                </div>

                <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold tracking-widest uppercase text-warm-umber/60 ml-1">Your Name</label>
                      <input
                        type="text"
                        placeholder="Aditya Sharma"
                        className="w-full px-6 py-4 bg-white border border-saffron/10 rounded-2xl text-sacred-brown placeholder:text-warm-umber/20 focus:outline-none focus:ring-2 focus:ring-saffron/20 transition-all"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold tracking-widest uppercase text-warm-umber/60 ml-1">Phone Number</label>
                      <input
                        type="tel"
                        placeholder="+91 82508 88275"
                        className="w-full px-6 py-4 bg-white border border-saffron/10 rounded-2xl text-sacred-brown placeholder:text-warm-umber/20 focus:outline-none focus:ring-2 focus:ring-saffron/20 transition-all"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold tracking-widest uppercase text-warm-umber/60 ml-1">Ritual Intentions / Details</label>
                    <textarea
                      rows={4}
                      placeholder="Tell us about the specific intention for this ritual..."
                      className="w-full px-6 py-4 bg-white border border-saffron/10 rounded-2xl text-sacred-brown placeholder:text-warm-umber/20 focus:outline-none focus:ring-2 focus:ring-saffron/20 transition-all resize-none"
                    />
                  </div>

                  <div className="pt-4">
                    <ShimmerButton className="w-full py-5 rounded-2xl shadow-xl">
                      <div className="flex items-center justify-center gap-3">
                        <Mail size={18} />
                        <span className="font-display text-sm tracking-widest uppercase">Request Booking Details</span>
                      </div>
                    </ShimmerButton>
                  </div>
                  <p className="text-center text-[10px] text-warm-umber/40 uppercase tracking-widest">
                    Our temple coordinator will contact you within 24 hours
                  </p>
                </form>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Video Modal */}
      <AnimatePresence>
        {isVideoModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-12">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsVideoModalOpen(false)}
              className="absolute inset-0 bg-black/95"
            />
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative w-full max-w-6xl aspect-video bg-sacred-brown rounded-[2rem] overflow-hidden border border-white/10"
            >
              <button
                onClick={() => setIsVideoModalOpen(false)}
                className="absolute top-6 right-6 z-10 p-3 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors"
              >
                <X size={20} />
              </button>
              <iframe
                className="w-full h-full"
                src={activePuja.videoUrl}
                title={`${activePuja.name} Ritual Video`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}