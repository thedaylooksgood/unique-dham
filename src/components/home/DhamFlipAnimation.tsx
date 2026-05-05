"use client";

/**
 * Dham Narrative Scroll Sequence (Light Theme + Yatra One)
 * ─────────────────────────────────────────────────────────────────────────────
 * Phase 1: "Jai Maa Unique Dham" scatters into the ether.
 * Phase 2: "formerly Nav Kanya Devi Mandir" fades in like a whisper, then dissipates.
 * Phase 3: A profound, 4-line spiritual story flips in sequentially with cascading opacity.
 */

import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { motion } from "framer-motion";
import Image from "next/image";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function DhamFlipAnimation() {
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!sectionRef.current || !containerRef.current) return;

      // ── MASTER TIMELINE ──────────────────────────────────────────
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=5000",
          pin: true,
          scrub: 1.2,
          refreshPriority: 2,
          onUpdate: (self) => {
            // Update progress bar
            const progress = self.progress * 100;
            gsap.set(".dham-progress-bar", { width: `${progress}%` });
          }
        }
      });

      // --- PARALLAX BACKGROUND ---
      tl.to(bgRef.current, {
        scale: 1.15,
        duration: 6,
        ease: "none"
      }, 0);

      // --- PHASE 1: REVEAL & SCATTER "Jai Maa Unique Dham" ---
      const p1Words = containerRef.current.querySelectorAll(".phase-1-word");
      
      // Reveal them first if we are at the top
      tl.fromTo(p1Words, {
        autoAlpha: 0,
        y: 30,
        filter: "blur(0px)"
      }, {
        autoAlpha: 1,
        y: 0,
        duration: 0.5,
        stagger: 0.1,
        ease: "power3.out"
      }, 0);

      // Then scatter them
      p1Words.forEach((word, index) => {
        const xDir = [-45, -15, 15, 45][index]; 
        const yDir = [-30, 40, -40, 30][index]; 

        tl.to(word, {
          x: `${xDir}vw`,
          y: `${yDir}vh`,
          rotationZ: gsap.utils.random(-45, 45),
          rotationX: gsap.utils.random(-45, 45),
          scale: gsap.utils.random(2, 4),
          filter: "blur(12px)",
          autoAlpha: 0,
          duration: 1.5,
          ease: "power2.inOut",
          immediateRender: false
        }, 0.5); // Starts after reveal
      });

      // --- PHASE 2: REVEAL & DISSIPATE "formerly Nav Kanya Devi Mandir" ---
      tl.fromTo(".phase-2-text", {
        autoAlpha: 0,
        scale: 0.8,
        filter: "blur(10px)",
        y: 20
      }, {
        autoAlpha: 1,
        scale: 1,
        filter: "blur(0px)",
        y: 0,
        duration: 1.2,
        ease: "power2.out"
      }, 0.8); // Starts slightly before Phase 1 finishes

      // Hold Phase 2 briefly, then dissipate it upwards
      tl.to(".phase-2-text", {
        autoAlpha: 0,
        y: -40,
        scale: 1.1,
        filter: "blur(8px)",
        duration: 1.2,
        ease: "power2.in"
      }, 2.5);

      // --- PHASE 3: 3D FLIP REVEAL STORY LINES ---
      // We start this right as Phase 2 is disappearing
      tl.fromTo(".story-line", {
        autoAlpha: 0,
        rotationX: -90,
        y: 50,
        z: -150
      }, {
        autoAlpha: 1,
        rotationX: 0,
        y: 0,
        z: 0,
        duration: 1.5,
        stagger: 0.5,
        ease: "back.out(1.2)"
      }, 3.2);

      // Ensure scroll positions are perfectly synced on mount/navigation
      ScrollTrigger.refresh();
    },
    { scope: sectionRef }
  );

  return (
    <>
      {/* Injecting Yatra One font just for this component's scope */}
      <style dangerouslySetInnerHTML={{
        __html: `
        @import url('https://fonts.googleapis.com/css2?family=Yatra+One&display=swap');
        .font-yatra { font-family: 'Yatra One', system-ui, serif; }
      `}} />

      <section ref={sectionRef} className="relative w-full h-screen bg-[#FFFBF5] overflow-hidden">

        {/* ── Background (Pure Image, No Overlays) ───────────────── */}
        <div className="absolute inset-0 z-0 pointer-events-none origin-center" ref={bgRef}>
          <Image
            src="/images/home-page/dham-section-bg-new.png"
            alt="Sacred Atmosphere"
            fill
            priority
            className="object-cover"
          />
        </div>

        <div ref={containerRef} className="relative z-10 w-full h-full flex flex-col items-center justify-center">

          {/* ── PHASE 1: "Jai Maa Unique Dham" ───────────────────── */}
          <div className="absolute inset-0 flex flex-col md:flex-row items-center justify-center gap-2 md:gap-6 pointer-events-none px-4">
            <div className="flex items-center justify-center gap-4 md:gap-6 flex-wrap max-w-[280px] md:max-w-none">
              <span className="phase-1-word opacity-0 font-yatra text-5xl md:text-7xl lg:text-8xl text-[#1A0F0A] drop-shadow-sm">Jai</span>
              <span className="phase-1-word opacity-0 font-yatra text-5xl md:text-7xl lg:text-8xl text-[#1A0F0A] drop-shadow-sm">Maa</span>
              <span className="phase-1-word opacity-0 font-yatra text-5xl md:text-7xl lg:text-8xl text-[#e95d24] drop-shadow-sm">Unique</span>
            </div>
            <span className="phase-1-word opacity-0 font-yatra text-5xl md:text-7xl lg:text-8xl text-[#1A0F0A] drop-shadow-sm">Dham</span>
          </div>

          {/* ── PHASE 2: "formerly Nav Kanya Devi Mandir" ────────── */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none px-6 text-center">
            <h3 className="phase-2-text font-yatra text-3xl md:text-5xl text-[#1A0F0A]/80 opacity-0 tracking-wide leading-relaxed">
              formerly <br className="md:hidden" />
              <span className="text-[#e95d24]">Nav Kanya Devi</span> Mandir
            </h3>
          </div>

          {/* ── PHASE 3: The 3D Story Lines ──────────────────────── */}
          <div
            className="flex flex-col items-center justify-center gap-6 md:gap-8 text-center w-full max-w-5xl px-6"
            style={{ perspective: "1200px", transformStyle: "preserve-3d" }}
          >
            {/* Eyebrow */}
            <p className="story-line font-sans text-[0.65rem] md:text-sm tracking-[0.4em] uppercase text-[#e95d24] font-bold mb-2">
              Beyond Time & Structure
            </p>

            {/* Story Lines with Yatra One */}
            <h2 className="story-line font-yatra text-3xl md:text-5xl lg:text-6xl leading-[1.3] text-[#1A0F0A]">
              Where ancient echoes meet eternal grace.
            </h2>

            <h2 className="story-line font-yatra text-3xl md:text-5xl lg:text-6xl leading-[1.3] text-[#1A0F0A]">
              A sanctuary reborn in the divine light.
            </h2>

            <h2 className="story-line font-yatra text-3xl md:text-5xl lg:text-6xl leading-[1.3] text-[#1A0F0A]">
              Her boundless blessings await your soul.
            </h2>
          </div>

          {/* ── Prominent Scroll Indicators ─────────────────────────── */}
          <div className="absolute bottom-6 md:bottom-12 left-0 right-0 z-30 flex flex-col items-center gap-4 md:gap-6 px-6 pointer-events-none">
            <div className="bg-white/40 backdrop-blur-md border border-white/60 px-4 md:px-6 py-2 md:py-3 rounded-full flex items-center gap-3 md:gap-4 shadow-xl">
              <div className="flex flex-col items-center">
                <span className="font-body text-[9px] md:text-[11px] tracking-[0.3em] md:tracking-[0.5em] uppercase text-sacred-brown font-black whitespace-nowrap">
                  Keep Scrolling
                </span>
                <div className="w-full h-[1.5px] bg-saffron/40 mt-0.5" />
              </div>
              <div className="w-px h-5 md:h-6 bg-sacred-brown/20" />
              <motion.div 
                animate={{ y: [0, 6, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                className="text-saffron scale-75 md:scale-100"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M7 13l5 5 5-5M7 6l5 5 5-5" />
                </svg>
              </motion.div>
            </div>
            
            {/* Progress Container */}
            <div className="w-full max-w-[300px] h-[3px] bg-sacred-brown/10 rounded-full overflow-hidden backdrop-blur-sm">
              <div className="dham-progress-bar h-full bg-saffron w-0 transition-all duration-100 ease-out shadow-[0_0_12px_rgba(233,93,36,0.6)]" />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}