"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { BlurFade } from "@/components/ui/blur-fade";
import { ShineBorder } from "@/components/ui/shine-border";
import { TextAnimate } from "@/components/ui/text-animate";

const navaDurga = [
  {
    id: 1,
    name: "Shailaputri",
    sanskrit: "शैलपुत्री",
    subtitle: "Daughter of the Mountain",
    description: "She who begins the journey of spiritual ascension.",
    image: "https://images.unsplash.com/photo-1590425713433-874251786d5e?q=80&w=400&auto=format&fit=crop"
  },
  {
    id: 2,
    name: "Brahmacharini",
    sanskrit: "ब्रह्मचारिणी",
    subtitle: "The Ascetic",
    description: "The ultimate embodiment of penance and devotion.",
    image: "https://images.unsplash.com/photo-1620023640954-20164923e32e?q=80&w=400&auto=format&fit=crop"
  },
  {
    id: 3,
    name: "Chandraghanta",
    sanskrit: "चन्द्रघण्टा",
    subtitle: "The Moon-Bell",
    description: "The destroyer of obstacles with the sound of the moon-bell.",
    image: "https://images.unsplash.com/photo-1582555172866-9137e24683fb?q=80&w=400&auto=format&fit=crop"
  },
  {
    id: 4,
    name: "Kushmanda",
    sanskrit: "कूष्माण्डा",
    subtitle: "The Cosmic Creator",
    description: "The creator of the universe with her divine smile.",
    image: "https://images.unsplash.com/photo-1614728263952-84ea206f25dc?q=80&w=400&auto=format&fit=crop"
  },
  {
    id: 5,
    name: "Skandamata",
    sanskrit: "स्कन्दमाता",
    subtitle: "Mother of Skanda",
    description: "The nurturing mother of the celestial warrior.",
    image: "https://images.unsplash.com/photo-1590425713433-874251786d5e?q=80&w=400&auto=format&fit=crop"
  },
  {
    id: 6,
    name: "Katyayani",
    sanskrit: "कात्यायनी",
    subtitle: "The Warrior",
    description: "The fierce defender of righteousness and truth.",
    image: "https://images.unsplash.com/photo-1620023640954-20164923e32e?q=80&w=400&auto=format&fit=crop"
  },
  {
    id: 7,
    name: "Kaalratri",
    sanskrit: "कालरात्रि",
    subtitle: "The Dark Night",
    description: "The destroyer of ignorance and evil in all forms.",
    image: "https://images.unsplash.com/photo-1582555172866-9137e24683fb?q=80&w=400&auto=format&fit=crop"
  },
  {
    id: 8,
    name: "Mahagauri",
    sanskrit: "महागौरी",
    subtitle: "The Radiant One",
    description: "The embodiment of purity and eternal serenity.",
    image: "https://images.unsplash.com/photo-1614728263952-84ea206f25dc?q=80&w=400&auto=format&fit=crop"
  },
  {
    id: 9,
    name: "Siddhidatri",
    sanskrit: "सिद्धिदात्री",
    subtitle: "Giver of Perfections",
    description: "The bestower of all spiritual attainments and success.",
    image: "https://images.unsplash.com/photo-1620023640954-20164923e32e?q=80&w=400&auto=format&fit=crop"
  }
];

export function NavaDurgaSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollXProgress } = useScroll({ container: containerRef });

  return (
    <section className="relative py-32 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 mb-16">
        <BlurFade delay={0.2} text-center="true">
          <div className="text-center">
            <span className="font-body text-xs tracking-[0.3em] uppercase text-saffron font-bold mb-4 block">
              ◊ The Nine Divine Forms ◊
            </span>
            <TextAnimate animation="slideUp" duration={0.8} className="font-display text-4xl md:text-5xl lg:text-6xl text-sacred-brown mb-6">
              NAVA DURGA — नवदुर्गा
            </TextAnimate>
            <p className="font-body text-lg text-warm-umber/70 max-w-2xl mx-auto italic">
              "Each form carries a unique shakti, a unique teaching, and a unique blessing for the seeker on their path to truth."
            </p>
          </div>
        </BlurFade>
      </div>

      {/* Horizontal Scroll Gallery */}
      <div className="relative group">
        <div 
          ref={containerRef}
          className="flex gap-8 overflow-x-auto pb-12 px-12 md:px-24 no-scrollbar cursor-grab active:cursor-grabbing scroll-smooth"
        >
          {navaDurga.map((durga, idx) => (
            <BlurFade key={durga.id} delay={0.3 + idx * 0.1}>
              <ShineBorder
                className="relative flex h-[500px] w-80 shrink-0 flex-col items-center justify-center overflow-hidden rounded-3xl bg-transparent shadow-xl"
                shineColor={["#E8860C", "#C41E3A", "#D4443B"]}
              >
                <div className="relative h-full w-full">
                  <Image
                    src={durga.image}
                    alt={durga.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-sacred-brown via-sacred-brown/40 to-transparent p-8 text-ivory">
                    <span className="font-sacred text-2xl text-saffron block mb-1">
                      {durga.sanskrit}
                    </span>
                    <h4 className="font-display text-2xl mb-1">
                      {durga.name}
                    </h4>
                    <span className="font-body text-xs uppercase tracking-widest text-saffron/80 block mb-4">
                      {durga.subtitle}
                    </span>
                    <p className="font-body text-sm text-ivory/70 leading-relaxed">
                      {durga.description}
                    </p>
                  </div>
                </div>
              </ShineBorder>
            </BlurFade>
          ))}
        </div>

        {/* Scroll Progress indicator */}
        <div className="max-w-xs mx-auto flex items-center justify-center gap-2 text-saffron/40 font-body text-xs mt-4">
          <span className="animate-pulse">← drag to explore →</span>
        </div>
      </div>
    </section>
  );
}
