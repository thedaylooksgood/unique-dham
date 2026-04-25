"use client";

import { BlurFade } from "@/components/ui/blur-fade";
import { SacredDivider } from "@/components/ui/SacredDivider";
import { Sparkles, Heart, ArrowRight } from "lucide-react";
import { InteractiveDarshan } from "./InteractiveDarshan";
import Link from "next/link";

export function IntroSection() {
  return (
    <section id="invocation" className="relative py-32 bg-sacred-premium-gradient overflow-hidden scroll-mt-24">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-saffron/5 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-vermillion/5 blur-[100px] rounded-full translate-y-1/2 -translate-x-1/2" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          {/* Visual Column */}
          <BlurFade delay={0.2} direction="right">
            <InteractiveDarshan
              imageSrc="/images/home-page/intro.jpeg"
              shineColor={["#E8860C", "#C41E3A", "#D4443B"]}
            />
          </BlurFade>

          {/* Content Column */}
          <div className="flex flex-col gap-8 lg:pl-4">
            <BlurFade delay={0.4} direction="left">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-px bg-saffron/60" />
                <span className="font-body text-xs tracking-[0.4em] uppercase text-saffron font-bold">
                  Sacred Invocation
                </span>
              </div>
              <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-sacred-brown leading-[1.1] mb-6">
                Maa's <span className="italic text-gradient-saffron font-bold">Living Presence.</span>
              </h2>
            </BlurFade>

            <BlurFade delay={0.6} direction="left">
              <div className="space-y-6">
                <p className="font-body text-base md:text-lg text-warm-umber/90 leading-relaxed max-w-xl font-medium">
                  At Maa Unique Dham, the divine isn't just a concept—it is a felt experience. 
                  In the serene heights of Darjeeling, we bridge the gap between the seeker and the source.
                </p>
                <p className="font-body text-sm md:text-base text-warm-umber/70 leading-relaxed max-w-lg">
                  Every prayer here is a conversation, and every ritual is an invitation for Maa Durga's 
                  unconditional grace to touch your life. Whether you seek peace, protection, or 
                  purpose, She is waiting to guide you home.
                </p>
              </div>
              
              <div className="mt-10 flex flex-wrap items-center gap-8">
                <Link 
                  href="/about-mahant"
                  className="group flex items-center gap-3 font-display text-sm tracking-widest uppercase text-sacred-brown hover:text-saffron transition-all"
                >
                  Explore the Sacred Path
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-2" />
                </Link>

                <div className="h-10 w-px bg-saffron/10 hidden sm:block" />

                <div className="flex items-center gap-4">
                  <div className="flex -space-x-3">
                    {[1, 2, 3, 4].map((i) => (
                      <div key={i} className="w-10 h-10 rounded-full border-2 border-white bg-sandstone flex items-center justify-center text-[10px] font-bold text-sacred-brown shadow-sm overflow-hidden">
                        {i === 4 ? (
                          <div className="bg-saffron text-white w-full h-full flex items-center justify-center">1k+</div>
                        ) : (
                          <div className="w-full h-full bg-parchment" />
                        )}
                      </div>
                    ))}
                  </div>
                  <div>
                    <p className="text-[13px] font-body text-sacred-brown font-bold">
                      1,200+ Seekers
                    </p>
                    <p className="text-[11px] font-body text-warm-umber/50 italic">
                      Joined worldwide for Maa's blessing
                    </p>
                  </div>
                </div>
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
