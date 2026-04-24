"use client";

import { BlurFade } from "@/components/ui/blur-fade";
import { MagicCard } from "@/components/ui/magic-card";
import { SacredDivider } from "@/components/ui/SacredDivider";
import { Sparkles, Heart } from "lucide-react";
import { InteractiveDarshan } from "./InteractiveDarshan";

export function IntroSection() {
  return (
    <section className="relative py-32 bg-sacred-premium-gradient overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          {/* Interactive Darshan Column */}
          <BlurFade delay={0.2} direction="right">
            <InteractiveDarshan
              shineColor={["#E8860C", "#C41E3A", "#D4443B"]}
            />
          </BlurFade>

          {/* Content Column */}
          <div className="flex flex-col gap-8">
            <BlurFade delay={0.4} direction="left">
              <span className="font-body text-xs tracking-[0.3em] uppercase text-saffron font-bold">
                ✧ Sacred Invocation ✧
              </span>
              <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-sacred-brown leading-tight mt-4">
                "Not just a place. 
                <br />
                Not just a website. 
                <br />
                This is a <span className="italic text-gradient-saffron font-bold">living presence</span> of Maa."
              </h2>
            </BlurFade>

            <BlurFade delay={0.6} direction="left">
              <p className="font-body text-lg text-warm-umber/70 leading-relaxed max-w-lg mb-8">
                In the mystical air of Darjeeling, devotion transcends physical boundaries. 
                We invite you to experience the divine through a portal of pure intention.
              </p>
            </BlurFade>

            <div className="grid sm:grid-cols-2 gap-6">
              <BlurFade delay={0.7} direction="up">
                <MagicCard className="flex flex-col p-8 gap-4 bg-warm-glow/30 border-saffron/5 shadow-sacred-warm h-full">
                  <div className="p-3 bg-saffron/10 rounded-2xl w-fit">
                    <Sparkles className="w-6 h-6 text-saffron" />
                  </div>
                  <h3 className="font-display text-xl text-sacred-brown">Ritual Experience</h3>
                  <p className="font-body text-sm text-warm-umber/60">
                    Every ritual is not performed—it is experienced through ancient vibrational currents.
                  </p>
                </MagicCard>
              </BlurFade>
              <BlurFade delay={0.8} direction="up">
                <MagicCard className="flex flex-col p-8 gap-4 bg-warm-glow/30 border-saffron/5 shadow-sacred-warm h-full">
                  <div className="p-3 bg-vermillion/10 rounded-2xl w-fit">
                    <Heart className="w-6 h-6 text-vermillion" />
                  </div>
                  <h3 className="font-display text-xl text-sacred-brown">Divine Feeling</h3>
                  <p className="font-body text-sm text-warm-umber/60">
                    Every prayer is not spoken—it is felt deep within the sanctuary of the heart.
                  </p>
                </MagicCard>
              </BlurFade>
            </div>
          </div>
        </div>

        <BlurFade delay={1.0}>
          <SacredDivider />
        </BlurFade>
      </div>
    </section>
  );
}
