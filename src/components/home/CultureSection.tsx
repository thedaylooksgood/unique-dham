"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { BlurFade } from "@/components/ui/blur-fade";
import { DiaTextReveal } from "@/components/ui/dia-text-reveal";
import { Volume2, VolumeX, Eye, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function CultureSection() {
  const [isMuted, setIsMuted] = useState(true);
  const [isSpotlight, setIsSpotlight] = useState(false);
  const [introFinished, setIntroFinished] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  // Lock scroll when spotlight is active
  useEffect(() => {
    if (isSpotlight) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => { document.body.style.overflow = "unset"; };
  }, [isSpotlight]);

  return (
    <section className="relative py-12 md:py-32 px-0 md:px-12 bg-[#FFFBF5] overflow-hidden">
      {/* --- BACKGROUND IMAGE (Outside the video frame) --- */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <Image
          src="/images/home-page/video-section-bg.png"
          alt="Video Section Background"
          fill
          className="object-cover opacity-100"
          priority
          unoptimized
        />
        {/* Subtle overlay to ensure text remains readable if the background is busy */}
        <div className="absolute inset-0 bg-white/10 backdrop-blur-[2px]" />
      </div>
      <div className="relative z-10 w-full md:max-w-7xl mx-auto">
        <BlurFade delay={0.2} inView>
          <div className="relative w-full aspect-[9/16] md:aspect-[21/9] rounded-none md:rounded-[3rem] overflow-hidden shadow-2xl bg-sacred-brown group">
            
            {/* Background Video Layer */}
            <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden">
              <video
                ref={videoRef}
                autoPlay
                muted
                loop
                playsInline
                className="absolute inset-0 w-full h-full object-cover scale-105"
              >
                <source src="/images/home-page/culture.mp4" type="video/mp4" />
              </video>
              
              {/* Intro Overlay - Reveals once then disappears */}
              <div className="absolute inset-0 z-10">
                <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/20 to-transparent md:from-sacred-brown/70 md:via-transparent md:to-transparent" />
                
                <div className="absolute inset-0 flex flex-col justify-center px-8 md:px-24 max-w-3xl gap-6">
                  <h3 className="font-display text-4xl md:text-7xl text-ivory uppercase leading-tight drop-shadow-2xl flex flex-col">
                    <DiaTextReveal 
                      text="DARJEELING" 
                      textColor="#FDF5E6"
                      colors={["#E5B869", "#C41E3A", "#FFD700", "#E5B869"]}
                      duration={1.5}
                      revealAndHide
                      repeat={false}
                      hideDelay={3}
                    />
                    <DiaTextReveal 
                      text="SPIRITUAL CULTURE" 
                      textColor="#FDF5E6"
                      colors={["#E5B869", "#C41E3A", "#FFD700", "#E5B869"]}
                      duration={1.5}
                      delay={0.3}
                      revealAndHide
                      repeat={false}
                      hideDelay={3}
                    />
                  </h3>
                  
                  <div className="max-w-xl">
                    <DiaTextReveal 
                      className="font-body text-lg md:text-xl text-ivory/90 italic leading-relaxed drop-shadow-lg"
                      text="Where Buddhist serenity meets Hindu Shakti, in the eternal embrace of the mountains." 
                      textColor="#FDF5E6"
                      colors={["#E5B869", "#FFFFFF", "#E5B869"]}
                      duration={2}
                      delay={1.2}
                      revealAndHide
                      repeat={false}
                      hideDelay={2.5}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* In-Section Controls */}
            <div className="absolute bottom-6 right-6 md:bottom-10 md:right-10 z-30 flex items-center gap-4">
              {/* Fullscreen Spotlight Button */}
              <button 
                onClick={() => setIsSpotlight(true)}
                className="p-3 rounded-full bg-black/40 backdrop-blur-md border border-white/10 text-white hover:bg-black/60 transition-all duration-300"
                title="Watch Spotlight"
              >
                <Eye className="w-5 h-5 md:w-6 md:h-6" />
              </button>

              {/* Mute Button */}
              <button 
                onClick={toggleMute}
                className="p-3 rounded-full bg-black/40 backdrop-blur-md border border-white/10 text-white hover:bg-black/60 transition-all duration-300"
              >
                {isMuted ? <VolumeX className="w-5 h-5 md:w-6 md:h-6" /> : <Volume2 className="w-5 h-5 md:w-6 md:h-6" />}
              </button>
            </div>

            <div className="absolute inset-0 rounded-[3rem] border border-ivory/10 pointer-events-none hidden md:block" />
          </div>
        </BlurFade>
      </div>

      {/* ── Fullscreen Spotlight Modal ────────────────────────────────── */}
      <AnimatePresence>
        {isSpotlight && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9999] bg-black flex items-center justify-center"
          >
            {/* Close / Back Button */}
            <button
              onClick={() => setIsSpotlight(false)}
              className="absolute top-8 left-8 md:top-12 md:left-12 z-50 flex items-center gap-3 text-ivory/60 hover:text-ivory transition-colors group"
            >
              <div className="p-2 rounded-full border border-ivory/20 group-hover:border-ivory/50 transition-colors">
                <X className="w-5 h-5" />
              </div>
              <span className="uppercase tracking-[0.3em] text-xs font-bold">Close Film</span>
            </button>

            {/* Large Video Player */}
            <div className="w-full h-full relative">
              <video
                autoPlay
                controls
                className="w-full h-full object-contain"
                onEnded={() => setIsSpotlight(false)}
              >
                <source src="/images/home-page/culture.mp4" type="video/mp4" />
              </video>
            </div>
            
            {/* Spotlight Brand Watermark */}
            <div className="absolute bottom-12 right-12 pointer-events-none opacity-30">
              <span className="font-display text-xl text-ivory tracking-[0.5em] uppercase">Maa Unique Dham</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
