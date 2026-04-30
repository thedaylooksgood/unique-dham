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
    <section ref={ref} className="relative py-48 bg-transparent overflow-hidden">
      {/* Parallax Background Image */}
      <motion.div 
        style={{ y }}
        className="absolute inset-0 z-0 h-[140%] -top-[20%]"
      >
        <Image
          src="/images/home-page/darjeeling-section-bg.png"
          alt="Sacred Darjeeling Mountains"
          fill
          className="object-cover"
          priority
          unoptimized
        />
        {/* Subtle blending overlays removed to respect the branded image */}
      </motion.div>

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <BlurFade delay={0.2}>
          <div className="flex flex-col items-center mb-10">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-px bg-saffron/60" />
              <span className="font-body text-[10px] tracking-[0.4em] uppercase text-saffron font-bold">
                Darjeeling to the World
              </span>
              <div className="w-8 h-px bg-saffron/60" />
            </div>
            
            <h2 className="font-display text-4xl md:text-5xl text-sacred-brown leading-[1.1] tracking-tight">
              Reviving Shakti.
              <br />
              <span className="italic text-gradient-saffron font-bold">Guiding Souls.</span>
            </h2>
          </div>
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
