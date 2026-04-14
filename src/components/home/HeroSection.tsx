"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Particles } from "@/components/ui/particles";
import { WordRotate } from "@/components/ui/word-rotate";
import { SparklesText } from "@/components/ui/sparkles-text";
import { BlurFade } from "@/components/ui/blur-fade";
import { AnimatedShinyText } from "@/components/ui/animated-shiny-text";
import { ShimmerButton } from "@/components/ui/shimmer-button";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

const mantras = [
  "ॐ नमो दुर्गायै नमः",
  "ॐ ऐं ह्रीं क्लीं चामुण्डायै विच्चे",
  "या देवी सर्वभूतेषु शक्ति रूपेण संस्थिता",
  "ॐ सर्वमंगल मांगल्ये शिवे सर्वार्थ साधिके",
];

export function HeroSection() {
  return (
    <section className="relative min-h-[100svh] flex items-center justify-center overflow-hidden pt-20">
      {/* Background with luminous gradient and particles */}
      <div className="absolute inset-0 bg-background" />
      <div 
        className="absolute inset-0 opacity-40"
        style={{
          background: "radial-gradient(circle at 50% 30%, rgba(232, 134, 12, 0.15), transparent 70%)"
        }}
      />
      
      <Particles
        className="absolute inset-0"
        quantity={60}
        ease={80}
        color="#E8860C"
        refresh
      />

      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        {/* Animated Badge */}
        <BlurFade delay={0.2}>
          <div className="flex items-center justify-center mb-10">
            <div
              className={cn(
                "group rounded-full border border-saffron/20 bg-saffron/5 px-4 py-1.5 transition-all ease-in hover:cursor-pointer hover:bg-saffron/10",
              )}
            >
              <AnimatedShinyText className="inline-flex items-center justify-center font-body text-xs font-semibold tracking-[0.2em] uppercase text-saffron">
                <span>✧ SACRED HILLS OF DARJEELING ✧</span>
              </AnimatedShinyText>
            </div>
          </div>
        </BlurFade>

        {/* Mantra Rotation */}
        <BlurFade delay={0.3}>
          <div className="mb-8">
            <WordRotate
              words={mantras}
              className="font-sacred text-2xl md:text-3xl lg:text-4xl text-saffron/60 italic"
              duration={4000}
            />
          </div>
        </BlurFade>

        {/* Main Heading */}
        <div className="space-y-4 mb-10">
          <BlurFade delay={0.4} direction="up">
            <h1 className="font-display text-5xl md:text-7xl lg:text-9xl leading-[0.85] text-sacred-brown tracking-tight">
              WHERE MAA IS
              <br />
              <span className="text-gradient-saffron italic">NOT INVOKED.</span>
            </h1>
          </BlurFade>
          
          <BlurFade delay={0.6} direction="up">
            <div className="flex items-center justify-center">
              <SparklesText 
                className="font-display text-5xl md:text-7xl lg:text-9xl leading-none text-sacred-brown"
                sparklesCount={12}
                colors={{ first: "#E8860C", second: "#C41E3A" }}
              >
                SHE ARRIVES.
              </SparklesText>
            </div>
          </BlurFade>
        </div>

        {/* Subheading */}
        <BlurFade delay={0.8}>
          <p className="font-body text-lg md:text-xl text-warm-umber/80 max-w-2xl mx-auto mb-12 leading-relaxed">
            Born in the sacred hills of Darjeeling, this is not a temple on the map.
            <br className="hidden md:block" />
            It is a living presence that reaches wherever truth calls.
          </p>
        </BlurFade>

        {/* CTAs */}
        <BlurFade delay={1.0}>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <Link href="/puja-booking">
              <ShimmerButton className="px-10 py-4 shadow-2xl transition-all hover:scale-105 active:scale-95">
                <span className="font-display text-base tracking-widest uppercase">
                  Book a Sacred Puja
                </span>
              </ShimmerButton>
            </Link>
            <Link
              href="/#mahant"
              className="group flex items-center gap-2 font-display text-sm tracking-widest uppercase text-sacred-brown hover:text-saffron transition-colors"
            >
              Meet Mahant Yogiraj
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </BlurFade>
      </div>

      {/* Decorative Bottom Gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
}