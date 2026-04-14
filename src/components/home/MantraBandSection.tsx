"use client";

import { Marquee } from "@/components/ui/marquee";
import { ScrollVelocityContainer, ScrollVelocityRow } from "@/components/ui/scroll-based-velocity";
import { Diamond } from "lucide-react";

const mantrasUpper = [
  "ॐ नमो दुर्गायै नमः",
  "जय माँ दुर्गा",
  "या देवी सर्वभूतेषु शक्ति रूपेण संस्थिता",
  "ॐ ऐं ह्रीं क्लीं चामुण्डायै विच्चे",
  "ॐ सर्वमंगल मांगल्ये शिवे सर्वार्थ साधिके",
];

const mantrasLower = [
  "Om Namo Durgayai Namah",
  "Jaya Maa Durga",
  "Ya Devi Sarvabhuteshu Shakti Rupena Samsthita",
  "Om Aim Hrim Klim Chamundayai Vicce",
  "Sarva Mangala Mangalye Shive Sarvartha Sadhike",
];

export function MantraBandSection() {
  return (
    <div className="relative border-y border-saffron/10 bg-saffron/5 py-6 overflow-hidden">
      {/* Upper Row: Devanagari Mantras */}
      <Marquee pauseOnHover className="[--duration:40s]">
        {mantrasUpper.map((mantra, i) => (
          <div key={i} className="flex items-center gap-10 px-4">
            <span className="font-sacred text-2xl md:text-3xl text-saffron/60">
              {mantra}
            </span>
            <Diamond className="w-3 h-3 text-saffron/30 fill-saffron/10" />
          </div>
        ))}
      </Marquee>

      {/* Center Row: Velocity Scrolling Mantras (Interactive) */}
      <div className="py-2 border-y border-saffron/5">
        <ScrollVelocityContainer>
          <ScrollVelocityRow 
            baseVelocity={5}
            className="font-display text-4xl md:text-6xl uppercase tracking-tighter text-saffron/10"
          >
            MAA UNIQUE DHAM ✧ DARJEELING ✧ SPIRITUAL AWAKENING ✧
          </ScrollVelocityRow>
        </ScrollVelocityContainer>
      </div>

      {/* Lower Row: English Transliterations */}
      <Marquee reverse pauseOnHover className="[--duration:50s]">
        {mantrasLower.map((mantra, i) => (
          <div key={i} className="flex items-center gap-10 px-4">
            <span className="font-body text-base md:text-lg uppercase tracking-widest text-saffron/40">
              {mantra}
            </span>
            <Diamond className="w-2 h-2 text-saffron/20 fill-saffron/5" />
          </div>
        ))}
      </Marquee>

      {/* Subtle Gradient Overlays for smooth edges */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-1/6 bg-gradient-to-r from-ivory to-transparent z-10" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-1/6 bg-gradient-to-l from-ivory to-transparent z-10" />
    </div>
  );
}
