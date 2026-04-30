"use client";

import { BlurFade } from "@/components/ui/blur-fade";
import { ArrowRight } from "lucide-react";
import { ShimmerButton } from "@/components/ui/shimmer-button";
import Link from "next/link";
import Image from "next/image";

export function IntroSection() {
  return (
    // LOCK THE ASPECT RATIO OF THE ENTIRE SECTION (e.g., 16/9 for a standard image)
    // to ensure the background image never crops or zooms.
    <section
      id="invocation"
      className="relative w-full min-h-[110vh] overflow-hidden scroll-mt-24 flex items-center bg-transparent"
    >
      {/* 1. SECTION-WIDE BACKGROUND IMAGE */}
      <div className="absolute inset-0 -z-10 w-full h-full">
        <Image
          src="/images/home-page/intro/mountain-bg.png"
          alt="Sacred Himalayas"
          fill
          className="object-cover"
          priority
          unoptimized
        />
      </div>

      <div className="max-w-[90rem] mx-auto relative z-10 w-full px-4 sm:px-6 lg:px-12">
        <div className="grid lg:grid-cols-[45%_55%] gap-8 lg:gap-16 items-center h-full">

          {/* 2. VISUAL COLUMN - YOUR SPECIFIC PRE-DESIGNED IMAGE */}
          <BlurFade delay={0.2} direction="right" className="w-full flex justify-center lg:justify-start">

            {/* 
              THE PORTRAIT CONTAINER (A SQUARE-ish frame)
              We lock its aspect ratio to prevent ANY details within your image from getting cut off.
              Using a drop-shadow will "lift" the pre-designed image off the background.
            */}
            <div className="relative w-[90%] md:w-[80%] aspect-[3/4] lg:aspect-[4/5] bg-transparent drop-shadow-2xl">
              {/* Main Portrait Cutout */}
              <Image
                src="/images/home-page/intro/intro_cutoutfull.png"
                alt="Maa's Living Presence - Pre-designed Portrait"
                fill
                className="object-contain relative z-10"
                priority
                unoptimized
              />

              {/* Top Right Decorative Image */}
              <div className="absolute -top-[10%] -right-[15%] w-[60%] aspect-square z-20 pointer-events-none">
                <Image
                  src="/images/home-page/intro/top-right.png"
                  alt="Decorative Top Right"
                  fill
                  className="object-contain"
                  unoptimized
                />
              </div>

              {/* Bottom Left Decorative Image */}
              <div className="absolute -bottom-[10%] -left-[15%] w-[60%] aspect-square z-0 pointer-events-none">
                <Image
                  src="/images/home-page/intro/bottom-left.png"
                  alt="Decorative Bottom Left"
                  fill
                  className="object-contain"
                  unoptimized
                />
              </div>
            </div>
          </BlurFade>

          {/* 3. TEXT CONTENT COLUMN (RETAINED) */}
          <div className="flex flex-col gap-4 lg:gap-5 pt-2 max-w-2xl">
            <BlurFade delay={0.4} direction="left">
              <div className="flex items-center gap-3 mb-2">
                {/* Visual Accent */}
                <div className="w-8 h-[2px] bg-[#D4443B]/60" />
                <span className="font-body text-[10px] md:text-xs tracking-[0.4em] uppercase text-[#D4443B] font-bold">
                  Sacred Invocation
                </span>
              </div>
              <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-sacred-brown leading-[1.1]">
                Maa's <span className="italic text-[#D4443B] font-bold">Living Presence.</span>
              </h2>
            </BlurFade>

            <BlurFade delay={0.6} direction="left">
              <div className="space-y-4">
                <p className="font-body text-sm md:text-base text-sacred-brown leading-relaxed font-medium">
                  At Maa Unique Dham, the divine isn't just a concept—it is a felt experience that resonates
                  through the misty heights of Darjeeling. We serve as a sacred bridge between the
                  seeker and the source, preserving ancient Himalayan currents for the modern world
                  while maintaining the raw, primordial energy of the mountains.
                </p>
                <p className="font-body text-xs md:text-sm text-sacred-brown/80 leading-relaxed">
                  Every prayer offered here is a conversation with eternity, and every ritual is an
                  invitation for Maa Durga's unconditional grace to illuminate your path. Our sanctuary
                  upholds the purity of Sanatan Dharma, where the whisper of the ancient peaks meets
                  the sincere call of the heart, creating a space of profound transformation and
                  unshakable peace.
                </p>
                <p className="font-body text-xs md:text-sm text-sacred-brown/80 leading-relaxed">
                  The Dham is more than a temple; it is a spiritual powerhouse fueled by centuries
                  of devotion. Here, the elements—fire, water, and mountain air—work in harmony with
                  sacred mantras to clear the path for your spiritual evolution. Whether you seek
                  clarity in times of confusion or strength during life's challenges, Maa's grace
                  provides a steady anchor in the storm.
                </p>
                <p className="font-body text-xs md:text-sm text-sacred-brown/80 leading-relaxed">
                  Join a global community that transcends borders, united by a shared connection
                  to the Mother. In this sanctuary, every visitor is recognized as a part of the
                  divine family, finding their purpose amidst the sacred echoes of the Himalayas.
                </p>
              </div>

              <div className="mt-8 flex justify-start border-t border-sacred-brown/10 pt-6">
                <Link href="/about-mahant">
                  <ShimmerButton className="px-6 py-3 md:px-8 md:py-4 bg-[#1A0F0A] shadow-2xl transition-all hover:scale-105 active:scale-95 rounded-full">
                    <div className="flex items-center gap-3">
                      <span className="font-display text-[10px] md:text-xs tracking-[0.2em] uppercase text-white font-semibold">
                        Explore the Sacred Path
                      </span>
                      <ArrowRight className="w-4 h-4 text-white/70 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </ShimmerButton>
                </Link>
              </div>
            </BlurFade>
          </div>
        </div>
      </div>
    </section>
  );
}