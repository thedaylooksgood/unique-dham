"use client";

import { TextReveal } from "@/components/ui/text-reveal";
import { BlurFade } from "@/components/ui/blur-fade";

export function PhilosophySection() {
  return (
    <section className="relative bg-sacred-orange overflow-hidden">
      {/* Immersive TextReveal Section (adds scroll height) */}
      <TextReveal 
        children="Maa does not belong to a place. She reaches wherever she is called with truth. No seeker feels distant. No devotion goes unheard. No faith remains unanswered." 
        className="text-sacred-brown"
      />

      {/* Philosophy Sub-footer (reveals when scroll ends) */}
      <div className="max-w-4xl mx-auto px-6 py-20 text-center">
        <BlurFade inView>
          <div className="inline-block w-12 h-1 bg-saffron/40 mb-10" />
          <h3 className="font-display text-2xl text-sacred-brown tracking-[0.2em] uppercase">
            — The Philosophy —
          </h3>
          <div className="flex flex-wrap justify-center gap-x-10 gap-y-4 mt-10">
            {["Purity", "Authenticity", "Devotion"].map((v) => (
              <span key={v} className="font-body text-saffron/60 tracking-widest uppercase text-sm">
                ✦ {v}
              </span>
            ))}
          </div>
        </BlurFade>
      </div>

      {/* Decorative ornaments */}
      <div className="absolute top-0 left-0 w-full h-40 bg-gradient-to-b from-ivory to-transparent" />
      <div className="absolute bottom-0 left-0 w-full h-40 bg-gradient-to-t from-ivory to-transparent" />
    </section>
  );
}
