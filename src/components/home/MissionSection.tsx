"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import { BlurFade } from "@/components/ui/blur-fade";
import { AnimatedShinyText } from "@/components/ui/animated-shiny-text";

export function MissionSection() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["-20%", "20%"]);

  return (
    <section ref={ref} className="relative py-48 bg-sacred-premium-gradient overflow-hidden">
      {/* Parallax Background Image */}
      <motion.div 
        style={{ y }}
        className="absolute inset-0 z-0 h-[140%] -top-[20%]"
      >
        <Image
          src="https://images.unsplash.com/photo-1549216068-d6211028f30b?q=80&w=1200&auto=format&fit=crop"
          alt="Sacred Mountains of Darjeeling"
          fill
          className="object-cover opacity-10"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-sacred-pink via-transparent to-sacred-pink" />
      </motion.div>

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <BlurFade delay={0.2}>
          <div className="flex items-center justify-center mb-10">
            <div className="group rounded-full border border-saffron/20 bg-saffron/5 px-6 py-1.5 transition-all">
              <AnimatedShinyText className="font-body text-xs font-semibold tracking-[0.3em] uppercase text-saffron">
                <span>◊ DARJEELING TO THE WORLD ◊</span>
              </AnimatedShinyText>
            </div>
          </div>
          
          <h2 className="font-display text-5xl md:text-7xl text-sacred-brown leading-tight mb-10 tracking-tight">
            REVIVING SHAKTI.
            <br />
            <span className="text-saffron italic">GUIDING SOULS.</span>
          </h2>
        </BlurFade>

        <BlurFade delay={0.4}>
          <p className="font-body text-xl text-warm-umber/80 leading-relaxed mb-16 mx-auto max-w-2xl">
            Our mission is to sustain Dharma and awaken the divine presence in every seeking heart, 
            bridging the ancient sanctity of the misty hills with the modern seeker.
          </p>
        </BlurFade>

        <div className="flex flex-wrap justify-center gap-6">
          {["Purity", "Authenticity", "Devotion"].map((value, idx) => (
            <BlurFade key={value} delay={0.6 + idx * 0.1}>
              <div className="px-8 py-3 border border-saffron/30 rounded-full font-display text-sm tracking-widest uppercase text-sacred-brown/90 bg-white/50 backdrop-blur-sm transition-all hover:bg-saffron/10 hover:border-saffron">
                {value}
              </div>
            </BlurFade>
          ))}
        </div>
      </div>
    </section>
  );
}
