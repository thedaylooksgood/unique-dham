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
    <section className="relative py-32 bg-transparent overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <BlurFade delay={0.2}>
            <span className="font-body text-xs tracking-[0.3em] uppercase text-saffron font-bold mb-4 block">
              ◊ Sacred Glimpses ◊
            </span>
            <h2 className="font-display text-4xl md:text-5xl text-sacred-brown">
              DIVINE GALLERY
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
