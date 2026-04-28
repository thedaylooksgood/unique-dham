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

import React, { useRef, useMemo, useState, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { getSequences } from "@/app/actions/getSequences";

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

export function CinematicStorySection() {
  const sectionRef = useRef<HTMLElement>(null);
  const particles = useMemo(() => buildParticles(30), []);

  const [sequences, setSequences] = useState<{ [key: string]: string[] }>({
    "part 1": [],
    "part 2": [],
    "part 3": [],
  });

  // Fetch sequence photos from folders automatically
  useEffect(() => {
    async function fetchAll() {
      const p1 = await getSequences("part 1");
      const p2 = await getSequences("part 2");
      const p3 = await getSequences("part 3");
      setSequences({ "part 1": p1, "part 2": p2, "part 3": p3 });
    }
    fetchAll();
  }, []);

  useGSAP(
    () => {
      if (!sectionRef.current) return;

      // Clean up previous instances
      ScrollTrigger.getAll().forEach((st) => {
        if (st.trigger === sectionRef.current) st.kill();
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          pin: true,
          scrub: 1, // Smooth scrub
          start: "top top",
          end: `+=${CHAPTERS.length * 200}%`, // 2 screens of scroll per chapter
          invalidateOnRefresh: true,
        },
      });

      // ── Initial Setup ─────────────────────────────────────────────────
      CHAPTERS.forEach((ch, i) => {
        // Panels 1 and 2 start off-screen right
        if (i > 0) {
          gsap.set(`.cs-panel-${i}`, { xPercent: 100 });
        }

        // Set vertical strips initially hidden via clip-path
        const strips = gsap.utils.toArray<HTMLElement>(`.cs-strip-${ch.id}`);
        if (strips.length > 0) {
          gsap.set(strips, { clipPath: "inset(100% 0% 0% 0%)" });
          
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

      return () => ScrollTrigger.getAll().forEach((t) => t.kill());
    },
    { scope: sectionRef, dependencies: [sequences] }
  );

  return (
    <section ref={sectionRef} className="cs-section bg-[#07030A] relative w-full h-screen overflow-hidden">
      
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
            className={`cs-panel-${i} absolute inset-0 w-full h-full overflow-hidden bg-[#07030A] shadow-[-20px_0_50px_rgba(0,0,0,0.8)]`}
            style={{ zIndex: i + 10 }} // Higher chapters cover lower ones
          >
            {/* ── Photo Layer (Behind Text) ──────────────────────────── */}
            <div className="absolute inset-0 z-0 flex pointer-events-none w-full h-full">
              {imgs && imgs.length > 0 ? (
                imgs.map((src, idx) => (
                  <div key={`${ch.id}-${idx}`} className="flex-1 h-full overflow-hidden relative border-r border-white/5 last:border-r-0">
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

            {/* ── Vignette to ensure text readability ────────────────── */}
            <div className="absolute inset-0 z-10 bg-radial-gradient from-transparent to-black/60 pointer-events-none" />

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

            {/* ── Scroll hint (Only on first panel or global) ────────── */}
            {i === 0 && (
              <div className="absolute bottom-8 right-8 z-50 flex items-center gap-3">
                <span className="uppercase tracking-widest text-xs text-white/40">Scroll Sequence</span>
                <div className="cs-scroll-wheel">
                  <div className="cs-scroll-dot" />
                </div>
              </div>
            )}
          </div>
        );
      })}
    </section>
  );
}
