"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface GlowPulseProps {
  children: React.ReactNode;
  className?: string;
}

export function GlowPulse({ children, className }: GlowPulseProps) {
  return (
    <div className={cn("relative inline-block", className)}>
      <motion.div
        animate={{
          opacity: [0.4, 0.8, 0.4],
          scale: [1, 1.05, 1],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute inset-0 bg-sacred-gold/20 blur-3xl rounded-full"
      />
      {children}
    </div>
  );
}