"use client";

import Link from "next/link";
import { BlurFade } from "@/components/ui/blur-fade";
import { SparklesText } from "@/components/ui/sparkles-text";
import { Particles } from "@/components/ui/particles";
import { ShimmerButton } from "@/components/ui/shimmer-button";
import { OmIcon } from "@/components/ui/OmIcon";
import { ArrowRight } from "lucide-react";

export function InvocationSection() {
  return (
    <section className="relative py-48 overflow-hidden bg-ivory">
      {/* Background with warm saffron glow and rising sparks */}
      <div 
        className="absolute inset-0 opacity-40"
        style={{
          background: "radial-gradient(circle at 50% 50%, rgba(232, 134, 12, 0.1), transparent 80%)"
        }}
      />
      
      <Particles
        className="absolute inset-0"
        quantity={40}
        ease={80}
        color="#E8860C"
        refresh
      />

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <BlurFade delay={0.2}>
          <p className="font-body text-xl md:text-2xl text-warm-umber/70 mb-12 italic">
            "If you have reached here, it is not by chance."
          </p>
        </BlurFade>

        <BlurFade delay={0.4}>
          <div className="flex items-center justify-center mb-16">
            <SparklesText 
              className="font-display text-5xl md:text-7xl lg:text-8xl text-sacred-brown tracking-tighter"
              sparklesCount={15}
              colors={{ first: "#E8860C", second: "#C41E3A" }}
            >
              MAA HAS CALLED YOU.
            </SparklesText>
          </div>
        </BlurFade>

        <BlurFade delay={0.6}>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-8">
            <Link href="/puja-booking">
              <ShimmerButton className="px-12 py-5 shadow-2xl transition-all hover:scale-105 active:scale-95">
                <span className="font-display text-lg tracking-widest uppercase">
                  Book a Sacred Puja
                </span>
              </ShimmerButton>
            </Link>
            <Link
              href="/guidance"
              className="group flex items-center gap-3 font-display text-base tracking-widest uppercase text-sacred-brown hover:text-saffron transition-colors"
            >
              Seek Spiritual Guidance
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-2" />
            </Link>
          </div>
        </BlurFade>

        <BlurFade delay={0.8}>
          <div className="mt-24 flex flex-col items-center gap-4">
            <OmIcon className="text-saffron/30 h-10 w-10 animate-pulse" />
            <div className="w-px h-16 bg-gradient-to-b from-saffron/20 to-transparent" />
          </div>
        </BlurFade>
      </div>
    </section>
  );
}
