"use client";

/**
 * CinematicStorySection
 * ─────────────────────────────────────────────────────────────────────────────
 * Awwwards-level Full-Screen Horizontal Wipe + Scattering Image Collapse
 *
 * Layout:
 * - Text is perfectly centered on the screen.
 * - Photos start scattered in the background. As you scroll, they collapse and
 *   stick together behind the text.
 * - Continuing to scroll triggers the next chapter to wipe in from the right edge,
 *   completely covering the current chapter.
 */

import React, { useRef, useMemo } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { motion } from "framer-motion";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const CHAPTERS = [
  {
    id: "awakening",
    num: "01",
    sanskrit: "आवाहन",
    title: "THE CALL",
    titleAccent: "OF SHAKTI",
    body: "In the serene heights of the Himalayas, Her divine presence echoes across eternal mists. The mountains tremble in reverence as Maa Durga awakens the soul of every seeker.",
    part: "part 1",
    accent: "#C41E3A",
  },
  {
    id: "sadhana",
    num: "02",
    sanskrit: "साधना",
    title: "ETERNAL",
    titleAccent: "SADHANA",
    body: "Upholding five centuries of Sanatan rites — from Kumari Puja to the Navpatrika. Every chant, every flame, every offered flower resonates with Her fierce and boundless grace.",
    part: "part 2",
    accent: "#E8860C",
  },
  {
    id: "darshan",
    num: "03",
    sanskrit: "दर्शन",
    title: "HER DIVINE",
    titleAccent: "EMBRACE",
    body: "At this sacred confluence of devotion and silence, time dissolves. Surrender at Her lotus feet and be held in the golden warmth of Her boundless, eternal compassion.",
    part: "part 3",
    accent: "#E5B869",
  },
] as const;

// Deterministic particles
function buildParticles(n: number) {
  return Array.from({ length: n }, (_, i) => ({
    id: i,
    cx: ((i * 79 + 11) % 97).toFixed(1),
    cy: ((i * 53 + 19) % 95).toFixed(1),
    r: (0.8 + (i % 4) * 0.5).toFixed(1),
    delay: ((i * 0.37) % 5).toFixed(2),
    dur: (5 + (i % 7)).toFixed(0),
  }));
}

export function CinematicStorySection({ 
  sequences 
}: { 
  sequences: { [key: string]: string[] } 
}) {
  const sectionRef = useRef<HTMLElement>(null);
  const particles = useMemo(() => buildParticles(30), []);

  useGSAP(
    () => {
      if (!sectionRef.current) return;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          pin: true,
          anticipatePin: 1, // Prevents slight jerk on pin entry
          scrub: 1, // Smooth scrub
          start: "top top",
          end: `+=${CHAPTERS.length * 300}%`, // 3 screens of scroll per chapter
          invalidateOnRefresh: true,
          refreshPriority: 1,
          onUpdate: (self) => {
            const progress = self.progress * 100;
            gsap.set(".cs-progress-bar", { width: `${progress}%` });
          }
        },
      });

      // ── Initial Setup ─────────────────────────────────────────────────
      CHAPTERS.forEach((ch, i) => {
        // Panels 1 and 2 start off-screen right, Panel 0 is visible
        if (i > 0) {
          gsap.set(`.cs-panel-${i}`, { xPercent: 100 });
        }

        // Set vertical strips initially hidden via clip-path
        const strips = gsap.utils.toArray<HTMLElement>(`.cs-strip-${ch.id}`);
        if (strips.length > 0) {
          const isMobile = window.innerWidth < 768;
          // Set initial clipPath for ALL chapters to ensure they all have a "reveal" animation
          gsap.set(strips, { clipPath: isMobile ? "inset(0% 100% 0% 0%)" : "inset(100% 0% 0% 0%)" });
          
          const imgs = gsap.utils.toArray<HTMLElement>(`.cs-strip-${ch.id} img`);
          gsap.set(imgs, { scale: 1.2 });
        }
      });

      // ── Master Wipe Timeline ──────────────────────────────────────────
      CHAPTERS.forEach((ch, i) => {
        const strips = gsap.utils.toArray<HTMLElement>(`.cs-strip-${ch.id}`);
        const imgs = gsap.utils.toArray<HTMLElement>(`.cs-strip-${ch.id} img`);

        // 1. Reveal vertical strips
        if (strips.length > 0) {
          tl.to(
            strips,
            {
              clipPath: "inset(0% 0% 0% 0%)",
              duration: 1.5,
              stagger: { each: 0.1, from: "center" },
              ease: "power3.inOut",
            }
          );
          
          tl.to(
            imgs,
            {
              scale: 1,
              duration: 2,
              ease: "power3.out",
              stagger: { each: 0.1, from: "center" },
            },
            "<" // Sync with strip reveal
          );
        } else {
          // Placeholder timeline gap
          tl.to({}, { duration: 1.5 });
        }

        // 2. Add breathing room to read text and admire photos
        tl.to({}, { duration: 1.0 });

        // 3. Wipe in the NEXT chapter
        if (i < CHAPTERS.length - 1) {
          tl.to(
            `.cs-panel-${i + 1}`,
            {
              xPercent: 0,
              duration: 1.5,
              ease: "power3.inOut",
            }
          );
        }
      });

      // 4. Add a final hold at the end of the section so the last chapter 
      // stays pinned for a moment before the next section arrives
      tl.to({}, { duration: 2.0 });

      // Force a refresh to ensure positions are correct immediately
      ScrollTrigger.refresh();
    },
    { scope: sectionRef }
  );

  return (
    <section ref={sectionRef} className="cs-section bg-black relative w-full h-[100svh] overflow-hidden">
      
      {/* ── Background Elements (Persistent) ─────────────────────────── */}
      <div className="cs-grain" aria-hidden />
      <div className="cs-particles" aria-hidden>
        <svg width="100%" height="100%">
          {particles.map((p) => (
            <circle
              key={p.id}
              cx={`${p.cx}%`}
              cy={`${p.cy}%`}
              r={p.r}
              fill="#E5B869"
              style={{
                animation: `csParticle ${p.dur}s ease-in-out ${p.delay}s infinite alternate`,
                opacity: 0,
              }}
            />
          ))}
        </svg>
      </div>

      {/* ── Chapter Panels ────────────────────────────────────────────── */}
      {CHAPTERS.map((ch, i) => {
        const imgs = sequences[ch.part];

        return (
          <div
            key={ch.id}
            className={`cs-panel-${i} absolute inset-0 w-full h-full overflow-hidden bg-black shadow-[-20px_0_50px_rgba(0,0,0,0.8)]`}
            style={{ zIndex: i + 10 }} // Higher chapters cover lower ones
          >
            {/* ── Photo Layer (Behind Text) ──────────────────────────── */}
            <div className="absolute inset-0 z-0 flex flex-col md:flex-row pointer-events-none w-full h-full">
              {imgs && imgs.length > 0 ? (
                imgs.map((src, idx) => (
                  <div key={`${ch.id}-${idx}`} className="flex-1 overflow-hidden relative border-b md:border-b-0 md:border-r border-white/5 last:border-b-0 md:last:border-r-0">
                    <div
                      className={`cs-strip-${ch.id} absolute inset-0 w-full h-full`}
                    >
                      <img
                        src={src}
                        alt={`${ch.title} photo ${idx}`}
                        className="absolute inset-0 w-full h-full object-cover"
                      />
                    </div>
                  </div>
                ))
              ) : (
                <div
                  className={`absolute inset-0 flex items-center justify-center`}
                >
                  <p className="text-zinc-500 font-mono text-sm text-center tracking-widest px-6">
                    ADD IMAGES TO FOLDER <br />
                    <span className="text-white/60 mt-2 block font-sans">public/sequence/{ch.part}</span>
                  </p>
                </div>
              )}
            </div>

            {/* ── Cloudy Glow Behind Text ────────────────────────────── */}
            <div className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none">
              <div className="w-[95vw] h-[65vh] md:w-[65vw] md:h-[55vh] bg-black/80 blur-[100px] rounded-full" />
            </div>

            {/* ── Centered Text Layer ────────────────────────────────── */}
            <div className="relative z-20 w-full h-full flex flex-col items-center justify-center px-6 md:px-12 pointer-events-auto">
              <div
                className="text-center max-w-4xl"
                style={{
                  // "Slight white glow" so image is readable, with strong black drop shadow for contrast
                  textShadow: "0 0 25px rgba(255,255,255,0.15), 0 4px 20px rgba(0,0,0,0.9)",
                }}
              >
                <div className="cs-num flex justify-center items-center gap-4 mb-4">
                  <span style={{ color: ch.accent }}>—</span>
                  <span className="tracking-[0.5em] text-white/70 text-xs md:text-sm">CHAPTER {ch.num}</span>
                  <span style={{ color: ch.accent }}>—</span>
                </div>

                <div className="cs-sanskrit text-3xl md:text-5xl text-white/40 mb-2">{ch.sanskrit}</div>

                <div
                  className="cs-divider mx-auto my-6 w-16 h-[2px]"
                  style={{
                    background: `linear-gradient(90deg, transparent, ${ch.accent}, transparent)`,
                  }}
                />

                <h2 className="cs-title text-5xl md:text-8xl font-black text-white mb-2 leading-none">
                  {ch.title}
                </h2>
                <h2
                  className="cs-title-accent text-4xl md:text-7xl font-black italic mb-6 leading-none"
                  style={{
                    background: `linear-gradient(135deg, ${ch.accent}, #FFD700)`,
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  {ch.titleAccent}
                </h2>

                <p className="cs-body text-base md:text-xl text-white/90 leading-relaxed font-medium mx-auto max-w-2xl drop-shadow-xl">
                  {ch.body}
                </p>

                <div className="cs-cta mt-8 flex justify-center items-center gap-4">
                  <span className="cs-cta-line w-8 h-[1px] opacity-60" style={{ background: ch.accent }} />
                  <span className="cs-cta-text tracking-[0.4em] text-xs font-bold" style={{ color: ch.accent }}>
                    ◊ &nbsp; DISCOVER &nbsp; ◊
                  </span>
                  <span className="cs-cta-line w-8 h-[1px] opacity-60" style={{ background: ch.accent }} />
                </div>
              </div>
            </div>

            {/* ── Prominent Scroll Indicators ─────────────────────────── */}
            <div className="absolute bottom-6 md:bottom-10 left-0 right-0 z-50 flex flex-col items-center gap-4 md:gap-6 px-6 pointer-events-none">
              <div className="bg-black/40 backdrop-blur-md border border-white/20 px-5 md:px-8 py-2.5 md:py-4 rounded-full flex items-center gap-4 md:gap-6 shadow-2xl">
                <div className="flex flex-col items-center">
                  <span className="font-sans text-[9px] md:text-[11px] tracking-[0.4em] md:tracking-[0.6em] uppercase text-white font-black opacity-90 whitespace-nowrap">
                    Scroll the Journey
                  </span>
                  <div className="w-full h-[1.5px] mt-0.5" style={{ backgroundColor: ch.accent, opacity: 0.5 }} />
                </div>
                <div className="w-px h-6 md:h-8 bg-white/20" />
                <motion.div 
                  animate={{ y: [0, 8, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                  style={{ color: ch.accent }}
                  className="scale-75 md:scale-100"
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M7 13l5 5 5-5M7 6l5 5 5-5" />
                  </svg>
                </motion.div>
              </div>
              
              {/* Progress Container */}
              <div className="w-full max-w-[280px] md:max-w-[400px] h-[3px] md:h-[4px] bg-white/10 rounded-full overflow-hidden backdrop-blur-sm">
                <div className="cs-progress-bar h-full w-0 transition-all duration-100 ease-out shadow-[0_0_15px_rgba(255,255,255,0.4)]" style={{ backgroundColor: ch.accent }} />
              </div>
              
              <div className="text-[8px] md:text-[10px] tracking-[0.3em] md:tracking-[0.5em] uppercase text-white/50 font-bold">
                Sequence Progress
              </div>
            </div>
          </div>
        );
      })}
    </section>
  );
}
