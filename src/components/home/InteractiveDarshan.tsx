"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import Image from "next/image";
import { ShineBorder } from "@/components/ui/shine-border";
import { MagicCard } from "@/components/ui/magic-card";
import { Particles } from "@/components/ui/particles";
import { BorderBeam } from "@/components/ui/border-beam";

interface InteractiveDarshanProps {
  imageSrc?: string;
  altText?: string;
  shineColor?: string[];
}

export function InteractiveDarshan({
  imageSrc = "/images/home-page/intro.jpeg",
  altText = "Immortal presence of Maa",
  shineColor = ["#E8860C", "#C41E3A", "#D4443B"],
}: InteractiveDarshanProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1, ease: "easeOut" }}
      className="relative group w-full max-w-[420px]"
    >
      {/* Massive Aura Glow - Visible behind the card */}
      <div className="absolute -inset-16 bg-gradient-to-tr from-[#FFB7C5]/40 via-[#FFB7C5]/20 to-saffron/20 blur-[100px] rounded-full opacity-0 group-hover:opacity-100 scale-75 group-hover:scale-100 transition-all duration-1000 -z-20 pointer-events-none" />
      <div className="absolute -inset-8 bg-[#FFB7C5]/30 blur-[60px] rounded-full opacity-0 group-hover:opacity-100 scale-90 group-hover:scale-110 transition-all duration-700 -z-20 pointer-events-none" />

      {/* Magic Card Wrapper */}
      <MagicCard 
        className="relative aspect-[3/4] overflow-hidden rounded-3xl border-saffron/10 z-10 bg-ivory/50 backdrop-blur-sm shadow-[0_20px_50px_rgba(0,0,0,0.15)]"
        gradientColor="#FFB7C533"
      >
        {/* Mystic Particles */}
        <div className="absolute inset-0 z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-1000">
          <Particles
            className="absolute inset-0"
            quantity={30}
            staticity={30}
            color="#FFB7C5"
            ease={50}
          />
        </div>

        {/* Image Container */}
        <div className="relative h-full w-full z-10">
          <Image
            src={imageSrc}
            alt={altText}
            fill
            className="object-cover transition-all duration-1000 group-hover:scale-105 group-hover:brightness-110"
            priority
            sizes="(max-width: 1024px) 100vw, 50vw"
          />

          {/* Elegant Subtle Overlays */}
          <div className="absolute inset-0 bg-gradient-to-t from-sacred-brown/60 via-transparent to-transparent opacity-60 pointer-events-none" />
          <div className="absolute inset-0 bg-[#FFB7C5]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
        </div>

        {/* Border Beam - Magic UI Effect */}
        <BorderBeam 
          size={300} 
          duration={8} 
          colorFrom="#FFB7C5" 
          colorTo="#E8860C" 
          borderWidth={3}
          className="opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        />
      </MagicCard>

      {/* Shine Border - Additional Layer of Light */}
      <div className="absolute inset-0 pointer-events-none z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        <ShineBorder
          className="rounded-3xl"
          shineColor={["#FFB7C5", "#E8860C", "#FFB7C5"]}
          borderWidth={2}
          duration={5}
        />
      </div>

      {/* Bottom Reflection Glow */}
      <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-2/3 h-8 bg-[#FFB7C5]/20 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700 -z-10" />
    </motion.div>
  );
}