"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import Image from "next/image";
import { ShineBorder } from "@/components/ui/shine-border";

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
      className="relative group w-full max-w-[450px] mx-auto"
    >
      {/* Main Container with 3:4 Aspect Ratio */}
      <div className="relative aspect-[3/4] overflow-hidden rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.15)] border border-saffron/10 z-10">
        {/* Image */}
        <Image
          src={imageSrc}
          alt={altText}
          fill
          className="object-cover transition-transform duration-1000 group-hover:scale-110"
          priority
          sizes="(max-width: 768px) 100vw, 50vw"
        />

        {/* Elegant Subtle Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-sacred-brown/40 via-transparent to-transparent pointer-events-none" />
        
        {/* Inner Border Glow */}
        <div className="absolute inset-0 border border-white/10 rounded-3xl pointer-events-none" />
        
        {/* Decorative Light Leak */}
        <div className="absolute -top-1/2 -right-1/2 w-full h-full bg-saffron/5 blur-[100px] rounded-full pointer-events-none" />
      </div>

      {/* Shine Border as Overlay Sibling to prevent masking children */}
      <div className="absolute inset-0 pointer-events-none z-20">
        <ShineBorder
          className="rounded-3xl"
          shineColor={shineColor}
          borderWidth={2}
          duration={8}
        />
      </div>

      {/* Background Floating Effect */}
      <motion.div 
        animate={{ 
          y: [0, -15, 0],
          rotate: [0, 1, 0]
        }}
        transition={{ 
          duration: 6, 
          repeat: Infinity, 
          ease: "easeInOut" 
        }}
        className="absolute -inset-4 bg-gradient-to-tr from-saffron/10 via-transparent to-vermillion/5 blur-2xl -z-10 opacity-40 group-hover:opacity-100 transition-opacity duration-1000" 
      />
    </motion.div>
  );
}