"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Link from "next/link";
import { ArrowRight, Sparkles, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// ----------------------------------------------------------------------
// ENRICHED DATA
// ----------------------------------------------------------------------
const pujasData = [
  {
    id: "grah-dosh",
    name: "Grah Dosh Nivaran",
    deity: "Navagraha (Nine Planets)",
    description: "A profound Vedic ritual designed to harmonize cosmic energies, pacify malefic planetary influences, and align your astrological chart for unparalleled peace and success.",
    benefits: ["Neutralizes planetary doshas", "Clears career and financial obstacles", "Restores mental peace"],
    duration: "1 day",
    image: "/images/pujas/1.jpeg",
  },
  {
    id: "aayush",
    name: "Aayush Ritual",
    deity: "Ayur Devata",
    description: "Specialized prayers and sacred fire offerings focused entirely on longevity, immense vitality, and complete physical well-being, invoking divine protection over your health.",
    benefits: ["Enhances longevity and vitality", "Aids rapid recovery from illness", "Creates a protective auric shield"],
    duration: "1 day",
    image: "/images/pujas/2.jpeg",
  },
  {
    id: "financial",
    name: "Financial Abundance",
    deity: "Maa Lakshmi & Lord Kuber",
    description: "An intense, multi-day invocation of the deities of wealth. This ritual eradicates energetic debts, removes business blockages, and opens the floodgates to lasting prosperity.",
    benefits: ["Attracts sudden wealth and opportunities", "Resolves crushing debts", "Accelerates business growth"],
    duration: "3 days",
    image: "/images/pujas/3.jpeg",
  },
  {
    id: "durga-special",
    name: "Durga Maha Puja",
    deity: "Maa Durga",
    description: "The supreme worship of the Divine Mother. Performed with fierce devotion over nine days to destroy hidden enemies, shatter black magic, and grant the worshipper invincible courage.",
    benefits: ["Destroys intense negative energies", "Grants victory over adversaries", "Instills supreme willpower"],
    duration: "9 days",
    image: "/images/pujas/4.jpeg",
  },
  {
    id: "savan-month",
    name: "Savan Shiva Journey",
    deity: "Lord Shiva",
    description: "A highly auspicious, month-long commitment involving continuous Rudrabhishek and chanting. It is the ultimate spiritual cleanse, washing away lifetimes of negative karma.",
    benefits: ["Eradicates deep karmic blockages", "Fulfills profound spiritual desires", "Elevates consciousness"],
    duration: "30 days",
    image: "/images/pujas/5.jpeg",
  }
];

// ----------------------------------------------------------------------
// BULLETPROOF COMPONENTS
// ----------------------------------------------------------------------

// Safe Word Reveal Component - NO Tailwind transforms, only GSAP
const MaskedTitle = ({ text, className = "" }: { text: string; className?: string }) => {
  return (
    <span className={`inline-block ${className}`}>
      {text.split(" ").map((word, index) => (
        <span key={index} className="inline-block overflow-hidden pb-4 mr-[0.25em] align-bottom">
          {/* GSAP will handle the initial hidden state to avoid FOUC while keeping it accessible if JS fails */}
          <span className="hero-word inline-block origin-top-left" style={{ visibility: "hidden" }}>
            {word}
          </span>
        </span>
      ))}
    </span>
  );
};

const MagneticButton = ({ children, href }: { children: React.ReactNode; href: string }) => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!buttonRef.current || !textRef.current) return;
    const { clientX, clientY } = e;
    const { height, width, left, top } = buttonRef.current.getBoundingClientRect();
    const x = clientX - (left + width / 2);
    const y = clientY - (top + height / 2);

    gsap.to(buttonRef.current, { x: x * 0.3, y: y * 0.3, duration: 1, ease: "power3.out" });
    gsap.to(textRef.current, { x: x * 0.15, y: y * 0.15, duration: 1, ease: "power3.out" });
  };

  const handleMouseLeave = () => {
    gsap.to(buttonRef.current, { x: 0, y: 0, duration: 1, ease: "elastic.out(1, 0.3)" });
    gsap.to(textRef.current, { x: 0, y: 0, duration: 1, ease: "elastic.out(1, 0.3)" });
  };

  return (
    <Link href={href} className="inline-block z-50">
      <button
        ref={buttonRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="group relative overflow-hidden flex items-center gap-4 px-10 py-5 bg-[#1A1108] text-[#FAF5ED] rounded-full font-display text-sm tracking-[0.2em] uppercase transition-all shadow-xl hover:shadow-[0_15px_30px_rgba(249,115,22,0.25)] border border-transparent hover:border-[#F97316]/50"
      >
        <div className="absolute inset-0 bg-[#F97316] rounded-full scale-0 group-hover:scale-150 transition-transform duration-700 ease-out origin-center" />
        <span ref={textRef} className="relative z-10 font-semibold flex items-center gap-3">
          {children}
          <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform duration-500" />
        </span>
      </button>
    </Link>
  );
};

// ----------------------------------------------------------------------
// MAIN CONTROLLER
// ----------------------------------------------------------------------

export default function PujaGalleryClient() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // 1. Hero Text Reveal
    gsap.fromTo(".hero-word",
      { yPercent: 120, rotate: 5, autoAlpha: 0 },
      { yPercent: 0, rotate: 0, autoAlpha: 1, duration: 1.2, stagger: 0.1, ease: "power4.out", delay: 0.1 }
    );

    gsap.fromTo(".sparkle-text",
      { autoAlpha: 0, y: 20 },
      { autoAlpha: 1, y: 0, duration: 1, ease: "power2.out" }
    );

    // 2. Scroll-Triggered Paragraph Scrub
    const scrollWords = gsap.utils.toArray<HTMLElement>(".scroll-word");
    gsap.to(scrollWords, {
      color: "#1A1108",
      stagger: 0.1,
      scrollTrigger: {
        trigger: ".intro-scroll-container",
        start: "top 85%",
        end: "bottom 60%",
        scrub: true,
      }
    });

    // 3. Sticky Card Animations
    const cards = gsap.utils.toArray<HTMLElement>(".sticky-card");

    cards.forEach((card, index) => {
      const inner = card.querySelector(".card-inner");
      const img = card.querySelector(".parallax-img");
      const textElements = card.querySelectorAll(".reveal-text");

      // Slide up content when card enters
      gsap.fromTo(textElements,
        { y: 50, autoAlpha: 0 },
        {
          y: 0, autoAlpha: 1, duration: 1, stagger: 0.1, ease: "power3.out",
          scrollTrigger: { trigger: card, start: "top 70%" }
        }
      );

      // Inner Image Parallax
      if (img) {
        gsap.fromTo(img,
          { yPercent: -10 },
          {
            yPercent: 10, ease: "none",
            scrollTrigger: { trigger: card, start: "top bottom", end: "bottom top", scrub: true }
          }
        );
      }

      // Stacking Shrink Effect
      const nextCard = cards[index + 1];
      if (nextCard && inner) {
        gsap.to(inner, {
          scale: 0.92,
          opacity: 0.4,
          yPercent: -4,
          ease: "none",
          scrollTrigger: {
            trigger: nextCard,
            start: "top bottom",
            end: "top top",
            scrub: true,
          }
        });
      }
    });
  }, { scope: containerRef });

  return (
    <div className="bg-[#FAF5ED] text-[#1A1108] selection:bg-[#F97316] selection:text-white font-body" ref={containerRef}>

      {/* =========================================================
          HERO & SCROLL INTRO SECTION (FIXED SPACING)
          ========================================================= */}
      <section className="pt-32 pb-24 px-6 max-w-[1400px] mx-auto w-full flex flex-col items-center">

        {/* Title Area */}
        <div className="text-center w-full flex flex-col items-center">
          <span className="sparkle-text flex items-center justify-center gap-3 font-body text-xs tracking-[0.4em] uppercase text-[#F97316] font-bold mb-8" style={{ visibility: "hidden" }}>
            <Sparkles className="w-4 h-4" /> Spiritual Awakenings <Sparkles className="w-4 h-4" />
          </span>

          <h1 className="font-display text-5xl md:text-7xl lg:text-[8rem] tracking-tighter mb-4 leading-[1.1] uppercase">
            <MaskedTitle text="SACRED" /> <br />
            <span className="italic font-light text-[#F97316]">
              <MaskedTitle text="RITUALS" />
            </span>
          </h1>
        </div>

        {/* Scroll-Triggered Text Block (Moved up to remove the massive gap) */}
        <div className="intro-scroll-container max-w-4xl mx-auto mt-16 md:mt-24 px-4 text-center">
          <p className="font-display text-3xl md:text-5xl leading-[1.3] text-[#1A1108]">
            {"Every ritual is a doorway to the divine. Experience profound transformation through authentic Vedic practices, designed to align your soul with cosmic abundance.".split(" ").map((word, i) => (
              <span key={i} className="scroll-word inline-block mr-[0.25em] text-[#1A1108]/20 transition-colors duration-100">
                {word}
              </span>
            ))}
          </p>
        </div>
      </section>

      {/* =========================================================
          STICKY STACK CARDS (STRICT 1400px WIDTH)
          ========================================================= */}
      <section className="relative w-full pb-[15vh]">
        {pujasData.map((puja, index) => {
          const isEven = index % 2 === 0;

          return (
            <div
              key={puja.id}
              className="sticky-card sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden bg-[#FAF5ED]"
              style={{ zIndex: index }}
            >
              <div className="card-inner w-full max-w-[1400px] mx-auto h-full flex flex-col lg:flex-row items-center justify-between px-6 md:px-12 py-12 gap-10 lg:gap-16 transform origin-top">

                {/* TEXT CONTENT */}
                <div className={cn("w-full lg:w-[48%] flex flex-col justify-center z-10", !isEven && "lg:order-2")}>

                  {/* Meta Details */}
                  <div className="reveal-text flex items-center gap-6 mb-8" style={{ visibility: "hidden" }}>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-[2px] bg-[#F97316]" />
                      <span className="font-body text-[#1A1108]/60 tracking-[0.3em] uppercase text-[10px] md:text-xs font-bold">
                        {puja.duration}
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-1 h-1 rounded-full bg-[#1A1108]/30" />
                      <span className="font-body text-[#F97316] tracking-[0.2em] uppercase text-[10px] md:text-xs font-bold">
                        {puja.deity}
                      </span>
                    </div>
                  </div>

                  {/* Title */}
                  <h2 className="reveal-text font-display text-4xl md:text-6xl text-[#1A1108] mb-6 leading-[1.1] tracking-tight" style={{ visibility: "hidden" }}>
                    {puja.name}
                  </h2>

                  {/* Description */}
                  <p className="reveal-text font-body text-[#1A1108]/70 text-base md:text-lg leading-relaxed mb-8" style={{ visibility: "hidden" }}>
                    {puja.description}
                  </p>

                  {/* Benefits List */}
                  <div className="reveal-text mb-10 space-y-3 border-l-2 border-[#1A1108]/10 pl-5" style={{ visibility: "hidden" }}>
                    {puja.benefits.map((benefit, i) => (
                      <div key={i} className="flex items-center gap-3">
                        <CheckCircle2 className="w-4 h-4 text-[#F97316] shrink-0" />
                        <span className="font-body text-sm md:text-base text-[#1A1108]/80">{benefit}</span>
                      </div>
                    ))}
                  </div>

                  {/* Action Button */}
                  <div className="reveal-text pt-2" style={{ visibility: "hidden" }}>
                    <MagneticButton href={`/puja-booking/${puja.id}`}>
                      Reserve Ritual
                    </MagneticButton>
                  </div>
                </div>

                {/* IMAGE CONTENT */}
                <div className={cn("w-full lg:w-[45%] h-[40vh] lg:h-[70vh] relative overflow-hidden rounded-[2rem] shadow-[0_20px_60px_rgba(26,17,8,0.12)] border border-[#1A1108]/5", !isEven && "lg:order-1")}>
                  <div
                    className="parallax-img absolute -top-[15%] -bottom-[15%] left-0 right-0 w-full bg-cover bg-center"
                    style={{ backgroundImage: `url(${puja.image})` }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1A1108]/30 via-transparent to-transparent" />

                  <div className="absolute bottom-6 right-6 md:bottom-10 md:right-10 font-display text-6xl md:text-8xl leading-none text-white/50 mix-blend-overlay drop-shadow-xl select-none">
                    0{index + 1}
                  </div>
                </div>

              </div>
            </div>
          );
        })}
      </section>

      {/* =========================================================
          OUTRO SECTION
          ========================================================= */}
      <section className="h-[70vh] flex flex-col items-center justify-center bg-[#1A1108] text-[#FAF5ED] relative z-50">
        <h2 className="font-display text-4xl md:text-7xl tracking-tight text-center leading-[1.2] mb-10 px-6">
          Begin your <br />
          <span className="text-[#F97316] italic font-light">transformation.</span>
        </h2>
      </section>
    </div>
  );
}