"use client";

import Link from "next/link";
import Image from "next/image";
import { BlurFade } from "@/components/ui/blur-fade";
import { SparklesText } from "@/components/ui/sparkles-text";
import { Particles } from "@/components/ui/particles";
import { ShimmerButton } from "@/components/ui/shimmer-button";
import { OmIcon } from "@/components/ui/OmIcon";
import { ArrowRight } from "lucide-react";

export function InvocationSection() {
  return (
    <section className="relative py-20 overflow-hidden bg-transparent">
      {/* Reused Background Image from DhamFlipAnimation */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/home-page/dham-section-bg-new.png"
          alt="Invocation Background"
          fill
          className="object-cover opacity-100"
          priority
          unoptimized
        />
        {/* Subtle overlay to soften the background for text readability */}
        <div className="absolute inset-0 bg-[#FFFBF5]/20 backdrop-blur-[1px]" />
      </div>
      
      <Particles
        className="absolute inset-0"
        quantity={40}
        ease={80}
        color="#E8860C"
        refresh
      />

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <BlurFade delay={0.2}>
          <p className="font-body text-xl md:text-2xl text-warm-umber/70 mb-8 italic">
            "If you have reached here, it is not by chance."
          </p>
        </BlurFade>

        <BlurFade delay={0.4}>
          <div className="flex items-center justify-center mb-10">
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
          <div className="mt-12 flex flex-col items-center gap-4">
            <div className="relative h-16 w-16 animate-pulse opacity-40 grayscale hover:grayscale-0 transition-all duration-700">
              <Image
                src="/logo.png"
                alt="Maa Unique Dham Logo"
                fill
                className="object-contain"
              />
            </div>
            <div className="w-px h-16 bg-gradient-to-b from-saffron/20 to-transparent" />
          </div>
        </BlurFade>
      </div>
    </section>
  );
}
