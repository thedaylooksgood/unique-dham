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
  imageSrc = "https://images.unsplash.com/photo-1582555172866-9137e24683fb?q=80&w=800&auto=format&fit=crop",
  altText = "Immortal presence of Maa",
  shineColor = ["#E8860C", "#C41E3A", "#D4443B"],
}: InteractiveDarshanProps) {
  const [isRevealed, setIsRevealed] = useState(false);
  const [revealProgress, setRevealProgress] = useState(0);
  const [hasInteracted, setHasInteracted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const maskRadius = useMotionValue(50);

  // Update mouse position
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    mouseX.set(x);
    mouseY.set(y);
    setHasInteracted(true);
  };

  // Update reveal progress based on interaction
  useEffect(() => {
    const updateRevealProgress = () => {
      if (isRevealed || !hasInteracted) return;
      const progress = maskRadius.get() / 100;
      setRevealProgress(progress);
      if (progress >= 0.8) {
        setIsRevealed(true);
      }
    };

    const unsubscribe = maskRadius.onChange(updateRevealProgress);
    return () => unsubscribe();
  }, [isRevealed, hasInteracted]);

  // Animate mask radius growth on interaction
  useEffect(() => {
    if (!hasInteracted || isRevealed) return;
    const interval = setInterval(() => {
      const newRadius = Math.min(maskRadius.get() + 2, 100);
      maskRadius.set(newRadius);
    }, 50);

    return () => clearInterval(interval);
  }, [hasInteracted, isRevealed, maskRadius]);

  // Mask template for radial gradient
  const maskImage = useMotionTemplate`radial-gradient(
    circle at ${mouseX}px ${mouseY}px,
    transparent ${maskRadius}px,
    black 80px
  )`;

  return (
    <div className="relative group" onMouseMove={handleMouseMove} ref={containerRef}>
      <ShineBorder
        className="relative flex w-full flex-col items-center justify-center overflow-hidden rounded-3xl bg-transparent md:shadow-2xl"
        shineColor={shineColor}
      >
        {/* Image Container */}
        <div className="relative aspect-[4/5] w-full overflow-hidden">
          {/* Mist Layer (Visible when not revealed) */}
          {!isRevealed && (
            <motion.div
              className="absolute inset-0 backdrop-blur-xl bg-transparent/80"
              style={{ maskImage, WebkitMaskImage: maskImage }}
              initial={{ opacity: 1 }}
              animate={{ opacity: isRevealed ? 0 : 1 }}
              transition={{ duration: 0.5 }}
            />
          )}

          {/* Image */}
          <Image
            src={imageSrc}
            alt={altText}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-110"
          />

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-ivory via-transparent to-transparent opacity-60" />

          {/* Golden Aura (Visible when revealed) */}
          {isRevealed && (
            <motion.div
              className="absolute inset-0 rounded-2xl"
              initial={{ opacity: 0, boxShadow: "0 0 0px rgba(232, 134, 12, 0)" }}
              animate={
                isRevealed
                  ? {
                      opacity: 1,
                      boxShadow: "0 0 30px rgba(232, 134, 12, 0.4)",
                    }
                  : {}
              }
              transition={{ duration: 1.5 }}
            />
          )}
        </div>
      </ShineBorder>

      {/* Instruction Text */}
      {!hasInteracted && !isRevealed && (
        <motion.div
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
          initial={{ opacity: 1 }}
          animate={{ opacity: hasInteracted ? 0 : 1 }}
          transition={{ duration: 0.3 }}
        >
          <p className="font-body text-sacred-brown text-lg bg-transparent/70 px-4 py-2 rounded-xl border border-saffron/20">
            Move your cursor to clear the mist and reveal Maa
          </p>
        </motion.div>
      )}

      {/* Decorative Border */}
      <div className="absolute -bottom-6 -left-6 w-full h-full border-2 border-saffron/10 rounded-3xl -z-10 transition-transform group-hover:translate-x-2 group-hover:translate-y-2" />
    </div>
  );
}