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
import { cn } from "@/lib/utils";
import { pujasData } from "@/lib/data/pujas";
import { ShimmerButton } from "@/components/ui/shimmer-button";

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
    <div className="relative w-full h-[100vh] min-h-[700px] bg-ivory text-sacred-brown overflow-hidden font-body selection:bg-saffron selection:text-white">
      
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div className="absolute top-[10%] left-[5%] w-64 h-64 bg-saffron/5 rounded-full" />
        <div className="absolute bottom-[10%] right-[5%] w-96 h-96 bg-vermillion/5 rounded-full" />
      </div>

      {/* Main Content Layout */}
      <div className="relative z-10 w-full max-w-[1600px] mx-auto h-full flex flex-col lg:flex-row items-center">
        
        {/* --- LEFT CONTENT AREA --- */}
        <div className="w-full lg:w-[45%] h-full flex flex-col justify-center px-6 md:px-16 lg:pl-20 z-20 pt-20 lg:pt-0 pb-64 lg:pb-56">
          <AnimatePresence mode="wait">
            <motion.div
              key={activePuja.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="w-full"
            >
              {/* Meta Info */}
              <div className="flex items-center gap-4 mb-6">
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
              <h1 className="font-display text-5xl md:text-6xl xl:text-7xl leading-[1.1] text-sacred-brown mb-8">
                {activePuja.name}
              </h1>

              {/* Description */}
              <p className="text-warm-umber/80 text-base md:text-lg leading-relaxed mb-10 max-w-xl">
                {activePuja.shortDescription}
              </p>

              {/* Benefits Highlights */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12">
                {activePuja.benefits.slice(0, 4).map((benefit, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-saffron/10 flex items-center justify-center shrink-0">
                      <CheckCircle2 size={12} className="text-saffron" />
                    </div>
                    <span className="text-sm font-medium text-sacred-brown/70">{benefit}</span>
                  </div>
                ))}
              </div>

              {/* Primary Actions */}
              <div className="flex flex-wrap items-center gap-6">
                <ShimmerButton 
                  onClick={() => setIsEnquiryModalOpen(true)}
                  className="px-10 py-4 shadow-2xl hover:scale-105 transition-transform"
                >
                  <div className="flex items-center gap-3">
                    <span className="font-display text-sm tracking-widest uppercase">Reserve Ritual</span>
                    <ArrowRight size={18} />
                  </div>
                </ShimmerButton>

                <button 
                  onClick={() => setIsVideoModalOpen(true)}
                  className="group flex items-center gap-3 px-6 py-3 rounded-full hover:bg-saffron/5 transition-colors"
                >
                  <div className="w-10 h-10 rounded-full border border-saffron/20 flex items-center justify-center text-saffron group-hover:bg-saffron group-hover:text-white transition-all duration-500">
                    <Play size={16} fill="currentColor" className="ml-1" />
                  </div>
                  <span className="text-xs font-bold tracking-[0.15em] text-sacred-brown uppercase border-b border-sacred-brown/20 pb-0.5 group-hover:border-saffron transition-colors">
                    Watch Ritual
                  </span>
                </button>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* --- RIGHT IMAGE AREA --- */}
        <div className="absolute lg:relative inset-0 lg:inset-auto w-full lg:w-[55%] h-full z-0 lg:z-10 mt-20 lg:mt-0 flex items-center justify-center p-4">
          <div 
            className="relative w-full h-[80%] lg:h-[90%] overflow-hidden group transition-all duration-700"
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
            
            {/* Nav Arrows (Floating on Image) */}
            <div className="absolute bottom-12 right-12 flex gap-4 z-30">
              <button 
                onClick={handlePrev}
                className="w-14 h-14 rounded-full bg-black/60 border border-white/20 flex items-center justify-center text-white hover:bg-saffron hover:border-saffron transition-all duration-300 group/btn"
              >
                <ChevronLeft size={24} className="group-hover/btn:-translate-x-1 transition-transform" />
              </button>
              <button 
                onClick={handleNext}
                className="w-14 h-14 rounded-full bg-black/60 border border-white/20 flex items-center justify-center text-white hover:bg-saffron hover:border-saffron transition-all duration-300 group/btn"
              >
                <ChevronRight size={24} className="group-hover/btn:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* =========================================
          LIGHT THEMED NAVIGATION DOCK
          ========================================= */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-[40] w-full max-w-7xl px-4 hidden md:block pointer-events-none">
        <motion.div 
          initial={false}
          animate={{ 
            height: isExpanded ? "auto" : "auto",
            width: isExpanded ? "100%" : "auto",
          }}
          className={cn(
            "mx-auto pointer-events-auto bg-ivory border border-saffron/20 shadow-[0_30px_60px_rgba(233,93,36,0.15)] rounded-2xl overflow-hidden transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] flex flex-col",
            isExpanded ? "p-6" : "p-2"
          )}
        >
          {/* Dock Header */}
          <div className="flex items-center justify-between px-6 py-2 mb-2">
            <div className="flex items-center gap-3">
              <div className="w-1.5 h-1.5 rounded-full bg-saffron animate-pulse" />
              <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-sacred-brown/60">
                Pujas Offered
              </span>
            </div>
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-saffron/5 border border-saffron/10 hover:bg-saffron/10 transition-all text-saffron"
            >
              <span className="text-[10px] font-bold uppercase tracking-widest">
                {isExpanded ? "Minimize" : "Show All Library"}
              </span>
              {isExpanded ? <X size={12} /> : <Info size={12} />}
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
                      "group relative flex items-center gap-4 px-8 py-4 rounded-xl transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] whitespace-nowrap",
                      isActive
                        ? "bg-saffron text-white shadow-xl shadow-saffron/40 scale-105"
                        : "hover:bg-saffron/5 text-sacred-brown/70 hover:text-saffron",
                      isExpanded && "min-w-[280px] justify-start bg-white/50 border border-saffron/5 shadow-sm"
                    )}
                  >
                    <Icon size={22} className={cn("transition-transform duration-500", isActive ? "scale-110" : "group-hover:scale-110")} />
                    <div className="flex flex-col items-start">
                      <span className={cn(
                        "text-sm xl:text-base font-bold tracking-wide transition-all duration-500",
                        isActive ? "opacity-100" : "opacity-80"
                      )}>
                        {puja.name}
                      </span>
                      {isExpanded && (
                        <span className={cn(
                          "text-[10px] uppercase tracking-widest font-medium transition-all duration-500",
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
                        placeholder="+91 98765 43210"
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