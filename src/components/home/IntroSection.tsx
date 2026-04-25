"use client";

import { BlurFade } from "@/components/ui/blur-fade";
import { SacredDivider } from "@/components/ui/SacredDivider";
import { Sparkles, Heart, ArrowRight } from "lucide-react";
import { InteractiveDarshan } from "./InteractiveDarshan";
import { ShimmerButton } from "@/components/ui/shimmer-button";
import Link from "next/link";

export function IntroSection() {
  return (
    <section id="invocation" className="relative py-12 px-6 bg-sacred-premium-gradient overflow-hidden scroll-mt-24 min-h-[70vh] flex items-center">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-saffron/5 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-vermillion/5 blur-[100px] rounded-full translate-y-1/2 -translate-x-1/2" />

      <div className="max-w-7xl mx-auto relative z-10 w-full">
        <div className="grid lg:grid-cols-[420px_1fr] gap-12 items-start">
          {/* Visual Column */}
          <BlurFade delay={0.2} direction="right">
            <InteractiveDarshan
              imageSrc="/images/home-page/intro.jpeg"
              shineColor={["#FFB7C5", "#E8860C", "#D4443B"]}
            />
          </BlurFade>

          {/* Content Column */}
          <div className="flex flex-col gap-5 pt-2">
            <BlurFade delay={0.4} direction="left">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-8 h-px bg-saffron/60" />
                <span className="font-body text-[10px] tracking-[0.4em] uppercase text-saffron font-bold">
                  Sacred Invocation
                </span>
              </div>
              <h2 className="font-display text-4xl md:text-5xl text-sacred-brown leading-[1.1]">
                Maa's <span className="italic text-gradient-saffron font-bold">Living Presence.</span>
              </h2>
            </BlurFade>

            <BlurFade delay={0.6} direction="left">
              <div className="space-y-4">
                <p className="font-body text-base text-sacred-brown leading-relaxed font-medium">
                  At Maa Unique Dham, the divine isn't just a concept—it is a felt experience that resonates
                  through the misty heights of Darjeeling. We serve as a sacred bridge between the
                  seeker and the source, preserving ancient Himalayan currents for the modern world
                  while maintaining the raw, primordial energy of the mountains.
                </p>
                <p className="font-body text-sm text-sacred-brown/80 leading-relaxed">
                  Every prayer offered here is a conversation with eternity, and every ritual is an
                  invitation for Maa Durga's unconditional grace to illuminate your path. Our sanctuary
                  upholds the purity of Sanatan Dharma, where the whisper of the ancient peaks meets
                  the sincere call of the heart, creating a space of profound transformation and
                  unshakable peace.
                </p>
                <p className="font-body text-sm text-sacred-brown/80 leading-relaxed">
                  The Dham is more than a temple; it is a spiritual powerhouse fueled by centuries
                  of devotion. Here, the elements—fire, water, and mountain air—work in harmony with
                  sacred mantras to clear the path for your spiritual evolution. Whether you seek
                  clarity in times of confusion or strength during life's challenges, Maa's grace
                  provides a steady anchor in the storm.
                </p>
                <p className="font-body text-sm text-sacred-brown/80 leading-relaxed">
                  Join a global community that transcends borders, united by a shared connection
                  to the Mother. In this sanctuary, every visitor is recognized as a part of the
                  divine family, finding their purpose amidst the sacred echoes of the Himalayas.
                </p>
              </div>

              <div className="mt-8 flex justify-end border-t border-saffron/10 pt-6">
                <Link href="/about-mahant">
                  <ShimmerButton className="px-8 py-3 shadow-2xl transition-all hover:scale-105 active:scale-95">
                    <div className="flex items-center gap-3">
                      <span className="font-display text-xs tracking-[0.2em] uppercase text-white">
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

        <BlurFade delay={0.8} className="mt-24">
          <SacredDivider />
        </BlurFade>
      </div>
    </section>
  );
}
