"use client";

import Stack from "@/components/ui/stack";
import { BlurFade } from "@/components/ui/blur-fade";

const images = [
  "https://images.unsplash.com/photo-1480074568708-e7b720bb3f09?q=80&w=500&auto=format",
  "https://images.unsplash.com/photo-1449844908441-8829872d2607?q=80&w=500&auto=format",
  "https://images.unsplash.com/photo-1452626212852-811d58933cae?q=80&w=500&auto=format",
  "https://images.unsplash.com/photo-1572120360610-d971b9d7767c?q=80&w=500&auto=format"
];

export function GallerySection() {
  return (
    <section className="relative py-32 px-6 bg-sacred-premium-gradient overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16 flex flex-col items-center">
          <BlurFade delay={0.2}>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-px bg-saffron/60" />
              <span className="font-body text-[10px] tracking-[0.4em] uppercase text-saffron font-bold">
                Sacred Glimpses
              </span>
              <div className="w-8 h-px bg-saffron/60" />
            </div>
            <h2 className="font-display text-4xl md:text-5xl text-sacred-brown leading-[1.1]">
              Divine <span className="italic text-gradient-saffron font-bold">Gallery.</span>
            </h2>
          </BlurFade>
        </div>

        <BlurFade delay={0.4}>
          <div className="flex justify-center items-center h-[400px]">
            <div style={{ width: 300, height: 300 }}>
              <Stack
                randomRotation={true}
                sensitivity={180}
                sendToBackOnClick={true}
                cards={images.map((src, i) => (
                  <img 
                    key={i} 
                    src={src} 
                    alt={`card-${i + 1}`} 
                    className="w-full h-full object-cover shadow-2xl border-4 border-ivory rounded-2xl pointer-events-none"
                  />
                ))}
              />
            </div>
          </div>
        </BlurFade>
      </div>
    </section>
  );
}
